'use client';
import Image from 'next/image';

import { useConnect } from '@portabl/react-connect-with-portabl';

import portablIcon from './portabl-icon.svg';
import preloaderIcon from './preloader.svg';

export default function Web() {
  const { isLoading, isAuthorized, authorizeWithRedirect, resetAuthorization, vpToken } = useConnect();
  if (isLoading) {
    return null;
  }

  return (
    <div className="connect-wrapper">
      <div className={`login-wrapper ${isAuthorized ? 'hidden' : ''}`}>
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
            authorizeWithRedirect();
          }}
        >
          <button type="submit" className="portabl-connect-btn">
            <Image width={15} height={19} alt="" src={portablIcon} />
            <span>Connect with Portabl</span>
          </button>
        </form>
      </div>
      <div>
        <Image src={preloaderIcon} alt="loading-spinner" />
      </div>
      {isAuthorized && (
        <div className="logged-in-wrapper">
          <h2>You are now Authorized</h2>
          <div>
            <h5>Claims</h5>
            <pre>
              <code>{JSON.stringify(vpToken, null, 2)}</code>
            </pre>
            <button className="logout-btn" onClick={resetAuthorization}>
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
