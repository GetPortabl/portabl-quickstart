import axios, { AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";

import { API_BASE_URL, LOAD_BACKUP_DATA_ROUTE } from "../constants";

export type LoadBackupDataRequestArgsType = {
  // "accessToken" that was received from the API call that was executed on mounting of a portabl web component.
  readonly accessToken: string;

  // "userId" is the userId of the user within your application
  readonly userId: string;
};

const loadBackupData = async ({
  accessToken,
  userId,
}: LoadBackupDataRequestArgsType): Promise<void> => {
  const { data }: AxiosResponse = await axios.post(
    `${API_BASE_URL}${LOAD_BACKUP_DATA_ROUTE}`,
    {
      accessToken,
      userId,
    }
  );

  return data;
};

export default function useLoadBackupData() {
  return useMutation((args: LoadBackupDataRequestArgsType) =>
    loadBackupData(args)
  );
}
