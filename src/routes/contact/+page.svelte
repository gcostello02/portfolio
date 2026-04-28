<script lang="ts">
  import { onMount } from "svelte";
  import ContactSection from "$lib/components/sections/ContactSection.svelte";
  import { markVisited } from "$lib/stores/trail";
  import { getProfile } from "$lib/content";

  const profile = getProfile();

  onMount(() => markVisited("contact"));
</script>

<svelte:head>
  <title>Contact | {profile.name}</title>
  <meta
    name="description"
    content="Get in touch with {profile.name}. Connect via email, LinkedIn, or GitHub."
  />
  <meta property="og:title" content="Contact | {profile.name}" />
  <meta property="og:description" content="Get in touch with {profile.name}. Connect via email, LinkedIn, or GitHub." />
  <meta property="og:url" content="https://gcostello.com/contact" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Contact | {profile.name}" />
  <meta name="twitter:description" content="Get in touch with {profile.name}. Connect via email, LinkedIn, or GitHub." />
</svelte:head>

<div class="min-h-screen bg-background" data-testid="contact-page">
  <section class="container mx-auto px-4 py-4">
    <div class="mx-auto max-w-2xl">
      <ContactSection />
    </div>
  </section>
</div>
