import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function FormCard({
  title,
  body,
  label,
}: {
  title: string;
  body: string;
  label: string;
}) {
  return (
    <div className="rounded-[2rem] border border-sand bg-paper p-7 sm:p-10">
      <h3 className="display text-[1.7rem] leading-tight">{title}</h3>
      <p className="mt-3 max-w-prose text-muted">{body}</p>
      <div className="mt-8">
        <ButtonLink
          href={site.enquiryFormUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
          <span className="sr-only"> (opens in a new tab)</span>
        </ButtonLink>
      </div>
      <p className="mt-6 text-sm text-muted">
        Prefer to talk? Call{" "}
        <a
          href={`tel:${site.phone.replace(/\s/g, "")}`}
          className="font-medium text-ink underline decoration-accent/50 underline-offset-4"
        >
          {site.phone}
        </a>
        .
      </p>
    </div>
  );
}
