<script lang="ts">
  import { Lock, Unlock } from "lucide-svelte";
  import Button from "$lib/ui/Button.svelte";
  import { trailProgress, UNLOCK_THRESHOLD } from "$lib/stores/trail";
  import InfoPack from "$lib/components/InfoPack.svelte";

  let modalOpen = $state(false);

  const visitedCount = $derived($trailProgress.visited.length);
  const unlocked = $derived($trailProgress.visited.length >= UNLOCK_THRESHOLD);
  const stopsNeeded = $derived(Math.max(0, UNLOCK_THRESHOLD - visitedCount));

  function onClick() {
    if (unlocked) modalOpen = true;
  }
</script>

<div class="fixed bottom-6 right-6 z-40" data-testid="button-info-pack-trigger">
  <Button
    size="lg"
    class="relative overflow-visible shadow-lg {unlocked
      ? 'border-amber-400 bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:opacity-90'
      : 'cursor-not-allowed bg-muted text-muted-foreground'}"
    disabled={!unlocked}
    onclick={onClick}
  >
    {#if unlocked}
      <Unlock class="mr-2 h-4 w-4" />
      <span>Info Pack</span>
    {:else}
      <Lock class="mr-2 h-4 w-4" />
      <span>Locked</span>
    {/if}
  </Button>
</div>

<InfoPack bind:open={modalOpen} />

{#if !unlocked}
  <p class="sr-only">
    Visit {stopsNeeded} more trail stop{stopsNeeded === 1 ? "" : "s"} to unlock the Info Pack
  </p>
{/if}
