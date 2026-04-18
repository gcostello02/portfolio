<script lang="ts">
  import { Moon, Sun } from "lucide-svelte";
  import Button from "$lib/ui/Button.svelte";
  import { themeStore, toggleTheme } from "$lib/stores/theme";
</script>

<Button
  variant="ghost"
  size="icon"
  class="h-9 w-9"
  onclick={() => toggleTheme()}
  aria-label="Toggle theme"
  data-testid="button-theme-toggle"
>
  {#if $themeStore === "dark"}
    <Sun class="h-4 w-4" />
  {:else}
    <Moon class="h-4 w-4" />
  {/if}
</Button>
