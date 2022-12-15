/* This code sample provides a starter kit to implement server side logic for your Teams App in TypeScript,
 * refer to https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference for complete Azure Functions
 * developer guide.
 */

// Import polyfills for fetch required by msgraph-sdk-javascript.
import "isomorphic-fetch";
import { Context, HttpRequest } from "@azure/functions";
import { Client } from "@microsoft/microsoft-graph-client";
import {
  createMicrosoftGraphClientWithCredential,
  OnBehalfOfCredentialAuthConfig,
  OnBehalfOfUserCredential,
  UserInfo,
} from "@microsoft/teamsfx";
import config from "../config";
import { IQnARequestProperties } from "./models/IQnARequestProperties";
import { callLanguageStudioEndPoint } from "./services/services";

interface Response {
  status: number;
  body: { [key: string]: any };
}

type TeamsfxContext = { [key: string]: any };

/**
 * This function handles requests from teamsfx client.
 * The HTTP request should contain an SSO token queried from Teams in the header.
 * Before trigger this function, teamsfx binding would process the SSO token and generate teamsfx configuration.
 *
 * This function initializes the teamsfx SDK with the configuration and calls these APIs:
 * - new OnBehalfOfUserCredential(ssoToken, authConfig)  - Construct OnBehalfOfUserCredential instance with the received SSO token and initialized configuration.
 * - getUserInfo() - Get the user's information from the received SSO token.
 * - createMicrosoftGraphClientWithCredential() - Get a graph client to access user's Microsoft 365 data.
 *
 * The response contains multiple message blocks constructed into a JSON object, including:
 * - An echo of the request body.
 * - The display name encoded in the SSO token.
 * - Current user's Microsoft 365 profile if the user has consented.
 *
 * @param {Context} context - The Azure Functions context object.
 * @param {HttpRequest} req - The HTTP request.
 * @param {teamsfxContext} TeamsfxContext - The context generated by teamsfx binding.
 */
export default async function run(
  context: Context,
  req: HttpRequest,
  teamsfxContext: TeamsfxContext
): Promise<Response> {
  context.log("HTTP trigger function processed a request.");

  // Initialize response.
  const res: Response = {
    status: 200,
    body: {},
  };

  // Put an echo into response body.
  res.body.receivedHTTPRequestBody = req.body || "";

  // Prepare sso token.
  const ssoToken: string = teamsfxContext["AccessToken"];
  if (!ssoToken) {
    return {
      status: 400,
      body: {
        error: "No access token was found in request header.",
      },
    };
  }

  // Construct OnBehalfOfUserCredential.
  let credential: OnBehalfOfUserCredential;
  try {
    const authConfig: OnBehalfOfCredentialAuthConfig = {
      authorityHost: config.authorityHost,
      tenantId: config.tenantId,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
    };
    credential = new OnBehalfOfUserCredential(ssoToken, authConfig);
  } catch (e) {
    context.log.error(e);
    return {
      status: 500,
      body: {
        error:
          "Failed to construct OnBehalfOfUserCredential using your ssoToken. " +
          "Ensure your function app is configured with the right Azure AD App registration.",
      },
    };
  }

    //Setting the Question details
    const qnaReqProps : IQnARequestProperties = {
      question:res.body.receivedHTTPRequestBody.question,
      top:res.body.receivedHTTPRequestBody.top,
    }
    // Initiate QnA Maker Response from Language Studio
    const qnaReponse: Promise<any> = await callLanguageStudioEndPoint(context,qnaReqProps);
  
    res.body = qnaReponse;
    return res;
}