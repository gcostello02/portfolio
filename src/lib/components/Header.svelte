<script lang="ts">
  import { page } from "$app/stores";
  import {
    Menu,
    Github,
    FileText,
    ExternalLink,
    ChevronDown,
  } from "lucide-svelte";
  import Button from "$lib/ui/Button.svelte";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";
  import CommandPalette from "$lib/components/CommandPalette.svelte";
  import TrailProgress from "$lib/components/TrailProgress.svelte";

  const NAV_LINKS = [
    { label: "Home", path: "/" },
    { label: "Education", path: "/education" },
    { label: "Experience", path: "/experience" },
    { label: "Projects", path: "/projects" },
    { label: "Interests", path: "/interests" },
    { label: "Contact", path: "/contact" },
  ];

  const GITHUB_ACCOUNTS = [
    {
      id: "personal",
      label: "Personal",
      username: "gcostello02",
      url: "https://github.com/gcostello02",
    },
    {
      id: "work",
      label: "Work (TruePath)",
      username: "gcostello02-tpv",
      url: "https://github.com/gcostello02-tpv",
    },
  ];

  let mobileOpen = $state(false);
  let commandOpen = $state(false);
  let ghOpen = $state(false);

  const path = $derived($page.url.pathname);
</script>

<header
  class="fixed left-0 right-0 top-0 z-50 border-b bg-background/80 backdrop-blur-md"
  data-testid="header"
>
  <div class="container mx-auto px-4">
    <div class="flex h-16 items-center justify-between gap-4">
      <a
        href="/"
        class="hover-elevate -ml-2 flex items-center gap-2 rounded-md px-2 py-1 text-lg font-semibold"
        data-testid="link-logo"
      >
        <img src="/rotunda.png" alt="Grant Costello logo" class="h-6 w-6" />
        <span>Grant Costello</span>
      </a>

      <nav class="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
        {#each NAV_LINKS as link (link.path)}
          <a
            href={link.path}
            class="rounded-md px-3 py-2 text-sm font-medium transition-colors hover-elevate {path === link.path
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground'}"
            data-testid="link-nav-{link.label.toLowerCase()}"
            aria-current={path === link.path ? "page" : undefined}
          >
            {link.label}
          </a>
        {/each}
      </nav>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="hover-elevate hidden items-center gap-2 rounded-md border px-3 py-1.5 text-sm text-muted-foreground transition-colors md:flex"
          onclick={() => (commandOpen = true)}
          data-testid="button-command-trigger"
          aria-label="Open command palette"
        >
          <span class="text-muted-foreground">⌘</span>
          <span>Search...</span>
        </button>

        <div class="relative hidden sm:block">
          <Button
            variant="ghost"
            size="sm"
            class="hidden items-center gap-1 sm:flex"
            onclick={() => (ghOpen = !ghOpen)}
            data-testid="button-github-dropdown"
          >
            <Github class="h-4 w-4" />
            <span class="hidden md:inline">GitHub</span>
            <ChevronDown class="h-3 w-3" />
          </Button>
          {#if ghOpen}
            <div
              class="absolute right-0 z-50 mt-1 w-56 rounded-md border bg-popover p-1 shadow-md"
              role="menu"
            >
              <p class="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                GitHub Accounts
              </p>
              {#each GITHUB_ACCOUNTS as account (account.id)}
                <a
                  href={account.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex cursor-pointer items-center justify-between rounded-sm px-2 py-2 text-sm hover:bg-muted"
                  data-testid="menu-item-github-{account.id}"
                  onclick={() => (ghOpen = false)}
                >
                  <div class="flex flex-col">
                    <span>{account.label}</span>
                    <span class="text-xs text-muted-foreground"
                      >@{account.username}</span
                    >
                  </div>
                  <ExternalLink class="h-3.5 w-3.5 text-muted-foreground" />
                </a>
              {/each}
            </div>
          {/if}
        </div>

        <Button variant="outline" size="sm" class="hidden sm:flex" href="/resume.pdf">
          <FileText class="mr-1.5 h-4 w-4" />
          Resume
        </Button>

        <ThemeToggle />

        <Button
          variant="ghost"
          size="icon"
          class="lg:hidden"
          onclick={() => (mobileOpen = true)}
          data-testid="button-mobile-menu"
          aria-label="Open navigation menu"
        >
          <Menu class="h-5 w-5" />
        </Button>
      </div>
    </div>
  </div>
</header>

{#if mobileOpen}
  <button
    type="button"
    class="fixed inset-0 z-40 bg-background/80 lg:hidden"
    aria-label="Close menu"
    onclick={() => (mobileOpen = false)}
  ></button>
  <div
    class="fixed bottom-0 right-0 top-0 z-50 flex w-80 flex-col border-l bg-background p-4 shadow-lg lg:hidden"
  >
    <div class="mb-4 flex items-center gap-2 border-b pb-4">
      <img src="/rotunda.png" alt="" class="h-5 w-5" />
      <span class="font-semibold">Navigation</span>
      <button
        type="button"
        class="ml-auto text-sm text-muted-foreground"
        onclick={() => (mobileOpen = false)}
      >
        Close
      </button>
    </div>
    <nav class="flex flex-col gap-2" aria-label="Mobile navigation">
      {#each NAV_LINKS as link (link.path)}
        <a
          href={link.path}
          class="rounded-md px-4 py-3 text-sm font-medium transition-colors hover-elevate {path === link.path
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground'}"
          data-testid="link-mobile-nav-{link.label.toLowerCase()}"
          onclick={() => (mobileOpen = false)}
        >
          {link.label}
        </a>
      {/each}
      <div class="my-4 border-t" />
      <p class="mb-3 px-4 text-xs font-medium text-muted-foreground">GitHub</p>
      {#each GITHUB_ACCOUNTS as account (account.id)}
        <a
          href={account.url}
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-between rounded-md px-4 py-2 text-sm hover-elevate"
          data-testid="link-mobile-github-{account.id}"
        >
          <span class="flex items-center gap-2">
            <Github class="h-4 w-4" />
            {account.label}
          </span>
          <ExternalLink class="h-3.5 w-3.5" />
        </a>
      {/each}
      <div class="my-2 border-t" />
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 rounded-md px-4 py-3 text-sm font-medium hover-elevate"
        data-testid="link-mobile-resume"
      >
        <FileText class="h-4 w-4" />
        View Resume
      </a>
      <div class="my-4 border-t" />
      <div class="px-4">
        <TrailProgress />
      </div>
    </nav>
  </div>
{/if}

<CommandPalette bind:open={commandOpen} />

{#if ghOpen}
  <button
    type="button"
    class="fixed inset-0 z-40"
    aria-hidden="true"
    onclick={() => (ghOpen = false)}
  ></button>
{/if}
