// Draft copy for every information page. Review every claim (activities, facilities, people) before launch.
import { site } from "@/lib/site";
// Pages here share one template (components/sections/InfoPage); add a page by adding an entry.

export type IconName = "music" | "trophy" | "leaf" | "heart" | "book" | "users" | "palette" | "flag" | "map" | "star";

export type Block =
  | { kind: "split"; title: string; paragraphs: string[] }
  | { kind: "cards"; title: string; lede?: string; cols?: 2 | 3; tone?: "plain" | "sage"; numbered?: boolean; items: { title: string; body: string; icon?: IconName }[] }
  | { kind: "steps"; title: string; lede?: string; items: { title: string; body: string }[] }
  | { kind: "checklist"; title: string; lede?: string; items: string[] }
  | { kind: "table"; title: string; lede?: string; head: string[]; rows: string[][] }
  | { kind: "faq"; title: string; lede?: string; items: { q: string; a: string }[] }
  | { kind: "timeline"; title: string; items: { year: string; text: string }[] }
  | { kind: "letter"; paragraphs: string[]; name: string; role: string }
  | { kind: "people"; title: string; items: { name: string; role: string }[] }
  | { kind: "stage"; slug: string }
  | { kind: "stages"; title: string; lede?: string }
  | { kind: "chips"; title: string; lede?: string; items: string[] }
  | { kind: "topic"; topic: string; title: string; lede?: string; empty: string }
  | { kind: "children"; title: string; paths?: string[]; extra?: { title: string; body: string; href: string }[] }
  | { kind: "day"; title: string; lede?: string }
  | { kind: "sections"; items: { heading: string; paragraphs: string[] }[] };

export type Page = {
  path: string;
  title: string;
  eyebrow: string;
  h1: string;
  lede: string;
  description: string;
  blocks: Block[];
  cta?: { title: string; body: string; secondary?: { label: string; href: string } } | false;
};

const visitCta = (title: string, body: string, secondary?: { label: string; href: string }) => ({ title, body, secondary });

