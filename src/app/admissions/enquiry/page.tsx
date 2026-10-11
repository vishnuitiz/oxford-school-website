import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Blocks } from "@/components/sections/blocks";
import { FormCard } from "@/components/sections/FormCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMeta } from "@/lib/meta";
import { type Block } from "@/lib/pages";

const path = "/admissions/enquiry";

export const metadata = pageMeta({
  title: "Admission enquiry",
  description: "Begin your child's admission with one short form. Within two working days we check eligibility and invite you for the admission interaction.",
  path,
});

const ready = [
  "Your child's name and date of birth",
  "The stage you are enquiring about, from Nursery to Grade 10",
  "A phone number and email where we can reach you",
  "Any day you would like to visit, if you have one in mind",
];

const after: Block[] = [
  {
    kind: "steps",
    title: "What happens after you send it.",
    lede: "An enquiry here is the first step of admission. There is nothing else to fill in beforehand.",
    items: [
      { title: "Eligibility check", body: "Within two working days, our admissions office will get in touch to check your child’s eligibility and invite you for the admission interaction." },
      { title: "You visit", body: "Walk the school, meet the teachers and ask anything you like." },
      { title: "Admission interaction", body: "Younger children join us for an informal interaction. From Grade 1 onwards, children are invited for a short admission assessment." },
      { title: "A place is offered", body: "We confirm in writing and tell you exactly what to bring." },
    ],
  },
  { kind: "stages", title: "Not sure which stage?", lede: "Pick the one that matches your child's age. We will confirm the right class with you." },
  {
    kind: "faq",
    title: "Quick answers.",
    items: [
      { q: "Is the enquiry binding?", a: "No. It simply lets us contact you. You decide at every step whether to continue." },
      { q: "Can I enquire for more than one child?", a: "Yes. Send one form for each child, or mention both in the message box." },
      { q: "Can I enquire in the middle of the year?", a: "Yes. Places depend on space in the class, and we will tell you honestly what is available." },
    ],
  },
];

export default function EnquiryPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="Begin your child's admission with one short form."
        lede="Enquiry and admission are the same first step here. Tell us a little about your child and we will take it from there."
        crumbs={[{ label: "Home", href: "/" }, { label: "Admissions", href: "/admissions" }, { label: "Admission enquiry", href: path }]}
      />
      <section className="section">
        <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading title="Have these to hand." lede="It takes about two minutes." />
            <ul className="mt-8 space-y-4">
              {ready.map((r) => (
                <li key={r} className="flex gap-3 text-ink-soft">
                  <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-accent" strokeWidth={2} />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <FormCard
              title="Admission enquiry form"
              body="The form opens in a new tab. When you submit it, our admissions team is notified straight away."
              label="Open the enquiry form"
            />
          </Reveal>
        </div>
      </section>
      <Blocks blocks={after} path={path} />
    </>
  );
}
