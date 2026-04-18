<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import {
    Home,
    Briefcase,
    FolderGit2,
    Heart,
    Mail,
    Search,
    FileText,
  } from "lucide-svelte";
  import { getExperience, getProjects } from "$lib/content";
  import type { Component } from "svelte";

  let { open = $bindable(false) }: { open?: boolean } = $props();

  let query = $state("");

  const NAVIGATION_ITEMS: {
    id: string;
    label: string;
    path: string;
    icon: Component;
  }[] = [
    { id: "home", label: "Home", path: "/", icon: Home },
    {
      id: "experience",
      label: "Experience",
      path: "/experience",
      icon: Briefcase,
    },
    { id: "projects", label: "Projects", path: "/projects", icon: FolderGit2 },
    { id: "interests", label: "Interests", path: "/interests", icon: Heart },
    { id: "contact", label: "Contact", path: "/contact", icon: Mail },
  ];

  const experience = getExperience();
  const projects = getProjects();

  const q = $derived(query.trim().toLowerCase());

  const navFiltered = $derived(
    NAVIGATION_ITEMS.filter(
      (n) =>
        !q ||
        n.label.toLowerCase().includes(q) ||
        n.path.includes(q),
    ),
  );

  const expFiltered = $derived(
    experience.filter(
      (e) =>
        !q ||
        e.company.toLowerCase().includes(q) ||
        e.role.toLowerCase().includes(q),
    ),
  );

  const projFiltered = $derived(
    projects.filter(
      (p) =>
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q)),
    ),
  );

  function select(path: string) {
    open = false;
    query = "";
    goto(path);
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      open = !open;
    }
    if (e.key === "Escape") open = false;
  }

  onMount(() => {
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  });
</script>

{#if open}
  <button
    type="button"
    class="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
    aria-label="Close"
    onclick={() => (open = false)}
  ></button>
  <div
    class="fixed left-1/2 top-[20%] z-[101] w-[min(100%-2rem,32rem)] -translate-x-1/2 rounded-lg border bg-popover p-0 shadow-lg"
    role="dialog"
    aria-modal="true"
  >
    <div class="flex items-center border-b px-3">
      <Search class="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
      <input
        class="flex h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        placeholder="Search pages, projects, experience..."
        bind:value={query}
        data-testid="input-command-search"
      />
    </div>
    <div class="max-h-[60vh] overflow-y-auto p-2 text-sm">
      {#if navFiltered.length + expFiltered.length + projFiltered.length === 0}
        <p class="px-2 py-6 text-center text-muted-foreground">No results found.</p>
      {:else}
        {#if navFiltered.length}
          <p class="px-2 py-1 text-xs font-medium text-muted-foreground">Navigation</p>
          {#each navFiltered as item (item.id)}
            {@const Icon = item.icon}
            <button
              type="button"
              class="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-muted"
              onclick={() => select(item.path)}
              data-testid="command-item-nav-{item.id}"
            >
              <Icon class="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          {/each}
        {/if}
        {#if expFiltered.length}
          <p class="mt-2 px-2 py-1 text-xs font-medium text-muted-foreground">
            Experience
          </p>
          {#each expFiltered as exp (exp.id)}
            <button
              type="button"
              class="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-muted"
              onclick={() => select(`/experience#${exp.id}`)}
              data-testid="command-item-exp-{exp.id}"
            >
              <Briefcase class="h-4 w-4 shrink-0" />
              <span class="flex flex-col">
                <span>{exp.role}</span>
                <span class="text-xs text-muted-foreground">{exp.company}</span>
              </span>
            </button>
          {/each}
        {/if}
        {#if projFiltered.length}
          <p class="mt-2 px-2 py-1 text-xs font-medium text-muted-foreground">Projects</p>
          {#each projFiltered as project (project.id)}
            <button
              type="button"
              class="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-muted"
              onclick={() => select(`/projects#${project.id}`)}
              data-testid="command-item-proj-{project.id}"
            >
              <FolderGit2 class="h-4 w-4 shrink-0" />
              <span class="flex flex-col">
                <span>{project.title}</span>
                <span class="text-xs text-muted-foreground"
                  >{project.technologies.slice(0, 3).join(", ")}</span
                >
              </span>
            </button>
          {/each}
        {/if}
        <p class="mt-2 px-2 py-1 text-xs font-medium text-muted-foreground">
          Quick Actions
        </p>
        <button
          type="button"
          class="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-muted"
          onclick={() => {
            open = false;
            window.open("/resume.pdf", "_blank");
          }}
          data-testid="command-item-resume"
        >
          <FileText class="h-4 w-4" />
          <span>View Resume</span>
        </button>
      {/if}
    </div>
  </div>
{/if}
