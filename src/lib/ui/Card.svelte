<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";

  let {
    class: klass = "",
    children,
    ...rest
  }: {
    class?: string;
    children?: Snippet;
  } & Omit<HTMLAttributes<HTMLDivElement>, "class"> = $props();
</script>

<div
  class={cn(
    "rounded-xl border border-card-border bg-card text-card-foreground shadow-sm",
    klass,
  )}
  {...rest}
>
  {@render children?.()}
</div>
