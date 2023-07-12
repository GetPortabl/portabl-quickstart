'use client';
import Image from 'next/image';

import { useConnect } from '@portabl/react-connect-with-portabl';
import { useEffect, useState } from 'react';

import portablIcon from './portabl-icon.svg';
import preloaderIcon from './preloader.svg';

export default function Web() {
  const { isLoading, isAuthenticated, loginWithRedirect, getAccessTokenSilently, logout } = useConnect();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        const { access_token } = await getAccessTokenSilently();
        setAccessToken(access_token);
      })();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="connect-wrapper">
      <div className={`login-wrapper ${isAuthenticated ? 'hidden' : ''}`}>
        <h2>Login</h2>
        <form className="claim-form">
          <div>
            <label>Username</label>
            <input type="text" autoComplete="username" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" autoComplete="current-password" />
          </div>
          <button type="submit">Log In</button>
        </form>
        <div className="alt-divider">
          <span>OR</span>
        </div>
        <form
          name="connect"
          className="connect-login"
          onSubmit={(e) => {
            e.preventDefault();
            loginWithRedirect();
          }}
        >
          <button type="submit" className="portabl-connect-btn">
            <Image width={15} height={19} alt="" src={portablIcon} />
            <span>Connect with Portabl</span>
          </button>
        </form>
      </div>
      <div
        className={`${accessToken ? 'logged-in-wrapper' : 'logged-in-wrapper logged-in-loading'} ${
          !isAuthenticated ? 'hidden' : ''
        }`}
      >
        <h2>Welcome Back</h2>
        {accessToken ? (
          <>
            <div>
              <h5>Access Token</h5>
              <input defaultValue={accessToken || ''} id="access-token" />
            </div>
            <button className="logout-btn" onClick={logout}>
              Log Out
            </button>
          </>
        ) : (
          <div className="loading-spinner-wrapper">
            <Image className="loading-spinner-svg" src={preloaderIcon} alt="preloader" />
          </div>
        )}
      </div>
    </div>
  );
}
