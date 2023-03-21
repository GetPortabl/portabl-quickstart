import { useAuth0 } from '@auth0/auth0-react';
import { Button, Modal, Text } from '@mantine/core';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useDisclosure } from '@mantine/hooks';
import handleDataSyncInvitation from '../../requests/handleDataSyncInvitation';

const PASSPORT_URL_ORIGIN = 'https://local-my.getportabl.com:3004';
const PASSPORT_URL = 'https://local-my.getportabl.com:3004/sync';

export default function SyncButton({
  createDataSyncInvitation,
  generateCorrelationId,
  getDataProfile,
  loadBackupData,
}: {
  createDataSyncInvitation: ({ correlationId }: { correlationId: string }) => Promise<{ invitationUrl: string }>;
  generateCorrelationId: () => string;
  getDataProfile: () => Promise<{ datapoints: Array<{ kind: string }> }>;
  loadBackupData: ({ correlationId }: { correlationId: string }) => Promise<void>;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isSynced, setIsSynced] = useState(false);
  const { isAuthenticated, loginWithPopup, logout, getAccessTokenSilently } = useAuth0();
  const iframeRef = useCallback((node: HTMLIFrameElement) => setIframeElement(node), []);
  const [iframeElement, setIframeElement] = useState<HTMLIFrameElement | null>(null);
  const syncWrapperRef = useRef<HTMLDivElement>(null);
  const [dataProfile, setdataProfile] = useState<any>(null);
  const [isPassportReady, setIsPassportReady] = useState(false);

  const handleSync = async () => {
    open();

    const dataProfileResponse = await getDataProfile();

    setdataProfile(dataProfileResponse);
    if (!isAuthenticated) {
      loginWithPopup();
    }
  };

  useEffect(() => {
    if (isAuthenticated && isPassportReady && iframeElement && dataProfile) {
      const formattedDatapoints = dataProfile?.datapoints.map((x: any) => x.kind);

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
    JSON.stringify(dataProfile),
    isAuthenticated,
    isPassportReady,
    iframeElement,
  ]);

  const handleAckEvent = useCallback(
    async (event: MessageEvent<{ action: string }>) => {
      if (event?.origin === PASSPORT_URL_ORIGIN && event.data.action === 'sync:acked') {
        const correlationId = generateCorrelationId();
        const accessToken = await getAccessTokenSilently();

        // loadBackupData is asynchronous action that does not need to be awaited.
        // We do not care about the response of this event.
        await loadBackupData({ correlationId });
        const { invitationUrl } = await createDataSyncInvitation({ correlationId });
        await handleDataSyncInvitation({ accessToken, invitationUrl });
        setIsSynced(true);
      }
    },
    [generateCorrelationId, createDataSyncInvitation, loadBackupData, getAccessTokenSilently],
  );

  const handlePassportReadyEvent = (event: MessageEvent<{ action: string }>) => {
    if (event.data.action === 'sync:passport-ready') {
      setIsPassportReady(true);
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
    if (isAuthenticated && dataProfile) {
      ackListener = window.addEventListener('message', handleAckEvent);
    }

    return () => {
      if (ackListener) {
        window.removeEventListener('message', handleAckEvent);
      }
    };
  }, [dataProfile, isAuthenticated, handleAckEvent]);

  useEffect(() => {
    window.addEventListener('message', handlePassportReadyEvent);
    return () => {
      window.removeEventListener('message', handlePassportReadyEvent);
    };
  }, [dataProfile, isAuthenticated]);

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
