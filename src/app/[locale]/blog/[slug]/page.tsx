import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = getPostSlugs();
  return posts.map((post) => ({
    slug: post.replace(/\.mdx$/, ""),
  }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations("Blog");

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const content = await serialize(post.content);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/blog"
        className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("back")}
      </Link>

      <article className="prose prose-zinc dark:prose-invert max-w-none">
        <h1 className="mb-2">{post.meta.title}</h1>
        <div className="text-muted-foreground mb-8">{post.meta.date}</div>
        <MDXRemote source={content} />
      </article>
    </div>
  );
}
