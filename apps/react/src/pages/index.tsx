import SyncWithPortabl from 'sync-with-portabl';
import styles from './index.module.css';
import getAccessToken from '../lib/requests/getAccessTokenRequest';
import loadBackupData from '../lib/requests/loadBackupDataRequest';

export default function Web() {
  const userId: string = 'USER_ID_OF_AUTHENTICATED_BANK_TRUST_USER';

  return (
    <div className={styles['backup-wrapper']}>
      <h4>Portabl Backup - React</h4>
      <SyncWithPortabl
        getAccessToken={getAccessToken}
        loadBackupData={({ accessToken }) => loadBackupData({ accessToken, userId })}
        clientId={process.env.JS_APP_PUBLIC_PORTABL_CLIENT_ID || ''}
      />
    </div>
  );
}
