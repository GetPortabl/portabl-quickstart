import styles from './index.module.css';

import getPrereqs from '../lib/requests/getPrereqs.request';
import userConsent from '../lib/requests/userConsent.request';

// import SyncWithPortabl from '@portabl/react-sync-with-portabl';

export default function Web() {
  return (
    <div className={styles['sync-wrapper']}>
      <h4>Portabl Sync - React</h4>
      {/* <SyncWithPortabl
        getPrereqs={getPrereqs}
        onUserConsent={userConsent}
        clientId={process.env.JS_APP_PUBLIC_PORTABL_PUBLIC_CLIENT_ID}
      /> */}
    </div>
  );
}
