<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";

  type Variant = "default" | "secondary" | "outline" | "destructive";

  let {
    variant = "default",
    class: klass = "",
    children,
  }: { variant?: Variant; class?: string; children?: Snippet } = $props();

  const variants: Record<Variant, string> = {
    default: "border-transparent bg-primary text-primary-foreground",
    secondary: "border-transparent bg-secondary text-secondary-foreground",
    destructive:
      "border-transparent bg-destructive text-destructive-foreground",
    outline: "text-foreground border-border",
  };
</script>

<span
  class={cn(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
    variants[variant],
    klass,
  )}
>
  {@render children?.()}
</span>
