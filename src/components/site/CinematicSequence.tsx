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
 * - The render buffer (canvas.width/height) is capped at MAX_RENDER_WIDTH
 *   regardless of the element's on-screen CSS size or devicePixelRatio.
 *   drawImage() cost scales with pixel count, not CSS size — on a 2K/4K
 *   display at 100% OS scaling, devicePixelRatio is just 1, so a naive
 *   "match clientWidth" canvas can be pushing 1.8x+ more pixels through
 *   drawImage() every scroll tick than on a 1080p screen, which reads as
 *   stutter. Capping the buffer and letting the browser upscale the
 *   bitmap to the CSS box (same mechanism as `object-fit: cover` on an
 *   <img>) keeps draw cost bounded and predictable on any screen size.
 */
const MAX_RENDER_WIDTH = 1920;

export const CinematicSequence = forwardRef<CinematicSequenceHandle, CinematicSequenceProps>(
  ({ imagesRef, frameCount, className }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    // Holds the actual render-buffer pixel size (post-cap), not the CSS size.
    const bufferRef = useRef({ width: 0, height: 0 });
    const rafRef = useRef<number | undefined>(undefined);
    const pendingProgressRef = useRef(0);

    const drawImageCover = (img: HTMLImageElement, alpha: number) => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      const cw = bufferRef.current.width;
      const ch = bufferRef.current.height;
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

      ctx.clearRect(0, 0, bufferRef.current.width, bufferRef.current.height);

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
        const { clientWidth, clientHeight } = canvas;
        if (clientWidth === 0 || clientHeight === 0) return;

        const rawWidth = clientWidth * dpr;
        const rawHeight = clientHeight * dpr;
        // Scale the whole buffer down proportionally if it would exceed
        // the cap — never scale up past the CSS size.
        const scale = Math.min(1, MAX_RENDER_WIDTH / rawWidth);

        const bufferWidth = Math.round(rawWidth * scale);
        const bufferHeight = Math.round(rawHeight * scale);

        bufferRef.current = { width: bufferWidth, height: bufferHeight };
        canvas.width = bufferWidth;
        canvas.height = bufferHeight;
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
