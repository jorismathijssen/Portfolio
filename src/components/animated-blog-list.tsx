"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Post } from "@/lib/mdx";

export function AnimatedBlogList({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-8">
      {posts.map((post, i) => (
        <motion.article
          key={post.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="border-border border-b pb-8 last:border-0"
        >
          <Link
            href={`/blog/${encodeURIComponent(post.slug)}`}
            className="group block"
          >
            <h2 className="group-hover:text-primary mb-2 text-2xl font-semibold transition-colors">
              {post.meta.title}
            </h2>
            <div className="text-muted-foreground mb-4 text-sm">
              {post.meta.date}
            </div>
            <p className="text-muted-foreground">{post.meta.description}</p>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
