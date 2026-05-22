import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/posts";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://climgo.fr/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const allPosts = getAllPosts().filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen pt-20">
      {/* Header article */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 right-0 w-[400px] h-[400px] rounded-full bg-primary/15 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
          <Badge
            variant="secondary"
            className="mb-4 bg-accent/20 text-accent border-accent/30"
          >
            {post.category}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readingTime} de lecture
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-slate prose-headings:font-bold prose-h2:text-2xl prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground max-w-none"
            dangerouslySetInnerHTML={{
              __html: post.content
                .trim()
                .split("\n")
                .map((line) => {
                  if (line.startsWith("## "))
                    return `<h2>${line.slice(3)}</h2>`;
                  if (line.startsWith("### "))
                    return `<h3>${line.slice(4)}</h3>`;
                  if (line.startsWith("- "))
                    return `<li>${line.slice(2)}</li>`;
                  if (line.startsWith("|"))
                    return `<p class="font-mono text-xs">${line}</p>`;
                  if (line.trim() === "") return "<br/>";
                  return `<p>${line
                    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                    .replace(/\*(.+?)\*/g, "<em>$1</em>")}</p>`;
                })
                .join(""),
            }}
          />

          {/* CTA dans l'article */}
          <div className="mt-12 p-6 bg-secondary rounded-2xl border border-border">
            <h3 className="font-semibold text-foreground mb-2">
              Besoin d&apos;un devis ?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              ClimGO intervient rapidement et vous conseille la solution la mieux
              adaptée à votre logement. Devis 100% gratuit.
            </p>
            <Link
              href="/contact"
              className={cn(buttonVariants(), "rounded-full gap-2")}
            >
              Demander mon devis gratuit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Articles suivants */}
      {allPosts.length > 0 && (
        <section className="py-16 bg-secondary/30">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-semibold mb-6">Lire aussi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group bg-white rounded-xl p-5 border border-border hover:shadow-md transition-shadow"
                >
                  <Badge variant="secondary" className="text-xs mb-2">
                    {p.category}
                  </Badge>
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors text-sm leading-snug">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
