<script lang="ts">
  import { cn } from "$lib/utils";

  let { class: klass = "" }: { class?: string } = $props();
</script>

<div
  class={cn(
    "rounded-xl border border-card-border bg-card text-card-foreground shadow-sm",
    klass,
  )}
>
  <slot />
</div>
