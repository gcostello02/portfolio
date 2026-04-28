<script lang="ts">
  import { browser } from "$app/environment";
  import { afterNavigate } from "$app/navigation";
  import { onMount } from "svelte";
  import "../app.css";
  import Header from "$lib/components/Header.svelte";
  import TrailProgress from "$lib/components/TrailProgress.svelte";
  import InfoPackTrigger from "$lib/components/InfoPackTrigger.svelte";
  import { scheduleRoutePrefetch } from "$lib/prefetch";
  import { getProfile } from "$lib/content";

  const profile = getProfile();

  let { children } = $props();

  onMount(() => scheduleRoutePrefetch());

  afterNavigate(() => {
    if (!browser) return;
    const hash = window.location.hash;
    if (hash) {
      queueMicrotask(() =>
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }),
      );
    }
  });
</script>

<svelte:head>
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={profile.name} />
  <meta property="og:image" content="https://gcostello.com/rotunda.png" />
  <meta name="twitter:card" content="summary" />
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.title,
      description: profile.summary.split("\n")[0],
      email: `mailto:${profile.email}`,
      sameAs: [
        `https://github.com/${profile.github.personal}`,
        `https://${profile.linkedin}`,
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "University of Virginia",
      },
      knowsAbout: [
        "Software Engineering",
        "Web Development",
        "JavaScript",
        "Python",
        "Computer Science",
        "Economics",
      ],
    })}
  </script>
</svelte:head>

<div class="min-h-screen bg-background">
  <Header />
  <main class="pt-16">
    {@render children()}
  </main>
  <div class="fixed right-4 top-20 z-50">
    <div
      class="rounded-lg border border-border/50 bg-card/90 p-3 shadow-lg backdrop-blur-md"
    >
      <TrailProgress />
    </div>
  </div>
  <InfoPackTrigger />
</div>
