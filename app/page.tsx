import QuizGrid from "@/components/quiz/QuizGrid"
import type { QuestionWithCategory } from "@/types"

// Static seed data for Phase 1 — replaced with DB queries in Phase 2
const staticQuestions: QuestionWithCategory[] = [
  {
    id: "q-001",
    questionText: "What does end-to-end encryption protect against?",
    optionA: "Encryption only works when the sender is online",
    optionB: "Messages can only be read by the sender and recipient — not even the service provider",
    optionC: "Only the recipient's device is protected",
    correctOption: "B",
    explanation:
      "E2E encryption means only the communicating users can decrypt messages. The platform sees only ciphertext.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categoryId: "cat-001",
    createdAt: new Date(),
    updatedAt: new Date(),
    category: {
      id: "cat-001",
      slug: "digital-privacy-surveillance",
      name: "Digital Privacy & Surveillance",
    },
  },
  {
    id: "q-002",
    questionText: "What is 'doxing'?",
    optionA: "Publishing someone's private personal information online without consent",
    optionB: "A type of phishing email",
    optionC: "Blocking someone on a social platform",
    correctOption: "A",
    explanation:
      "Doxing involves researching and publicly exposing private details like home addresses, phone numbers, or workplaces to enable harassment.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categoryId: "cat-002",
    createdAt: new Date(),
    updatedAt: new Date(),
    category: {
      id: "cat-002",
      slug: "online-harassment-safety",
      name: "Online Harassment & Safety",
    },
  },
  {
    id: "q-003",
    questionText: "Why can facial recognition systems perform worse on darker-skinned faces?",
    optionA: "The cameras used are lower quality",
    optionB: "Training datasets have historically overrepresented lighter-skinned faces",
    optionC: "Darker skin reflects less light in all conditions",
    correctOption: "B",
    explanation:
      "When training data is not representative, models learn skewed patterns. MIT studies found error rates for darker-skinned women up to 34% vs under 1% for lighter-skinned men.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categoryId: "cat-003",
    createdAt: new Date(),
    updatedAt: new Date(),
    category: {
      id: "cat-003",
      slug: "algorithmic-bias-ai-ethics",
      name: "Algorithmic Bias & AI Ethics",
    },
  },
  {
    id: "q-004",
    questionText: "What is the minimum contrast ratio recommended by WCAG AA for normal text?",
    optionA: "2:1",
    optionB: "3:1",
    optionC: "4.5:1",
    correctOption: "C",
    explanation:
      "WCAG 2.1 Level AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categoryId: "cat-004",
    createdAt: new Date(),
    updatedAt: new Date(),
    category: {
      id: "cat-004",
      slug: "digital-accessibility-inclusion",
      name: "Digital Accessibility & Inclusion",
    },
  },
  {
    id: "q-005",
    questionText: "What does Indigenous data sovereignty refer to?",
    optionA:
      "The right of Indigenous peoples to govern how data about their communities is collected and used",
    optionB: "Government control of all internet data within a country",
    optionC: "Ownership of data by the company that collects it",
    correctOption: "A",
    explanation:
      "Indigenous data sovereignty asserts that Indigenous communities should control research and data involving their people, lands, and cultures.",
    difficulty: "INTERMEDIATE",
    status: "APPROVED",
    categoryId: "cat-005",
    createdAt: new Date(),
    updatedAt: new Date(),
    category: {
      id: "cat-005",
      slug: "data-sovereignty-rights",
      name: "Data Sovereignty & Rights",
    },
  },
  {
    id: "q-006",
    questionText: "What is 'non-consensual intimate image sharing' (NCII)?",
    optionA:
      "Sharing someone's private sexual images without their consent, often as abuse or coercion",
    optionB: "Sharing health records without permission",
    optionC: "Uploading images to unsecured cloud storage",
    correctOption: "A",
    explanation:
      "NCII is a form of gender-based violence. It is illegal in many jurisdictions and causes severe psychological harm.",
    difficulty: "BEGINNER",
    status: "APPROVED",
    categoryId: "cat-006",
    createdAt: new Date(),
    updatedAt: new Date(),
    category: {
      id: "cat-006",
      slug: "gender-based-cyber-violence",
      name: "Gender-Based Cyber Violence",
    },
  },
]

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Questions</h2>
        <p className="text-muted-foreground mt-1">
          Explore intersectional cybersecurity topics
        </p>
      </div>

      <QuizGrid
        questions={staticQuestions}
        bookmarkedIds={new Set()}
        userCollections={[]}
        isAuthenticated={false}
      />
    </div>
  )
}
