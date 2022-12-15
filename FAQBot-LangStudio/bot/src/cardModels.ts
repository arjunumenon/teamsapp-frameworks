/**
 * This file contains the interface for the card data
 * @file cardModels.ts
 * @description This file contains the interface for the card data
 * @author Arjun Menon
 */
/**
 * Interface for the card data
 * @interface CardData
 * @property {string} title - The title of the card
 * @property {string} body - The body of the card
 */
export interface CardData {
  title: string;
  body: string;
}

/**
 * Interface for the QnA Echo Card Data
 * @interface qnaEchoCardData
 * @property {string} appName - The name of the app
 * @property {string} description - The description of the app
 * @extends CardData
 */
export interface qnaEchoCardData extends CardData {
  appName: string;
  description: string;
}
