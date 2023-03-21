import SyncWithPortabl from 'sync-with-portabl';
import styles from './index.module.css';
import loadBackupData from '../lib/requests/loadBackupDataRequest';
import getDataProfile from '../lib/requests/getDataProfile';
import createDataSyncInvitation from '../lib/requests/createDataSyncInvitation';

export default function Web() {
  return (
    <div className={styles['backup-wrapper']}>
      <h4>Portabl Backup - React</h4>
      <SyncWithPortabl
        loadBackupData={({ correlationId }) => loadBackupData({ correlationId })}
        getDataProfile={() => getDataProfile()}
        createDataSyncInvitation={({ correlationId }) => createDataSyncInvitation({ correlationId })}
        clientId={process.env.JS_APP_PUBLIC_PORTABL_PUBLIC_CLIENT_ID || ''}
      />
    </div>
  );
}
