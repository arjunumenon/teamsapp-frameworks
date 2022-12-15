/**
 * This is a file which contains the utility functions
 * @file util.ts
 * @description This is a file which contains the utility functions
 * @author Arjun Menon
 */
import { IqnaResponse } from "../models/IQnAResponse";
/**
 * This function refines the response received from Language Studio Azure Function
 * @param completeResponse Response received from Language Studio Azure Function
 * @returns Single text for the Asked question
 */
export const getRefinedResponse = async (completeResponse: IqnaResponse): Promise<string> => {
    let refinedResponse: string = "";
    if (completeResponse.answers.length > 0) {
        refinedResponse = completeResponse.answers[0].answer;
    }
    else{
        refinedResponse = "Sorry, I don't have an answer for that.";
    }
    return refinedResponse;
}