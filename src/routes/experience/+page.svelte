<script lang="ts">
  import { onMount } from "svelte";
  import { Layers, TrendingUp } from "lucide-svelte";
  import ExperienceSection from "$lib/components/sections/ExperienceSection.svelte";
  import { markVisited } from "$lib/stores/trail";
  import { getProfile } from "$lib/content";

  const profile = getProfile();

  onMount(() => markVisited("experience"));
</script>

<svelte:head>
  <title>Experience | {profile.name}</title>
  <meta
    name="description"
    content="My professional journey in software engineering — internships to full-time roles."
  />
  <meta property="og:title" content="Experience | {profile.name}" />
  <meta property="og:description" content="My professional journey in software engineering — internships to full-time roles." />
  <meta property="og:url" content="https://gcostello.com/experience" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Experience | {profile.name}" />
  <meta name="twitter:description" content="My professional journey in software engineering — internships to full-time roles." />
</svelte:head>

<div class="min-h-screen bg-background" data-testid="experience-page">
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
            <TrendingUp class="h-6 w-6 text-primary" />
          </div>
          <span class="text-sm font-medium text-primary">Career History</span>
        </div>
        <h1 class="mb-4 text-4xl font-bold text-foreground md:text-5xl">Experience</h1>
        <p class="text-lg text-muted-foreground lg:whitespace-nowrap">
          My professional growth from internships to my current role.
        </p>
      </div>
    </div>
  </section>

  <section class="container mx-auto px-4 py-4">
    <ExperienceSection />
  </section>
</div>
