/**
 * @file IQnARequestProperties.ts
 * @description Interface for QnA Request Properties
 * @author Arjun Menon
 */
/**
 * Interface for QnA Request Properties
 * @interface QnARequestProperties
 * @property {string} question - The question to be answered
 * @property {number} top - The number of answers to be returned
 */
export interface QnARequestProperties {
    question: string;
    top: number;
}