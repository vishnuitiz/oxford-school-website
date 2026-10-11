import { ButtonLink, ArrowLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-x text-center">
        <p className="eyebrow">Page not found</p>
        <h1 className="display mx-auto mt-6 max-w-2xl text-[clamp(2.4rem,6vw,4.5rem)]">
          This path seems to have wandered off.
        </h1>
        <p className="lede mx-auto mt-6">
          The page you were looking for isn&rsquo;t here, but the rest of the
          school is. Let&rsquo;s get you back.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
          <ButtonLink href="/">Back to the home page</ButtonLink>
          <ArrowLink href="/contact">Contact us</ArrowLink>
        </div>
      </div>
    </section>
  );
}
