import { useEffect } from "react";
import { getProfile } from "@/lib/content";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: "website" | "profile" | "article";
  image?: string;
}

const profile = getProfile();
const BASE_URL = typeof window !== "undefined" ? window.location.origin : "";

const DEFAULT_DESCRIPTION = `${profile.name} - ${profile.title}. ${profile.tagline}. View my portfolio, projects, skills, and experience.`;

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  type = "website",
  image,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${profile.name}` : `${profile.name} - Portfolio`;
  const canonicalUrl = `${BASE_URL}${path}`;

  useEffect(() => {
    document.title = fullTitle;

    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updateLink = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    updateMeta("description", description);
    updateMeta("author", profile.name);
    updateMeta("keywords", `${profile.name}, software engineer, portfolio, UVA, computer science, economics, web development, React, JavaScript, Python`);

    updateMeta("og:type", type, true);
    updateMeta("og:title", fullTitle, true);
    updateMeta("og:description", description, true);
    updateMeta("og:url", canonicalUrl, true);
    updateMeta("og:site_name", `${profile.name} Portfolio`, true);
    
    const ogImage = document.querySelector('meta[property="og:image"]');
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (image) {
      updateMeta("og:image", image, true);
      updateMeta("twitter:image", image);
    } else {
      if (ogImage) ogImage.remove();
      if (twitterImage) twitterImage.remove();
    }

    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", fullTitle);
    updateMeta("twitter:description", description);

    updateLink("canonical", canonicalUrl);

    const existingJsonLd = document.querySelector('script[type="application/ld+json"]');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.title,
      description: profile.summary.split("\n")[0],
      email: `mailto:${profile.email}`,
      url: BASE_URL,
      sameAs: [
        `https://github.com/${profile.github.personal}`,
        `https://${profile.linkedin}`,
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "University of Virginia",
      },
      knowsAbout: [
        "Software Engineering",
        "Web Development",
        "React",
        "JavaScript",
        "Python",
        "Computer Science",
        "Economics",
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [fullTitle, description, canonicalUrl, type, image]);

  return null;
}
