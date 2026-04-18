<script lang="ts">
  import { GraduationCap, BookOpen, Code, MapPin } from "lucide-svelte";
  import Card from "$lib/ui/Card.svelte";
  import CardHeader from "$lib/ui/CardHeader.svelte";
  import CardContent from "$lib/ui/CardContent.svelte";
  import CardTitle from "$lib/ui/CardTitle.svelte";
  import Badge from "$lib/ui/Badge.svelte";
  import { getEducation, type Degree } from "$lib/content";

  const education = getEducation();
</script>

<div class="space-y-6" data-testid="education-section">
  <Card class="border-primary/20 bg-primary/5">
    <CardContent class="py-5">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="rounded-lg bg-primary/10 p-2.5">
            <GraduationCap class="h-6 w-6 text-primary" />
          </div>
          <div>
            <p class="text-lg font-semibold text-foreground" data-testid="text-education-school">
              {education.school}
            </p>
            <div class="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin class="h-3.5 w-3.5" />
              <span>{education.location}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          <Badge variant="default">Class of {education.graduationYear}</Badge>
          <Badge variant="outline">GPA: {education.gpa}</Badge>
        </div>
      </div>
    </CardContent>
  </Card>

  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    {#each education.degrees as degree (degree.field)}
      <div class="space-y-4">
        <Card>
          <CardHeader class="pb-3">
            <div class="flex items-center gap-2">
              <GraduationCap class="h-5 w-5 text-primary" />
              <CardTitle tag="h3" class="text-base">{degree.field}</CardTitle>
            </div>
          </CardHeader>
          <CardContent class="pt-0">
            <p class="text-sm font-medium text-foreground">{degree.type}</p>
            {#if degree.college}
              <p class="mt-1 text-xs text-muted-foreground">{degree.college}</p>
            {/if}
          </CardContent>
        </Card>

        {#if degree.courses.length > 0}
          <div class="space-y-3">
            <h4 class="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
              <BookOpen class="h-4 w-4" />
              Coursework
            </h4>
            <div class="space-y-3">
              {#each degree.courses as course (course.code)}
                <Card class="hover-elevate" data-testid="card-course-{course.code}">
                  <CardContent class="px-4 py-3">
                    <h5 class="text-sm font-medium leading-tight text-foreground">
                      {course.name}
                    </h5>
                    <p class="mt-0.5 mb-2 text-xs text-muted-foreground">{course.code}</p>
                    <p class="mb-2 text-xs text-muted-foreground">{course.description}</p>
                    <div class="mb-1.5 flex items-center gap-1">
                      <Code class="h-3 w-3 text-muted-foreground" />
                      <span class="text-xs text-muted-foreground">Skills:</span>
                    </div>
                    <div class="flex flex-wrap gap-1">
                      {#each course.skills as skill (skill)}
                        <Badge variant="secondary" class="py-0 text-xs">{skill}</Badge>
                      {/each}
                    </div>
                  </CardContent>
                </Card>
              {/each}
            </div>
          </div>
        {:else}
          <p class="text-sm italic text-muted-foreground">Coursework coming soon...</p>
        {/if}
      </div>
    {/each}
  </div>
</div>
