import { Suspense, useEffect, useState, type ReactNode } from 'react';

/*
 * Progressive mounting. Below-the-fold sections set up GSAP/ScrollTrigger and WebGL when they
 * mount; doing all of that in the first render produced one long main-thread task. Each
 * <Deferred> instead mounts in its own idle period, in document order, after first paint.
 * Children may be React.lazy components: their chunks load when they are about to mount.
 */
const queue: Array<() => void> = [];
let pumping = false;

const whenIdle = (callback: () => void) => {
  if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(callback, { timeout: 600 });
  else window.setTimeout(callback, 16);
};

const pump = () => {
  const next = queue.shift();
  if (!next) {
    pumping = false;
    return;
  }
  next();
  whenIdle(pump);
};

const enqueue = (mount: () => void) => {
  queue.push(mount);
  if (!pumping) {
    pumping = true;
    whenIdle(pump);
  }
};

interface DeferredProps {
  children: ReactNode;
  /** Space reserved before mounting, so the page doesn't collapse while sections arrive. */
  placeholderHeight?: string;
}

const Deferred = ({ children, placeholderHeight = '100vh' }: DeferredProps) => {
  // Opened with a #hash: mount everything now so the browser can scroll to the target.
  const [ready, setReady] = useState(() => window.location.hash.length > 1);

  useEffect(() => {
    if (ready) return undefined;
    let active = true;
    const mount = () => {
      if (active) setReady(true);
    };
    enqueue(mount);
    return () => {
      active = false;
      const index = queue.indexOf(mount);
      if (index >= 0) queue.splice(index, 1);
    };
  }, [ready]);

  // data-deferred lets other code (useHashLanding) know the layout is still settling.
  const placeholder = <div data-deferred="" style={{ minHeight: placeholderHeight }} aria-hidden="true" />;
  return ready ? <Suspense fallback={placeholder}>{children}</Suspense> : placeholder;
};

export default Deferred;
