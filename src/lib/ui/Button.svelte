<script lang="ts">
  import { cn } from "$lib/utils";

  type Variant = "default" | "outline" | "ghost" | "destructive" | "secondary";
  type Size = "default" | "sm" | "lg" | "icon";

  let {
    variant = "default",
    size = "default",
    href = undefined as string | undefined,
    type = "button",
    disabled = false,
    class: klass = "",
    target = undefined as string | undefined,
    rel = undefined as string | undefined,
  }: {
    variant?: Variant;
    size?: Size;
    href?: string;
    type?: "button" | "submit";
    disabled?: boolean;
    class?: string;
    target?: string;
    rel?: string;
  } = $props();

  const variants: Record<Variant, string> = {
    default: "bg-primary text-primary-foreground hover:opacity-90",
    destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
    outline:
      "border border-border bg-background hover:bg-muted hover:text-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
    ghost: "hover:bg-muted hover:text-foreground",
  };

  const sizes: Record<Size, string> = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3 text-xs",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  const cls = cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    klass,
  );
</script>

{#if href}
  <a
    {href}
    class={cls}
    target={target ?? (href.startsWith("http") ? "_blank" : undefined)}
    rel={rel ?? (href.startsWith("http") ? "noopener noreferrer" : undefined)}
  >
    <slot />
  </a>
{:else}
  <button {type} {disabled} class={cls}>
    <slot />
  </button>
{/if}
