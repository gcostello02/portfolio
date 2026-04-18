<script lang="ts">
  import { page } from "$app/stores";
  import Button from "$lib/ui/Button.svelte";
</script>

<div class="container mx-auto flex min-h-[50vh] flex-col items-center justify-center px-4 py-16 text-center">
  <h1 class="mb-2 text-4xl font-bold">{$page.status}</h1>
  <p class="mb-6 text-muted-foreground">{$page.error?.message ?? "Page not found"}</p>
  <Button href="/">Go home</Button>
</div>
