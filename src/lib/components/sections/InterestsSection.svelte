<script lang="ts">
  import { Heart, Users, TrendingUp, Dribbble, Calendar } from "lucide-svelte";
  import Card from "$lib/ui/Card.svelte";
  import CardHeader from "$lib/ui/CardHeader.svelte";
  import CardContent from "$lib/ui/CardContent.svelte";
  import CardTitle from "$lib/ui/CardTitle.svelte";
  import Badge from "$lib/ui/Badge.svelte";
  import { getInterests, type InterestHighlight } from "$lib/content";

  const interests = getInterests();
  const sorted = [...interests.interests].sort((a, b) => {
    if (a.id === "basketball") return -1;
    if (b.id === "basketball") return 1;
    if (a.id === "teaching") return -1;
    if (b.id === "teaching") return 1;
    return 0;
  });

  const iconMap: Record<string, typeof Heart> = {
    basketball: Dribbble,
    "trending-up": TrendingUp,
    users: Users,
    heart: Heart,
  };
</script>

{#snippet highlightCard(h: InterestHighlight)}
  <div class="border-l-2 border-primary/30 py-1 pl-3">
    <div class="flex items-start justify-between gap-2">
      <h5 class="text-sm font-medium text-foreground">{h.title}</h5>
      <Badge variant="outline" class="shrink-0 text-xs">
        <Calendar class="mr-1 h-3 w-3" />
        {h.dates}
      </Badge>
    </div>
    <p class="mt-1 text-xs text-muted-foreground">{h.description}</p>
  </div>
{/snippet}

<div class="space-y-4" data-testid="interests-section">
  <div class="grid gap-4">
    {#each sorted as interest (interest.id)}
      {@const Icon = iconMap[interest.icon.toLowerCase()] ?? Heart}
      {@const isBasketball = interest.id === "basketball"}
      <Card class={isBasketball ? "border-primary/30" : ""} data-testid="card-interest-{interest.id}">
        <CardHeader class="pb-2">
          <CardTitle tag="h3" class="flex items-center gap-2 text-base">
            <div
              class="rounded-md p-1.5 {isBasketball
                ? 'bg-primary/10 text-primary'
                : 'bg-muted text-muted-foreground'}"
            >
              <Icon class="h-4 w-4" />
            </div>
            {interest.title}
            {#if isBasketball}
              <Badge variant="default" class="ml-auto">Featured</Badge>
            {/if}
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-3">
          <p class="text-sm text-muted-foreground">{interest.description}</p>
          {#if interest.highlights.length > 0}
            <div class="space-y-3">
              {#each interest.highlights as h, i (i)}
                {@render highlightCard(h)}
              {/each}
            </div>
          {/if}
        </CardContent>
      </Card>
    {/each}
  </div>
</div>
