<script lang="ts">
  import ExperienceCard from "$lib/components/ExperienceCard.svelte";
  import { getExperience } from "$lib/content";

  const experience = getExperience();
</script>

<div class="space-y-4 pt-2" data-testid="experience-section">
  {#each experience as exp, index (exp.id)}
    <ExperienceCard experience={exp} isLast={index === experience.length - 1} />
  {/each}
</div>
