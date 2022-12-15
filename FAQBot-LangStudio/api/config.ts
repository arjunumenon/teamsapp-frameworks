const config = {
  authorityHost: process.env.M365_AUTHORITY_HOST,
  tenantId: process.env.M365_TENANT_ID,
  clientId: process.env.M365_CLIENT_ID,
  clientSecret: process.env.M365_CLIENT_SECRET,
  /**
   * EndPoint for Language Studio QnA Maker
   */
  qnaEndpoint: process.env.QNA_ENDPOINT,
  /**
   * QnA Maker Knowledge Base ID
   */
  qnaProjectName: process.env.QNA_PROJECT_NAME,
  /**
   * QnA Maker Subscription Key
   */
  qnaSubscriptionKey: process.env.QNA_SUBSCRIPTION_KEY
};

export default config;
