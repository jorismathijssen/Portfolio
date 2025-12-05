import { getAllPosts } from "@/lib/mdx";
import { useTranslations } from "next-intl";
import { AnimatedBlogList } from "@/components/animated-blog-list";

export default function BlogPage() {
  const posts = getAllPosts();
  const t = useTranslations("Blog");

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">{t("title")}</h1>
      <AnimatedBlogList posts={posts} />
    </div>
  );
}
