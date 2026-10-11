"use client";

import { Button } from "@/components/ui/Button";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="section">
      <div className="container-x text-center">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="display mx-auto mt-6 max-w-2xl text-[clamp(2.2rem,5vw,3.8rem)]">
          We hit an unexpected snag.
        </h1>
        <p className="lede mx-auto mt-6">
          Please try again. If it keeps happening, let us know and we will put
          it right.
        </p>
        <div className="mt-10">
          <Button onClick={reset}>Try again</Button>
        </div>
      </div>
    </section>
  );
}
