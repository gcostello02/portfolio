<script lang="ts">
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import { getProjects } from "$lib/content";

  const projects = getProjects();
</script>

<div class="space-y-4" data-testid="projects-section">
  <div class="grid gap-4 lg:grid-cols-2">
    {#each projects as project (project.id)}
      <ProjectCard {project} />
    {/each}
  </div>
</div>
