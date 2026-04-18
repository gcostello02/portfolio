<script lang="ts">
  import { browser } from "$app/environment";
  import { X, ChevronLeft, ChevronRight } from "lucide-svelte";
  import Button from "$lib/ui/Button.svelte";
  import type { ProjectMedia } from "$lib/content";

  let {
    open = $bindable(false),
    media,
    currentIndex = $bindable(0),
  }: {
    open?: boolean;
    media: ProjectMedia[];
    currentIndex?: number;
  } = $props();

  function prev() {
    currentIndex =
      currentIndex > 0 ? currentIndex - 1 : media.length - 1;
  }

  function next() {
    currentIndex =
      currentIndex < media.length - 1 ? currentIndex + 1 : 0;
  }

  function onKey(e: KeyboardEvent) {
    if (!open) return;
    if (e.key === "Escape") open = false;
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  }

  $effect(() => {
    if (!browser) return;
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      if (browser) document.body.style.overflow = "";
    };
  });

  $effect(() => {
    if (!browser) return;
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function youtubeEmbed(url: string) {
    const videoId = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/,
    )?.[1];
    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1`
      : url;
  }

  const current = $derived(media[currentIndex]);
</script>

{#if open && current}
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center"
    data-testid="image-lightbox"
  >
    <button
      type="button"
      class="absolute inset-0 bg-black/90"
      aria-label="Close lightbox"
      onclick={() => (open = false)}
    ></button>
    <Button
      variant="ghost"
      size="icon"
      class="absolute right-4 top-4 z-10 text-white hover:bg-white/20"
      onclick={() => (open = false)}
      data-testid="button-lightbox-close"
    >
      <X class="h-6 w-6" />
    </Button>
    {#if media.length > 1}
      <Button
        variant="ghost"
        size="icon"
        class="absolute left-4 z-10 text-white hover:bg-white/20"
        onclick={prev}
        data-testid="button-lightbox-previous"
      >
        <ChevronLeft class="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        class="absolute right-4 z-10 text-white hover:bg-white/20"
        onclick={next}
        data-testid="button-lightbox-next"
      >
        <ChevronRight class="h-8 w-8" />
      </Button>
    {/if}
    <div
      class="relative z-10 flex max-h-[100vh] max-w-[100vw] flex-col items-center p-4"
    >
      {#if current.type === "video"}
        <video
          src={current.url}
          controls
          muted
          playsinline
          preload="metadata"
          class="max-h-[85vh] max-w-full rounded-lg"
          data-testid="video-lightbox-player"
        ></video>
      {:else if current.type === "youtube"}
        <iframe
          src={youtubeEmbed(current.url)}
          class="h-[45vw] max-h-[675px] w-[80vw] max-w-[1200px] rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          title="YouTube"
          data-testid="youtube-lightbox-player"
        ></iframe>
      {:else if current.type === "iframe"}
        <iframe
          src={current.url}
          class="h-[80vh] w-[90vw] max-w-[1400px] rounded-lg bg-white"
          title="Embed"
          data-testid="iframe-lightbox-player"
        ></iframe>
      {:else}
        <img
          src={current.url}
          alt={current.caption || `Media ${currentIndex + 1}`}
          class="max-h-[85vh] max-w-full rounded-lg object-contain"
          data-testid="image-lightbox-display"
        />
      {/if}
      {#if current.caption}
        <p class="mt-3 max-w-lg text-center text-sm text-white/80">
          {current.caption}
        </p>
      {/if}
    </div>
    {#if media.length > 1}
      <div
        class="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2"
      >
        {#each media as _, index (index)}
          <button
            type="button"
            class="h-2 w-2 rounded-full transition-colors {index === currentIndex
              ? 'bg-white'
              : 'bg-white/40 hover:bg-white/60'}"
            onclick={() => (currentIndex = index)}
            data-testid="button-lightbox-dot-{index}"
            aria-label="Go to slide {index + 1}"
          ></button>
        {/each}
      </div>
    {/if}
  </div>
{/if}
