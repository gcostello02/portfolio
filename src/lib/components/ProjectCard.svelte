<script lang="ts">
  import { ExternalLink, Calendar, Image, Play, Github } from "lucide-svelte";
  import Card from "$lib/ui/Card.svelte";
  import CardHeader from "$lib/ui/CardHeader.svelte";
  import CardContent from "$lib/ui/CardContent.svelte";
  import CardTitle from "$lib/ui/CardTitle.svelte";
  import Badge from "$lib/ui/Badge.svelte";
  import Button from "$lib/ui/Button.svelte";
  import ImageLightbox from "$lib/components/ImageLightbox.svelte";
  import type { Project } from "$lib/content";

  let { project }: { project: Project } = $props();

  let lightboxOpen = $state(false);
  let lightboxIndex = $state(0);

  const media = $derived(project.media || []);
  const imageIndex = $derived(media.findIndex((m) => m.type === "image"));
  const videoIndex = $derived(
    media.findIndex((m) => m.type === "video" || m.type === "youtube"),
  );
  const hasImage = $derived(imageIndex >= 0);
  const hasVideo = $derived(videoIndex >= 0);
  const hasCode = $derived(Boolean(project.githubUrl?.trim()));
  const hasLive = $derived(Boolean(project.demoUrl?.trim()));

  function openAt(i: number) {
    lightboxIndex = i;
    lightboxOpen = true;
  }
</script>

<Card
  class="hover-elevate flex h-full flex-col overflow-hidden"
  data-testid="card-project-{project.id}"
>
  <CardHeader class="px-6 pb-4 pt-6">
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0 flex-1">
        <CardTitle tag="h3" class="text-lg font-semibold leading-tight tracking-tight">
          {project.title}
        </CardTitle>
        <div class="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar class="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>{project.dates}</span>
        </div>
      </div>
      {#if project.featured}
        <Badge variant="default" class="shrink-0">Featured</Badge>
      {/if}
    </div>
  </CardHeader>
  <CardContent class="flex flex-1 flex-col gap-5 px-6 pb-4 pt-0">
    {#if project.description || (project.longDescription?.length ?? 0) > 0}
      <div class="space-y-2">
        {#if project.description}
          <p class="text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        {/if}
        {#if project.longDescription?.length}
          <ul class="list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted-foreground">
            {#each project.longDescription as line, i (i)}
              <li>{line}</li>
            {/each}
          </ul>
        {/if}
      </div>
    {/if}

    {#if project.technologies.length > 0}
      <div class="space-y-2">
        <span class="text-xs font-medium uppercase tracking-wide text-muted-foreground/80">
          Technologies
        </span>
        <div class="flex flex-wrap gap-1.5">
          {#each project.technologies as tech (tech)}
            <Badge variant="outline" class="text-xs font-normal">{tech}</Badge>
          {/each}
        </div>
      </div>
    {/if}

    <div class="mt-auto grid grid-cols-4 gap-2">
      <Button
        variant="outline"
        size="sm"
        class="flex h-9 min-w-0 items-center justify-center gap-1.5 px-2"
        disabled={!hasImage}
        onclick={() => hasImage && openAt(imageIndex)}
        data-testid="button-project-image-{project.id}"
      >
        <Image class="h-3.5 w-3.5 shrink-0" />
        <span class="truncate text-xs font-medium">Image</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        class="flex h-9 min-w-0 items-center justify-center gap-1.5 px-2"
        disabled={!hasVideo}
        onclick={() => hasVideo && openAt(videoIndex)}
        data-testid="button-project-video-{project.id}"
      >
        <Play class="h-3.5 w-3.5 shrink-0" />
        <span class="truncate text-xs font-medium">Video</span>
      </Button>
      {#if hasCode}
        <Button
          variant="outline"
          size="sm"
          class="flex h-9 min-w-0 items-center justify-center gap-1.5 px-2"
          href={project.githubUrl!.trim()}
          data-testid="link-project-github-{project.id}"
        >
          <Github class="h-3.5 w-3.5 shrink-0" />
          <span class="truncate text-xs font-medium">Code</span>
        </Button>
      {:else}
        <Button variant="outline" size="sm" class="h-9" disabled>Code</Button>
      {/if}
      {#if hasLive}
        <Button
          variant="outline"
          size="sm"
          class="flex h-9 min-w-0 items-center justify-center gap-1.5 px-2"
          href={project.demoUrl!.trim()}
          data-testid="link-project-demo-{project.id}"
        >
          <ExternalLink class="h-3.5 w-3.5 shrink-0" />
          <span class="truncate text-xs font-medium">Live site</span>
        </Button>
      {:else}
        <Button variant="outline" size="sm" class="h-9" disabled>Live site</Button>
      {/if}
    </div>
  </CardContent>
</Card>

{#if media.length > 0}
  <ImageLightbox
    bind:open={lightboxOpen}
    {media}
    bind:currentIndex={lightboxIndex}
  />
{/if}
