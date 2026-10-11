# Oxford International School website

A fully static site (Next.js 16 `output: "export"`, Tailwind 4). No server, database or API keys, so it can be hosted free on any static host. All school details are placeholders (see the register at the end).

## How the site is organised

About 40 fixed pages plus one page per article. Every information page is one entry in `src/lib/pages.ts` (title, intro, a list of content blocks) rendered by one template, so adding or rewording a page never needs layout work.

| Section | Pages |
|---|---|
| About | history, vision and mission, principal's message, leadership |
| Academics | curriculum, teaching methodology, early years, primary, middle school, secondary |
| Admissions | eligibility, documents, FAQs, **admission enquiry** (enquiry and admission are the same first step) |
| Activities | sports, clubs, arts and culture, celebrations, trips, community service, achievements |
| Gallery, News, Events | all built from articles (below); each has an archive |
| Other | contact, privacy policy, terms of use, accessibility |

Navigation, footer and the one call-to-action label ("Admission enquiry") live in `src/lib/site.ts`. Stages (Pre-Nursery to Grade 10) are in `src/lib/content.ts`.

## Commands

```bash
npm run dev     # local development
npm run build   # fetches news + photos, then writes the finished site to ./out
```

Preview the finished site: `npx serve out`. Without `NEWS_CSV_URL` the build uses ten placeholder articles with sample photos.

## Settings (environment variables on the host)

| Variable | What it is |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | The live address, used for the sitemap and social previews |
| `NEXT_PUBLIC_ENQUIRY_FORM_URL` | Link to the admissions enquiry Google Form |
| `NEWS_CSV_URL` | Published CSV link of the news sheet's **Published** tab. Empty = placeholder articles |

## Google setup

Script: `google-setup/setup.gs`. Paste it into https://script.google.com.

- **Already ran version 1?** Replace the old code with this file, Save, pick `upgradeAll` and Run. Nothing is deleted and your old links keep working. It adds the Topic, Photos and Slug columns, the pending-row highlight, the new Published formula, the photo folder, and the new Pre-Nursery to Grade 10 stage list on the enquiry form. Safe to run twice.
- **Starting from nothing?** Pick `setupAll` and Run once (twice creates a second set).

Both print the links to keep in View > Logs. After `setupAll` you must also publish the Published tab by hand (next section).

Status: syntax-checked and the pure logic (formula, slugs, columns) was run against a mock sheet. It has not been run against a real Google account in this version, so expect that a line may need a fix on first run.

### By hand, once
In the news sheet: File > Share > Publish to web > choose the **Published** tab and **Comma-separated values (.csv)** > Publish. Copy the link into `NEWS_CSV_URL`. Only this tab becomes public; emails and phone numbers are kept out of it. (With `upgradeAll` the existing published link keeps working.)

## How news, events and the gallery work

One pipeline feeds everything. Each approved article is either **News** or an **Event**, and has a **Topic**. The topic decides where else it shows:

| Topic | Also appears on |
|---|---|
| Sports, Clubs, Arts and culture, Celebrations, Trips, Community service, Achievements | the matching Activities page |
| In the classroom, School life | the Gallery only |

Any article with photos also appears in the Gallery, grouped by topic.

Day to day:

1. Anyone submits the news form (title, News or Event, date, name and role, article).
2. The admin opens the news sheet. New rows are highlighted yellow until approved.
3. The admin fixes the text if needed, picks the **Topic**, optionally adds **Photos**, and sets **Approved** to `Yes`.
4. The site picks it up at the next rebuild: every morning at 5 am, or straight away with the sheet menu **Oxford site > Publish approved articles now** (needs the rebuild link, below).
5. To take an article down, set Approved to `No` (or delete the row), then use **Publish approved articles now**.

