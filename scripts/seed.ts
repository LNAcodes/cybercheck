import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })
import mongoose from "mongoose"
import { Category } from "../lib/models/Category"
import { Question } from "../lib/models/Question"
import type { Difficulty, OptionLetter, QuestionStatus } from "../types"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error("MONGODB_URI environment variable is not set")
  process.exit(1)
}

const categories = [
  {
    slug: "digital-privacy-surveillance",
    name: "Digital Privacy & Surveillance",
    description:
      "How personal data is collected, tracked, and used — and what protections exist.",
  },
  {
    slug: "online-harassment-safety",
    name: "Online Harassment & Safety",
    description:
      "Forms of online abuse, targeted harassment, and strategies for digital self-protection.",
  },
  {
    slug: "algorithmic-bias-ai-ethics",
    name: "Algorithmic Bias & AI Ethics",
    description:
      "How automated systems encode and amplify discrimination, and frameworks for accountability.",
  },
  {
    slug: "digital-accessibility-inclusion",
    name: "Digital Accessibility & Inclusion",
    description:
      "Standards and practices ensuring technology is usable by people with disabilities.",
  },
  {
    slug: "data-sovereignty-rights",
    name: "Data Sovereignty & Rights",
    description:
      "Who owns and controls data — especially for Indigenous and marginalized communities.",
  },
  {
    slug: "gender-based-cyber-violence",
    name: "Gender-Based Cyber Violence",
    description:
      "Technology-facilitated violence and abuse disproportionately targeting women and gender-diverse people.",
  },
  {
    slug: "cybersecurity-marginalized-communities",
    name: "Cybersecurity & Marginalized Communities",
    description:
      "Unique digital threats faced by LGBTQ+, BIPOC, and other targeted communities.",
  },
  {
    slug: "digital-divide-equity",
    name: "Digital Divide & Equity",
    description:
      "Unequal access to the internet and technology across class, geography, and identity.",
  },
  {
    slug: "platform-moderation-free-speech",
    name: "Platform Moderation & Free Speech",
    description:
      "How content moderation systems work, and how they unevenly silence marginalized voices.",
  },
  {
    slug: "surveillance-capitalism",
    name: "Surveillance Capitalism",
    description:
      "The economic model of harvesting behavioural data for profit and influence.",
  },
]

