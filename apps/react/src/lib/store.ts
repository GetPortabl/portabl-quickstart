import { atom } from 'jotai';

const atomWithLocalStorage = (key: string, initialValue: string) => {
  const getInitialValue = () => {
    if (typeof window !== 'undefined') {
      const item = window.localStorage.getItem(key);

      if (item !== null) {
        return JSON.parse(item);
      }
    }
    return initialValue;
  };
  const baseAtom = atom(getInitialValue());
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue = typeof update === 'function' ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(nextValue));
      }
    },
  );
  return derivedAtom;
};

enum LocalStorageKeyEnum {
  ClientId = 'clientId',
  ClientSecret = 'clientSecret',
  RedirectUrl = 'redirectUrl',
  OnboardingAppDomainUrl = 'onboardingAppDomainUrl',
}

export const clientIdAtom = atomWithLocalStorage(LocalStorageKeyEnum.ClientId, '');
export const clientSecretAtom = atomWithLocalStorage(LocalStorageKeyEnum.ClientSecret, '');
export const redirectUrlAtom = atomWithLocalStorage(LocalStorageKeyEnum.RedirectUrl, '');
export const onboardingAppDomainUrlAtom = atomWithLocalStorage(LocalStorageKeyEnum.OnboardingAppDomainUrl, '');

export const isBackupButtonConfiguredAtom = atom(false);
