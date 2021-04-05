OAuth2.adapter("hubspot", {
  /**
   * @return {URL} URL to the page that returns the authorization code
   */
  authorizationCodeURL: function (config) {
    return (
      "https://app.hubspot.com/oauth/authorize?" +
      "client_id={{CLIENT_ID}}&" +
      "scope={{API_SCOPE}}&" +
      "redirect_uri={{REDIRECT_URI}}"
    )
      .replace("{{CLIENT_ID}}", config.clientId)
      .replace("{{API_SCOPE}}", config.apiScope)
      .replace("{{REDIRECT_URI}}", this.redirectURL(config));
  },

  /**
   * @return {URL} URL to the page that we use to inject the content
   * script into
   */
  redirectURL: function (config) {
    // return "https://www.hubspot.com/robots.txt";
    return "https://green-clicks-api.web.app/oauth";
  },

  /**
   * @return {String} Authorization code for fetching the access token
   */
  parseAuthorizationCode: function (url) {
    var error = url.match(/[&\?]error=([^&]+)/);
    if (error) {
      throw "Error getting authorization code: " + error[1];
    }
    return url.match(/[&\?]code=([\w\/\-]+)/)[1];
  },

  /**
   * @return {URL} URL to the access token providing endpoint
   */
  accessTokenURL: function () {
    return "https://api.hubapi.com/oauth/v1/token";
  },

  accessTokenGCURL: function () {
    return "https://us-central1-green-clicks-api.cloudfunctions.net/webApi/api/v1/oauth/tokens";
  },

  /**
   * @return {String} HTTP method to use to get access tokens
   */
  accessTokenMethod: function () {
    return "POST";
  },

  /**
   * @return {Object} The payload to use when getting the access token
   */
  accessTokenParams: function (authorizationCode, config) {
    return {
      code: authorizationCode,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: this.redirectURL(config),
      grant_type: "authorization_code",
    };
  },

  /**
   * @return {Object} Object containing accessToken {String},
   * refreshToken {String} and expiresIn {Int}
   */
  parseAccessToken: function (response) {
    return {
      accessToken: response.match(/access_token=([^&]*)/)[1],
      expiresIn: Number.MAX_VALUE,
    };
  },

  parseAccessGCToken: function (response) {
    return JSON.parse(response);
  },
});
