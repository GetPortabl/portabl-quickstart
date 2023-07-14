const PORTABL_ACCOUNT_ID = window._env_.JS_APP_PORTABL_ACCOUNT_ID;
const PORTABL_CONNECT_DOMAIN = window._env_.JS_APP_PORTABL_CONNECT_DOMAIN;
const PORTABL_WALLET_DOMAIN = window._env_.JS_APP_PORTABL_WALLET_DOMAIN;

const { ConnectClient } = Portabl.connect;
const connectClient = new ConnectClient({
  accountId: PORTABL_ACCOUNT_ID,
  connectDomain: PORTABL_CONNECT_DOMAIN,
  walletDomain: PORTABL_WALLET_DOMAIN,
});

const connectForm = document.querySelector('.connect-login');
connectForm.onsubmit = (e) => {
  e.preventDefault();
  connectClient.loginWithRedirect();
};

const logoutBtn = document.querySelector('.logout-btn');
logoutBtn.onclick = (e) => {
  e.preventDefault();
  connectClient.logout();
  updateUI();
};

window.onload = async () => {
  await connectClient.handleRedirectCallback();
  updateUI();
};

const updateUI = async () => {
  const loginWrapper = document.querySelector('.login-wrapper');
  const loggedInWrapper = document.querySelector('.logged-in-wrapper');
  const accessTokenInput = document.querySelector('#access-token');
  const logoutBtn = document.querySelector('.logout-btn');
  const accessTokenInputWrapper = document.querySelector('.access-token-input');
  const loadingSpinnerSvg = document.querySelector('#spinner-svg');

  const isAuthenticated = await connectClient.getIsAuthenticated();

  if (isAuthenticated) {
    loginWrapper.classList.add('hidden');
    loggedInWrapper.classList.add('hidden');
    logoutBtn.classList.add('hidden');
    accessTokenInputWrapper.classList.add('hidden');

    const { access_token } = await connectClient.getAccessToken();
    loadingSpinnerSvg.classList.add('hidden');
    accessTokenInputWrapper.classList.remove('hidden');
    loggedInWrapper.classList.remove('hidden');
    logoutBtn.classList.remove('hidden');
    accessTokenInput.value = access_token;
  } else {
    loadingSpinnerSvg.classList.add('hidden');
    loginWrapper.classList.remove('hidden');
    loggedInWrapper.classList.add('hidden');
  }
};
