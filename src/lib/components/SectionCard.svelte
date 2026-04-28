<script lang="ts">
  import {
    GraduationCap,
    FolderOpen,
    Briefcase,
    Heart,
    Mail,
    Check,
    ChevronRight,
  } from "lucide-svelte";
  import Card from "$lib/ui/Card.svelte";

  const iconMap = {
    education: GraduationCap,
    projects: FolderOpen,
    experience: Briefcase,
    interests: Heart,
    contact: Mail,
  } as const;

  let {
    id,
    label,
    sublabel,
    iconType,
    visited,
    index = 0,
    onclick,
  }: {
    id: string;
    label: string;
    sublabel: string;
    iconType: keyof typeof iconMap;
    visited: boolean;
    index?: number;
    onclick: () => void;
  } = $props();

  const Icon = iconMap[iconType];
</script>

<div data-testid="section-card-{id}">
  <button
    type="button"
    class="w-full rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    onclick={() => onclick()}
    aria-label="{label} — {sublabel}{visited ? ' (visited)' : ''}"
    data-testid="button-section-{id}"
  >
    <Card
      class="relative cursor-pointer overflow-hidden p-4 transition-all duration-200 hover-elevate {visited
        ? 'border-primary/20 bg-primary/5 card-visited'
        : 'border-border/50 bg-card/80 backdrop-blur-sm card-default'}"
    >
      <div class="flex items-center gap-4">
        <div
          class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg transition-colors duration-200 {visited
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted/80 text-muted-foreground'}"
        >
          {#if visited}
            <Check class="h-5 w-5" strokeWidth={3} />
          {:else}
            <Icon class="h-5 w-5" />
          {/if}
        </div>
        <div class="min-w-0 flex-1">
          <p
            class="text-base font-semibold {visited ? 'text-primary' : 'text-foreground'}"
          >
            {label}
          </p>
          <p class="text-sm text-muted-foreground">{sublabel}</p>
        </div>
        <ChevronRight
          class="h-5 w-5 flex-shrink-0 transition-transform {visited
            ? 'text-primary/60'
            : 'text-muted-foreground/40'}"
        />
      </div>
    </Card>
  </button>
</div>

<style>
  :global(.card-visited) {
    box-shadow: 0 4px 20px -4px hsl(var(--primary) / 0.15);
  }
  :global(.card-default) {
    box-shadow: 0 4px 16px -4px hsl(var(--foreground) / 0.08);
  }
</style>
