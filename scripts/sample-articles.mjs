// Placeholder articles and placeholder photos, used only when NEWS_CSV_URL is not set.
import { join } from "node:path";
import sharp from "sharp";

const photo = (key, caption) => ({ src: `/media/${key}`, w: 1600, h: 1200, widths: [480, 960, 1600], caption });

export const sampleArticles = [
  {
    date: "2026-11-14", category: "Event", topic: "Celebrations", slug: "annual-day-music-dance-drama",
    title: "Annual Day: an evening of music, dance and drama",
    author: "",
    text: "Students from every stage come together for an evening on stage, with performances prepared over many weeks.\nParents and families are warmly invited. Seating is on a first-come basis.",
    photos: [],
  },
  {
    date: "2026-11-07", category: "Event", topic: "General", slug: "open-house-new-admissions",
    title: "Open house for new admissions",
    author: "",
    text: "Meet the Principal and teachers, see classes at work and ask whatever is on your mind. The open house covers every stage from Pre-Nursery to Grade 10.\nNo booking is needed, though the admission enquiry form helps us plan.",
    photos: [],
  },
  {
    date: "2026-12-05", category: "Event", topic: "Arts and culture", slug: "winter-concert",
    title: "Winter concert: choirs, strings and the school band",
    author: "",
    text: "An evening of music from our youngest singers to the senior band.\nEntry is free and all families are welcome.",
    photos: [],
  },
  {
    date: "2026-10-02", category: "News", topic: "Achievements", slug: "grade-8-science-exhibition",
    title: "Grade 8 team wins the district science exhibition",
    author: "Science department",
    text: "A water-purification model built from everyday materials took first place among forty-two schools.\nThe team spent six weeks testing filters made from sand, charcoal and recycled bottles before presenting to a panel of scientists.",
    photos: [],
  },
  {
    date: "2026-09-26", category: "News", topic: "Sports", slug: "inter-house-athletics-meet",
    title: "Inter-house athletics meet draws record participation",
    author: "Physical education team",
    text: "Nearly every student took part in this year's meet, from the 50-metre sprint to the relay.\nHouses cheered on one another all day, and the shield was decided only in the final event.",
    photos: [
      photo("samplea", "Placeholder photo: runners at the start line"),
      photo("sampleb", "Placeholder photo: house cheering section"),
      photo("samplec", "Placeholder photo: prize giving"),
    ],
  },
  {
    date: "2026-09-18", category: "News", topic: "Clubs", slug: "robotics-club-first-competition",
    title: "The robotics club enters its first competition",
    author: "Ms Rao, club mentor",
    text: "Twelve students built, tested and re-built a line-following robot over a term of Friday sessions.\nThey did not win, but they came home with a notebook full of ideas for next year.",
    photos: [],
  },
  {
    date: "2026-09-10", category: "News", topic: "Community", slug: "saplings-planting-drive",
    title: "Students plant two hundred saplings",
    author: "Community service team",
    text: "Grades 6 to 9 spent a morning planting and labelling saplings, and each class has promised to look after its own patch.\nStudents will record growth through the year.",
    photos: [photo("sampleb", "Placeholder photo: planting day")],
  },
  {
    date: "2026-09-05", category: "News", topic: "Trips", slug: "grade-5-science-museum-visit",
    title: "Grade 5 spends a day at the science museum",
    author: "Grade 5 class teachers",
    text: "Children handled working models, asked a great many questions and filled their notebooks with sketches.\nBack in class they used what they saw to plan their own experiments.",
    photos: [],
  },
  {
    date: "2026-08-28", category: "News", topic: "Classroom", slug: "reading-week",
    title: "Reading week brings stories into every classroom",
    author: "Language department",
    text: "Teachers, parents and older students visited classes to read aloud.\nEvery child left with a book recommendation from someone they admire.",
    photos: [],
  },
  {
    date: "2026-08-15", category: "Event", topic: "Celebrations", slug: "independence-day-celebrations",
    title: "Independence Day celebrations",
    author: "",
    text: "The morning began with the flag hoisting and a march past, followed by songs and speeches prepared by students.\nSweets were shared with every class.",
    photos: [
      photo("samplec", "Placeholder photo: flag hoisting"),
      photo("samplea", "Placeholder photo: march past"),
    ],
  },
];

const art = {
  samplea: { bg: "#dfe6dc", a: "#a8431f", b: "#16322b", c: "#c9a45c" },
  sampleb: { bg: "#16322b", a: "#c9a45c", b: "#f6f1e7", c: "#a8431f" },
  samplec: { bg: "#e2d9c8", a: "#16322b", b: "#a8431f", c: "#4f7a69" },
};

export async function writeSamplePhotos(dir, widths) {
  for (const [key, t] of Object.entries(art)) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="${t.bg}"/>
      <circle cx="285" cy="104" r="46" fill="${t.a}"/>
      <path d="M60 300V170a80 80 0 0 1 160 0v130z" fill="${t.b}"/>
      <path d="M0 262c80-26 160 0 240-14s110-6 160 4v48H0z" fill="${t.c}" opacity="0.75"/>
    </svg>`;
    for (const w of widths) {
      await sharp(Buffer.from(svg)).resize({ width: w }).webp({ quality: 80 }).toFile(join(dir, `${key}-${w}.webp`));
    }
  }
}
