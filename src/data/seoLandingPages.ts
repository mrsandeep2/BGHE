export interface SeoLandingSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface SeoLandingFaq {
  question: string;
  answer: string;
}

export interface SeoLandingLink {
  label: string;
  path: string;
  description: string;
}

export interface SeoLandingPageConfig {
  slug: string;
  title: string;
  description: string;
  keywords: string;
  h1: string;
  eyebrow: string;
  intro: string[];
  heroPills: string[];
  sections: SeoLandingSection[];
  faqs: SeoLandingFaq[];
  relatedLinks: SeoLandingLink[];
}

export const seoLandingPages: Record<string, SeoLandingPageConfig> = {
  "bghe-bihar": {
    slug: "bghe-bihar",
    title: "Bharat Group of Higher Education Bihar | BGHE Admission Support",
    description: "Bharat Group of Higher Education in Bihar offers university admission support, DRCC guidance, BSCC help, and higher education counseling for students.",
    keywords: "bharat group of higher education bihar, bharat group bihar, bghe bihar, higher education guidance Bihar, college admission Bihar",
    h1: "Bharat Group of Higher Education in Bihar",
    eyebrow: "BGHE Bihar",
    intro: [
      "Bharat Group of Higher Education supports students across Bihar who need practical help with college admission, university selection, distance education options, and scheme-based guidance such as DRCC and BSCC related counseling.",
      "This page is designed for students and parents searching for Bharat Group of Higher Education Bihar, BGHE Bihar, or trusted admission support in Bihar. It brings together the core information Google users expect to see on a clear brand-led landing page.",
    ],
    heroPills: ["BGHE Bihar", "Admission Support", "DRCC Guidance", "BSCC Awareness", "Higher Education Help"],
    sections: [
      {
        title: "What BGHE does for Bihar students",
        paragraphs: [
          "BGHE focuses on simplifying the admission journey for students who want better clarity before choosing a course, university, branch location, or financing path. Many students know the course they want but are still uncertain about eligibility, documentation, deadlines, or whether a program fits their budget and long-term goals.",
          "The role of BGHE is to reduce that confusion. Students can explore courses, compare university options, understand regular versus distance education, and get guidance on admission-related paperwork from a team that understands the Bihar student context.",
        ],
        bullets: [
          "Course and university shortlisting",
          "Admission counseling for UG and PG students",
          "Distance education guidance",
          "DRCC and BSCC awareness support",
          "Inquiry and branch-based counseling support",
        ],
      },
      {
        title: "Why Bihar-focused SEO matters for BGHE",
        paragraphs: [
          "Students do not only search for a brand name. They also search by location and need, such as college admission Bihar, higher education support Bihar, DRCC admission help Bihar, and university admission counseling in Bihar. A dedicated Bihar page lets BGHE rank for both branded and local-intent searches.",
          "That is why this page is written around Bihar-specific language, local branch references, and admission support intent rather than generic education marketing language. The objective is to help users quickly confirm that BGHE is relevant to their state, their admission journey, and their scheme-related questions.",
        ],
      },
      {
        title: "What to do next",
        paragraphs: [
          "If you are comparing institutions, start with the courses page and the university collaboration page. If your priority is funding or documentation, review the DRCC support information and contact the team for one-to-one guidance.",
          "Students who already know what they want should use the contact or inquiry form immediately. That shortens the admission cycle and helps BGHE guide you toward the right program faster.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is Bharat Group of Higher Education in Bihar?",
        answer: "BGHE is an education guidance and admission support organization helping Bihar students with course selection, university guidance, DRCC-related support, and admission counseling.",
      },
      {
        question: "Does BGHE help only with Bihar admissions?",
        answer: "BGHE is strongly focused on Bihar students and Bihar-related search intent, but it also helps students explore universities and programs beyond one city or district.",
      },
      {
        question: "Can BGHE help with distance education and regular courses?",
        answer: "Yes. BGHE can guide students on regular, professional, and distance education options depending on eligibility, goals, and budget.",
      },
    ],
    relatedLinks: [
      { label: "Explore Courses", path: "/courses", description: "Compare UG, PG, and professional courses." },
      { label: "View Universities", path: "/universities", description: "Check partner universities and study options." },
      { label: "DRCC Guidance", path: "/bghe-drcc", description: "Understand DRCC-focused admission support." },
      { label: "BSCC Support", path: "/bghe-bscc", description: "Learn about BSCC and MNSSBY guidance." },
      { label: "Contact BGHE", path: "/contact", description: "Speak with the BGHE team directly." },
    ],
  },
  "bghe-admission": {
    slug: "bghe-admission",
    title: "BGHE Admission Support | College and University Admission Bihar",
    description: "Get BGHE admission support for college and university admission in Bihar, including course selection, university guidance, documents, and application help.",
    keywords: "bghe admission, bghe admission bihar, bharat group admission, college admission bihar, university admission support bihar",
    h1: "BGHE Admission Support for Bihar Students",
    eyebrow: "Admission Help",
    intro: [
      "Students searching for BGHE admission or BGHE admission Bihar usually want one thing: a reliable path from confusion to confirmed admission. This page explains how BGHE supports that process for students across Bihar.",
      "Instead of leaving students to compare universities, check eligibility, collect documents, and interpret admission options on their own, BGHE provides a structured admission support experience that connects courses, universities, and counseling in one place.",
    ],
    heroPills: ["BGHE Admission", "University Counseling", "Documents Help", "Regular + Distance Programs", "Bihar Students"],
    sections: [
      {
        title: "How BGHE supports the admission process",
        paragraphs: [
          "Admission support is not just filling a form. It starts with understanding what the student wants to study, what budget they can manage, what type of learning mode is suitable, and which institutions fit those conditions. BGHE works at that practical level.",
          "The most valuable part of admission counseling is clarity. Students get help choosing a course, understanding university options, checking documents, and identifying the next steps before they lose time on the wrong application path.",
        ],
        bullets: [
          "Admission guidance for UG, PG, and professional courses",
          "University comparison and shortlisting",
          "Document checklist support",
          "Counseling for regular and distance education",
          "Fast inquiry-to-contact process",
        ],
      },
      {
        title: "Why this page targets admission searches in Bihar",
        paragraphs: [
          "Searches like college admission Bihar and university admission Bihar are high-intent terms. A student using those queries is usually close to action. By pairing those terms with BGHE-specific brand language, this page helps the site become more visible for both discovery and conversion searches.",
          "The content is intentionally written in a service-first tone so that both Google and real users can see the connection between BGHE, Bihar-based search intent, and actual admission support services.",
        ],
      },
      {
        title: "Best next steps for students",
        paragraphs: [
          "If you are still exploring programs, review the courses page first. If you already have a shortlist, move to the universities page. If you need funding or scheme-related clarity, visit the DRCC and BSCC pages before contacting the team.",
          "The shortest conversion path is simple: review the relevant page, submit an inquiry, and let BGHE guide you toward the right next step instead of restarting the process repeatedly.",
        ],
      },
    ],
    faqs: [
      {
        question: "What does BGHE admission support include?",
        answer: "It includes course guidance, university selection support, document planning, and counseling for students looking for admission help in Bihar.",
      },
      {
        question: "Can BGHE help with distance education admission?",
        answer: "Yes. Students can get support for both distance education and regular admission options depending on their goals and eligibility.",
      },
      {
        question: "Who should use the BGHE admission page?",
        answer: "Students, parents, and guardians looking for trusted admission help in Bihar or searching for BGHE admission-related support should start here.",
      },
    ],
    relatedLinks: [
      { label: "Courses", path: "/courses", description: "Review admission-ready course options." },
      { label: "Universities", path: "/universities", description: "See study destinations and partner universities." },
      { label: "College Admission Bihar", path: "/college-admission-bihar", description: "Local admission guide for Bihar students." },
      { label: "Contact", path: "/contact", description: "Talk to the admissions support team." },
      { label: "Blog", path: "/blog", description: "Read admission and scheme guidance articles." },
    ],
  },
  "bghe-drcc": {
    slug: "bghe-drcc",
    title: "BGHE DRCC Admission Help | DRCC Guidance in Bihar",
    description: "BGHE DRCC admission help for Bihar students with counseling on eligibility, documents, college selection, and the DRCC admission support process.",
    keywords: "bghe drcc, bghe drcc admission, drcc admission help bihar, drcc guidance bihar, student credit card support Bihar",
    h1: "BGHE DRCC Admission Guidance in Bihar",
    eyebrow: "DRCC Support",
    intro: [
      "Students searching for BGHE DRCC or BGHE DRCC admission usually need help understanding how DRCC-related admission guidance fits into their higher education planning. This page gives that clarity in a focused way.",
      "DRCC support becomes more useful when it is connected to real course options, document preparation, and proper admission sequencing. BGHE helps students move from scheme awareness to admission action.",
    ],
    heroPills: ["DRCC Bihar", "Student Credit Guidance", "Document Planning", "Admission Counseling", "Course Fit"],
    sections: [
      {
        title: "What students usually need from DRCC guidance",
        paragraphs: [
          "Many students know DRCC by name but are uncertain about documents, eligible institutions, timelines, or how the admission journey should be prepared before they proceed. That is where guidance matters. BGHE helps explain the path in practical terms.",
          "Instead of treating DRCC as a separate topic, this page connects DRCC support with university choice, course eligibility, student goals, and the need for accurate documentation. That makes the process easier to understand and easier to act on.",
        ],
        bullets: [
          "Basic DRCC admission awareness",
          "Document checklist clarity",
          "Admission planning before application",
          "Course and college selection support",
          "Direct inquiry for one-to-one assistance",
        ],
      },
      {
        title: "Why BGHE can rank for DRCC intent",
        paragraphs: [
          "DRCC queries are usually intent-rich and locally specific. People search for drcc admission help Bihar, DRCC guidance Bihar, or BGHE DRCC admission when they want actionable support. This page is structured for that type of search behavior.",
          "With strong internal links to courses, contact, branches, and related blog content, this page can become a central DRCC authority page within the BGHE site architecture.",
        ],
      },
      {
        title: "What to review next",
        paragraphs: [
          "If you still need to explore study options, start with the courses page and then check universities. If you are ready to proceed with counseling, go directly to the contact page or use the inquiry form for follow-up guidance.",
          "Students researching DRCC should also read blog articles that explain documents, timelines, and application mistakes in simpler detail.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does BGHE provide DRCC admission help in Bihar?",
        answer: "BGHE provides DRCC-focused counseling and guidance for Bihar students who need clarity on documents, admission planning, and the next steps in the process.",
      },
      {
        question: "Can DRCC guidance be linked with course selection?",
        answer: "Yes. DRCC guidance is most useful when students understand which courses and institutions fit their plan, and BGHE helps make that connection.",
      },
      {
        question: "Where should I go after reading this page?",
        answer: "Review the courses and universities pages and then contact BGHE directly if you need personalized support for admission and documentation.",
      },
    ],
    relatedLinks: [
      { label: "DRCC Main Page", path: "/drcc", description: "See the existing DRCC section on the site." },
      { label: "Courses", path: "/courses", description: "Match DRCC planning with course options." },
      { label: "Universities", path: "/universities", description: "Review institutions before you apply." },
      { label: "Contact", path: "/contact", description: "Get DRCC admission guidance from BGHE." },
      { label: "Blog", path: "/blog", description: "Read detailed DRCC help articles for Bihar students." },
    ],
  },
  "bghe-bscc": {
    slug: "bghe-bscc",
    title: "BGHE BSCC and MNSSBY Support | Education Help in Bihar",
    description: "BGHE helps Bihar students understand BSCC and MNSSBY education support, eligibility, documentation, and admission guidance for higher education.",
    keywords: "bghe bscc, bghe bscc education support, bghe mnssby, bscc education scheme bihar, education support bihar",
    h1: "BGHE BSCC and MNSSBY Education Support",
    eyebrow: "BSCC and MNSSBY",
    intro: [
      "Searches for BGHE BSCC, BGHE MNSSBY, or BSCC education scheme Bihar usually come from students looking for financial clarity, eligibility understanding, and educational guidance in one place.",
      "This page is built to connect scheme-related awareness with practical admission guidance so students can understand what to prepare, what to compare, and where BGHE fits into the process.",
    ],
    heroPills: ["BSCC Support", "MNSSBY Guidance", "Bihar Students", "Education Planning", "Admission Readiness"],
    sections: [
      {
        title: "Why BSCC and MNSSBY searches need clear content",
        paragraphs: [
          "Scheme-related searches can be confusing because students often see abbreviations before they understand the full process. When the content is too generic, users leave without finding what they need. This page fixes that by speaking directly to Bihar students searching for educational support.",
          "BGHE’s role is to simplify the learning curve. Instead of forcing students to interpret policy-style language on their own, the site can explain how scheme awareness connects to course planning, documents, counseling, and final admission choices.",
        ],
        bullets: [
          "Eligibility awareness support",
          "Admission planning around scheme timelines",
          "Course and institution alignment",
          "Simple contact path for counseling",
          "Bihar-focused education support language",
        ],
      },
      {
        title: "How this page helps Google understand BGHE",
        paragraphs: [
          "This page strengthens the association between BGHE and BSCC-related search intent. That is important because scheme queries often require topical authority, not just brand mentions. The page creates a clear semantic relationship between BGHE, Bihar, education support, and MNSSBY awareness.",
          "That relevance becomes stronger when this page links to blog guides, contact options, branch pages, and course pages. Internal links help search engines see BGHE as a connected educational support website rather than a set of isolated pages.",
        ],
      },
      {
        title: "Best next step for students",
        paragraphs: [
          "If you are still unsure about a course, visit the courses page first. If you need help deciding where to study, review the universities page. If you are close to applying, move directly to the contact page and explain your requirement clearly so the team can guide you faster.",
          "Students should not wait until the last minute to understand scheme-linked requirements. Use the BGHE site as a planning resource before deadlines become a problem.",
        ],
      },
    ],
    faqs: [
      {
        question: "What does BGHE BSCC education support mean?",
        answer: "It refers to Bihar-focused educational guidance where BGHE helps students understand scheme-linked admission questions, documentation planning, and counseling options.",
      },
      {
        question: "Is MNSSBY covered under this support page?",
        answer: "Yes. This page is written to capture both BSCC and MNSSBY-related search intent for students looking for education guidance in Bihar.",
      },
      {
        question: "Where should students go after reading about BSCC and MNSSBY?",
        answer: "Students should review courses, universities, and then contact BGHE directly to discuss their case in detail.",
      },
    ],
    relatedLinks: [
      { label: "BGHE Bihar", path: "/bghe-bihar", description: "See the main BGHE Bihar landing page." },
      { label: "Courses", path: "/courses", description: "Find courses that match your plans." },
      { label: "Universities", path: "/universities", description: "Compare institutions before applying." },
      { label: "Contact", path: "/contact", description: "Talk to BGHE about scheme-linked guidance." },
      { label: "Blog", path: "/blog", description: "Read detailed BSCC and MNSSBY explainers." },
    ],
  },
  "college-admission-bihar": {
    slug: "college-admission-bihar",
    title: "College Admission Bihar | University Admission Help by BGHE",
    description: "Looking for college admission in Bihar? BGHE provides university admission help, course guidance, counseling, and support for higher education students.",
    keywords: "college admission bihar, university admission bihar, higher education admission bihar, university admission support bihar, best admission guidance bihar",
    h1: "College Admission Help in Bihar",
    eyebrow: "Bihar Admission Guide",
    intro: [
      "This landing page is built for students searching with local intent such as college admission Bihar, university admission Bihar, or higher education support Bihar. The goal is to turn those searches into useful guidance and direct action.",
      "Instead of offering generic advice, the page points students toward the exact BGHE resources that matter most: courses, universities, DRCC help, BSCC information, branches, blog guides, and direct counseling support.",
    ],
    heroPills: ["College Admission Bihar", "University Help", "Distance Education", "DRCC Support", "Contact BGHE"],
    sections: [
      {
        title: "What students need before taking admission in Bihar",
        paragraphs: [
          "Admission success usually depends on preparation, not just intention. Students need clarity on courses, eligibility, institution quality, budget, deadlines, and documentation. Without that clarity, even motivated students can lose time and make poor choices.",
          "A useful Bihar admission page should therefore do two things at once: answer broad local search intent and direct students to the exact pages where they can move forward. That is the role of this landing page inside the BGHE site.",
        ],
        bullets: [
          "Choose the right course first",
          "Compare universities before applying",
          "Understand regular vs distance options",
          "Check DRCC and BSCC relevance early",
          "Contact the BGHE team for confirmation",
        ],
      },
      {
        title: "How this page supports local SEO in Bihar",
        paragraphs: [
          "Local SEO works when a page reflects the exact language users search with. Terms like college admission Bihar, higher education guidance Bihar, and university admission help Bihar are strong intent signals. This page is optimized around those terms while keeping the content useful and readable.",
          "When combined with branches, contact details, blog posts, and supporting landing pages, this page becomes a local authority hub for Bihar-focused admission searches.",
        ],
      },
      {
        title: "Where to go from here",
        paragraphs: [
          "Students who are researching should open the courses and universities pages next. Students with specific scheme-related questions should continue to the DRCC or BSCC landing pages. Students ready to act should use the contact page or the inquiry form without delay.",
          "The strongest SEO pages are also the most useful pages. That means each visitor should leave this page knowing exactly what to do next.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can BGHE help with college admission in Bihar?",
        answer: "Yes. BGHE helps students in Bihar with admission guidance, course selection, university exploration, and related scheme awareness support.",
      },
      {
        question: "Does this page include distance education guidance?",
        answer: "Yes. The page connects students to broader BGHE resources, including distance education-related admission support.",
      },
      {
        question: "What is the best next page to visit after this one?",
        answer: "Most students should continue to the courses page, universities page, and contact page depending on whether they are still researching or ready to apply.",
      },
    ],
    relatedLinks: [
      { label: "BGHE Admission", path: "/bghe-admission", description: "See the admission-focused landing page." },
      { label: "Courses", path: "/courses", description: "Start with the right course choice." },
      { label: "Universities", path: "/universities", description: "Compare institutions and locations." },
      { label: "Branches", path: "/branches", description: "Find the nearest BGHE branch or office." },
      { label: "Contact", path: "/contact", description: "Get one-to-one admission support." },
    ],
  },
};

export const seoHubLinks: SeoLandingLink[] = [
  { label: "BGHE Bihar", path: "/bghe-bihar", description: "Brand-led Bihar landing page for BGHE searches." },
  { label: "BGHE Admission", path: "/bghe-admission", description: "Admission support page for conversion-driven queries." },
  { label: "BGHE DRCC", path: "/bghe-drcc", description: "DRCC and Bihar student credit guidance page." },
  { label: "BGHE BSCC", path: "/bghe-bscc", description: "BSCC and MNSSBY support-focused page." },
  { label: "College Admission Bihar", path: "/college-admission-bihar", description: "Local Bihar admission help landing page." },
];