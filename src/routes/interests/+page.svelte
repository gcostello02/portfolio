<script lang="ts">
  import { onMount } from "svelte";
  import { Layers, Flame } from "lucide-svelte";
  import InterestsSection from "$lib/components/sections/InterestsSection.svelte";
  import { markVisited } from "$lib/stores/trail";
  import { getProfile } from "$lib/content";

  const profile = getProfile();

  onMount(() => markVisited("interests"));
</script>

<svelte:head>
  <title>Interests | {profile.name}</title>
  <meta
    name="description"
    content="Beyond software development — sports, teaching, and activities that keep me balanced."
  />
</svelte:head>

<div class="min-h-screen bg-background" data-testid="interests-page">
  <section
    class="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-10"
  >
    <div class="absolute inset-0 opacity-5">
      <div class="absolute left-10 top-10">
        <Layers class="h-32 w-32 text-primary" />
      </div>
      <div class="absolute bottom-10 right-10">
        <Layers class="h-24 w-24 text-secondary" />
      </div>
    </div>
    <div class="container relative z-10 mx-auto px-4">
      <div class="max-w-2xl lg:max-w-none">
        <div class="mb-4 flex items-center gap-3">
          <div class="rounded-lg bg-primary/10 p-2">
            <Flame class="h-6 w-6 text-primary" />
          </div>
          <span class="text-sm font-medium text-primary">Personal Life</span>
        </div>
        <h1 class="mb-4 text-4xl font-bold text-foreground md:text-5xl">Interests</h1>
        <p class="text-lg text-muted-foreground lg:whitespace-nowrap">
          Discover my passions beyond software development.
        </p>
      </div>
    </div>
  </section>

  <section class="container mx-auto px-4 py-4">
    <InterestsSection />
  </section>
</div>
