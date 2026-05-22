import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Conseils climatisation, PAC & chauffage",
  description:
    "Guides pratiques, conseils d'experts et actualités sur la climatisation, les pompes à chaleur, le chauffage et les aides financières.",
  alternates: {
    canonical: "https://climgo.fr/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute -top-20 right-0 w-[400px] h-[400px] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            Blog
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Conseils & actualités
          </h1>
          <p className="text-white/60 text-lg max-w-xl">
            Guides pratiques, astuces d&apos;experts et tout ce qu&apos;il faut
            savoir sur la climatisation, le chauffage et les aides de l&apos;État.
          </p>
        </div>
        <div className="absolute bottom-0 inset-x-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white rounded-2xl border border-border hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                {/* Placeholder image */}
                <div className="h-48 bg-gradient-to-br from-secondary to-primary/10 flex items-center justify-center">
                  <span className="text-4xl">
                    {post.category === "Climatisation"
                      ? "❄️"
                      : post.category === "Aides & financement"
                      ? "💶"
                      : "🔧"}
                  </span>
                </div>
                <div className="flex flex-col flex-1 p-6 gap-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {post.readingTime}
                    </span>
                  </div>
                  <h2 className="font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <time className="text-xs text-muted-foreground">
                      {formatDate(post.date)}
                    </time>
                    <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Lire <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
