import styles from './index.module.css';
import updateUserDatapoints from '../lib/requests/updateUserDatapoints.request';
import getDataProfile from '../lib/requests/getDataProfile.request';
import createSyncSession from '../lib/requests/createDataSyncInvitation.request';
import updateUserSettings from '../lib/requests/updateUserSettings.request';
import getUserSettings from '../lib/requests/getUserSettings.request';

import SyncWithPortabl from '@portabl/react-sync-with-portabl';

export default function Web() {
  return (
    <div className={styles['backup-wrapper']}>
      <h4>Portabl Backup - React</h4>
      <SyncWithPortabl
        getUserSettings={getUserSettings}
        updateUserSettings={updateUserSettings}
        updateUserDatapoints={updateUserDatapoints}
        getDataProfile={getDataProfile}
        createSyncSession={createSyncSession}
        clientId={process.env.JS_APP_PUBLIC_PORTABL_PUBLIC_CLIENT_ID || ''}
      />
    </div>
  );
}
