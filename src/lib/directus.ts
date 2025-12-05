import { createDirectus, rest } from "@directus/sdk";

type Schema = {
  posts: {
    id: number;
    title: string;
    slug: string;
    content: string;
    date_created: string;
  }[];
  projects: {
    id: number;
    title: string;
    slug: string;
    description: string;
    content: string;
    tags: string[];
  }[];
};

const directusUrl = process.env.DIRECTUS_URL || "http://localhost:8055";

export const directus = createDirectus<Schema>(directusUrl).with(rest());
