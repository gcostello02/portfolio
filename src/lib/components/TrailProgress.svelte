<script lang="ts">
  import { MapPin, Lock, Trophy } from "lucide-svelte";
  import {
    trailProgress,
    TRAIL_STOPS,
    UNLOCK_THRESHOLD,
  } from "$lib/stores/trail";

  const visitedCount = $derived($trailProgress.visited.length);
  const totalStops = $derived(TRAIL_STOPS.length);
  const unlocked = $derived($trailProgress.visited.length >= UNLOCK_THRESHOLD);

  function dotClass(stopId: (typeof TRAIL_STOPS)[number]["id"]) {
    const v = $trailProgress.visited.includes(stopId);
    if (v && unlocked) return "border-amber-500 bg-amber-500";
    if (v) return "border-primary bg-primary";
    return "border-border bg-muted";
  }

  function isVisited(stopId: (typeof TRAIL_STOPS)[number]["id"]) {
    return $trailProgress.visited.includes(stopId);
  }
</script>

<div
  class="flex flex-col gap-1.5 transition-all duration-300 {unlocked
    ? 'ring-2 rounded-lg bg-gradient-to-r from-amber-400/10 to-amber-600/10 p-1.5 -m-1.5 ring-amber-400/50'
    : ''}"
  data-testid="trail-progress-widget"
>
  <div class="flex items-center gap-2">
    <div class="flex items-center gap-1.5">
      <MapPin class="h-4 w-4 {unlocked ? 'text-amber-500' : 'text-primary'}" />
      <span class="text-xs font-medium text-muted-foreground">
        Visited {visitedCount}/{totalStops}
      </span>
    </div>
    <div class="flex items-center gap-1">
      {#each TRAIL_STOPS as stop, index (stop.id)}
        <div
          class="h-2.5 w-2.5 rounded-full border transition-colors {dotClass(stop.id)}"
          data-testid="trail-dot-{stop.id}"
          title="{stop.label}{isVisited(stop.id) ? ' (visited)' : ''}"
          aria-label="{stop.label}: {isVisited(stop.id) ? 'visited' : 'not visited'}"
        ></div>
      {/each}
    </div>
    {#if visitedCount >= 3}
      <div class="ml-1" data-testid="trail-unlock-indicator">
        {#if unlocked}
          <Trophy class="h-3.5 w-3.5 text-amber-500" />
        {:else}
          <Lock class="h-3.5 w-3.5 text-muted-foreground" />
        {/if}
      </div>
    {/if}
  </div>
  {#if unlocked}
    <div class="flex items-center justify-center gap-1">
      <Trophy class="h-3 w-3 text-amber-500" />
      <span class="text-[10px] font-medium text-amber-600 dark:text-amber-400"
        >Info Pack Unlocked!</span
      >
    </div>
  {/if}
</div>
