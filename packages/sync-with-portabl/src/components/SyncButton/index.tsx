import { useAuth0 } from '@auth0/auth0-react';
import { Button, Modal, Text } from '@mantine/core';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useDisclosure } from '@mantine/hooks';
import getDataProfilesRequest from '../../requests/getDataProfilesRequest';

const PASSPORT_URL_ORIGIN = 'https://local-my.getportabl.com:3004';
const PASSPORT_URL = 'https://local-my.getportabl.com:3004/sync';

export default function SyncButton({
  getAccessToken,
  loadBackupData,
}: {
  getAccessToken: () => Promise<{ accessToken: string }>;
  loadBackupData: ({ accessToken }: { accessToken: string }) => Promise<void>;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isSynced, setIsSynced] = useState(false);
  const { isAuthenticated, loginWithPopup, logout } = useAuth0();
  const iframeRef = useCallback((node: HTMLIFrameElement) => setIframeElement(node), []);
  const [iframeElement, setIframeElement] = useState<HTMLIFrameElement | null>(null);
  const syncWrapperRef = useRef<HTMLDivElement>(null);
  const [dataProfiles, setDataprofiles] = useState<any>(null);
  const [isPassportReady, setIsPassportReady] = useState(false);
  const [providerAccessToken, setProviderAccessToken] = useState<string>();

  const handleSync = async () => {
    open();
    const { accessToken } = await getAccessToken();
    setProviderAccessToken(accessToken);

    const [dataprofilesResponse] = await Promise.all([
      getDataProfilesRequest(accessToken),
      loadBackupData({ accessToken }),
    ]);

    const { dataProfiles } = dataprofilesResponse;

    setDataprofiles(dataProfiles);
    loginWithPopup();
  };

  useEffect(() => {
    if (isAuthenticated && isPassportReady && iframeElement && dataProfiles) {
      const formattedDatapoints = dataProfiles?.[0].datapoints.map((x: any) => x.kind);

      iframeElement.contentWindow?.postMessage(
        {
          action: 'sync:request-ack',
          payload: formattedDatapoints,
        },
        '*',
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(dataProfiles),
    isAuthenticated,
    isPassportReady,
    iframeElement,
  ]);

  const handleAckEvent = (event: MessageEvent<{ action: string }>) => {
    if (event?.origin === PASSPORT_URL_ORIGIN && event.data.action === 'sync:acked') {
      setIsSynced(true);
    }
  };

  const handlePassportReadyEvent = (event: MessageEvent<{ action: string }>) => {
    if (event.data.action === 'sync:passport-ready') {
      setIsPassportReady(true);

      // CREATE DIDCOMM INVITATION
    }

    if (event.data.action === 'sync:passport-closed') {
      setIsPassportReady(false);
    }
  };

  useEffect(() => {
    if (isSynced && opened) {
      close();
    }
  }, [close, isSynced, opened]);

  useEffect(() => {
    let ackListener: any;
    if (isAuthenticated && dataProfiles) {
      ackListener = window.addEventListener('message', handleAckEvent);
    }

    return () => {
      if (ackListener) {
        window.removeEventListener('message', handleAckEvent);
      }
    };
  }, [dataProfiles, isAuthenticated]);

  useEffect(() => {
    window.addEventListener('message', handlePassportReadyEvent);
    return () => {
      window.removeEventListener('message', handlePassportReadyEvent);
    };
  }, [dataProfiles, isAuthenticated]);

  return (
    <div>
      <div
        style={{
          left: 0,
          right: 0,
          top: 0,
          position: 'absolute',
        }}
        ref={syncWrapperRef}
      />
      <div>
        <Modal
          target={syncWrapperRef.current!}
          opened={opened}
          onClose={() => {
            close();
            setIframeElement(null);
            setIsPassportReady(false);
          }}
          centered
        >
          <div style={{ minHeight: '100%' }}>
            <iframe
              ref={iframeRef}
              style={{
                border: 'none',
                margin: 0,
                padding: 0,
              }}
              width="100%"
              height="600px"
              src={PASSPORT_URL}
            />
          </div>
        </Modal>
        {!isSynced ? (
          <div>
            <Button bg="purple" onClick={() => handleSync()}>
              Sync with Portabl
            </Button>
          </div>
        ) : (
          <div>
            ✅ <b>Syncing</b> is configured with Portabl
            <Text td="underline" fz="xs">
              View your Passport
            </Text>
          </div>
        )}
        <br />
        {isAuthenticated && <button onClick={() => logout()}>logout (for testing)</button>}
      </div>
    </div>
  );
}
