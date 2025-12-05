import { getProjectBySlug, getProjectSlugs } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function generateStaticParams() {
  const projects = getProjectSlugs();
  return projects.map((project) => ({
    slug: project.replace(/\.mdx$/, ""),
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations("Work");

  let project;
  try {
    project = getProjectBySlug(slug);
  } catch {
    notFound();
  }

  const content = await serialize(project.content);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Link
        href="/#work"
        className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("back")}
      </Link>

      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">{project.meta.title}</h1>
        <div className="mb-4 flex flex-wrap gap-2">
          {project.meta.tags.map((tag) => (
            <span
              key={tag}
              className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-muted-foreground mb-6 text-xl">
          {project.meta.description}
        </p>
        {project.meta.externalLink && (
          <a
            href={project.meta.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary inline-flex items-center gap-2 font-medium hover:underline"
          >
            {t("visit_site")} <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </div>

      <article className="prose prose-zinc dark:prose-invert max-w-none">
        <MDXRemote source={content} />
      </article>
    </div>
  );
}
