// auth0 only used for playground purposes to handle logout.
const CLIENT_ID = window._env_.JS_APP_PUBLIC_PORTABL_PUBLIC_CLIENT_ID;
const DOMAIN = window._env_.JS_APP_AUTH0_DOMAIN;
const AUDIENCE = window._env_.JS_APP_AUTH0_API_AUDIENCE;
const LOGOUT_REDIRECT_URL = window._env_.JS_APP_LOGOUT_REDIRECT_URL;

let auth0Client;

async function initAuth0Client() {
  try {
    auth0Client = await auth0.createAuth0Client({
      domain: DOMAIN,
      audience: AUDIENCE,
      clientId: CLIENT_ID,
      cacheLocation: 'localstorage',
    });
    updateButton();
  } catch (error) {
    console.error('Error creating Auth0 client:', error);
  }
}

async function updateButton() {
  const logoutButton = document.getElementById('logout-button');
  const isAuthenticated = await auth0Client?.isAuthenticated();

  if (isAuthenticated) {
    logoutButton.style.display = 'block';
  } else {
    logoutButton.style.display = 'none';
  }
}

window.handleLogout = async function () {
  if (auth0Client) {
    await auth0Client.logout();
    updateButton();
  }
};

initAuth0Client();
