/**
 * @file IQnAResponse.ts
 * @description Interfaces for the QnA Response received from Language Studio Azure Function
 * @author Arjun Menon 
 */

/**
 * Interface for the particular answer retrieved from QnA Maker
 */
export interface IqnaAnswer{
    answer: string;
    confidenceScore: number;
    id: number;
    source: string;
}

/**
 * Interface for the list of Answers retrieved from QnA Maker
 */
export interface IqnaResponse{
    answers: IqnaAnswer[];
}

/**
 * Interface for the generic response received from Language Studio Azure Function
 */
export interface IResponse{
    status: number;
    statusText: string;
    data?: IqnaResponse;
}