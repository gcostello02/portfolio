<script lang="ts">
  import { onMount } from "svelte";
  import { Layers, GraduationCap } from "lucide-svelte";
  import EducationSection from "$lib/components/sections/EducationSection.svelte";
  import { markVisited } from "$lib/stores/trail";
  import { getEducation, getProfile } from "$lib/content";

  const profile = getProfile();
  const education = getEducation();

  onMount(() => markVisited("education"));
</script>

<svelte:head>
  <title>Education | {profile.name}</title>
  <meta
    name="description"
    content="{education.school} — {education.degrees
      .map((d) => `${d.type} in ${d.field}`)
      .join(' & ')}. Class of {education.graduationYear}."
  />
  <meta property="og:title" content="Education | {profile.name}" />
  <meta property="og:description" content="{education.school} — {education.degrees.map((d) => `${d.type} in ${d.field}`).join(' & ')}. Class of {education.graduationYear}." />
  <meta property="og:url" content="https://gcostello.com/education" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Education | {profile.name}" />
  <meta name="twitter:description" content="{education.school} — {education.degrees.map((d) => `${d.type} in ${d.field}`).join(' & ')}. Class of {education.graduationYear}." />
</svelte:head>

<div class="min-h-screen bg-background" data-testid="education-page">
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
            <GraduationCap class="h-6 w-6 text-primary" />
          </div>
          <span class="text-sm font-medium text-primary">Education</span>
        </div>
        <h1 class="mb-4 text-4xl font-bold text-foreground md:text-5xl">
          {education.school}
        </h1>
        <p class="text-lg text-muted-foreground lg:whitespace-nowrap">
          {education.degrees.map((d) => `${d.type} in ${d.field}`).join(" & ")} — {education.graduationDate}
        </p>
      </div>
    </div>
  </section>

  <section class="container mx-auto px-4 py-4">
    <div class="mx-auto max-w-2xl">
      <EducationSection />
    </div>
  </section>
</div>
