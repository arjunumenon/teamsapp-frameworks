/**
 * This service layer method will call the Language Studio API
 * @file services.ts
 * @description This service layer method will call the Language Studio API
 * @author Arjun Menon
 */
import { Context } from "@azure/functions";
import { AxiosStatic } from "axios";
import config from "../../config";
import { IQnARequestProperties } from "../models/IQnARequestProperties";
import { IqnaResponse, IResponse } from "../models/IQnAResponse";


const Axios = require("axios") as AxiosStatic;
/**
 * This service layer method will call the Language Studio API
 * @param context Azure Function Context
 * @param qnarequestProperties Properties needed for the Language Studio API call
 * @returns 
 */
export const callLanguageStudioEndPoint = async (context: Context, qnarequestProperties: IQnARequestProperties): Promise<any> => {

    const qnaEndPoint: string = config.qnaEndpoint;
    const qnaProjectName: string = config.qnaProjectName;
    const qnaSubsriptionkey: string = config.qnaSubscriptionKey;

    const langstudioEndPoint = `${qnaEndPoint}/language/:query-knowledgebases?projectName=${qnaProjectName}&api-version=2021-10-01&deploymentName=production`;
    const langstudioHeader: any = {
        "Ocp-Apim-Subscription-Key": qnaSubsriptionkey,
        "Content-Type": "application/json"
    };
    const langstudioBody: any = {
        "top": qnarequestProperties.top,
        "question": qnarequestProperties.question,
        "includeUnstructuredSources": true,
        "confidenceScoreThreshold": "0.5"
    };

    let qnaResponse : IqnaResponse = null;
    try {
        const response: any = await Axios.post<IResponse>(langstudioEndPoint, langstudioBody, {
            headers: langstudioHeader
        });
        qnaResponse = response.data;
    } catch (err: any) {
        console.log(err);
        context.log.error(err);
        return {
            status: 500,
            body: {
                error:
                    "Failed to Get answers for the question",
            },
        };
    }

    return qnaResponse;
}