
export type Stage = {
  slug: string;
  name: string;
  ages: string;
  grades: string;
  href: string;
  blurb: string;
  points: string[];
  areas: { title: string; body: string }[];
  tile: 0 | 1 | 2 | 3;
};

export const stages: Stage[] = [
  {
    slug: "early-years",
    name: "Early Years",
    ages: "Ages 3 to 6",
    grades: "Nursery to UKG",
    href: "/academics/early-years",
    blurb:
      "Learning begins with wonder. Days are built around story, song, play and plenty of time outdoors.",
    points: [
      "Phonics-led reading with daily shared stories",
      "Learning through play, making and outdoor exploration",
      "A class teacher and helper who know each child deeply",
    ],
    areas: [
      { title: "Language and stories", body: "Listening, speaking, rhymes and first letters, all through stories children love." },
      { title: "Numbers and shapes", body: "Counting, sorting and pattern play with real objects before pencils and paper." },
      { title: "Exploring the world", body: "Plants, weather, animals and festivals, learned by touching, watching and asking." },
      { title: "Creative play", body: "Songs, movement, painting and building, because imagination is part of learning." },
    ],
    tile: 0,
  },
  {
    slug: "primary",
    name: "Primary",
    ages: "Ages 6 to 11",
    grades: "Grades 1 to 5",
    href: "/academics/primary",
    blurb:
      "Curiosity gets structure. Children gain confidence in the fundamentals and begin asking bigger questions.",
    points: [
      "Strong foundations in reading, writing and mathematics",
      "Weekly project afternoons that cross subjects",
      "Specialist teaching in music, art and physical education",
    ],
    areas: [
      { title: "Languages", body: "Confident reading and clear writing in English and the local language, with a love of books." },
      { title: "Mathematics", body: "Understanding first, then speed: number sense, measurement, shapes and data." },
      { title: "Science and environment", body: "Simple experiments, observation and care for the world around us." },
      { title: "Arts and physical education", body: "Music, art, games and fitness every week, taught by specialists." },
    ],
    tile: 2,
  },
  {
    slug: "middle-school",
    name: "Middle School",
    ages: "Ages 11 to 14",
    grades: "Grades 6 to 8",
    href: "/academics/middle-school",
    blurb:
      "A time of change handled with care. Mentoring, choice and challenge help young people find their feet.",
    points: [
      "A personal mentor for every student",
      "Subject teachers who stretch and support",
      "Study skills taught explicitly, not assumed",
    ],
    areas: [
      { title: "Languages and humanities", body: "Writing with purpose, reading widely, and understanding history, geography and civics." },
      { title: "Mathematics and science", body: "Reasoning, problem solving and hands-on laboratory work." },
      { title: "Digital skills", body: "Using computers well and wisely, from research to simple coding." },
      { title: "Life skills", body: "Teamwork, public speaking, wellbeing and responsible choices." },
    ],
    tile: 1,
  },
  {
    slug: "secondary",
    name: "Secondary",
    ages: "Ages 14 to 16",
    grades: "Grades 9 and 10",
    href: "/academics/secondary",
    blurb:
      "Careful preparation for the important years ahead, alongside the independence and judgement that last a lifetime.",
    points: [
      "Subject specialists in well-sized classes",
      "Regular practice and honest feedback before major examinations",
      "Guidance on subject choices and the road beyond Grade 10",
    ],
    areas: [
      { title: "Core subjects", body: "Languages, mathematics, science and social science taught to a demanding standard." },
      { title: "Exam preparation", body: "Planned revision, practice papers and calm support through the examination year." },
      { title: "Guidance", body: "One-to-one conversations about strengths, interests and what comes after Grade 10." },
      { title: "Leadership", body: "Responsibility for houses, clubs and service projects." },
    ],
    tile: 3,
  },
];

export const pillars = [
  {
    title: "Every child is known",
    body: "Classes are sized so there is always a lively group to learn alongside, and always a teacher who notices the quiet child, the restless child and the one who has just had a breakthrough.",
  },
  {
    title: "Thinking comes first",
    body: "We teach children how to reason, question and make things, so results follow from understanding rather than rehearsal.",
  },
  {
    title: "Room to grow",
    body: "Music, sport, the outdoors and service sit beside academics, because character is built in the spaces between lessons.",
  },
] as const;

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export const dayAtSchool = [
  { time: "8:00", title: "Morning circle", body: "Quiet arrivals, a shared welcome and the day ahead." },
  { time: "9:00", title: "Deep-focus lessons", body: "Long, unhurried blocks for core subjects." },
  { time: "12:30", title: "Lunch and play", body: "A proper break to eat together and play." },
  { time: "14:00", title: "Art, music and sport", body: "Creative and physical learning, and project work in groups." },
  { time: "16:00", title: "Home time", body: "Full days run until 4:00 pm on weekdays. Saturday half days run from 8:00 to 11:00 am." },
] as const;
