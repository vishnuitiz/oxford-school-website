import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Blocks } from "@/components/sections/blocks";
import { crumbsFor, type Page } from "@/lib/pages";

export function InfoPage({ page }: { page: Page }) {
  const crumbs = [{ label: "Home", href: "/" }, ...crumbsFor(page.path), { label: page.title, href: page.path }];
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.h1} lede={page.lede} crumbs={crumbs} />
      <Blocks blocks={page.blocks} path={page.path} />
      {page.cta !== false && (
        <CtaBand title={page.cta?.title} body={page.cta?.body} secondary={page.cta?.secondary} />
      )}
    </>
  );
}
