import { ViewTransition } from "react";
import { ArrowLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/CtaBand";
import { Photo } from "@/components/media/Photo";
import { formatDate } from "@/lib/content";
import { articleHref, type Article } from "@/lib/news";
import { site } from "@/lib/site";

export function ArticleView({ article }: { article: Article }) {
  const isEvent = article.category === "Event";
  const back = isEvent ? { href: "/events", label: "All events" } : { href: "/news", label: "All news" };
  const ld = {
    "@context": "https://schema.org",
    "@type": isEvent ? "Event" : "NewsArticle",
    ...(isEvent
      ? {
          name: article.title,
          startDate: article.date,
          description: article.excerpt,
          location: { "@type": "Place", name: site.name, address: `${site.address.street}, ${site.address.locality}` },
        }
      : { headline: article.title, datePublished: article.date, description: article.excerpt }),
    url: `${site.url}${articleHref(article)}`,
    ...(article.photos[0] ? { image: `${site.url}${article.photos[0].src}-${Math.max(...article.photos[0].widths)}.webp` } : {}),
  };
  return (
    <>
      <article className="section">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
        <div className="container-x max-w-3xl">
          <ArrowLink href={back.href} className="text-[0.95rem]">
            {back.label}
          </ArrowLink>
          <p className="meta-label mt-12">
            {article.category}
            <span className="mx-2 text-sand" aria-hidden="true">
              /
            </span>
            <time dateTime={article.date} className="text-muted normal-case tracking-normal">
              {formatDate(article.date)}
            </time>
            <span className="mx-2 text-sand" aria-hidden="true">
              /
            </span>
            {article.topic.label}
          </p>
          <h1 className="display mt-5 break-words text-[clamp(2.2rem,5vw,3.5rem)]">{article.title}</h1>
          {article.author && <p className="mt-5 break-words text-muted">By {article.author}</p>}
          <div className="prose-school mt-10 break-words text-[1.0625rem] leading-[1.75]">
            {article.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        {article.photos.length > 0 && (
          <div className="container-x mt-14 max-w-5xl">
            <ul className={`grid gap-6 ${article.photos.length === 1 ? "" : "sm:grid-cols-2"}`}>
              {article.photos.map((p, i) => (
                <li key={p.src} className={article.photos.length > 2 && i === 0 ? "sm:col-span-2" : ""}>
                  <figure>
                    {i === 0 ? (
                      <ViewTransition name={`photo-${article.slug}`} share="morph" default="none">
                        <Photo
                          photo={p.caption ? { ...p, alt: "" } : p}
                          eager
                          sizes="(min-width: 1024px) 960px, 92vw"
                          className="h-auto w-full rounded-3xl"
                        />
                      </ViewTransition>
                    ) : (
                      <Photo
                        photo={p.caption ? { ...p, alt: "" } : p}
                        sizes="(min-width: 640px) 470px, 92vw"
                        className="h-auto w-full rounded-3xl"
                      />
                    )}
                    {p.caption && <figcaption className="mt-3 text-sm text-muted">{p.caption}</figcaption>}
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        )}
        {article.topic.href && (
          <div className="container-x mt-14 max-w-3xl">
            <ArrowLink href={article.topic.href}>More from {article.topic.label.toLowerCase()}</ArrowLink>
          </div>
        )}
      </article>
      <CtaBand />
    </>
  );
}
