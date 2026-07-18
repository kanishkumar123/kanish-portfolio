import { useCallback, useEffect, useRef, useState } from "react";

interface UseImageSequenceOptions {
  /** Path prefix before the zero-padded frame number, e.g. "/sequence/frame_" */
  basePath: string;
  /** Total number of frames in the sequence (192) */
  frameCount: number;
  /** Zero-padding width — frame_000000.jpg uses 6 */
  digits?: number;
  /** File extension without the dot */
  extension?: string;
  /** How many frames to load eagerly before the sequence is considered ready */
  preloadCount?: number;
  /** How many lazy frames to fetch in parallel once preload finishes */
  lazyConcurrency?: number;
}

interface UseImageSequenceResult {
  /**
   * Ref (not state) holding every loaded HTMLImageElement, indexed by frame
   * number. Kept as a ref deliberately: the canvas reads this on every
   * scroll tick, and we never want a frame arriving mid-scroll to trigger
   * a React re-render — the canvas draw loop picks it up on its own.
   */
  imagesRef: React.MutableRefObject<(HTMLImageElement | null)[]>;
  /** True once the priority batch (preloadCount frames) has loaded */
  isReady: boolean;
  /** 0–1 progress of the full sequence, for an optional loading indicator */
  loadProgress: number;
}

export function useImageSequence({
  basePath,
  frameCount,
  digits = 6,
  extension = "jpg",
  preloadCount = 36,
  lazyConcurrency = 4,
}: UseImageSequenceOptions): UseImageSequenceResult {
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(frameCount).fill(null));
  const [isReady, setIsReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const frameUrl = useCallback(
    (index: number) => `${basePath}${String(index).padStart(digits, "0")}.${extension}`,
    [basePath, digits, extension],
  );

  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;

    const loadFrame = (index: number) =>
      new Promise<void>((resolve) => {
        // Already loaded (e.g. effect re-ran) — skip the network entirely.
        if (imagesRef.current[index]) {
          resolve();
          return;
        }
        const img = new Image();
        img.decoding = "async";
        img.src = frameUrl(index);
        const finish = () => {
          if (!cancelled) {
            loadedCount += 1;
            setLoadProgress(loadedCount / frameCount);
          }
          resolve();
        };
        img.onload = () => {
          if (!cancelled) imagesRef.current[index] = img;
          finish();
        };
        // A missing/broken frame shouldn't stall the whole sequence — the
        // canvas falls back to the nearest loaded neighbor when drawing.
        img.onerror = finish;
      });

    async function bootstrap() {
      // Phase 1 — priority preload. Loaded in parallel so the hero has a
      // usable window of frames the instant the user starts scrolling.
      const priority = Array.from({ length: Math.min(preloadCount, frameCount) }, (_, i) => i);
      await Promise.all(priority.map(loadFrame));
      if (cancelled) return;
      setIsReady(true);

      // Phase 2 — lazy background load for the remainder, capped at a low
      // concurrency so it never competes with scroll/input handling on the
      // main thread.
      const rest = Array.from(
        { length: Math.max(frameCount - preloadCount, 0) },
        (_, i) => i + preloadCount,
      );
      let cursor = 0;
      const worker = async () => {
        while (cursor < rest.length && !cancelled) {
          const index = rest[cursor];
          cursor += 1;
          await loadFrame(index);
        }
      };
      await Promise.all(Array.from({ length: lazyConcurrency }, worker));
    }

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, [frameCount, frameUrl, preloadCount, lazyConcurrency]);

  return { imagesRef, isReady, loadProgress };
}