**Photos.** The script creates a Drive folder "Oxford International School website photos" (anyone with the link can view, because the photos go on the public site). The admin uploads photos there, right-clicks > Share > Copy link, and pastes the links into the **Photos** cell, one per line. Add a caption after a `|`, for example `https://drive.google.com/file/d/…/view | The relay team at the finish`. Up to 12 photos per article. At build time every photo is downloaded, location data is stripped, and it is resized to three web-friendly sizes (iPhone HEIC photos are converted automatically). Photos of children should only be published with a parent's consent.

**Photo upload from the form (optional).** A script cannot create a file-upload question, so add it once by hand: open the news form, Add question, type **File upload**, title it exactly `Photo upload`, up to 10 files. Then run `upgradeAll` again; the Published tab now joins uploaded photos with anything in the Photos column. Trade-offs: Google makes every respondent sign in with a Google account once the form has an upload question, uploads count against the form owner's Drive storage, and uploaded photos stay private until the article is approved (an edit trigger makes an approved row's photos viewable by link, which the build needs). The site publishes images only; any other file type is skipped with a warning in the build log. Pasting links into the Photos column keeps working alongside it, and both can hold several photos.

**Web address.** The Slug column is filled in automatically when the article first appears, so editing a title later never changes its address.

Rules the build enforces:
- The Published tab must have the columns `date, category, title, text` (and optionally `topic, author, photos, slug`), and the link must be reachable. Otherwise the build **fails on purpose**, and the host keeps serving the last good version.
- Rows without a `yyyy-mm-dd` date, a title or text are skipped, with a warning in the build log.
- A photo that cannot be downloaded is skipped with a warning; the article still publishes.
- Article text is plain paragraphs only. HTML is never interpreted.
- `/news` shows the latest 20 news items; `/events` shows upcoming events and the 12 latest past ones. Everything older is in each section's archive. The home page shows 3. With no articles, pages say so and the home block hides.

## Hosting (recommended: Cloudflare Pages, free)

1. Put the project in a private GitHub repository (the rebuild link needs a Git-connected project; drag-and-drop upload has none).
2. In Cloudflare Pages: Create project > connect the repository > build command `npm run build`, output directory `out`, add the three environment variables.
3. Security headers come from `public/_headers` and old addresses from `public/_redirects` (Cloudflare Pages and Netlify honour both; GitHub Pages does not).
4. Settings > Builds > Deploy hooks > create a hook and copy its URL. In the news sheet use **Oxford site > Set rebuild link...** and paste it. Treat the URL like a password.
5. Custom domain: add it under Pages > Custom domains. Free HTTPS is included. A domain name itself costs money at any registrar.

Free-tier limits and prices change, so check the host's current terms. Nothing has been deployed yet, so none of this hosting setup has been tested.

## Placeholder register: replace before launch

Nothing below is a real fact about a real school.

- **Identity and contact** (`src/lib/site.ts`): name, founding year, address, phone, emails, opening hours, social links, enquiry form link.
- **Numbers on the home page** (`app/page.tsx` `facts`): founded year, teacher ratio, class size, campus size.
- **People**: Principal and leadership names and roles (`lib/pages.ts`, `app/page.tsx` quote), parent and alumni quotes (`lib/content.ts` `voices`).
- **Curriculum claim**: the wording that the programme stands with the finest in the community (home page, Academics pages). The school must be able to substantiate it, and it must name nothing it is not entitled to name.
- **Admissions**: eligibility ages and cut-off dates, the documents list, FAQ answers, visit and reply timings.
- **Academics and Activities**: stage descriptions, subjects, clubs, sports, trips, and the daily timetable.
- **History timeline** and **vision and mission** text.
- **Legal pages** (privacy policy, terms, accessibility): placeholder text that needs review by someone qualified before launch. Check too whether the board or the state requires disclosures to be published (for example mandatory public disclosure items) and where.
- **Photos and illustrations**: all imagery is placeholder artwork until real photographs are supplied.
- **Fees** are deliberately not published.
