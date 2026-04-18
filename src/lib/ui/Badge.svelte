<script lang="ts">
  import { cn } from "$lib/utils";

  type Variant = "default" | "secondary" | "outline" | "destructive";

  let {
    variant = "default",
    class: klass = "",
  }: { variant?: Variant; class?: string } = $props();

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
  <slot />
</span>
