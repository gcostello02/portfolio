import profileData from "@/content/profile.json";
import experienceData from "@/content/experience.json";
import projectsData from "@/content/projects.json";
import skillsData from "@/content/skills.json";
import interestsData from "@/content/interests.json";
import appsData from "@/content/apps.json";
import educationData from "@/content/education.json";

export interface Course {
  name: string;
  code: string;
  description: string;
  skills: string[];
}

export interface Education {
  school: string;
  schoolShort: string;
  degrees: {
    type: string;
    field: string;
    college?: string;
  }[];
  location: string;
  graduationYear: number;
  graduationDate: string;
  gpa: number;
  courses: Course[];
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  github: {
    personal: string;
    work: string;
  };
  linkedin: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  dates: string;
  startDate: string;
  endDate: string | null;
  description: string[];
  technologies: string[];
}

export interface ProjectMedia {
  type: "image" | "video" | "youtube" | "iframe";
  url: string;
  thumbnail?: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string[];
  technologies: string[];
  githubUrl?: string | null;
  demoUrl?: string | null;
  media?: ProjectMedia[];
  featured?: boolean;
  dates: string;
}

export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: Skill[];
}

export interface Skills {
  categories: SkillCategory[];
  highlights: string[];
}

export interface InterestHighlight {
  title: string;
  dates: string;
  description: string;
}

export interface Interest {
  id: string;
  title: string;
  icon: string;
  description: string;
  highlights: InterestHighlight[];
}

export interface Interests {
  interests: Interest[];
}

export interface App {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  mode: "internal" | "external" | "iframe";
  url: string | null;
}

export function getProfile(): Profile {
  return profileData as Profile;
}

export function getExperience(): Experience[] {
  return experienceData as Experience[];
}

export function getProjects(): Project[] {
  return projectsData as Project[];
}

export function getSkills(): Skills {
  return skillsData as Skills;
}

export function getInterests(): Interests {
  return interestsData as Interests;
}

export function getEducation(): Education {
  return educationData as Education;
}

export function getApps(): App[] {
  return appsData as App[];
}

export function getAppBySlug(slug: string): App | undefined {
  return (appsData as App[]).find((app) => app.slug === slug);
}

export function getAllSearchableContent() {
  const profile = getProfile();
  const experience = getExperience();
  const projects = getProjects();
  const skills = getSkills();
  const interests = getInterests();
  const education = getEducation();

  return {
    profile,
    experience,
    projects,
    skills,
    interests,
    education,
  };
}
