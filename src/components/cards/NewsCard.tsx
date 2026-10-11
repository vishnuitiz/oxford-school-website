import Link from "next/link";
import { ViewTransition } from "react";
import { ArtTile } from "@/components/illustrations/Illustrations";
import { Photo } from "@/components/media/Photo";
import { formatDate } from "@/lib/content";
import { articleHref, type Article } from "@/lib/news";

export function NewsCard({ item }: { item: Article }) {
  const cover = item.photos[0];
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-sand bg-paper transition-[transform,box-shadow] duration-500 ease-out-soft focus-within:ring-2 focus-within:ring-accent hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(22,50,43,0.35)]">
      <div className="overflow-hidden">
        {cover ? (
          <ViewTransition name={`photo-${item.slug}`} share="morph" default="none">
            <Photo
              photo={cover}
              sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 92vw"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
            />
          </ViewTransition>
        ) : (
          <ArtTile
            variant={item.tile}
            className="aspect-[4/3] w-full transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className="meta-label">
          {item.category}
          <span className="mx-2 text-sand" aria-hidden="true">
            /
          </span>
          <time dateTime={item.date} className="text-muted normal-case tracking-normal">
            {formatDate(item.date)}
          </time>
        </p>
        <h3 className="display mt-4 break-words text-[1.55rem] leading-[1.15]">
          <Link href={articleHref(item)} className="outline-none after:absolute after:inset-0">
            {item.title}
          </Link>
        </h3>
        <p className="mt-3 break-words text-[0.98rem] leading-relaxed text-muted">{item.excerpt}</p>
      </div>
    </article>
  );
}
