/**
 * @file faqQnaCommandHandler.ts
 * @description This is a file which contains the command handler for the any Questions asked by the user
 * @author Arjun Menon
 */
import { Activity, CardFactory, MessageFactory, TurnContext } from "botbuilder";
import { CommandMessage, TeamsBotSsoPromptTokenResponse, TeamsFx, TeamsFxBotCommandHandler, TeamsFxBotSsoCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import qnaEchoCard from "./adaptiveCards/questionechoCommand.json";
import { qnaEchoCardData } from "./cardModels";
import { QnARequestProperties } from "./models/IQnARequestProperties";
import { callAzureFunction } from "./services/services";
import { getRefinedResponse } from "./utils/util";

/**
 * The `faqQnaCommandHandler` registers a pattern with the `TeamsFxBotCommandHandler` and responds
 * with an Adaptive Card when a user types a question.
 * @class faqQnaCommandHandler
 * @implements TeamsFxBotCommandHandler
 * @implements TeamsFxBotSsoCommandHandler
 * @property {TriggerPatterns} triggerPatterns - The trigger pattern for the command handler
 * @method handleCommandReceived - The method which handles the command received
 */
export class faqQnaCommandHandler implements TeamsFxBotSsoCommandHandler {
    //Trigger patter as any text so that the bot can respond to any question asked by the user
    triggerPatterns: TriggerPatterns = ".";

    async handleCommandReceived(
        context: TurnContext,
        message: CommandMessage,
        tokenResponse: TeamsBotSsoPromptTokenResponse
    ): Promise<string | Partial<Activity> | void> {
        console.log(`Bot received message: ${message.text}`);
        const teamsfx = new TeamsFx().setSsoToken(tokenResponse.ssoToken);

        const qnarequestProperties: QnARequestProperties = {
            question: message.text,
            top: 1
        }
        // Calling the Azure Function for getting the QnA Result from Azure Language Studio
        const azQnAResponse: any = await callAzureFunction("getLangStudioQnAResponse", teamsfx, qnarequestProperties);
        const refinedResponse: string = await getRefinedResponse(azQnAResponse);

        //Returns the response. Pass true if you need the response as Adaptive Card`
        return await getQuestionResponseinNeededway(message, refinedResponse, false);
    }
}

/**
 * 
 * @param message This is the command message
 * @param refinedResponse Response which is refined by the Utility
 * @param asAdaptiveCard Boolean value to check if the response is needed as Adaptive Card or not. Pass true if you need the response as Adaptive Card
 * @returns If `asAdaptiveCard` is `true`, returns the response as Adaptive Card. Else returns the response as string
 */
async function getQuestionResponseinNeededway(message: CommandMessage, refinedResponse: string, asAdaptiveCard: boolean): Promise<any> {
    if (asAdaptiveCard) {
        // Render your adaptive card for reply message
        const cardData: qnaEchoCardData = {
            title: "This card will show the Question Asked by the user",
            body: "This card will show the Question Asked by the user",
            appName: "Azure QnA Bot",
            description: `You have asked the question : ${message.text}. Response is ${refinedResponse}`,
        };

        const cardJson = AdaptiveCards.declare(qnaEchoCard).render(cardData);
        return MessageFactory.attachment(CardFactory.adaptiveCard(cardJson));
    }
    else
        return refinedResponse;
}