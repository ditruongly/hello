Step-by-Step

### Using OpenID Connect Express Middleware
Here, we'll add the OpenID Connect Express middleware to our code, to enable it for use by the application.

```js
const { auth, requiresAuth } = require("express-openid-connect");
```

#### Enable Securing Specific Routes
**requiresAuth** is a middleware intended to be applied to the specific routes that require an authenticated user.

### Configure the App to use the Authentication Middleware
In order for our application to use the auth middleware to route requests, it must be supplied with certain keys.

```js
app.use(
    auth({
        authorizationParams: {
            response_type: 'code',
        },
        secret: SESSION_SECRET,
        auth0Logout: true,
        baseURL: APP_URL,
        issuerBaseURL: ISSUER_BASE_URL,
        clientID: CLIENT_ID,
        authRequired: false,
    })
);
```

#### About the response_type
**response_type=code** indicates that the application expects to receive an authorization code. Your application will exchange the authorization code for an ID token and access token by making a POST request to the authorization server's token endpoint.

#### About the secret key
This is used to derive an encryption key for the session cookie stored by Express's session middleware. Note that the same value is used by the session middleware. The auth middleware will use this secret value to sign the transient cookies used by the login callback.

The value can be obtained directly from the **SESSION_SECRET** environment variable and this key can be omitted. We are passing this directly for this sample lab to make it clear the value is being used by the middleware.

These cookies are written to the user's browser. If there are multiple webservers that need to interpret the cookie, it's important that the session secret be the same on each respective environment.

#### About the baseURL
This is the publicly accessible URL for the application. The middleware uses this to construct URLs pointing back to the application for consumption by the authorization server.

Similar to the session secret, the value can be obtained directly from the **APP_URL** environment variable and this key can be omitted. We are passing this directly for this sample lab to make it clear the value is being used by the middleware.

#### About the issuerBaseURL
This is the fully qualified domain of the OpenID Connect provider that the application is configured to use; in this case your Auth0 tenant.

The middleware uses the **issuerBaseURL** to download the OpenID Connect configuration from the discovery document, available at the URL:

https://{your-auth0-domain}/.well-known/openid-configuration

This discovery document is a standard OpenID Connect mechanism used to publish relevant discovery metadata of the OpenID Connect provider (Auth0), including a link to what keys should be used for validating the tokens it issues.

Once again, the value can be obtained directly from the **ISSUER_BASE_URL** environment variable and this key can be omitted. We are passing this directly for this sample lab to make it clear the value is being used by the middleware.

#### About the clientID
The **clientID** is created on the authorization server (Auth0) and must be provided in each request so that the authorization server knows what application the authentication request is for, so you can say it is the unique identifier of the application.

As with the other keys, the value can be obtained directly from the **CLIENT_ID** environment variable and this key can be omitted. We are passing this directly for this sample lab to make it clear the value is being used by the middleware.

#### About authRequired
**authRequired: false** configures the middleware to make authentication optional across the entire application.

**requiresAuth()** configure private routes

```js
app.get("/user", requiresAuth(), async (req, res) => {
  res.render("user", {
    user: req.oidc && req.oidc.user,
    id_token: req.oidc && req.oidc.idToken,
    access_token: req.oidc && req.oidc.accessToken,
    refresh_token: req.oidc && req.oidc.refreshToken,
  });
});
```

