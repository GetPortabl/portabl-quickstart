import BackupWithPortabl from '@portabl/react-backup-with-portabl';

import usePrepareBackup from '../lib/hooks/usePrepareBackup';
import useLoadBackupData from '../lib/hooks/useLoadBackupData';
import styles from './index.module.css';

export default function Web() {
  const { mutateAsync: prepareBackupAsync } = usePrepareBackup();
  const { mutateAsync: loadBackupDataAsync } = useLoadBackupData();

  const userId: string = 'USER_ID_OF_AUTHENTICATED_BANK_TRUST_USER';

  return (
    <div className={styles['backup-wrapper']}>
      <h4>Portabl Backup - React</h4>
      <BackupWithPortabl
        prepareBackup={() => prepareBackupAsync()}
        loadBackupData={({ accessToken }) => {
          loadBackupDataAsync({
            accessToken,
            userId,
          });
        }}
        redirectUri="https://getportabl.com"
      />
    </div>
  );
}
