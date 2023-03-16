import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL, CREATE_DATA_SYNC_INVITATION } from '../constants';

export type CreateDataSyncInvitationRequestArgsType = {
  readonly correlationId: string;
};

const createDataSyncInvitation = async ({
  correlationId,
}: CreateDataSyncInvitationRequestArgsType): Promise<{ invitationUrl: string }> => {
  const { data }: AxiosResponse = await axios.post(`${API_BASE_URL}${CREATE_DATA_SYNC_INVITATION}`, {
    correlationId,
  });

  return data;
};

export default createDataSyncInvitation;
