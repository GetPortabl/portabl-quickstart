import BackupWithPortabl from '@portabl/react-backup-with-portabl';

import useAuthenticateBackupSession from '../lib/hooks/useAuthenticateBackupSession';
import useLoadDataToBackupSession from '../lib/hooks/useLoadDataToBackupSession';
import styles from './index.module.css';

export default function Web() {
  const { mutateAsync: authenticateBackupSessionAsync } = useAuthenticateBackupSession();
  const { mutateAsync: loadDataToBackupSessionAsync } = useLoadDataToBackupSession();

  // Apply a Native User ID of authenticated Bank Trust user here
  const nativeUserId: string = 'NATIVE_USER_ID_OF_AUTHENTICATED_BANK_TRUST_USER';

  return (
    <div className={styles['backup-wrapper']}>
      <h4>Portabl Backup - React</h4>
      <BackupWithPortabl
        prepareBackup={() => authenticateBackupSessionAsync()}
        loadBackupData={({ accessToken }) => {
          loadDataToBackupSessionAsync({
            accessToken,
            nativeUserId,
          });
        }}
        redirectUri="https://getportabl.com"
      />
    </div>
  );
}
