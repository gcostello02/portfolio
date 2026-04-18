<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";

  let {
    class: klass = "",
    tag = "h3",
    children,
  }: { class?: string; tag?: string; children?: Snippet } = $props();
</script>

<svelte:element
  this={tag}
  class={cn("text-2xl font-semibold leading-none tracking-tight", klass)}
>
  {@render children?.()}
</svelte:element>
