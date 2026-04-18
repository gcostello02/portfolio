<script lang="ts">
  import { onMount } from "svelte";
  import { Layers, FolderGit2 } from "lucide-svelte";
  import ProjectsSection from "$lib/components/sections/ProjectsSection.svelte";
  import { markVisited } from "$lib/stores/trail";
  import { getProfile } from "$lib/content";

  const profile = getProfile();

  onMount(() => markVisited("projects"));
</script>

<svelte:head>
  <title>Projects | {profile.name}</title>
  <meta
    name="description"
    content="Explore my portfolio of software projects including web applications, mobile apps, and tools."
  />
</svelte:head>

<div class="min-h-screen bg-background" data-testid="projects-page">
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
            <FolderGit2 class="h-6 w-6 text-primary" />
          </div>
          <span class="text-sm font-medium text-primary">Portfolio</span>
        </div>
        <h1 class="mb-4 text-4xl font-bold text-foreground md:text-5xl">Projects</h1>
        <p class="text-lg text-muted-foreground lg:whitespace-nowrap">
          Explore the applications and systems I've built. Each project showcases different
          skills and technologies.
        </p>
      </div>
    </div>
  </section>

  <section class="container mx-auto px-4 py-8 md:py-12">
    <ProjectsSection />
  </section>
</div>
