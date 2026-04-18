<script lang="ts">
  import {
    Mail,
    Phone,
    MapPin,
    Send,
    ExternalLink,
    MessageSquare,
    Github,
    Linkedin,
  } from "lucide-svelte";
  import { z } from "zod";
  import Card from "$lib/ui/Card.svelte";
  import CardHeader from "$lib/ui/CardHeader.svelte";
  import CardContent from "$lib/ui/CardContent.svelte";
  import CardTitle from "$lib/ui/CardTitle.svelte";
  import Button from "$lib/ui/Button.svelte";
  import Input from "$lib/ui/Input.svelte";
  import Textarea from "$lib/ui/Textarea.svelte";
  import { getProfile } from "$lib/content";
  import { env } from "$env/dynamic/public";

  const profile = getProfile();

  const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
  });

  let name = $state("");
  let email = $state("");
  let message = $state("");
  let submitting = $state(false);
  let toast = $state<{ type: "ok" | "err"; text: string } | null>(null);

  async function onSubmit(e: Event) {
    e.preventDefault();
    toast = null;
    const parsed = schema.safeParse({ name, email, message });
    if (!parsed.success) {
      const first = parsed.error.flatten().fieldErrors;
      const msg =
        first.name?.[0] || first.email?.[0] || first.message?.[0] || "Invalid";
      toast = { type: "err", text: msg };
      return;
    }

    if (!env.PUBLIC_FORMSPREE_FORM_ID) {
      toast = {
        type: "err",
        text: "Please set PUBLIC_FORMSPREE_FORM_ID in your environment.",
      };
      return;
    }

    submitting = true;
    try {
      const res = await fetch(
        `https://formspree.io/f/${env.PUBLIC_FORMSPREE_FORM_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: parsed.data.name,
            email: parsed.data.email,
            message: parsed.data.message,
            _replyto: parsed.data.email,
          }),
        },
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error || `HTTP ${res.status}`);
      }
      toast = {
        type: "ok",
        text: "Thanks for reaching out. I'll get back to you soon.",
      };
      name = "";
      email = "";
      message = "";
    } catch (e) {
      toast = {
        type: "err",
        text: e instanceof Error ? e.message : "Please try again later.",
      };
    } finally {
      submitting = false;
    }
  }
</script>

<div class="space-y-6" data-testid="contact-section">
  <div class="text-center">
    <div
      class="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-primary"
    >
      <MessageSquare class="h-4 w-4" />
      <span class="text-sm font-medium">Let's Connect</span>
    </div>
    <h3 class="text-lg font-semibold text-foreground">Get in Touch</h3>
    <p class="mt-1 text-sm text-muted-foreground">
      Have a question or want to work together?
    </p>
  </div>

  {#if toast}
    <div
      class="rounded-md border px-3 py-2 text-sm {toast.type === 'ok'
        ? 'border-primary/30 bg-primary/5 text-foreground'
        : 'border-destructive/30 bg-destructive/10 text-destructive'}"
      role="status"
    >
      {toast.text}
    </div>
  {/if}

  <Card>
    <CardHeader class="pb-3">
      <CardTitle tag="h3" class="text-base">Send a Message</CardTitle>
    </CardHeader>
    <CardContent>
      <form class="space-y-4" onsubmit={onSubmit} data-testid="contact-form">
        <div>
          <label class="mb-1 block text-sm font-medium" for="c-name">Name</label>
          <Input id="c-name" bind:value={name} placeholder="Your name" data-testid="input-contact-name" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium" for="c-email">Email</label>
          <Input
            id="c-email"
            type="email"
            bind:value={email}
            placeholder="your@email.com"
            data-testid="input-contact-email"
          />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium" for="c-msg">Message</label>
          <Textarea
            id="c-msg"
            bind:value={message}
            placeholder="Tell me about your project or just say hello..."
            class="min-h-[100px] resize-none"
            data-testid="input-contact-message"
          />
        </div>
        <Button type="submit" class="w-full" disabled={submitting} data-testid="button-contact-submit">
          {#if submitting}
            Sending...
          {:else}
            <Send class="mr-2 h-4 w-4" />
            Send Message
          {/if}
        </Button>
      </form>
    </CardContent>
  </Card>

  <Card>
    <CardHeader class="pb-3">
      <CardTitle tag="h3" class="text-base">Direct Contact</CardTitle>
    </CardHeader>
    <CardContent class="space-y-3">
      <a
        href="mailto:{profile.email}"
        class="hover-elevate flex items-center gap-3 rounded-md p-2"
        data-testid="link-contact-email"
      >
        <div class="rounded-md bg-primary/10 p-2">
          <Mail class="h-4 w-4 text-primary" />
        </div>
        <div>
          <p class="text-sm font-medium text-foreground">Email</p>
          <p class="text-xs text-muted-foreground">{profile.email}</p>
        </div>
      </a>
      <a
        href="tel:{profile.phone.replace(/[^\d+]/g, '')}"
        class="hover-elevate flex items-center gap-3 rounded-md p-2"
        data-testid="link-contact-phone"
      >
        <div class="rounded-md bg-primary/10 p-2">
          <Phone class="h-4 w-4 text-primary" />
        </div>
        <div>
          <p class="text-sm font-medium text-foreground">Phone</p>
          <p class="text-xs text-muted-foreground">{profile.phone}</p>
        </div>
      </a>
      <div class="flex items-center gap-3 p-2">
        <div class="rounded-md bg-muted p-2">
          <MapPin class="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <p class="text-sm font-medium text-foreground">Location</p>
          <p class="text-xs text-muted-foreground">{profile.location}</p>
        </div>
      </div>
    </CardContent>
  </Card>

  <Card>
    <CardHeader class="pb-3">
      <CardTitle tag="h3" class="text-base">Social Links</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" href="https://github.com/{profile.github.personal}">
        <Github class="mr-1.5 h-4 w-4" />
        Personal
        <ExternalLink class="ml-1 h-3 w-3" />
      </Button>
      <Button variant="outline" size="sm" href="https://github.com/{profile.github.work}">
        <Github class="mr-1.5 h-4 w-4" />
        Work
        <ExternalLink class="ml-1 h-3 w-3" />
      </Button>
      <Button variant="outline" size="sm" href="https://{profile.linkedin}">
        <Linkedin class="mr-1.5 h-4 w-4" />
        LinkedIn
        <ExternalLink class="ml-1 h-3 w-3" />
      </Button>
    </CardContent>
  </Card>
</div>
