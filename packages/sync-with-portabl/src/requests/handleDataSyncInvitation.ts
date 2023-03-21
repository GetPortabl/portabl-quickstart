import axios from 'axios';

const API_HANDLE_INVITATION = 'https://portabl-ben-api.ngrok.io/api/v1/consumer/data-sync/handle-invitation';

const handleDataSyncInvitation = async ({
  accessToken,
  invitationUrl,
}: {
  accessToken: string;
  invitationUrl: string;
}): Promise<void> => {
  const { data } = await axios.post(
    API_HANDLE_INVITATION,
    { invitationUrl },
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

export default handleDataSyncInvitation;
