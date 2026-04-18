<script lang="ts">
  import { cn } from "$lib/utils";
  let { class: klass = "", tag = "h3" }: { class?: string; tag?: string } = $props();
</script>

<svelte:element
  this={tag}
  class={cn("text-2xl font-semibold leading-none tracking-tight", klass)}
>
  <slot />
</svelte:element>
