export const registerListener = (
  eventName: string,
  handler: (ev: any) => void
) => {
  window.addEventListener(eventName, handler);
  return () => window.removeEventListener(eventName, handler);
};
