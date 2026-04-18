<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    Trophy,
    Download,
    Mail,
    GraduationCap,
    Briefcase,
    Code,
    Users,
    Github,
    Linkedin,
  } from "lucide-svelte";
  import Button from "$lib/ui/Button.svelte";
  import Card from "$lib/ui/Card.svelte";
  import { getProfile } from "$lib/content";

  let {
    open = $bindable(false),
  }: { open?: boolean } = $props();

  const profile = getProfile();

  const highlights: { icon: typeof GraduationCap; text: string }[] = [
    {
      icon: GraduationCap,
      text: "UVA CS & Economics Double Major, 3.3 GPA",
    },
    { icon: Code, text: "Full-Stack Developer: React, Node, Angular, .NET" },
    {
      icon: Briefcase,
      text: "2 SWE Internships + Current Role at TruePath Vision",
    },
    {
      icon: Users,
      text: "TA Experience + Team Player (UVA Women's Basketball)",
    },
  ];
</script>

{#if open}
  <button
    type="button"
    class="fixed inset-0 z-[90] bg-background/80 backdrop-blur-sm"
    aria-label="Close"
    onclick={() => (open = false)}
  ></button>
  <div
    class="fixed left-1/2 top-1/2 z-[91] w-[min(100%-2rem,28rem)] max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border bg-card p-6 shadow-xl"
    role="dialog"
    aria-modal="true"
    data-testid="info-pack-modal"
  >
    <div class="mb-3 flex justify-center">
      <div
        class="rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-3 shadow-lg"
      >
        <Trophy class="h-8 w-8 text-white" />
      </div>
    </div>
    <h2
      class="mb-1 bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-center text-xl font-bold text-transparent"
    >
      Info Pack Unlocked
    </h2>
    <p class="mb-4 text-center text-sm text-muted-foreground">
      Thank you for exploring! Here's everything you need.
    </p>

    <Card class="mb-4 border-amber-500/20 bg-gradient-to-br from-card to-muted/30 p-4">
      <div class="mb-3 text-center">
        <h3 class="text-lg font-semibold">{profile.name}</h3>
        <p class="text-sm text-muted-foreground">{profile.title}</p>
      </div>
      <div class="space-y-2">
        {#each highlights as item, index (index)}
          {@const Icon = item.icon}
          <div class="flex items-center gap-2 text-sm">
            <Icon class="h-4 w-4 shrink-0 text-amber-500" />
            <span>{item.text}</span>
          </div>
        {/each}
      </div>
    </Card>

    <div class="space-y-3">
      <Button
        size="lg"
        class="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:opacity-90"
        href="/resume.pdf"
        data-testid="button-download-resume"
      >
        <Download class="mr-2 h-4 w-4" />
        Download Resume
      </Button>
      <div class="grid grid-cols-3 gap-2">
        <Button
          variant="outline"
          size="sm"
          class="flex-1"
          href="https://github.com/{profile.github.personal}"
          data-testid="link-github-personal"
        >
          <Github class="mr-1 h-4 w-4" />
          <span class="text-xs">Personal</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          href="https://github.com/{profile.github.work}"
          data-testid="link-github-work"
        >
          <Github class="mr-1 h-4 w-4" />
          <span class="text-xs">Work</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          href="https://{profile.linkedin}"
          data-testid="link-linkedin"
        >
          <Linkedin class="mr-1 h-4 w-4" />
          <span class="text-xs">LinkedIn</span>
        </Button>
      </div>
      <Button
        variant="secondary"
        class="w-full"
        type="button"
        onclick={() => {
          open = false;
          goto("/contact");
        }}
        data-testid="button-contact-cta"
      >
        <Mail class="mr-2 h-4 w-4" />
        Contact Grant
      </Button>
    </div>
  </div>
{/if}
