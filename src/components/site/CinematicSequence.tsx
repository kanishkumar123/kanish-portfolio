import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export interface CinematicSequenceHandle {
  /** Draw the frame at scroll progress 0–1. Safe to call on every scroll tick. */
  draw: (progress: number) => void;
}

interface CinematicSequenceProps {
  imagesRef: React.MutableRefObject<(HTMLImageElement | null)[]>;
  frameCount: number;
  className?: string;
}

/**
 * Renders the 192-frame sequence to a <canvas> using drawImage(), scrubbed
 * entirely by an external progress value (driven by ScrollTrigger in Hero).
 *
 * Design notes:
 * - Draw calls are coalesced into a single requestAnimationFrame so rapid
 *   scroll events never queue up more than one canvas paint per frame.
 * - Two frames are blended (crossfaded via globalAlpha) around the exact
 *   scroll position, which reads as smooth interpolation even though the
 *   source is 192 discrete stills.
 * - If the exact frame — or its neighbor — hasn't finished loading yet
 *   (lazy phase), we fall back to the nearest already-loaded frame instead
 *   of leaving the canvas blank.
 * - Sizing accounts for devicePixelRatio (capped at 2x to avoid megapixel
 *   canvases on very high-DPI displays) so the sequence stays sharp on
 *   Retina screens without over-spending on fill-rate.
 */
export const CinematicSequence = forwardRef<CinematicSequenceHandle, CinematicSequenceProps>(
  ({ imagesRef, frameCount, className }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const dprRef = useRef(1);
    const sizeRef = useRef({ width: 0, height: 0 });
    const rafRef = useRef<number | undefined>(undefined);
    const pendingProgressRef = useRef(0);

    const drawImageCover = (img: HTMLImageElement, alpha: number) => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      const dpr = dprRef.current;
      const cw = sizeRef.current.width * dpr;
      const ch = sizeRef.current.height * dpr;
      const imageRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cw / ch;

      let drawWidth = cw;
      let drawHeight = ch;
      let dx = 0;
      let dy = 0;

      if (imageRatio > canvasRatio) {
        drawHeight = ch;
        drawWidth = ch * imageRatio;
        dx = (cw - drawWidth) / 2;
      } else {
        drawWidth = cw;
        drawHeight = cw / imageRatio;
        dy = (ch - drawHeight) / 2;
      }

      ctx.globalAlpha = alpha;
      ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
    };

    const resolveNearestLoaded = (index: number) => {
      const images = imagesRef.current;
      for (let i = index; i >= 0; i -= 1) if (images[i]) return images[i];
      for (let i = index; i < frameCount; i += 1) if (images[i]) return images[i];
      return null;
    };

    const drawFrame = (progress: number) => {
      const ctx = ctxRef.current;
      if (!ctx) return;

      const clamped = Math.min(Math.max(progress, 0), 1);
      const exact = clamped * (frameCount - 1);
      const lowerIndex = Math.floor(exact);
      const upperIndex = Math.min(lowerIndex + 1, frameCount - 1);
      const blend = exact - lowerIndex;

      const lowerImg = resolveNearestLoaded(lowerIndex);
      const upperImg = imagesRef.current[upperIndex] ?? lowerImg;

      const dpr = dprRef.current;
      ctx.clearRect(0, 0, sizeRef.current.width * dpr, sizeRef.current.height * dpr);

      if (lowerImg) drawImageCover(lowerImg, 1);
      if (upperImg && upperImg !== lowerImg && blend > 0) {
        drawImageCover(upperImg, blend);
      }
      ctx.globalAlpha = 1;
    };

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      ctxRef.current = ctx;

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        dprRef.current = dpr;
        const { clientWidth, clientHeight } = canvas;
        sizeRef.current = { width: clientWidth, height: clientHeight };
        canvas.width = Math.round(clientWidth * dpr);
        canvas.height = Math.round(clientHeight * dpr);
        drawFrame(pendingProgressRef.current);
      };

      resize();
      const observer = new ResizeObserver(resize);
      observer.observe(canvas);
      return () => observer.disconnect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(
      () => () => {
        if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
      },
      [],
    );

    useImperativeHandle(ref, () => ({
      draw(progress: number) {
        pendingProgressRef.current = progress;
        if (rafRef.current !== undefined) return; // already scheduled this tick
        rafRef.current = requestAnimationFrame(() => {
          drawFrame(pendingProgressRef.current);
          rafRef.current = undefined;
        });
      },
    }));

    return <canvas ref={canvasRef} className={className} />;
  },
);

CinematicSequence.displayName = "CinematicSequence";
