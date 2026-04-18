<script lang="ts">
  import { cn } from "$lib/utils";
  let { class: klass = "" }: { class?: string } = $props();
</script>

<div class={cn("p-6 pt-0", klass)}>
  <slot />
</div>
