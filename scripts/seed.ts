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

  // ═══════════════════════════════════════════════════════════════════════════
  // NEW QUESTIONS — 8 per category
  // ═══════════════════════════════════════════════════════════════════════════

  // ─── Digital Privacy & Surveillance ───────────────────────────────────────
  {
    questionText:
      "What does a VPN (Virtual Private Network) NOT protect you from?",
    optionA: "Your ISP seeing which websites you visit",
    optionB: "Websites and advertisers tracking you via cookies and fingerprinting once you are on their site",
    optionC: "Government surveillance of your raw internet traffic",
    correctOption: "B",
    explanation:
      "A VPN encrypts traffic between you and the VPN server, hiding it from your ISP and network observers. But once traffic exits the VPN, trackers on the destination site still profile you through cookies, login state, and browser fingerprinting.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "digital-privacy-surveillance",
  },
  {
    questionText: "What is browser fingerprinting?",
    optionA: "A biometric login method using your actual fingerprint on a touch sensor",
    optionB:
      "Identifying and tracking users by combining device and browser attributes — screen resolution, fonts, plugins — without storing any cookies",
    optionC: "A malware technique that captures keystrokes",
    correctOption: "B",
    explanation:
      "Browser fingerprinting is stateless: it requires no cookie or local storage. Because each device's attribute combination is nearly unique, trackers can re-identify you across sessions and sites even in private browsing mode.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "digital-privacy-surveillance",
  },
  {
    questionText: "What is the privacy principle of 'data minimisation'?",
    optionA: "Compressing stored data files to reduce server costs",
    optionB:
      "Collecting only the personal data that is strictly necessary for a specified purpose — no more",
    optionC: "Deleting all user data after 30 days automatically",
    correctOption: "B",
    explanation:
      "Data minimisation is a core GDPR principle (Article 5). It reduces privacy risk because data that is never collected can never be breached, sold, or misused. Many apps violate it by harvesting data 'just in case'.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "digital-privacy-surveillance",
  },
  {
    questionText:
      "What is the key difference between anonymisation and pseudonymisation?",
    optionA: "Anonymisation is illegal under GDPR; pseudonymisation is required",
    optionB:
      "Anonymised data cannot be re-linked to an individual; pseudonymised data replaces identifiers but re-identification remains possible with a key",
    optionC: "They are legally identical terms under European privacy law",
    correctOption: "B",
    explanation:
      "True anonymisation removes GDPR obligations entirely — but is very hard to achieve. Pseudonymisation (e.g. replacing names with IDs) still counts as personal data under GDPR because the key exists to reverse it.",
    difficulty: "ADVANCED",
    status: "APPROVED",
    categorySlug: "digital-privacy-surveillance",
  },
  {
    questionText: "What does 'informed consent' require in data collection?",
    optionA: "A long terms-of-service document that users must scroll through",
    optionB:
      "Users must be told clearly what data is collected, why, and how it is used — before giving a freely given, specific, and unambiguous agreement",
    optionC: "Consent is implied when a user creates an account",
    correctOption: "B",
    explanation:
      "Under GDPR and most modern privacy frameworks, consent must be granular, plain-language, and as easy to withdraw as to give. Pre-ticked boxes and bundled consent are explicitly prohibited.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "digital-privacy-surveillance",
  },
  {
    questionText:
      "Why is location data considered particularly sensitive among personal data types?",
    optionA: "It is the largest data type in terms of file size",
    optionB:
      "Fine-grained location history reveals home and work addresses, medical visits, religious attendance, political activity, and intimate relationships",
    optionC: "It is only collected by mobile apps, not websites",
    correctOption: "B",
    explanation:
      "The Supreme Court in Carpenter v. United States (2018) recognised that prolonged location tracking 'achieves near perfect surveillance' — exposing far more than any single data point suggests.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "digital-privacy-surveillance",
  },
  {
    questionText: "What is differential privacy?",
    optionA: "Storing different data for free vs. paid users",
    optionB:
      "A mathematical technique that adds calibrated noise to query results so individual records cannot be inferred, while preserving useful statistical patterns",
    optionC: "A firewall rule that blocks external queries to a database",
    correctOption: "B",
    explanation:
      "Differential privacy (used by Apple and the US Census) provides a provable privacy guarantee: an attacker learns almost nothing more about any individual by including or excluding their data from the dataset.",
    difficulty: "ADVANCED",
    status: "APPROVED",
    categorySlug: "digital-privacy-surveillance",
  },
  {
    questionText:
      "Which practice best describes 'privacy by design'?",
    optionA: "Adding a privacy policy page after a product launches",
    optionB:
      "Embedding privacy protections into the architecture and default settings of a system from the earliest design stage",
    optionC: "Hiring a data protection officer after a breach occurs",
    correctOption: "B",
    explanation:
      "Privacy by design (Ann Cavoukian, 1990s; now a GDPR requirement) means defaults are the most privacy-protective option, not the least. Users should not need to opt out — they get privacy unless they choose otherwise.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "digital-privacy-surveillance",
  },

  // ─── Online Harassment & Safety ───────────────────────────────────────────
  {
    questionText: "What is 'swatting'?",
    optionA: "Reporting spam accounts in bulk to a platform's trust team",
    optionB:
      "Making a false emergency report to send armed police to a target's address — weaponising law enforcement as a harassment tool",
    optionC: "Flooding a game server with bot accounts",
    correctOption: "B",
    explanation:
      "Swatting has led to deaths and severe trauma. It targets streamers, journalists, and activists. Perpetrators exploit caller-ID spoofing and are increasingly prosecuted under federal laws with sentences of up to 20 years.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "online-harassment-safety",
  },
  {
    questionText: "What is 'sealioning'?",
    optionA: "A DDoS attack that mimics legitimate traffic",
    optionB:
      "Persistently demanding debate or 'evidence' in a tone of false civility, with the goal of exhausting and discrediting the target rather than genuine inquiry",
    optionC: "Selling personal data on darknet markets",
    correctOption: "B",
    explanation:
      "Sealioning weaponises the appearance of good faith. It is a common harassment tactic against journalists, researchers, and activists — designed to derail and discredit by demanding endless justification for basic positions.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "online-harassment-safety",
  },
  {
    questionText: "What is 'brigading' in online spaces?",
    optionA: "A military-themed video game genre",
    optionB:
      "Organised groups mass-reporting, downvoting, or flooding a target's content to suppress it or get their account banned",
    optionC: "A technique for boosting follower counts using automation",
    correctOption: "B",
    explanation:
      "Brigading exploits platform systems — report queues, vote counts — as weapons. It is frequently coordinated via private Discord servers or subreddits, and disproportionately targets women, journalists, and marginalised creators.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "online-harassment-safety",
  },
  {
    questionText:
      "Which single security measure most reduces the risk of account takeover in an online harassment campaign?",
    optionA: "Using a different username on every platform",
    optionB:
      "Enabling hardware-key or app-based two-factor authentication (2FA), which prevents attackers from accessing accounts even with a stolen password",
    optionC: "Making all social media profiles private",
    correctOption: "B",
    explanation:
      "Credential stuffing and phishing are the most common account-takeover methods. App-based TOTP or a hardware key (FIDO2) defeats both, since the attacker still cannot authenticate without the second factor.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "online-harassment-safety",
  },
  {
    questionText: "What does 'catfishing' involve and why is it a safety concern?",
    optionA: "A phishing email disguised as a banking notification",
    optionB:
      "Creating a fake online identity to deceive a target into a relationship, often to extract personal information, money, or intimate images used for later coercion",
    optionC: "Using a VPN to hide your location from a social platform",
    correctOption: "B",
    explanation:
      "Catfishing combines social engineering and emotional manipulation. It is used in romance scams, predatory grooming, and sextortion. Reverse image search and video-call verification are basic countermeasures.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "online-harassment-safety",
  },
  {
    questionText:
      "What does a digital safety plan for a person at risk of online harassment typically include?",
    optionA: "Deleting all social media accounts permanently",
    optionB:
      "Auditing account security settings, documenting abuse for evidence, identifying trusted contacts, and preparing steps if personal information is published",
    optionC: "Purchasing a dedicated laptop for online activity",
    correctOption: "B",
    explanation:
      "A safety plan is proactive and personalised. Organisations like the Coalition Against Online Violence and Access Now's Digital Security Helpline help high-risk individuals build plans covering technical, legal, and psychological dimensions.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "online-harassment-safety",
  },
  {
    questionText: "What is 'coordinated inauthentic behaviour' (CIB)?",
    optionA: "A bug where multiple users accidentally post the same content",
    optionB:
      "Networks of fake or hijacked accounts working together to manipulate public opinion while disguising their coordinated origin",
    optionC: "Platform moderation that removes content without explanation",
    correctOption: "B",
    explanation:
      "CIB — Meta's term, now widely adopted — includes troll farms, bot networks, and astroturfing campaigns. It distorts perceived consensus, amplifies harassment, and undermines democratic discourse.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "online-harassment-safety",
  },
  {
    questionText: "Why is documenting online harassment important before reporting it?",
    optionA: "Platforms require documentation before they will read any report",
    optionB:
      "Screenshots, URLs, and timestamps create an evidence record that supports platform reports, police complaints, and civil or criminal legal action",
    optionC: "Documentation automatically escalates the report to senior moderators",
    correctOption: "B",
    explanation:
      "Content is frequently deleted — by the harasser or by platform moderation — before authorities can act. Secure, timestamped documentation (using tools like Hunchly or web.archive.org) preserves evidence for legal proceedings.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "online-harassment-safety",
  },

  // ─── Algorithmic Bias & AI Ethics ─────────────────────────────────────────
  {
    questionText: "What is 'automation bias'?",
    optionA: "The tendency of AI systems to perform better on automated tasks than humans",
    optionB:
      "The tendency of human decision-makers to over-rely on automated recommendations — even when the system is wrong or the human has contradicting evidence",
    optionC: "A statistical bias introduced during model training",
    correctOption: "B",
    explanation:
      "Automation bias is documented in medicine, aviation, and criminal justice. When a judge or doctor defers to an algorithm despite contradictory professional judgement, the human is no longer a meaningful check on the system.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "algorithmic-bias-ai-ethics",
  },
  {
    questionText: "What is 'proxy discrimination' in machine learning?",
    optionA: "Using a proxy server to anonymise the training data pipeline",
    optionB:
      "When a model uses a variable that appears neutral — like zip code or name — but actually correlates with race, gender, or another protected characteristic",
    optionC: "Deliberate programming of a model to discriminate",
    correctOption: "B",
    explanation:
      "Even models trained without explicit demographic features can replicate discrimination. Zip codes proxy race due to historical redlining; names proxy gender and ethnicity. Removing the protected variable alone is insufficient.",
    difficulty: "ADVANCED",
    status: "APPROVED",
    categorySlug: "algorithmic-bias-ai-ethics",
  },
  {
    questionText: "What does 'explainability' mean in the context of AI systems (XAI)?",
    optionA: "The ability of a developer to explain the business case for building the model",
    optionB:
      "The capacity to describe, in human-understandable terms, why a model produced a particular output or decision",
    optionC: "Documentation showing a model passed quality assurance tests",
    correctOption: "B",
    explanation:
      "Explainability is critical for accountability: a hiring algorithm that rejects a candidate must be interrogable to determine if the decision was discriminatory. The EU AI Act and GDPR's 'right not to be subject to automated decisions' both depend on it.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "algorithmic-bias-ai-ethics",
  },
  {
    questionText:
      "What is the 'disparate impact' legal doctrine and how does it apply to algorithmic systems?",
    optionA: "A requirement that all software be tested on diverse hardware",
    optionB:
      "A legal standard that finds discrimination when a policy or system disproportionately harms a protected group, even without discriminatory intent",
    optionC: "A method for measuring the energy consumption of AI models",
    correctOption: "B",
    explanation:
      "Originating in US civil rights law (Griggs v. Duke Power, 1971), disparate impact allows plaintiffs to challenge facially neutral policies with discriminatory outcomes. It is increasingly applied to hiring algorithms, credit scoring, and benefits allocation.",
    difficulty: "ADVANCED",
    status: "APPROVED",
    categorySlug: "algorithmic-bias-ai-ethics",
  },
  {
    questionText: "What does auditing an AI algorithm typically involve?",
    optionA: "Reviewing the company's financial records for AI spending",
    optionB:
      "Independent examination of a model's inputs, outputs, and performance across demographic groups to identify errors, biases, or unintended harms",
    optionC: "A one-time government certification before a product launches",
    correctOption: "B",
    explanation:
      "Algorithmic audits can be technical (statistical disparity analysis), procedural (how was the model built?), or impact-based (who is harmed?). Third-party audits are increasingly required by law, as in New York City's hiring algorithm law (Local Law 144).",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "algorithmic-bias-ai-ethics",
  },
  {
    questionText: "Under the EU AI Act, which category carries the most stringent obligations?",
    optionA: "General-purpose AI models used for entertainment",
    optionB:
      "High-risk AI systems — including those used in hiring, credit, education, law enforcement, and critical infrastructure — which require conformity assessments and human oversight",
    optionC: "AI systems used exclusively in scientific research",
    correctOption: "B",
    explanation:
      "The EU AI Act (2024) creates a risk-tiered framework. High-risk systems must maintain logs, ensure human oversight, meet accuracy standards, and undergo pre-market assessment. Prohibited systems (e.g. real-time facial recognition in public spaces) are banned outright.",
    difficulty: "ADVANCED",
    status: "APPROVED",
    categorySlug: "algorithmic-bias-ai-ethics",
  },
  {
    questionText:
      "What is a 'feedback loop' in the context of biased AI systems?",
    optionA: "A software design pattern for handling user input",
    optionB:
      "When biased model outputs influence future training data, amplifying the original bias over time",
    optionC: "A cycle in which users rate AI outputs to improve them",
    correctOption: "B",
    explanation:
      "Predictive policing is a classic example: biased arrest data → biased model → more policing of targeted communities → more arrests from those communities → biased training data. The loop hardens structural inequity into apparently objective code.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "algorithmic-bias-ai-ethics",
  },
  {
    questionText: "What is 'algorithmic accountability'?",
    optionA: "Tracking how many API calls an AI model makes per second",
    optionB:
      "The principle that those who design and deploy algorithmic systems must be answerable for their effects — especially harms to affected individuals and communities",
    optionC: "Automated logging of model version changes",
    correctOption: "B",
    explanation:
      "Accountability requires transparency (can the system be examined?), contestability (can decisions be challenged?), and redress (can harms be remedied?). Without these, algorithmic systems can cause discrimination at scale with no legal recourse for those harmed.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "algorithmic-bias-ai-ethics",
  },

  // ─── Digital Accessibility & Inclusion ────────────────────────────────────
  {
    questionText: "What is a 'skip navigation' link and why is it important?",
    optionA: "A link that removes the navigation bar for mobile users",
    optionB:
      "A hidden link at the top of a page that lets keyboard and screen reader users jump directly to main content, bypassing repeated navigation menus",
    optionC: "A breadcrumb trail showing the user's path through a site",
    correctOption: "B",
    explanation:
      "Without skip links, keyboard users must tab through every menu item on every page. WCAG 2.4.1 (Level A) requires a mechanism to bypass repeated blocks of content — skip links are the most common implementation.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "digital-accessibility-inclusion",
  },
  {
    questionText: "Why does writing hashtags in CamelCase (#BlackLivesMatter) matter for accessibility?",
    optionA: "CamelCase hashtags rank higher in search engine results",
    optionB:
      "Screen readers pronounce each capitalised word separately, making the hashtag comprehensible; all-lowercase hashtags are read as a single incomprehensible string",
    optionC: "CamelCase is required by Twitter's and Instagram's APIs",
    correctOption: "B",
    explanation:
      "For a screen reader user, #blacklivesmatter might be read as one word, while #BlackLivesMatter is read as three distinct words. This simple practice significantly improves comprehension for blind and low-vision users.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "digital-accessibility-inclusion",
  },
  {
    questionText: "What does WCAG stand for and who publishes it?",
    optionA: "Web Content Accessibility Guidelines, published by the W3C",
    optionB: "Web Compliance and Governance Charter, published by the EU",
    optionC: "Wireless Content Access Group, published by the ITU",
    correctOption: "A",
    explanation:
      "The Web Content Accessibility Guidelines are published by the W3C's Web Accessibility Initiative (WAI). WCAG 2.1 is the current legal benchmark in many jurisdictions; WCAG 2.2 (2023) added new success criteria for cognitive and motor disabilities.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "digital-accessibility-inclusion",
  },
  {
    questionText: "What is the purpose of alt text on images?",
    optionA: "To improve image search engine ranking",
    optionB:
      "To convey the meaning or function of an image in text form, so screen reader users receive equivalent information to sighted users",
    optionC: "To store copyright metadata alongside the image file",
    correctOption: "B",
    explanation:
      "Good alt text describes what matters about the image in context — not 'image of chart' but the chart's key finding. Decorative images should have alt=\"\" so screen readers skip them. Missing alt text is one of the most common WCAG failures.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "digital-accessibility-inclusion",
  },
  {
    questionText: "What does 'keyboard accessibility' require of an interactive web component?",
    optionA: "The component must support voice commands in addition to touch",
    optionB:
      "All functionality must be operable using only a keyboard — including focus visibility, logical tab order, and activation via Enter or Space",
    optionC: "A keyboard shortcut must be provided for every action",
    correctOption: "B",
    explanation:
      "Keyboard accessibility is fundamental for users with motor disabilities, power users, and assistive technology users. WCAG 2.1.1 (Level A) requires all functionality to be available from a keyboard without a timing requirement.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "digital-accessibility-inclusion",
  },
  {
    questionText: "What is cognitive accessibility and why is it often overlooked?",
    optionA: "Accessibility for users with hearing impairments",
    optionB:
      "Designing for users with dyslexia, ADHD, memory impairments, or anxiety — focusing on clear language, consistent layout, and reduced cognitive load",
    optionC: "Providing multilingual translation of all website content",
    correctOption: "B",
    explanation:
      "Cognitive disabilities affect a much larger population than motor or sensory impairments. WCAG 2.2 added success criteria for cognitive accessibility (SC 3.3.7, 3.3.8). Plain language, predictable navigation, and error prevention are core techniques.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "digital-accessibility-inclusion",
  },
  {
    questionText: "What is the difference between closed captions and open captions?",
    optionA: "Closed captions are only for paid streaming services; open captions are free",
    optionB:
      "Closed captions can be toggled on or off by the viewer; open captions are permanently burned into the video and always visible",
    optionC: "Closed captions include audio descriptions; open captions do not",
    correctOption: "B",
    explanation:
      "Closed captions (the 'CC' button) give viewers control. Open captions are baked into the video file. Both serve Deaf and hard-of-hearing users, non-native speakers, and anyone watching in a noisy or silent environment.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "digital-accessibility-inclusion",
  },
  {
    questionText:
      "A form labels an input 'Email*' visually but has no associated <label> element in HTML. What is the problem?",
    optionA: "The asterisk character breaks form validation",
    optionB:
      "Screen readers cannot programmatically associate the visual label with the input field, so users may not know what the field requires",
    optionC: "The browser will not submit the form without a <label> tag",
    correctOption: "B",
    explanation:
      "Programmatically associated labels (via <label for>, aria-label, or aria-labelledby) are required by WCAG 1.3.1. Without them, a screen reader user navigating to the input hears only 'edit text' — with no indication of what to type.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "digital-accessibility-inclusion",
  },

  // ─── Data Sovereignty & Rights ────────────────────────────────────────────
  {
    questionText: "What is the 'right to be forgotten' under GDPR?",
    optionA: "The right to remain anonymous while browsing the web",
    optionB:
      "The right to request that an organisation erases your personal data when it is no longer necessary, you withdraw consent, or you object to its processing",
    optionC: "The right to use a pseudonym on any online platform",
    correctOption: "B",
    explanation:
      "Article 17 GDPR creates the right to erasure ('right to be forgotten'). It is not absolute — it can be overridden by freedom of expression or legal obligations — but it gives individuals meaningful power to reduce their digital footprint.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "data-sovereignty-rights",
  },
  {
    questionText: "What are the CARE Principles for Indigenous Data Governance?",
    optionA: "Confidentiality, Anonymity, Retention, and Encryption",
    optionB:
      "Collective Benefit, Authority to Control, Responsibility, and Ethics — a framework asserting that data about Indigenous peoples must serve Indigenous interests",
    optionC: "A Canadian government regulatory framework for health data",
    correctOption: "B",
    explanation:
      "The CARE Principles (Carroll et al., 2020) complement the FAIR data principles by centring Indigenous rights and wellbeing. They recognise that historical extraction of Indigenous data for others' benefit must be reversed.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "data-sovereignty-rights",
  },
  {
    questionText: "What is 'data localisation' and why do some countries mandate it?",
    optionA: "Translating a dataset into the local language",
    optionB:
      "A legal requirement that data about a country's citizens must be stored and processed within that country's borders",
    optionC: "Removing geographic coordinates from a dataset before publication",
    correctOption: "B",
    explanation:
      "Countries like Russia, China, and India mandate data localisation for sovereignty, law enforcement access, and economic reasons. Critics argue it fragments the internet, raises costs, and can enable domestic government surveillance.",
    difficulty: "ADVANCED",
    status: "APPROVED",
    categorySlug: "data-sovereignty-rights",
  },
  {
    questionText: "What is data portability as a legal right?",
    optionA: "The right to carry a USB drive with your data out of a workplace",
    optionB:
      "The right to receive your personal data in a structured, machine-readable format and to transfer it to another service provider",
    optionC: "The right to access company data from a personal device",
    correctOption: "B",
    explanation:
      "GDPR Article 20 grants data portability. It is designed to reduce lock-in and increase competition. Platforms like Google Takeout exist partly in response to this right. However, interoperability challenges limit its practical use.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "data-sovereignty-rights",
  },
  {
    questionText: "What is a 'data trust'?",
    optionA: "A legal agreement in which a company promises not to sell your data",
    optionB:
      "An independent legal structure that holds and governs data on behalf of a group, making decisions about access and use in members' interests",
    optionC: "A cryptographic method for verifying data integrity",
    correctOption: "B",
    explanation:
      "Data trusts apply the legal concept of a fiduciary relationship to data governance. A trustee manages data access for the beneficiaries' benefit — analogous to a financial trust managing assets. They are proposed as a collective alternative to individual consent models.",
    difficulty: "ADVANCED",
    status: "APPROVED",
    categorySlug: "data-sovereignty-rights",
  },
  {
    questionText:
      "Under GDPR, what is 'legitimate interest' as a lawful basis for processing personal data?",
    optionA: "A legal exemption allowing governments to process all citizen data freely",
    optionB:
      "A basis that permits processing when a controller has a genuine interest that is not overridden by the individual's privacy rights — requiring a three-part balancing test",
    optionC: "A contractual clause stating users accept all data uses by signing up",
    correctOption: "B",
    explanation:
      "Legitimate interest (Article 6(1)(f)) is the most flexible legal basis under GDPR but requires a legitimate interest test (LIA): is the interest genuine? Is processing necessary? Do individual rights override it? It is frequently misused as a catch-all by controllers wanting to avoid consent.",
    difficulty: "ADVANCED",
    status: "APPROVED",
    categorySlug: "data-sovereignty-rights",
  },
  {
    questionText: "What were the FAIR data principles designed to promote?",
    optionA: "Fair wages for data scientists",
    optionB:
      "Making data Findable, Accessible, Interoperable, and Reusable — primarily to maximise the value of research data for both humans and machines",
    optionC: "Fair use exceptions for copyrighted data in AI training",
    correctOption: "B",
    explanation:
      "Published in 2016 (Wilkinson et al.), FAIR principles are widely adopted in open science and government data. They complement but do not replace governance principles like CARE — FAIR focuses on usability, while CARE centres power and ethics.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "data-sovereignty-rights",
  },
  {
    questionText:
      "Why was the EU–US Privacy Shield framework invalidated by the Court of Justice of the EU in 2020?",
    optionA: "The US refused to sign the agreement",
    optionB:
      "US surveillance laws (FISA Section 702, EO 12333) gave US intelligence agencies access to EU citizens' data in ways incompatible with EU fundamental rights — with no effective judicial remedy for EU individuals",
    optionC: "The framework expired after its five-year term without renewal",
    correctOption: "B",
    explanation:
      "Schrems II (Data Protection Commissioner v. Facebook Ireland) invalidated Privacy Shield but preserved Standard Contractual Clauses with additional safeguards. It forced companies to assess whether destination-country surveillance laws undermine EU data protection.",
    difficulty: "ADVANCED",
    status: "APPROVED",
    categorySlug: "data-sovereignty-rights",
  },

  // ─── Gender-Based Cyber Violence ──────────────────────────────────────────
  {
    questionText: "What is 'technology-facilitated intimate partner violence' (TF-IPV)?",
    optionA: "Violence that occurs exclusively in virtual reality environments",
    optionB:
      "The use of digital tools — spyware, location tracking, account monitoring, social media harassment — by a current or former partner to coerce, surveil, or harm",
    optionC: "Online disagreements between former partners on social media",
    correctOption: "B",
    explanation:
      "TF-IPV extends physical abuse into the digital domain and persists after separation. It includes GPS tracking via shared apps, installing stalkerware on devices, impersonating victims online, and weaponising intimate images.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "gender-based-cyber-violence",
  },
  {
    questionText: "What is 'stalkerware'?",
    optionA: "A browser extension that tracks competitors' pricing",
    optionB:
      "Software covertly installed on a device — often by an intimate partner — that secretly monitors calls, messages, location, and photos without the device owner's knowledge",
    optionC: "A parental control app that monitors children's online activity with their knowledge",
    correctOption: "B",
    explanation:
      "Stalkerware operates silently, is designed to be hidden, and is predominantly used in intimate partner abuse contexts. The Coalition Against Stalkerware has published detection and removal guidance; several antivirus vendors now flag it.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "gender-based-cyber-violence",
  },
  {
    questionText: "What is 'sextortion'?",
    optionA: "An extortion scam involving fake tax debts",
    optionB:
      "Threatening to publish intimate images or information unless the victim pays money or provides more images — combining sexual coercion with financial extortion",
    optionC: "A type of social engineering that targets company executives",
    correctOption: "B",
    explanation:
      "Sextortion is a global crisis: the FBI receives tens of thousands of reports annually. Perpetrators may obtain images through catfishing, hacking, or prior relationships. It disproportionately affects minors and young adults.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "gender-based-cyber-violence",
  },
  {
    questionText: "What is 'deepfake intimate imagery' and why is it harmful?",
    optionA: "Edited photos that make people appear older or younger",
    optionB:
      "AI-generated realistic fake sexual images or videos depicting a real person without their consent, used for harassment, coercion, or reputational destruction",
    optionC: "A video compression format used in adult content",
    correctOption: "B",
    explanation:
      "Deepfake intimate imagery is an emerging form of NCII requiring no original sexual content. It overwhelmingly targets women, including public figures and ordinary individuals. The UK's Online Safety Act (2023) and US state laws are beginning to criminalise it.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "gender-based-cyber-violence",
  },
  {
    questionText: "How do abusers use shared digital accounts as a control mechanism?",
    optionA: "By restricting the victim to a low-bandwidth internet plan",
    optionB:
      "By maintaining access to shared email, banking, or family accounts to monitor communications, control finances, and prevent victims from seeking help",
    optionC: "By creating joint social media accounts the victim must use",
    correctOption: "B",
    explanation:
      "Financial control via digital platforms is a core dimension of economic abuse. Abusers also use shared streaming, family location-sharing apps, and smart home devices to surveil and control victims — even after they have left.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "gender-based-cyber-violence",
  },
  {
    questionText: "Which UN resolution first specifically addressed online violence against women?",
    optionA: "UN General Assembly Resolution 68/181 (2013)",
    optionB:
      "The UN Special Rapporteur on Violence Against Women's 2018 report on online violence, followed by HRC Resolution 38/5 urging states to address technology-facilitated VAWG",
    optionC: "The Beijing Platform for Action (1995)",
    correctOption: "B",
    explanation:
      "The 2018 UN Human Rights Council resolution acknowledged online violence as a human rights issue requiring legal frameworks, platform accountability, and survivor support. The original Beijing Platform lacked the internet context entirely.",
    difficulty: "ADVANCED",
    status: "APPROVED",
    categorySlug: "gender-based-cyber-violence",
  },
  {
    questionText: "What is a 'panic button' app in the context of gender-based violence?",
    optionA: "An app that locks a device remotely if it is stolen",
    optionB:
      "A mobile application that, when activated, alerts trusted contacts or emergency services with the user's location — and may quickly disguise itself as an innocuous app",
    optionC: "A browser extension that detects phishing pages",
    correctOption: "B",
    explanation:
      "Apps like bSafe and Hollaback allow survivors to send silent SOS alerts. The disguise feature is critical: an abuser checking a partner's phone should not be able to identify a safety app, which could itself become a source of danger.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "gender-based-cyber-violence",
  },
  {
    questionText:
      "Why is removing stalkerware from a device sometimes dangerous to the victim?",
    optionA: "Stalkerware may delete important files during uninstallation",
    optionB:
      "The abuser is alerted when monitoring stops, which may escalate physical violence — so victims should plan safe exit steps before removing it",
    optionC: "Stalkerware is usually integrated with the device's operating system and cannot be removed",
    correctOption: "B",
    explanation:
      "This counterintuitive advice is standard guidance from domestic violence organisations. Safety planning — securing housing, finances, and support networks — should happen before removing surveillance tools, because abruptly losing visibility can provoke dangerous escalation.",
    difficulty: "ADVANCED",
    status: "APPROVED",
    categorySlug: "gender-based-cyber-violence",
  },

  // ─── Cybersecurity & Marginalized Communities ─────────────────────────────
  {
    questionText: "What is 'transnational repression' in a digital context?",
    optionA: "Internet censorship within authoritarian states' own borders",
    optionB:
      "Governments using hacking, social media manipulation, and surveillance to silence diaspora communities, journalists, and activists living abroad",
    optionC: "Cross-border data sharing agreements between intelligence agencies",
    correctOption: "B",
    explanation:
      "Freedom House documents transnational repression by states including China, Russia, Saudi Arabia, and Rwanda. Tools include Pegasus-style spyware, fake social media accounts targeting exiles, and pressuring families inside the country.",
    difficulty: "ADVANCED",
    status: "APPROVED",
    categorySlug: "cybersecurity-marginalized-communities",
  },
  {
    questionText:
      "Why are refugee and displaced communities at elevated digital risk?",
    optionA: "They typically have less experience with mobile technology",
    optionB:
      "Border crossings may involve device inspection; accounts hold evidence of political activity; connections to persecuting regimes through contacts; and limited access to secure-comms resources",
    optionC: "Refugee camps have poor mobile signal, making encryption harder",
    correctOption: "B",
    explanation:
      "Aid organisations like Frontline Defenders and UNHCR provide digital security support to refugees. Device inspection at borders — where agents may demand passwords — means that uncleared data can be a matter of life and death.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "cybersecurity-marginalized-communities",
  },
  {
    questionText: "What makes immigration status information especially sensitive from a security standpoint?",
    optionA: "It is valuable for identity theft because it contains passport numbers",
    optionB:
      "Exposure can directly cause deportation, family separation, or targeting by hate groups — making it a category of data that demands the highest protection",
    optionC: "Immigration data is large in file size, making breaches more costly",
    correctOption: "B",
    explanation:
      "Immigration status data has life-altering consequences if disclosed. Immigration advocacy organisations counsel members against apps, platforms, or services that could expose this data — and advise against devices at protests where arrest is possible.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "cybersecurity-marginalized-communities",
  },
  {
    questionText: "What is 'intersectional threat modelling'?",
    optionA: "A software architecture pattern for multi-tier security systems",
    optionB:
      "Identifying digital risks based on the combined effect of a person's multiple identities — such as being a queer undocumented journalist — rather than treating each dimension separately",
    optionC: "A government security clearance framework with multiple levels",
    correctOption: "B",
    explanation:
      "Standard threat modelling asks 'who wants to harm you and how?' Intersectional threat modelling recognises that the answer depends on the whole person. A Black trans woman activist faces overlapping threats from state, platform, and community-based actors simultaneously.",
    difficulty: "ADVANCED",
    status: "APPROVED",
    categorySlug: "cybersecurity-marginalized-communities",
  },
  {
    questionText: "What is a 'burner phone' and in what security contexts is it genuinely useful?",
    optionA: "A phone with a fast processor that overheats during heavy use",
    optionB:
      "A prepaid phone purchased with cash, linked to no personal identity, used to compartmentalise sensitive communications from everyday digital life",
    optionC: "A phone that automatically deletes messages after they are read",
    correctOption: "B",
    explanation:
      "Burner phones are useful for protesters, whistleblowers, and anyone whose regular device may be confiscated or subpoenaed. The key is true identity separation — buying with cash, not logging into personal accounts, and disposing of it after use.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "cybersecurity-marginalized-communities",
  },
  {
    questionText:
      "What digital precaution is recommended before attending a protest in a jurisdiction with aggressive policing?",
    optionA: "Enabling automatic cloud backup to preserve photos",
    optionB:
      "Enabling full-disk encryption, turning off biometric unlock (use PIN only), and removing sensitive contacts' information so a seized device cannot expose others",
    optionC: "Installing a VPN so your IP address is hidden from social platforms",
    correctOption: "B",
    explanation:
      "A seized phone with biometric unlock can be unlocked by force. Police cannot legally compel a PIN in many jurisdictions (Fifth Amendment in the US). Full-disk encryption makes seized phones useless without the passcode.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "cybersecurity-marginalized-communities",
  },
  {
    questionText:
      "Why might a Black Lives Matter organiser face greater digital security risks than a typical user?",
    optionA: "Activists use older devices that are easier to compromise",
    optionB:
      "They face targeted surveillance by law enforcement, coordinated harassment by far-right groups, and platform moderation that may silence their content — all simultaneously",
    optionC: "Social movements attract more spam than ordinary users",
    correctOption: "B",
    explanation:
      "Documents released via FOIA revealed FBI monitoring of BLM; social media platforms disproportionately removed BLM content; and organised harassment campaigns targeted organisers. Security planning must account for all three threat actors.",
    difficulty: "ADVANCED",
    status: "APPROVED",
    categorySlug: "cybersecurity-marginalized-communities",
  },
  {
    questionText:
      "What security tool is most recommended for high-risk communities needing secure group communications?",
    optionA: "WhatsApp, because it is end-to-end encrypted and widely used",
    optionB:
      "Signal, because it uses end-to-end encryption, collects minimal metadata, offers disappearing messages, and is open-source for independent security auditing",
    optionC: "Telegram, because it allows large group sizes and file sharing",
    correctOption: "B",
    explanation:
      "WhatsApp shares metadata with Meta. Telegram does not enable E2E encryption in group chats by default. Signal's open-source cryptographic protocol (the Signal Protocol) is the industry standard — also used by WhatsApp's encryption layer — but Signal's own data collection is minimal.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "cybersecurity-marginalized-communities",
  },

  // ─── Digital Divide & Equity ──────────────────────────────────────────────
  {
    questionText: "What is the 'second-level digital divide'?",
    optionA: "The gap between internet speeds in developed and developing nations",
    optionB:
      "Inequality in the skills, usage patterns, and quality of outcomes that people derive from internet access — even among those who are technically connected",
    optionC: "The difference between 4G and 5G coverage within a single country",
    correctOption: "B",
    explanation:
      "First-level divide: access vs. no access. Second-level divide: having access but lacking the literacy, hardware quality, or bandwidth to benefit from it as fully as higher-resourced users. Digital inclusion policy must address both.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "digital-divide-equity",
  },
  {
    questionText: "What is 'zero-rating' and what equity concern does it raise?",
    optionA: "A pricing model for devices sold at cost to low-income families",
    optionB:
      "Mobile carriers exempting certain apps from data caps — giving those apps free reach while disadvantaging unsponsored apps and entrenching platform monopolies among low-income users",
    optionC: "A government subsidy that makes broadband free for qualifying households",
    correctOption: "B",
    explanation:
      "Zero-rating (common in the Global South) means a low-income user's 'free internet' is actually only Facebook or Wikipedia. This shapes what news, services, and communication tools are accessible — raising net neutrality and sovereignty concerns.",
    difficulty: "ADVANCED",
    status: "APPROVED",
    categorySlug: "digital-divide-equity",
  },
  {
    questionText: "What is the 'homework gap'?",
    optionA: "The achievement difference between students who do homework and those who do not",
    optionB:
      "The disadvantage faced by students who lack home internet access and cannot complete online assignments, research, or learning management system tasks at home",
    optionC: "Unequal access to tutoring apps between private and public school students",
    correctOption: "B",
    explanation:
      "COVID-19 made the homework gap visible: millions of students were left without remote learning access. The FCC's E-Rate programme and Emergency Broadband Benefit addressed parts of it, but structural gaps persist.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "digital-divide-equity",
  },
  {
    questionText:
      "What role have public libraries played in addressing the digital divide?",
    optionA: "Libraries primarily focus on print literacy and do not address digital access",
    optionB:
      "Libraries provide free public internet access, device lending, digital literacy training, and assisted technology — often serving as the only digital access point for low-income and unhoused individuals",
    optionC: "Libraries are required by law to restrict internet access to educational content only",
    correctOption: "B",
    explanation:
      "The ALA reports that public libraries are a critical digital equity infrastructure: 98% of US public libraries provide free public Wi-Fi. During the pandemic, library parking lots with Wi-Fi became homework zones for students without home internet.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "digital-divide-equity",
  },
  {
    questionText: "How does language act as a digital divide barrier?",
    optionA: "Non-English keyboards cannot access most websites",
    optionB:
      "The internet is dominated by English-language content and interfaces; users who are not proficient in English face reduced access to information, services, and digital literacy resources",
    optionC: "Translation software has solved the language barrier for all internet users",
    correctOption: "B",
    explanation:
      "Over 60% of web content is in English, while English speakers are less than 25% of the global population. Algorithmic content curation also tends to surface dominant-language content. Digital equity requires multilingual interfaces and localised content.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "digital-divide-equity",
  },
  {
    questionText: "What is 'device poverty' and how does it intersect with education?",
    optionA: "Countries that cannot manufacture their own hardware",
    optionB:
      "Lack of access to personal computing devices — smartphones, tablets, laptops — preventing full participation in digital learning, employment applications, and government services",
    optionC: "The environmental cost of manufacturing low-cost devices",
    correctOption: "B",
    explanation:
      "Even with internet access, sharing one phone among multiple family members limits study time. Device poverty compounds during distance learning and disproportionately affects low-income, Black, and Indigenous households.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "digital-divide-equity",
  },
  {
    questionText: "What is a 'digital navigator' and how do they address equity?",
    optionA: "A GPS application designed for users with visual impairments",
    optionB:
      "A trained community member who provides one-on-one assistance helping individuals get connected, choose devices, and build digital skills in a trusted, culturally competent way",
    optionC: "A software tool that routes users to the fastest available network",
    correctOption: "B",
    explanation:
      "Digital navigator programmes (popularised by the National Digital Inclusion Alliance) recognise that broadband adoption requires human support, not just infrastructure. Navigators reduce the gap between access and meaningful use.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "digital-divide-equity",
  },
  {
    questionText: "Why does digital exclusion compound other forms of social exclusion?",
    optionA: "Digital exclusion only affects entertainment access, which is a minor concern",
    optionB:
      "As government services, employment applications, healthcare, banking, and education move online, those without digital access face multiplied disadvantages across every life domain",
    optionC: "Excluded groups can rely on in-person services, which are equally accessible",
    correctOption: "B",
    explanation:
      "The shift to 'digital by default' public services — fast-tracked during COVID-19 — made digital exclusion a welfare emergency. People unable to access benefits portals, vaccine booking systems, or remote courts faced compounding disadvantage with no adequate offline alternative.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "digital-divide-equity",
  },

  // ─── Platform Moderation & Free Speech ────────────────────────────────────
  {
    questionText: "What does Section 230 of the Communications Decency Act (US) protect?",
    optionA: "Free speech rights of social media users against platform censorship",
    optionB:
      "Online platforms from legal liability for most user-generated content — and also for good-faith moderation decisions that remove or restrict content",
    optionC: "Government agencies from being criticised on social media",
    correctOption: "B",
    explanation:
      "Section 230 has two key provisions: platforms are not publishers liable for user content, and they cannot be sued for good-faith content moderation. Critics on both left and right want to reform it — but disagree on whether platforms moderate too much or too little.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "platform-moderation-free-speech",
  },
  {
    questionText: "What is 'shadow banning'?",
    optionA: "Permanently banning a user and deleting their account history",
    optionB:
      "Reducing the visibility of a user's content — so their posts reach fewer people or do not appear in searches — without notifying the user they have been penalised",
    optionC: "Banning offensive usernames while allowing the account to remain active",
    correctOption: "B",
    explanation:
      "Shadow banning (also called 'stealth banning' or 'ghost banning') is controversial because users cannot contest a sanction they do not know exists. It has been documented disproportionately affecting LGBTQ+ and political speech, raising transparency concerns.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "platform-moderation-free-speech",
  },
  {
    questionText: "What is the EU Digital Services Act (DSA) and what does it require?",
    optionA: "A European law mandating that all digital services charge sales tax",
    optionB:
      "An EU regulation requiring large platforms to assess and mitigate systemic risks, provide algorithmic transparency, enable researcher access to data, and offer users meaningful redress for moderation decisions",
    optionC: "A directive requiring platforms to store data within EU borders",
    correctOption: "B",
    explanation:
      "The DSA (in force 2024) is the most significant platform regulation in a generation. Very large online platforms (VLOPs) face additional obligations including independent audits, recommender system explanations, and crisis response mechanisms.",
    difficulty: "ADVANCED",
    status: "APPROVED",
    categorySlug: "platform-moderation-free-speech",
  },
  {
    questionText: "What is the difference between 'over-removal' and 'under-removal' in content moderation?",
    optionA: "Over-removal deletes too many posts per day; under-removal deletes too few",
    optionB:
      "Over-removal: removing legal speech, especially from marginalised users. Under-removal: leaving up genuinely harmful content, often targeting the same groups. Both failures disproportionately harm marginalised communities",
    optionC: "Over-removal is automated; under-removal is a human moderator error",
    correctOption: "B",
    explanation:
      "Platforms face both failure modes simultaneously: they over-remove reclaimed slurs, Arabic-language political speech, and LGBTQ+ content — while under-removing targeted harassment and disinformation. These are not opposite problems but compound ones reflecting whose safety is centred.",
    difficulty: "ADVANCED",
    status: "APPROVED",
    categorySlug: "platform-moderation-free-speech",
  },
  {
    questionText: "What is 'context collapse' and how does it challenge content moderation?",
    optionA: "A server crash caused by too many simultaneous content reports",
    optionB:
      "The collapse of distinct audience contexts on social media — where content meant for one audience is seen by another for whom it reads very differently — making intent-based moderation rules hard to apply fairly",
    optionC: "The loss of context when content is translated into another language",
    correctOption: "B",
    explanation:
      "A Black user reclaiming a slur within their community faces context collapse when automated systems or out-of-group reporters see only the word, not the context. Context collapse is why identical words are treated differently depending on who says them — and why moderation rules that ignore context fail marginalised speakers.",
    difficulty: "ADVANCED",
    status: "APPROVED",
    categorySlug: "platform-moderation-free-speech",
  },
  {
    questionText: "What is 'algorithmic amplification' and why does it matter for content moderation?",
    optionA: "Boosting content quality through AI-enhanced image and audio processing",
    optionB:
      "The process by which recommendation systems preferentially surface certain content, making some speech far more visible than others — and potentially promoting outrage and extremism because it drives engagement",
    optionC: "Increasing the reach of verified accounts compared to anonymous ones",
    correctOption: "B",
    explanation:
      "Moderation focuses on removal, but amplification decides what is promoted. Research (including internal Facebook studies) shows that high-engagement content — often emotionally provocative or outrageous — is algorithmically amplified regardless of harm. This makes moderation-by-removal an incomplete solution.",
    difficulty: "ADVANCED",
    status: "APPROVED",
    categorySlug: "platform-moderation-free-speech",
  },
  {
    questionText: "What is a 'trusted flagger' programme on social platforms?",
    optionA: "A programme that rewards users financially for reporting content",
    optionB:
      "A system granting certain organisations — NGOs, government agencies, researchers — expedited review of their content reports, based on the assumption their flagging is reliable",
    optionC: "An AI system that pre-screens content before it is published",
    correctOption: "B",
    explanation:
      "Trusted flagger programmes exist on YouTube, Meta, and Twitter/X. The DSA formalises them. The concern is accountability: trusted flagger status can be granted to government agencies in ways that enable state censorship dressed as moderation.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "platform-moderation-free-speech",
  },
  {
    questionText: "Why do content moderation appeals processes matter for equity?",
    optionA: "Appeals allow platforms to charge a fee for premium content review",
    optionB:
      "Without appeals, users who have content wrongly removed — disproportionately marginalised speakers — have no way to contest the decision or understand why it was made",
    optionC: "Appeals are only meaningful for accounts with large follower counts",
    correctOption: "B",
    explanation:
      "The DSA requires large platforms to provide free internal appeals and access to out-of-court dispute resolution. Without these, erroneous removal of political speech, survivor testimony, and LGBTQ+ expression goes without remedy — chilling speech most needed by those with fewest alternative channels.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "platform-moderation-free-speech",
  },

  // ─── Surveillance Capitalism ───────────────────────────────────────────────
  {
    questionText: "What is 'behavioural surplus' in Shoshana Zuboff's framework?",
    optionA: "The extra advertising revenue a platform earns beyond its running costs",
    optionB:
      "The portion of behavioural data collected beyond what is needed to improve a product — extracted covertly and sold as predictions of future behaviour",
    optionC: "The excess attention users give to personalised content compared to non-personalised",
    correctOption: "B",
    explanation:
      "Zuboff's key insight: platforms use some data to improve products (ostensibly for users), but keep a 'surplus' used purely for prediction markets. This surplus is what makes the system surveillance capitalism rather than just data capitalism.",
    difficulty: "ADVANCED",
    status: "APPROVED",
    categorySlug: "surveillance-capitalism",
  },
  {
    questionText: "What are 'dark patterns' in user interface design?",
    optionA: "High-contrast colour schemes used for accessibility",
    optionB:
      "Deceptive interface designs that manipulate users into unintended actions — such as hidden opt-outs, misleading button labels, or pre-selected consent checkboxes",
    optionC: "Dark mode themes that reduce screen brightness",
    correctOption: "B",
    explanation:
      "Dark patterns (Harry Brignull, 2010) include 'roach motel' (easy to get in, hard to leave), 'misdirection', and 'confirmshaming'. The EU's DSA and GDPR enforcement actions have explicitly targeted dark patterns in consent interfaces.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categorySlug: "surveillance-capitalism",
  },
  {
    questionText: "What is the 'attention economy' and how does it relate to surveillance capitalism?",
    optionA: "A financial market that trades in media company stocks",
    optionB:
      "A system in which human attention is the scarce resource platforms compete for — driving design choices that maximise engagement at the cost of user wellbeing, because attention data feeds advertising prediction markets",
    optionC: "An economic theory about consumer spending on digital subscriptions",
    correctOption: "B",
    explanation:
      "In the attention economy, every minute spent on a platform is data collected and ad revenue earned. This creates incentives to maximise time-on-site through outrage, anxiety, and compulsion — not because platforms are malicious, but because the business model rewards it.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "surveillance-capitalism",
  },
  {
    questionText: "What is real-time bidding (RTB) in digital advertising and why is it a privacy concern?",
    optionA: "A live auction for celebrity social media endorsements",
    optionB:
      "An automated auction where personal data is broadcast to thousands of advertisers every time a user loads a web page, allowing targeting but also enabling mass personal data sharing without user knowledge",
    optionC: "A system that adjusts ad prices based on market demand each hour",
    correctOption: "B",
    explanation:
      "RTB sends a user's IP address, device ID, browsing context, and inferred profile attributes to potentially thousands of bidders in milliseconds. Ireland's DPC and the UK's ICO have found RTB incompatible with GDPR because the data broadcast cannot be controlled once sent.",
    difficulty: "ADVANCED",
    status: "APPROVED",
    categorySlug: "surveillance-capitalism",
  },
  {
    questionText: "What is 'consent fatigue' and how does it undermine privacy?",
    optionA: "The legal principle that consent expires after a set time period",
    optionB:
      "The tendency of users to click 'accept all' on cookie banners and privacy prompts because the volume and complexity of consent requests is overwhelming — making consent meaningless in practice",
    optionC: "Regulator fatigue with enforcing cookie consent laws",
    correctOption: "B",
    explanation:
      "Studies show users spend less than one second on cookie consent decisions. Platforms design consent interfaces to exploit this — burying opt-outs and making rejection laborious. Consent fatigue reveals why notice-and-consent models alone cannot protect privacy.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "surveillance-capitalism",
  },
  {
    questionText: "What are 'shadow profiles' in the context of social media platforms?",
    optionA: "Deleted accounts that remain visible in cached search results",
    optionB:
      "Detailed profiles that platforms build about non-users using data uploaded by users — such as contact lists and email addresses — without the non-user's knowledge or consent",
    optionC: "Anonymous accounts created by users who do not want to use their real name",
    correctOption: "B",
    explanation:
      "Facebook's shadow profiles were revealed in 2013 data access bug. When you upload your contacts, Facebook collects data on people who never signed up. This extends surveillance to those who explicitly chose not to join the platform.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categorySlug: "surveillance-capitalism",
  },
  {
    questionText: "How does location data monetisation work in the data broker ecosystem?",
    optionA: "Users are paid small amounts when they share their GPS coordinates with apps",
    optionB:
      "Apps collect precise GPS data, sell it to data brokers who aggregate and repackage it, which is then sold to advertisers, insurers, hedge funds, and law enforcement — often without users' meaningful awareness",
    optionC: "Mobile carriers sell cell tower location data directly to advertisers",
    correctOption: "B",
    explanation:
      "A 2018 NYT investigation revealed apps including weather apps selling location data. The resulting profiles — precise movement histories — were sold to retailers, political campaigns, and ICE. The FTC has begun enforcement actions against location data brokers.",
    difficulty: "ADVANCED",
    status: "APPROVED",
    categorySlug: "surveillance-capitalism",
  },
  {
    questionText:
      "What is 'personalisation' in algorithmic systems and what is its hidden cost?",
    optionA: "Allowing users to change their profile picture and username",
    optionB:
      "Tailoring content and ads to individual predicted preferences using behavioural data — which deepens platform lock-in, distorts shared reality, and generates the surveillance data that funds the business model",
    optionC: "Recommending content based solely on a user's explicitly stated interests",
    correctOption: "B",
    explanation:
      "Personalisation feels like a service but functions as a surveillance mechanism. Each personalised interaction refines the behavioural profile sold to advertisers. Filter bubbles are a byproduct: when everyone sees different realities, shared public discourse fractures.",
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

    await Question.findOneAndUpdate(
      { questionText: questionFields.questionText },
      { $setOnInsert: { ...questionFields, categoryId } },
      { upsert: true, new: true }
    )
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