const questions: Array<{
  questionText: string
  optionA: string
  optionB: string
  optionC: string
  correctOption: OptionLetter
  explanation: string
  difficulty: Difficulty
  status: QuestionStatus
  categorySlug: string
}> = [
  // ─── Digital Privacy & Surveillance ───────────────────────────────────────
  {
    questionText: "What does end-to-end encryption protect against?",
    optionA: "Encryption only works when the sender is online",
    optionB:
      "Messages can only be read by the sender and recipient — not even the service provider",
    optionC: "Only the recipient's device is protected",
    correctOption: "B",
    explanation:
      "E2E encryption means only the communicating users can decrypt messages. The platform sees only ciphertext — so even a court order to the company cannot reveal message contents.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "digital-privacy-surveillance",
  },
  {
    questionText:
      "Why is metadata considered almost as sensitive as message content?",
    optionA: "Metadata contains the full text of every message",
    optionB:
      "Patterns of who contacts whom, when, and how often reveal relationships, health conditions, political views, and more",
    optionC: "Metadata is only collected by government agencies",
    correctOption: "B",
    explanation:
      "As former NSA director Michael Hayden noted: 'We kill people based on metadata.' Even without content, call records and location data expose intimate details of a person's life.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "digital-privacy-surveillance",
  },

  // ─── Online Harassment & Safety ───────────────────────────────────────────
  {
    questionText: "What is 'doxing'?",
    optionA:
      "Publishing someone's private personal information online without consent",
    optionB: "A type of phishing email",
    optionC: "Blocking someone on a social platform",
    correctOption: "A",
    explanation:
      "Doxing involves researching and publicly exposing private details — home addresses, phone numbers, workplaces — to enable real-world harassment or threats.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "online-harassment-safety",
  },
  {
    questionText:
      "What distinguishes a 'pile-on' from ordinary online disagreement?",
    optionA: "It involves only two people arguing",
    optionB:
      "A coordinated or organic mass targeting of one person, overwhelming them with messages at scale",
    optionC: "It is always organised by a single moderator",
    correctOption: "B",
    explanation:
      "Pile-ons leverage scale to silence and harm. Even if each individual message seems minor, the cumulative effect causes severe psychological distress and can force targets offline.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "online-harassment-safety",
  },

  // ─── Algorithmic Bias & AI Ethics ─────────────────────────────────────────
  {
    questionText:
      "Why can facial recognition systems perform worse on darker-skinned faces?",
    optionA: "The cameras used are lower quality",
    optionB:
      "Training datasets have historically overrepresented lighter-skinned faces",
    optionC: "Darker skin reflects less light in all conditions",
    correctOption: "B",
    explanation:
      "When training data is not representative, models learn skewed patterns. MIT Media Lab research found error rates for darker-skinned women up to 34.7% vs under 1% for lighter-skinned men.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "algorithmic-bias-ai-ethics",
  },
  {
    questionText:
      "What is the core civil-liberties concern with 'predictive policing' algorithms?",
    optionA: "They are too expensive for small departments",
    optionB:
      "They use historically biased arrest data to predict future crime, directing police to over-police the same communities — creating a feedback loop",
    optionC: "They only work in cities with smart infrastructure",
    correctOption: "B",
    explanation:
      "Because police have historically over-surveilled communities of colour, those communities generate more arrest records. Feeding this data into predictive models reproduces and legitimises the original bias.",
    difficulty: "ADVANCED",
    status: "APPROVED",
    categorySlug: "algorithmic-bias-ai-ethics",
  },

  // ─── Digital Accessibility & Inclusion ────────────────────────────────────
  {
    questionText:
      "What is the minimum contrast ratio recommended by WCAG 2.1 AA for normal body text?",
    optionA: "2:1",
    optionB: "3:1",
    optionC: "4.5:1",
    correctOption: "C",
    explanation:
      "WCAG 2.1 Level AA requires 4.5:1 for normal text and 3:1 for large text (18pt or 14pt bold). Sufficient contrast helps users with low vision, colour blindness, or screens in bright light.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "digital-accessibility-inclusion",
  },
  {
    questionText: "What does the ARIA 'role' attribute communicate?",
    optionA: "The visual style of an element",
    optionB:
      "The semantic purpose of an element to assistive technologies such as screen readers",
    optionC: "The database field that stores the element's data",
    correctOption: "B",
    explanation:
      "ARIA (Accessible Rich Internet Applications) roles — like role='navigation' or role='alert' — tell screen readers what an element does when native HTML semantics are insufficient.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "digital-accessibility-inclusion",
  },

  // ─── Data Sovereignty & Rights ────────────────────────────────────────────
  {
    questionText: "What does Indigenous data sovereignty refer to?",
    optionA:
      "The right of Indigenous peoples to govern how data about their communities is collected and used",
    optionB: "Government control of all internet data within a country",
    optionC: "Ownership of data by the company that collects it",
    correctOption: "A",
    explanation:
      "Indigenous data sovereignty — articulated by frameworks like CARE and OCAP — asserts that communities should control research and data involving their people, lands, and cultures.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "data-sovereignty-rights",
  },
  {
    questionText:
      "Under the GDPR, which of the following is a data subject right?",
    optionA: "The right to access your personal data and request its deletion",
    optionB: "The right to read any employee's HR file",
    optionC: "The right to opt out of all advertising worldwide",
    correctOption: "A",
    explanation:
      "The GDPR grants EU residents rights including access, rectification, erasure ('right to be forgotten'), portability, and objection to processing — enforceable against any company handling their data.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "data-sovereignty-rights",
  },

  // ─── Gender-Based Cyber Violence ──────────────────────────────────────────
  {
    questionText: "What is 'non-consensual intimate image sharing' (NCII)?",
    optionA:
      "Sharing someone's private sexual images without their consent, often as abuse or coercion",
    optionB: "Sharing health records without permission",
    optionC: "Uploading images to unsecured cloud storage",
    correctOption: "A",
    explanation:
      "NCII (commonly called 'revenge porn') is a form of gender-based violence. It is criminalised in many jurisdictions and causes severe psychological harm, including PTSD and loss of employment.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "gender-based-cyber-violence",
  },
  {
    questionText: "Which behaviour best defines 'cyberstalking'?",
    optionA: "Following a celebrity on multiple social media platforms",
    optionB:
      "Repeated, unwanted digital contact or surveillance that causes fear or distress",
    optionC: "Sending a single unsolicited email",
    correctOption: "B",
    explanation:
      "Cyberstalking combines persistence, surveillance, and intent to harass or control. It frequently accompanies physical stalking and targets women and gender-diverse people at disproportionate rates.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "gender-based-cyber-violence",
  },

  // ─── Cybersecurity & Marginalized Communities ─────────────────────────────
  {
    questionText:
      "Why might LGBTQ+ people face heightened phishing risk compared to the general population?",
    optionA: "They use older devices on average",
    optionB:
      "Attackers exploit community-specific apps and events as lures, and targets may fear reporting attacks due to potential outing",
    optionC: "They have weaker passwords on average",
    correctOption: "B",
    explanation:
      "Threat actors tailor lures to specific communities. Fear of outing or discrimination also deters victims from reporting to authorities, making LGBTQ+ people more vulnerable and less likely to seek help.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "cybersecurity-marginalized-communities",
  },
  {
    questionText: "What is 'outing' in a digital security context?",
    optionA: "Logging out of all active sessions simultaneously",
    optionB:
      "Exposing someone's sexuality, gender identity, immigration status, or other sensitive identity information without their consent",
    optionC: "Publishing an app outside a closed beta",
    correctOption: "B",
    explanation:
      "Digital outing — via hacked accounts, data leaks, or deliberate doxxing — can expose people to family rejection, employment loss, violence, or legal risk in jurisdictions where their identity is criminalised.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "cybersecurity-marginalized-communities",
  },

  // ─── Digital Divide & Equity ──────────────────────────────────────────────
  {
    questionText: "What does the term 'digital divide' primarily describe?",
    optionA:
      "The gap between the number of web pages in English versus other languages",
    optionB:
      "The unequal access to internet, devices, and digital literacy across socioeconomic, geographic, and demographic lines",
    optionC: "The technical difference between 4G and 5G networks",
    correctOption: "B",
    explanation:
      "The digital divide encompasses hardware access, broadband availability, and the skills to use technology effectively — creating compounding disadvantages for already marginalised groups.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "digital-divide-equity",
  },
  {
    questionText:
      "Which structural factor most explains why rural and low-income communities have lower broadband penetration?",
    optionA: "Rural residents prefer not to use the internet",
    optionB:
      "Sparse populations make infrastructure investment less profitable for private carriers, and low incomes create cost barriers",
    optionC: "Government regulations prohibit broadband in rural areas",
    correctOption: "B",
    explanation:
      "Market-based infrastructure deployment prioritises high-density, high-income areas. Without subsidies or public investment, rural and low-income communities are chronically underserved.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "digital-divide-equity",
  },

  // ─── Platform Moderation & Free Speech ────────────────────────────────────
  {
    questionText: "What is 'content moderation' on social platforms?",
    optionA:
      "The technical process of compressing images to reduce load times",
    optionB:
      "The review and enforcement process used to remove or restrict content that violates platform rules",
    optionC: "A government committee that reviews social media posts",
    correctOption: "B",
    explanation:
      "Content moderation can be automated (AI classifiers), human, or hybrid. Decisions about what to remove, label, or amplify have enormous power over whose voices are heard online.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "platform-moderation-free-speech",
  },
  {
    questionText:
      "How can automated content moderation disproportionately silence marginalised communities?",
    optionA:
      "Because marginalised users post more frequently, triggering rate limits",
    optionB:
      "Classifiers trained on majority-culture data may flag reclaimed slurs, dialect, or activist speech as harmful, even when it is not",
    optionC: "Automated systems only act on reports from verified accounts",
    correctOption: "B",
    explanation:
      "Research shows Black and LGBTQ+ users have their content removed at higher rates. Automated systems trained without diverse input misread in-group language and political speech — effectively enforcing a cultural norm rather than a neutral rule.",
    difficulty: "ADVANCED",
    status: "APPROVED",
    categorySlug: "platform-moderation-free-speech",
  },

  // ─── Surveillance Capitalism ───────────────────────────────────────────────
  {
    questionText: "What is 'surveillance capitalism'?",
    optionA:
      "A government programme to monitor citizens' financial transactions",
    optionB:
      "An economic logic in which human experience is claimed as free raw material, transformed into behavioural data, and sold as predictions to advertisers",
    optionC: "A subscription model for premium security software",
    correctOption: "B",
    explanation:
      "Coined by Shoshana Zuboff, surveillance capitalism describes how platforms like Google and Facebook profit not from selling products, but from predicting and influencing human behaviour at scale.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "surveillance-capitalism",
  },
  {
    questionText: "How do data brokers typically obtain personal information?",
    optionA: "Exclusively from government public records",
    optionB:
      "By aggregating data from loyalty programmes, public records, app permissions, web trackers, and purchases — often without direct knowledge of the individuals",
    optionC: "Only from social media profiles users make public",
    correctOption: "B",
    explanation:
      "Data brokers operate largely invisibly, assembling detailed profiles from dozens of sources. These profiles are sold for marketing, credit scoring, employment screening, and — controversially — law enforcement use.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "surveillance-capitalism",
  },
]

async function main() {
  await mongoose.connect(MONGODB_URI as string)
  console.log("Connected to MongoDB. Seeding...")

  const categoryMap: Record<string, mongoose.Types.ObjectId> = {}

  for (const categoryData of categories) {
    const category = await Category.findOneAndUpdate(
      { slug: categoryData.slug },
      { $setOnInsert: categoryData },
      { upsert: true, new: true }
    )
    categoryMap[categoryData.slug] = category._id
    console.log(`  Category: ${category.name}`)
  }

  let questionCount = 0

  for (const questionData of questions) {
    const categoryId = categoryMap[questionData.categorySlug]
    if (!categoryId) {
      console.warn(
        `  Skipping question — unknown slug: ${questionData.categorySlug}`
      )
      continue
    }

    const { categorySlug, ...questionFields } = questionData

    await Question.create({ ...questionFields, categoryId })
    questionCount++
  }

  console.log(
    `\nDone. Seeded ${categories.length} categories and ${questionCount} questions.`
  )
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await mongoose.disconnect()
  })
