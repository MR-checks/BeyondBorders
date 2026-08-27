export default function Background() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Slow-drifting colour orbs. Animation lives in globals.css so it can be
          switched off wholesale under prefers-reduced-motion. */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[100vw] max-h-[100vh]">
        <div
          className="animate-orb-1 absolute top-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-[0.16] dark:opacity-20 filter blur-[100px]"
          style={{ backgroundColor: "rgb(var(--accent))", transform: "translate(-20vw, -20vh)" }}
        />
        <div
          className="animate-orb-2 absolute top-[40%] left-[60%] w-[45vw] h-[45vw] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-[0.12] dark:opacity-15 filter blur-[100px]"
          style={{ backgroundColor: "rgb(var(--cta))", transform: "translate(30vw, 10vh)" }}
        />
        <div
          className="animate-orb-3 absolute top-[60%] left-[30%] w-[55vw] h-[55vw] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-10 dark:opacity-15 filter blur-[120px]"
          style={{ backgroundColor: "rgb(var(--accent-strong))", transform: "translate(0vw, 30vh)" }}
        />
      </div>
    </div>
  );
}
