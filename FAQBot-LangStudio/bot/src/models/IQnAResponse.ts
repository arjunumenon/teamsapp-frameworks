/**
 * Interface for the Answer retrieved from QnA Maker
 * @file IQnAResponse.ts
 * @description Interfaces for the QnA Response received from Language Studio Azure Function
 * @author Arjun Menon
 */

/**
 * Interface for the particular answer retrieved from QnA Maker
 * @interface IqnaAnswer
 * @property {string} answer - The answer retrieved from QnA Maker
 * @property {number} confidenceScore - The confidence score of the answer retrieved from QnA Maker
 * @property {number} id - The id of the answer retrieved from QnA Maker
 * @property {string} source - The source of the answer retrieved from QnA Maker
 */
export interface IqnaAnswer{
    answer: string;
    confidenceScore: number;
    id: number;
    source: string;
}

/**
 * Interface for the list of Answers retrieved from QnA Maker
 * @interface IqnaResponse
 * @property {IqnaAnswer[]} answers - The list of answers retrieved from QnA Maker
 */
export interface IqnaResponse{
    answers: IqnaAnswer[];
}

/**
 * Interface for the generic response received from Language Studio Azure Function
 * @interface IResponse
 * @property {number} status - The status code of the response
 * @property {string} statusText - The status text of the response
 * @property {IqnaResponse} data - The data of the response
 */
export interface IResponse{
    status: number;
    statusText: string;
    data?: IqnaResponse;
}