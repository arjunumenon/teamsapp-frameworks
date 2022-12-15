import { Activity, CardFactory, MessageFactory, TurnContext } from "botbuilder";
import { CommandMessage, TeamsFxBotCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import helpCard from "./adaptiveCards/helpCommand.json";
import { CardData } from "./cardModels";


/**
 * This is a sample command handler which will be called when the user types "help" in the chat.
 * This command handler will render an adaptive card with the help information.
 * @export HelpCommandHandler
 * @class HelpCommandHandler
 * @implements {TeamsFxBotCommandHandler}
 */
export class HelpCommandHandler implements TeamsFxBotCommandHandler {
  triggerPatterns: TriggerPatterns = "help";

  async handleCommandReceived(
    context: TurnContext,
    message: CommandMessage
  ): Promise<string | Partial<Activity> | void> {
    console.log(`Bot received message: ${message.text}`);

    // Render your adaptive card for reply message
    const cardData: CardData = {
      title: "How to use QnA Bot",
      body: "This is a bot which will help you to get answers to your questions. Please ask the question to the bot and the bot will try to find the answer for you. IF the bot does not know the answer for you, it will ask you to ask the question to the admin. The admin will then add the answer to the bot and the bot will be able to answer your question next time.",
    };

    const cardJson = AdaptiveCards.declare(helpCard).render(cardData);
    return MessageFactory.attachment(CardFactory.adaptiveCard(cardJson));
  }
}
