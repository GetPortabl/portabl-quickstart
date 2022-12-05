export {};

declare global {
  interface Window {
    _env_: { [key: string]: any };
  }
}
