export function SectionDivider() {
  return (
    <div className="container-x">
      {/* 
        The container div sets the vertical height (h-4) 
        and vertically centers its children.
      */}
      <div className="relative mt-16 flex h-4 items-center justify-center md:mt-20">
        {/*
          1. Sharp core line:
          In light mode (default), it's a very deep slate (#111827) fading at the edges.
          In dark mode (dark:), it swaps to a fully cyan (#06b6d4) core.
        */}
        <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-slate-950 dark:via-cyan-500 to-transparent opacity-70" />

        {/* 
          2. Soft ambient blur:
          This div is always cyan in color.
          To make it visible against light backgrounds, the opacity is set to 60% (opacity-60) in light mode.
          In dark mode, it drops slightly to 40% (dark:opacity-40) because cyan naturally radiates against darkness.
        */}
        <div className="absolute h-[6px] w-3/4 blur-[4px] opacity-60 dark:opacity-40 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      </div>
    </div>
  );
}
