<script lang="ts">
  import {
    Building2,
    MapPin,
    Calendar,
    ChevronDown,
    ChevronUp,
  } from "lucide-svelte";
  import Card from "$lib/ui/Card.svelte";
  import CardContent from "$lib/ui/CardContent.svelte";
  import Badge from "$lib/ui/Badge.svelte";
  import Button from "$lib/ui/Button.svelte";
  import type { Experience } from "$lib/content";

  let {
    experience: exp,
    isLast,
  }: { experience: Experience; isLast: boolean } = $props();

  let expanded = $state(false);

  function initials(company: string) {
    return company
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }
</script>

<div class="relative flex gap-4" data-testid="card-experience-{exp.id}">
  <div class="flex flex-col items-center">
    <div
      class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground"
    >
      {initials(exp.company)}
    </div>
    {#if !isLast}
      <div class="mt-2 w-0.5 flex-1 bg-border"></div>
    {/if}
  </div>
  <Card class="mb-4 flex-1">
    <CardContent class="pb-4 pt-4">
      <div class="space-y-2">
        <div>
          <h4 class="font-semibold text-foreground">{exp.role}</h4>
          <div class="flex items-center gap-1 text-sm text-muted-foreground">
            <Building2 class="h-3.5 w-3.5" />
            <span>{exp.company}</span>
          </div>
        </div>
        <div class="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <div class="flex items-center gap-1">
            <Calendar class="h-3 w-3" />
            <span>{exp.dates}</span>
          </div>
          <div class="flex items-center gap-1">
            <MapPin class="h-3 w-3" />
            <span>{exp.location}</span>
          </div>
        </div>
        {#if exp.description.length > 0}
          <div
            class="space-y-1.5 overflow-hidden transition-all duration-300 {expanded
              ? 'max-h-96'
              : 'max-h-12'}"
          >
            {#each exp.description as line, i (i)}
              <p class="text-sm leading-relaxed text-muted-foreground">• {line}</p>
            {/each}
          </div>
          {#if exp.description.length > 1}
            <Button
              variant="ghost"
              size="sm"
              class="mt-1 w-full"
              onclick={() => (expanded = !expanded)}
              data-testid="button-experience-expand-{exp.id}"
            >
              {#if expanded}
                <ChevronUp class="mr-1 h-4 w-4" />
                Show less
              {:else}
                <ChevronDown class="mr-1 h-4 w-4" />
                Show more
              {/if}
            </Button>
          {/if}
        {/if}
        {#if exp.technologies.length > 0}
          <div class="flex flex-wrap gap-1 pt-2">
            {#each exp.technologies as tech (tech)}
              <Badge variant="outline" class="text-xs">{tech}</Badge>
            {/each}
          </div>
        {/if}
      </div>
    </CardContent>
  </Card>
</div>
