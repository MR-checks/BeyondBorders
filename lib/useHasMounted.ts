import { useSyncExternalStore } from "react";

// Nothing to subscribe to: the value flips once, when React reaches the client.
const subscribe = () => () => {};
const onClient = () => true;
const onServer = () => false;

/**
 * False during server render and the hydrating render, true afterwards.
 *
 * Preferred over the useState + useEffect "mounted" dance: no effect, no extra
 * render pass, and it keeps the hydrating render byte-identical to the HTML.
 */
export function useHasMounted(): boolean {
  return useSyncExternalStore(subscribe, onClient, onServer);
}
