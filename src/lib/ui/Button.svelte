<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";

  type Variant = "default" | "outline" | "ghost" | "destructive" | "secondary";
  type Size = "default" | "sm" | "lg" | "icon";

  type Props = {
    variant?: Variant;
    size?: Size;
    href?: string;
    class?: string;
    children?: Snippet;
  } & Omit<HTMLButtonAttributes, "class" | "href"> &
    Omit<HTMLAnchorAttributes, "class" | "href">;

  let {
    variant = "default",
    size = "default",
    href = undefined,
    type = "button",
    disabled = false,
    class: klass = "",
    target = undefined,
    rel = undefined,
    children,
    ...rest
  }: Props = $props();

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

  const cls = $derived(
    cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      variants[variant],
      sizes[size],
      klass,
    ),
  );
</script>

{#if href}
  <a
    {href}
    class={cls}
    target={target ?? (href.startsWith("http") ? "_blank" : undefined)}
    rel={rel ?? (href.startsWith("http") ? "noopener noreferrer" : undefined)}
    {...rest as HTMLAnchorAttributes}
  >
    {@render children?.()}
  </a>
{:else}
  <button
    {type}
    {disabled}
    class={cls}
    {...rest as HTMLButtonAttributes}
  >
    {@render children?.()}
  </button>
{/if}
