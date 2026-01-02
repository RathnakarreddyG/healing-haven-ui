import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuggestedQuestion {
  id: string;
  text: string;
}

interface SuggestedQuestionsProps {
  questions?: SuggestedQuestion[];
  onSelect?: (question: string) => void;
}

const defaultQuestions: SuggestedQuestion[] = [
  {
    id: "1",
    text: "How should I counsel patients on safe, effective use of common medications such as statins, ACE inhibitors, metformin, and SSRIs?",
  },
  {
    id: "2",
    text: "What are the diagnostic criteria and initial management steps for suspected depression or anxiety in a primary care encounter?",
  },
  {
    id: "3",
    text: "How do I determine when a patient with respiratory symptoms requires escalation to emergency care (e.g., red flags for pneumonia, sepsis, or PE)?",
  },
  {
    id: "4",
    text: "What vaccinations are recommended for adults based on age, comorbidities, and risk factors?",
  },
  {
    id: "5",
    text: "What is the appropriate workup for chronic cough, and how do I distinguish asthma, GERD, post-nasal drip, and red-flag etiologies?",
  },
  {
    id: "6",
    text: "What emergency or urgent symptoms should prompt same-day referral—for example, chest pain, neurological deficits, or severe infection—and how should these be triaged in clinic?",
  },
];

export function SuggestedQuestions({ 
  questions = defaultQuestions, 
  onSelect 
}: SuggestedQuestionsProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Suggested Questions</h3>
        <Button variant="link" className="text-primary text-sm p-0 h-auto font-medium">
          Explore more
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {questions.map((question, index) => (
          <Button
            key={question.id}
            variant="suggestion"
            onClick={() => onSelect?.(question.text)}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="text-sm leading-relaxed text-primary line-clamp-3">
              {question.text}
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 ml-auto" />
          </Button>
        ))}
      </div>
    </div>
  );
}
