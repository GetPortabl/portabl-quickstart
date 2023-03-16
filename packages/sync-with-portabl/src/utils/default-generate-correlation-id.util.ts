export default function defaultGenerateCorrelationId(): string {
  if (window) {
    return window.crypto.randomUUID();
  }
  return '';
}
