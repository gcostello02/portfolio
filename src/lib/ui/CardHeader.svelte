<script lang="ts">
  import { cn } from "$lib/utils";
  let { class: klass = "" }: { class?: string } = $props();
</script>

<div class={cn("flex flex-col space-y-1.5 p-6", klass)}>
  <slot />
</div>