export const pages: Page[] = [
  // ---------------------------------------------------------------- About
  {
    path: "/about",
    title: "About us",
    eyebrow: "About us",
    h1: "A small school with a long memory.",
    lede: "From Nursery to Grade 10, Oxford is a place where children are known by name, challenged with care and trusted to grow at their own pace.",
    description: "The story, values and people behind Oxford International High School, which teaches children from Nursery to Grade 10.",
    blocks: [
      {
        kind: "split",
        title: "Built on a simple belief.",
        paragraphs: [
          "Oxford was started by a group of teachers and parents who shared one conviction: a school should feel less like an institution and more like a well-run family, where each child is noticed, encouraged and held to a high standard.",
          "That conviction has not changed. We keep classes small, we give teachers the time to know their students, and we protect the unhurried rhythm of the school day, because children think best when they are not rushed.",
          "We are proud of our results, but we are prouder of the people our students become: curious, kind and able to think for themselves.",
        ],
      },
      {
        kind: "cards",
        title: "Three things we hold to.",
        tone: "sage",
        numbered: true,
        items: [
          { title: "Every child is known", body: "Classes are sized so there is always a lively group to learn alongside, and always a teacher who notices the quiet child, the restless child and the one who has just had a breakthrough." },
          { title: "Thinking comes first", body: "We teach children to reason, question and make things, so results follow from understanding rather than rehearsal." },
          { title: "Room to grow", body: "Music, sport, the outdoors and service sit beside academics, because character is built in the spaces between lessons." },
        ],
      },
      { kind: "children", title: "Get to know us" },
    ],
    cta: visitCta("Better than any page, a morning on campus.", "Walk the grounds, sit in on a lesson and talk with the people who would teach your child."),
  },
  {
    path: "/about/history",
    title: "History",
    eyebrow: "About us",
    h1: "A short history.",
    lede: "Oxford International High School began in Cubbonpet, Bengaluru, in 2012.",
    description: "The story of Oxford International High School, which opened in Cubbonpet, Bengaluru, in 2012.",
    blocks: [
      {
        kind: "timeline",
        title: "Over the years",
        items: [
          { year: "2012", text: "Oxford International High School opens in Cubbonpet, Bengaluru, and welcomes its first children." },
        ],
      },
    ],
    cta: visitCta("Come and see where it all happens.", "A morning on campus tells you more than any timeline."),
  },
  {
    path: "/about/vision-mission",
    title: "Vision and mission",
    eyebrow: "About us",
    h1: "What we aim for, and how we get there.",
    lede: "Excellence in education is the standard we hold ourselves to. Our vision is where we aim. Our mission is how we get there, every day.",
    description: "The vision, mission and values that guide Oxford International High School.",
    blocks: [
      {
        kind: "cards",
        title: "Vision and mission",
        cols: 2,
        items: [
          { title: "Our vision", body: "To be an institution of the highest standard, where every student is inspired to dream big and is equipped to achieve those dreams." },
          { title: "Our mission", body: "To deliver an education of the highest quality, with a rigorous curriculum, consistent standards and clear expectations, and to motivate every student, from Nursery to Grade 10, to aim high and bring out the best in themselves." },
        ],
      },
      {
        kind: "cards",
        title: "The values we teach by living them.",
        tone: "sage",
        items: [
          { title: "Excellence", body: "We hold every student, and ourselves, to the highest standard." },
          { title: "Aspiration", body: "We encourage students to dream big and to work towards those dreams." },
          { title: "Discipline", body: "We value effort, consistency and the habits that turn ability into achievement." },
          { title: "Integrity", body: "We do the right thing, including when nobody is watching." },
        ],
      },
    ],
    cta: visitCta("See our values in a classroom.", "Spend a morning with us and judge for yourself."),
  },
  {
    path: "/about/principals-message",
    title: "Principal’s message",
    eyebrow: "About us",
    h1: "A message from the Principal.",
    lede: "A few words for families who are thinking of joining us.",
    description: "A welcome message from the Principal of Oxford International High School.",
    blocks: [
      {
        kind: "letter",
        paragraphs: [
          "Dear parents,",
          "When families visit, they often tell us the same thing: that the school feels calm. That calm is deliberate. It is what lets a nervous three-year-old speak up for the first time, and what lets a fifteen-year-old admit they are not yet sure what to study.",
          "Excellence in education is what we work towards every day, and for us it begins with warmth. A child who feels safe dares to try, and a child who dares to try will surprise you, and themselves, with what they can do.",
          "Choosing a school is one of the biggest decisions you will make for your child. Take your time, ask hard questions and compare us honestly with every other school you visit. We will gladly answer any of them.",
          "Please come and see Oxford for yourself. Bring your questions, and your child, and stay as long as you like.",
        ],
        name: "Shri Smt Lakshmishashidhar",
        role: "Principal",
      },
    ],
    cta: visitCta("Come and meet us.", "The best answer to any question is a conversation.", { label: "Contact us", href: "/contact" }),
  },
  {
    path: "/about/leadership",
    title: "Leadership",
    eyebrow: "About us",
    h1: "The people who lead the school.",
    lede: "The Principal leads the school and is happy to meet families on every school day.",
    description: "Meet the leadership team of Oxford International High School.",
    blocks: [
      {
        kind: "people",
        title: "Who you will meet",
        items: [
          { name: "Shri Smt Lakshmishashidhar", role: "Principal" },
        ],
      },
    ],
    cta: visitCta("Meet them in person.", "Our leaders welcome visitors on every school day."),
  },

  // ------------------------------------------------------------ Academics
  {
    path: "/academics",
    title: "Academics",
    eyebrow: "Academics",
    h1: "Learning that goes deep, and stays kind.",
    lede: "Our curriculum is broad and demanding, and our classrooms are calm. Children learn to think clearly, write well and enjoy being stretched.",
    description: "How teaching and learning grow with your child at Oxford, from Nursery to Grade 10.",
    blocks: [
      {
        kind: "cards",
        title: "Three principles in every classroom.",
        items: [
          { title: "Depth over speed", body: "Long lesson blocks and fewer subjects at a time let children go further into an idea before moving on." },
          { title: "Teaching that responds", body: "Teachers adjust to what each class needs, with support for children who need it and stretch for those who are ready." },
          { title: "Assessment that informs", body: "Regular, low-pressure feedback tells families where a child is and what comes next." },
        ],
      },
      { kind: "stages", title: "One school, four stages.", lede: "Each stage is gentle about what it asks and generous in what it offers." },
      { kind: "children", title: "More about how we teach", paths: ["/academics/curriculum", "/academics/teaching-methodology"] },
    ],
    cta: visitCta("Sit in on a lesson.", "The clearest picture of how we teach is a classroom in session. We would be glad to show you.", { label: "Admissions", href: "/admissions" }),
  },
  {
    path: "/academics/curriculum",
    title: "Curriculum",
    eyebrow: "Academics",
    h1: "A curriculum held to the highest standard.",
    lede: "Families should never have to wonder whether the education is good enough. We build, review and teach our curriculum so that it stands with the best in our community.",
    description: "How Oxford International High School builds and maintains a high-quality curriculum from Nursery to Grade 10.",
    blocks: [
      {
        kind: "split",
        title: "Our promise to families.",
        paragraphs: [
          "Whatever the stage, your child follows a carefully planned programme that is rigorous in its core subjects, broad in its range and honest in how progress is measured.",
          "We do not teach to a ranking or a slogan. We teach so that a child leaves each grade understanding more, writing better and wondering about more than when they arrived.",
        ],
      },
      {
        kind: "cards",
        title: "How we keep it that way.",
        tone: "sage",
        cols: 2,
        items: [
          { title: "A rigorous core", body: "Languages, mathematics, science and social science are taught with depth at every stage, never squeezed to make room for the extras." },
          { title: "Reviewed every year", body: "Subject teams look at what is taught and how it is assessed each year, so it stays current and demanding." },
          { title: "Teachers who keep learning", body: "Our teachers train regularly and share what works with one another." },
          { title: "Measured honestly", body: "Families receive clear, regular feedback on progress, not just a number at the end of the year." },
        ],
      },
      {
        kind: "checklist",
        title: "What every child can expect.",
        items: [
          "Confident reading and clear writing in more than one language",
          "A real understanding of numbers, not only tricks to get answers",
          "Science learned by doing: observing, testing and explaining",
          "Knowledge of society, history and the environment, and a sense of responsibility towards them",
          "Music, art, photography and physical education every week",
          "Digital skills used thoughtfully and safely, including coding, photography and visual storytelling",
          "Regular feedback shared with families",
        ],
      },
      { kind: "stages", title: "See it stage by stage." },
    ],
    cta: visitCta("Ask us anything about what is taught.", "Our teachers enjoy explaining how and why."),
  },
  {
    path: "/academics/teaching-methodology",
    title: "Teaching methodology",
    eyebrow: "Academics",
    h1: "How we teach.",
    lede: "Good teaching is mostly good attention. This is what that looks like in our classrooms.",
    description: "The teaching methods used at Oxford International High School, from Nursery to Grade 10.",
    blocks: [
      {
        kind: "steps",
        title: "A typical lesson.",
        items: [
          { title: "Begin with a question", body: "Children meet an idea through a puzzle, a story or something they can touch." },
          { title: "Learn together", body: "The teacher explains clearly, and pupils discuss in pairs and small groups." },
          { title: "Practise with support", body: "Everyone practises at a suitable level, with a teacher close by." },
          { title: "Reflect and check", body: "Children explain what they learned, and the teacher notes what to do next." },
        ],
      },
      {
        kind: "cards",
        title: "Support for every learner.",
        tone: "sage",
        items: [
          { title: "Extra help", body: "Short, friendly sessions for children who are finding a topic hard." },
          { title: "Room to stretch", body: "Harder problems and wider reading for children who are ready." },
          { title: "Language support", body: "Gentle help for children who are new to the language of instruction." },
        ],
      },
      { kind: "day", title: "A day at school", lede: "Here is how an ordinary day unfolds." },
    ],
    cta: visitCta("Watch a lesson for yourself.", "Visitors are welcome in classrooms on every school day."),
  },
  ...(["early-years", "primary", "middle-school", "secondary"] as const).map((slug): Page => {
    const copy = {
      "early-years": { title: "Early Years", h1: "Early Years: Nursery to UKG.", lede: "The first years of school should feel like an invitation. Ours are gentle, playful and full of stories.", description: "Early Years at Oxford International High School: Nursery, LKG and UKG." },
      primary: { title: "Primary", h1: "Primary: Grades 1 to 5.", lede: "Children gain confidence in the fundamentals and start asking bigger questions.", description: "Primary education at Oxford International High School, Grades 1 to 5." },
      "middle-school": { title: "Middle school", h1: "Middle School: Grades 6 to 8.", lede: "A time of change, handled with care, with a mentor for every student.", description: "Middle school at Oxford International High School, Grades 6 to 8." },
      secondary: { title: "Secondary", h1: "Secondary: Grades 9 and 10.", lede: "Careful preparation for the important years, alongside growing independence.", description: "Secondary education at Oxford International High School, Grades 9 and 10." },
    }[slug];
    return {
      path: `/academics/${slug}`,
      eyebrow: "Academics",
      ...copy,
      blocks: [{ kind: "stage", slug }, { kind: "stages", title: "The other stages" }],
      cta: visitCta("See this stage in action.", "Ask to visit the classrooms for this stage during your enquiry.", { label: "Curriculum", href: "/academics/curriculum" }),
    };
  }),

  // ----------------------------------------------------------- Admissions
  {
    path: "/admissions",
    title: "Admissions",
    eyebrow: "Admissions",
    h1: "Joining Oxford, step by gentle step.",
    lede: "Choosing a school is a big decision, and we want you to make it with all the information you need and none of the pressure.",
    description: "How joining Oxford works: an enquiry, a visit, a conversation and a warm welcome.",
    blocks: [
      {
        kind: "steps",
        title: "Four steps, at your pace.",
        items: [
          { title: "Enquire", body: "Fill in one short form, or call us. Tell us about your child and, if you like, a day you would like to visit." },
          { title: "Eligibility check", body: "Within two working days, our admissions office will get in touch to check your child’s eligibility and invite you for the admission interaction." },
          { title: "Admission interaction", body: "Younger children join us for an informal interaction. From Grade 1 onwards, children are invited for a short admission assessment. You will also meet the Principal and the teachers of your child’s stage." },
          { title: "Complete admission", body: "Bring the documents on our list. We talk through the fees with you in person, confirm your child’s place in writing, and your child meets their new class before the first day." },
        ],
      },
      { kind: "children", title: "Everything you need to know", extra: [{ title: "Admission enquiry", body: "Start here: one short form, with an optional visit date.", href: "/admissions/enquiry" }] },
    ],
    cta: visitCta("Begin with a conversation.", "Tell us a little about your child, and choose a day to visit if you like. Within two working days, our admissions office will get in touch to check your child’s eligibility and invite you for the admission interaction.", { label: "Contact us", href: "/contact" }),
  },
  {
    path: "/admissions/eligibility",
    title: "Eligibility",
    eyebrow: "Admissions",
    h1: "Who can join, and when.",
    lede: "Entry ages and grades at a glance. If your child is a little outside these, please ask.",
    description: "Age and grade eligibility for admission to Oxford International High School, Nursery to Grade 10.",
    blocks: [
      {
        kind: "table",
        title: "Typical entry ages",
        lede: "Our office confirms your child’s eligibility against the official age rule when you apply.",
        head: ["Class", "Age at entry"],
        rows: [
          ["Nursery", "3 years or above"],
          ["LKG", "4 years or above"],
          ["UKG", "5 years or above"],
          ["Grade 1", "6 years or above"],
          ["Grades 2 to 10", "Based on the previous grade, recent school reports and a short admission assessment"],
        ],
      },
      {
        kind: "split",
        title: "Joining mid-year",
        paragraphs: [
          "Often, yes. If there is a place in the right class, we are happy to welcome new students at any point in the year.",
          "Younger children join us for an informal interaction. From Grade 1 onwards, children are invited for a short admission assessment. We also look at recent school reports together with you.",
        ],
      },
    ],
  },
  {
    path: "/admissions/requirements",
    title: "Documents",
    eyebrow: "Admissions",
    h1: "What to bring.",
    lede: "A short list. If something is missing, tell us and we will work it out together.",
    description: "Documents required for admission to Oxford International High School.",
    blocks: [
      {
        kind: "checklist",
        title: "Documents for admission",
        lede: "Bring the originals and we will take copies.",
        items: [
          "Your child’s birth certificate",
          "Four recent passport-sized photographs of your child",
          "Proof of residential address, such as an Aadhaar card or a recent utility bill",
          "Photo identification of both parents, or of the guardian",
          "The most recent report card (Grade 1 onwards)",
          "A transfer certificate from the previous school, if your child is moving (Grade 1 onwards)",
          "Your child’s immunisation record (Early Years)",
          "Anything about your child’s health or needs that you would like us to know (optional)",
        ],
      },
    ],
  },
  {
    path: "/admissions/faqs",
    title: "FAQs",
    eyebrow: "Admissions",
    h1: "Questions families often ask.",
    lede: "Not here? Call us or send an enquiry, and we will answer personally.",
    description: "Answers to common questions about admission, classes, the school day and joining mid-year at Oxford International High School.",
    blocks: [
      {
        kind: "faq",
        title: "Good to know",
        items: [
          { q: "Which classes do you offer, and what age should my child be?", a: "We teach from Nursery to Grade 10. Nursery is for children who are 3 or above, LKG for 4 or above, UKG for 5 or above and Grade 1 for 6 or above. Our office will confirm your child’s eligibility when you apply." },
          { q: "What are the school timings?", a: "Weekdays are full days, from 8:00 am to 4:00 pm. On Saturdays we run half days, from 8:00 am to 11:00 am." },
          { q: "When should we apply?", a: "We accept enquiries throughout the year, but places are usually offered in the months before the new academic year. Earlier conversations are always welcome, even if you are still deciding." },
          { q: "Is there an admission test?", a: "Younger children join us for an informal interaction. From Grade 1 onwards, children are invited for a short admission assessment. It helps us understand where your child is, so that we can place them in the right class." },
          { q: "What are the fees?", a: "Fees differ by class. Our office will talk you through the current schedule in person when you visit or call, so that you have the full picture." },
          { q: "Can our child join mid-year?", a: "Often, yes. If there is a place in the right class, we are happy to welcome new students during the year. Call us and we will tell you what is available." },
          { q: "Which documents do we need?", a: "Your child’s birth certificate, passport-sized photographs, proof of address and parents’ identification, plus a recent report card and transfer certificate from Grade 1 onwards. See the full list on our Documents page. Bring the originals on your visit and we will take copies." },
          { q: "How large are the classes?", a: "Classes are sized to be big enough for friendships, teamwork and good discussion, and small enough that every child is known by name and no one is lost at the back of the room." },
          { q: "How do we book a visit?", a: `Use the admission enquiry form and choose a preferred day, or call us on ${site.phone} or ${site.phone2}. Within two working days, our admissions office will get in touch to check your child’s eligibility and fix the visit and the admission interaction.` },
          { q: "Where are you, and how do we find the right building?", a: "We are in Cubbonpet, Bengaluru. Our blocks are on a few different cross roads, so please call us before your first visit and we will guide you to the right one. The Get directions link on our Contact page opens the main location on Google Maps." },
          { q: "Do you offer transport and meals?", a: "Please ask our office about the arrangements for your area and your child’s class." },
        ],
      },
    ],
  },

  // ----------------------------------------------------------- Activities
  {
    path: "/activities",
    title: "Activities",
    eyebrow: "Activities",
    h1: "Where the best learning often happens between lessons.",
    lede: "A full school life is not an extra. It is where children find friends, discover talents they didn’t know they had, and learn to take part.",
    description: "Sports, clubs, arts, celebrations, trips and service: the life at Oxford beyond the timetable.",
    blocks: [
      {
        kind: "cards",
        title: "Beyond the timetable.",
        items: [
          { icon: "music", title: "Music and drama", body: "Choirs, instruments, a school band and stage productions, open to every student who wants a part." },
          { icon: "trophy", title: "Sport", body: "Team and individual sport for all abilities, with an emphasis on taking part, improving and playing fair." },
          { icon: "leaf", title: "The outdoors", body: "Gardening, nature walks and weekly time outside, from the youngest years upward." },
          { icon: "heart", title: "Service", body: "Older students lead projects in the local community, learning that responsibility is part of belonging." },
          { icon: "book", title: "Reading and writing", body: "Storytelling sessions, a student magazine and regular reading time for every age." },
          { icon: "users", title: "Care and belonging", body: "Teachers who also act as counsellors for their classes, so every child has a trusted adult to talk to." },
        ],
      },
      {
        kind: "chips",
        title: "Something for every kind of curiosity.",
        lede: "Clubs run every term, and students are encouraged to start their own. A few favourites:",
        items: ["Chess", "Quiz", "Debate", "Model United Nations", "School band", "Photography", "Coding", "Art", "Music", "Dance", "Drama", "Yoga", "Football", "Cricket", "Kho-kho"],
      },
      { kind: "children", title: "Explore by interest" },
    ],
    cta: visitCta("Meet the students who will show you around.", "On every visit, current students lead the tour. Ask them anything; they’ll tell you what it’s really like.", { label: "Latest news", href: "/news" }),
  },
  {
    path: "/activities/sports",
    title: "Sports",
    eyebrow: "Activities",
    h1: "Sport for every child.",
    lede: "Whether a child dreams of the team or just wants to run around with friends, there is a place for them on the field.",
    description: "Sports and physical education at Oxford International High School.",
    blocks: [
      {
        kind: "cards",
        title: "On the field",
        items: [
          { icon: "trophy", title: "Team games", body: "Cricket, football, kho-kho and more, coached with a focus on fairness and enjoyment." },
          { icon: "star", title: "Athletics and fitness", body: "Running, jumping and throwing events, and fitness that children can enjoy for life." },
          { icon: "leaf", title: "Yoga and wellbeing", body: "Short, calming sessions to build focus and flexibility." },
          { icon: "flag", title: "House competitions", body: "Friendly rivalry between houses, with every child taking part." },
        ],
      },
      { kind: "topic", topic: "Sports", title: "Latest from the sports field", empty: "Sports news will appear here as it happens." },
    ],
    cta: visitCta("Come and see the games in action.", "Ask about sports during your visit."),
  },
  {
    path: "/activities/clubs",
    title: "Clubs",
    eyebrow: "Activities",
    h1: "Clubs and societies.",
    lede: "Every term, students choose clubs that match their curiosity, and they are welcome to start one of their own.",
    description: "Clubs and societies at Oxford International High School.",
    blocks: [
      {
        kind: "chips",
        title: "A few favourites",
        items: ["Chess", "Quiz", "Debate", "Model United Nations", "School band", "Photography", "Coding", "Art", "Dance", "Drama", "Yoga", "Football", "Cricket", "Kho-kho"],
      },
      {
        kind: "cards",
        title: "How clubs work",
        tone: "sage",
        items: [
          { title: "Choose what you love", body: "Students sign up each term and can change as their interests grow." },
          { title: "Led by students", body: "Older students help run sessions, and every club has a teacher mentor." },
          { title: "Start your own", body: "Got an idea for a club? A teacher will help you get it going." },
        ],
      },
      { kind: "topic", topic: "Clubs", title: "Clubs in the news", empty: "Club news will appear here as it happens." },
    ],
  },
  {
    path: "/activities/arts-culture",
    title: "Arts and culture",
    eyebrow: "Activities",
    h1: "Arts and culture.",
    lede: "Music, dance, drama and art give every child a way to express what words alone cannot.",
    description: "Music, dance, drama and art at Oxford International High School.",
    blocks: [
      {
        kind: "cards",
        title: "Make something",
        items: [
          { icon: "music", title: "Music", body: "Singing, instruments and a school band for every level." },
          { icon: "star", title: "Dance and drama", body: "Performances prepared over many weeks, with a part for everyone who wants one." },
          { icon: "palette", title: "Visual art", body: "Drawing, painting, craft, clay and photography, with the work displayed around the school." },
          { icon: "flag", title: "Cultural traditions", body: "Songs, stories and crafts from the many traditions our families bring." },
        ],
      },
      { kind: "topic", topic: "Arts and culture", title: "Latest from the stage and studio", empty: "Arts news will appear here as it happens." },
    ],
  },
  {
    path: "/activities/celebrations",
    title: "Celebrations",
    eyebrow: "Activities",
    h1: "Celebrations and competitions.",
    lede: "National days, festivals, annual day and friendly competitions give the school year its rhythm.",
    description: "Celebrations, annual day and competitions at Oxford International High School.",
    blocks: [
      {
        kind: "cards",
        title: "Through the year",
        items: [
          { icon: "flag", title: "National days", body: "Flag hoisting, songs and speeches prepared by students." },
          { icon: "star", title: "Festivals", body: "Shared celebrations that help children understand and respect one another’s traditions." },
          { icon: "music", title: "Annual day", body: "An evening where every stage takes the stage." },
          { icon: "trophy", title: "Competitions", body: "Quizzes, debates and contests within the school and with others." },
        ],
      },
      { kind: "topic", topic: "Celebrations", title: "Recent celebrations", empty: "Celebrations will be shared here as they happen." },
    ],
  },
  {
    path: "/activities/trips",
    title: "Trips",
    eyebrow: "Activities",
    h1: "Learning beyond the school gate.",
    lede: "A well-planned trip can teach a child more in a day than a week of reading about the same thing.",
    description: "Educational trips and excursions at Oxford International High School.",
    blocks: [
      {
        kind: "cards",
        title: "Trips with a purpose",
        items: [
          { icon: "map", title: "Places to learn", body: "Museums, farms, science centres and historic sites linked to what children study." },
          { icon: "users", title: "Careful supervision", body: "Trips are planned in advance and staffed carefully, with parents informed beforehand." },
          { icon: "book", title: "Back in class", body: "Children use what they saw in their writing, art and projects." },
        ],
      },
      { kind: "topic", topic: "Trips", title: "Recent trips", empty: "Trip reports will appear here as they happen." },
    ],
  },
  {
    path: "/activities/community-service",
    title: "Community service",
    eyebrow: "Activities",
    h1: "Learning to give back.",
    lede: "Children grow most when they are trusted to help someone else.",
    description: "Community service and social initiatives at Oxford International High School.",
    blocks: [
      {
        kind: "cards",
        title: "How students help",
        items: [
          { icon: "leaf", title: "Looking after the environment", body: "Tree planting, recycling and caring for the school garden." },
          { icon: "heart", title: "Helping our neighbours", body: "Collection drives and visits that older students plan and lead." },
          { icon: "users", title: "Reading buddies", body: "Older children read with younger ones, and both learn." },
        ],
      },
      { kind: "topic", topic: "Community", title: "Service in action", empty: "Service stories will appear here as they happen." },
    ],
  },
  {
    path: "/activities/achievements",
    title: "Achievements",
    eyebrow: "Activities",
    h1: "Student achievements.",
    lede: "Prizes matter, and so do small victories. Here is some of what our students have done lately.",
    description: "Achievements and awards of students at Oxford International High School.",
    blocks: [
      { kind: "topic", topic: "Achievements", title: "Recent achievements", empty: "Achievements will be added here as they are earned." },
    ],
  },

  // ---------------------------------------------------------------- Legal
  {
    path: "/privacy-policy",
    title: "Privacy policy",
    eyebrow: "Privacy",
    h1: "How we look after your information.",
    lede: "A plain-language summary of what we collect, why, and for how long.",
    description: "How Oxford International High School handles the information you share with us.",
    cta: false,
    blocks: [
      {
        kind: "sections",
        items: [
          { heading: "What we collect", paragraphs: ["When you send an enquiry, request a visit or contact us, we collect the details you enter in the form: your name, email address, optional phone number, your child’s stage and your message. Our forms are hosted by Google, and the answers are stored in the school’s Google account, which only authorised staff can open."] },
          { heading: "News submissions", paragraphs: ["If you send us an article for the news pages, our team reads it first. If we publish it, the title, text, date and the author name you gave appear on this website. Please do not include children’s full names or photographs unless a parent has agreed. To have an article removed, please contact the school office using the details on our contact page."] },
          { heading: "How we use it", paragraphs: ["We use these details only to reply to you and to arrange visits. We do not sell them or share them with third parties for marketing."] },
          { heading: "How long we keep it", paragraphs: ["We keep enquiry details only for as long as we need them to reply to you and to manage admissions."] },
          { heading: "Your choices", paragraphs: ["You can ask to see, correct or delete your information at any time by contacting the school office using the details on our contact page. Photographs of children are published only with a parent’s consent."] },
        ],
      },
    ],
  },
  {
    path: "/terms-of-use",
    title: "Terms of use",
    eyebrow: "Legal",
    h1: "Terms of use.",
    lede: "The simple rules for using this website.",
    description: "Terms of use for the Oxford International High School website.",
    cta: false,
    blocks: [
      {
        kind: "sections",
        items: [
          { heading: "About this website", paragraphs: ["This website gives information about the school. We try to keep it accurate and up to date, but details such as dates and procedures can change, so please confirm important points with the school office."] },
          { heading: "Content", paragraphs: ["The text, images and logo on this website belong to the school or are used with permission. Please do not copy them for other purposes without asking."] },
          { heading: "Links to other websites", paragraphs: ["We link to other websites, such as forms and maps. We are not responsible for their content or how they handle your information."] },
          { heading: "Changes", paragraphs: ["We may update these terms from time to time. The version on this page is the current one."] },
        ],
      },
    ],
  },
  {
    path: "/accessibility",
    title: "Accessibility",
    eyebrow: "Accessibility",
    h1: "Accessibility statement.",
    lede: "We want everyone to be able to use this website.",
    description: "Accessibility statement for the Oxford International High School website.",
    cta: false,
    blocks: [
      {
        kind: "sections",
        items: [
          { heading: "Our aim", paragraphs: ["We aim to make this website usable by as many people as possible, including those who use screen readers, keyboards only, or larger text. We build to the Web Content Accessibility Guidelines (WCAG) 2.2, level AA, as our target."] },
          { heading: "What we do", paragraphs: ["Pages use clear headings and landmarks, text has strong contrast, interactive elements can be reached with the keyboard, and images carry text descriptions. Movement on the site is minimal and stops when your device is set to reduce motion."] },
          { heading: "Tell us about a problem", paragraphs: ["If you find something hard to use, please tell us through the contact page or by phone, and we will work with you to fix it or give you the information another way."] },
        ],
      },
    ],
  },
];

const byPath = new Map(pages.map((p) => [p.path, p]));

export const getPage = (path: string) => byPath.get(path);

export const childrenOf = (path: string) =>
  pages.filter((p) => p.path.startsWith(`${path}/`) && p.path.split("/").length === path.split("/").length + 1);

// Breadcrumb trail for a registry path. Parents come from the registry when they exist there.
export function crumbsFor(path: string) {
  const parts = path.split("/").filter(Boolean);
  const trail: { label: string; href: string }[] = [];
  for (let i = 1; i < parts.length; i++) {
    const href = `/${parts.slice(0, i).join("/")}`;
    const parent = byPath.get(href);
    if (parent) trail.push({ label: parent.title, href });
  }
  return trail;
}
