<script lang="ts">
  import { get } from "svelte/store";
  import { prefersReducedMotion } from "$lib/stores/theme";

  let container: HTMLDivElement | undefined = $state();
  let mx = $state(0.5);
  let my = $state(0.5);

  function handleMove(e: MouseEvent) {
    if (get(prefersReducedMotion) || !container) return;
    const r = container.getBoundingClientRect();
    mx = (e.clientX - r.left) / r.width;
    my = (e.clientY - r.top) / r.height;
  }

  const dx = $derived((mx - 0.5) * 40);
  const dy = $derived((my - 0.5) * 40);

  function topoPaths() {
    const lines: { d: string }[] = [];
    const lineCount = 12;
    for (let i = 0; i < lineCount; i++) {
      const yBase = 15 + i * 7;
      const amplitude = 8 + Math.sin(i * 0.5) * 4;
      const frequency = 0.8 + (i % 3) * 0.2;
      const phase = i * 30;
      let pathD = `M -5 ${yBase}`;
      for (let x = 0; x <= 110; x += 5) {
        const wave1 = Math.sin((x + phase) * frequency * 0.02) * amplitude;
        const wave2 =
          Math.sin((x + phase * 1.5) * frequency * 0.035) * (amplitude * 0.5);
        const y = yBase + wave1 + wave2;
        pathD += ` L ${x} ${y}`;
      }
      lines.push({ d: pathD });
    }
    return lines;
  }

  const mountainSilhouette = `
    M 0 100 
    L 0 85
    Q 5 82, 10 78
    L 18 70
    Q 22 68, 25 72
    L 30 68
    Q 33 65, 38 67
    L 45 55
    Q 50 48, 55 52
    L 60 45
    Q 65 40, 70 44
    L 78 35
    Q 82 30, 88 36
    L 95 30
    Q 100 25, 105 32
    L 110 100
    Z
  `;
</script>

<div
  bind:this={container}
  class="absolute inset-0 overflow-hidden"
  onmousemove={handleMove}
  role="presentation"
  data-testid="topo-background"
>
  <div
    class="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30 dark:to-muted/20"
  />

  <div
    class="absolute inset-0 will-change-transform"
    style:transform={$prefersReducedMotion
      ? "none"
      : `translate(${dx}px, ${dy}px)`}
  >
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      class="absolute inset-0 h-full w-full"
      style="min-height: 100vh"
    >
      <defs>
        <linearGradient id="topoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="hsl(var(--primary))" stop-opacity="0.05" />
          <stop offset="50%" stop-color="hsl(var(--secondary))" stop-opacity="0.03" />
          <stop offset="100%" stop-color="hsl(var(--accent))" stop-opacity="0.05" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#topoGradient)" />
      <g class="opacity-60 dark:opacity-40">
        {#each topoPaths() as line, i (i)}
          <path
            d={line.d}
            fill="none"
            stroke="currentColor"
            stroke-width="0.3"
            class="text-muted-foreground/20 dark:text-muted-foreground/15"
            stroke-linecap="round"
          />
        {/each}
      </g>
    </svg>
  </div>

  <div class="pointer-events-none absolute bottom-0 left-0 right-0 h-[30vh]">
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMax slice"
      class="absolute bottom-0 h-full w-full"
    >
      <defs>
        <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="hsl(var(--muted))" stop-opacity="0.4" />
          <stop offset="100%" stop-color="hsl(var(--muted))" stop-opacity="0.8" />
        </linearGradient>
      </defs>
      <path d={mountainSilhouette} fill="url(#mountainGradient)" class="dark:opacity-60" />
      <path
        d="M 0 100 L 0 90 Q 8 87, 15 82 L 25 75 Q 30 72, 35 76 L 42 70 Q 48 65, 55 68 L 65 58 Q 72 52, 80 56 L 90 48 Q 95 45, 100 50 L 100 100 Z"
        fill="hsl(var(--muted))"
        class="opacity-50 dark:opacity-30"
      />
    </svg>
  </div>

  <div
    class="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-1000"
    style="background: radial-gradient(ellipse at 30% 20%, hsl(var(--primary) / 0.08) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 60%, hsl(var(--secondary) / 0.06) 0%, transparent 40%),
      radial-gradient(ellipse at 90% 80%, hsl(var(--accent) / 0.05) 0%, transparent 35%)"
  />
</div>
