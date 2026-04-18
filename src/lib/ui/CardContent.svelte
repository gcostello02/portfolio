<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";

  let {
    class: klass = "",
    children,
  }: { class?: string; children?: Snippet } = $props();
</script>

<div class={cn("p-6 pt-0", klass)}>
  {@render children?.()}
</div>
