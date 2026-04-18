<script lang="ts">
  import { goto } from "$app/navigation";
  import { MapPin, Briefcase } from "lucide-svelte";
  import TopoBackground from "$lib/components/TopoBackground.svelte";
  import SectionCard from "$lib/components/SectionCard.svelte";
  import type { SectionIconType } from "$lib/types/section-card";
  import { markVisited } from "$lib/stores/trail";
  import { getProfile } from "$lib/content";
  import Button from "$lib/ui/Button.svelte";
  import { trailProgress } from "$lib/stores/trail";

  const profile = getProfile();

  const SECTIONS: {
    id: SectionIconType;
    label: string;
    sublabel: string;
    iconType: SectionIconType;
  }[] = [
    {
      id: "education",
      label: "Education",
      sublabel: "Degrees & Courses",
      iconType: "education",
    },
    {
      id: "projects",
      label: "Projects",
      sublabel: "View my work",
      iconType: "projects",
    },
    {
      id: "experience",
      label: "Experience",
      sublabel: "Career history",
      iconType: "experience",
    },
    {
      id: "interests",
      label: "Interests",
      sublabel: "Beyond code",
      iconType: "interests",
    },
    {
      id: "contact",
      label: "Contact",
      sublabel: "Get in touch",
      iconType: "contact",
    },
  ];

  const SECTION_ROUTES: Record<string, string> = {
    education: "/education",
    projects: "/projects",
    experience: "/experience",
    interests: "/interests",
    contact: "/contact",
  };

  function handleCard(id: string) {
    markVisited(id as "education" | "projects" | "experience" | "interests" | "contact");
    const route = SECTION_ROUTES[id];
    if (route) goto(route);
  }
</script>

<svelte:head>
  <title>Home | {profile.name}</title>
  <meta
    name="description"
    content="{profile.name} - {profile.title}. {profile.tagline}. Explore my portfolio including projects, experience, and education."
  />
  <meta
    name="keywords"
    content="{profile.name}, software engineer, portfolio, UVA, computer science, economics, web development, JavaScript, Python"
  />
  <meta property="og:title" content="Home | {profile.name}" />
  <meta
    property="og:description"
    content="{profile.name} - {profile.title}. {profile.tagline}."
  />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="relative min-h-screen overflow-hidden" data-testid="home-page">
  <TopoBackground />

  <div class="relative z-10">
    <section
      class="flex min-h-[40vh] flex-col items-center justify-center px-4 pb-4 pt-8 sm:min-h-[35vh] sm:pt-12"
    >
      <div class="mx-auto max-w-2xl text-center">
        <div
          class="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary"
        >
          <Briefcase class="h-4 w-4" />
          <span class="text-sm font-medium">Software Engineer</span>
        </div>

        <h1 class="mb-4 text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
          {profile.name}
        </h1>

        <p class="mx-auto mb-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
          {profile.tagline}
        </p>

        <div
          class="flex items-center justify-center gap-4 text-sm text-muted-foreground"
        >
          <div class="flex items-center gap-1.5">
            <MapPin class="h-4 w-4" />
            <span>{profile.location}</span>
          </div>
          <span class="text-border">|</span>
          <div class="flex items-center gap-1.5">
            <Briefcase class="h-4 w-4" />
            <span>{profile.title}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="relative py-8 sm:py-4">
      <div class="container mx-auto px-4">
        <div class="mb-8 text-center">
          <h2 class="mb-2 text-xl font-semibold text-foreground sm:text-2xl">
            Explore My Portfolio
          </h2>
          <p class="text-sm text-muted-foreground sm:text-base">
            Click each section to learn more
          </p>
        </div>

        <div
          class="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6"
        >
          {#each SECTIONS as section, index (section.id)}
            <div
              class={index < 3
                ? "lg:col-span-2"
                : index === 3
                  ? "lg:col-start-2 lg:col-span-2"
                  : "lg:col-start-4 lg:col-span-2"}
            >
              <SectionCard
                id={section.id}
                label={section.label}
                sublabel={section.sublabel}
                iconType={section.iconType}
                visited={$trailProgress.visited.includes(
                  section.id as "education" | "projects" | "experience" | "interests" | "contact",
                )}
                {index}
                onclick={() => handleCard(section.id)}
              />
            </div>
          {/each}
        </div>
      </div>
    </section>

    <section class="relative px-4 py-16">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
          Let's Connect
        </h2>
        <p class="mb-8 leading-relaxed text-muted-foreground">
          {profile.summary.split("\n")[0]}
        </p>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            onclick={() => handleCard("projects")}
            data-testid="button-view-projects"
          >
            View Projects
          </Button>
          <Button
            variant="outline"
            size="lg"
            onclick={() => handleCard("contact")}
            data-testid="button-contact"
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  </div>
</div>
