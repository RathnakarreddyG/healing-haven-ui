import { ChevronRight, Zap } from "lucide-react";

interface SuggestedQuestion {
  id: string;
  text: string;
  category?: string;
}

interface SuggestedQuestionsProps {
  questions?: SuggestedQuestion[];
  onSelect?: (question: string) => void;
}

const defaultQuestions: SuggestedQuestion[] = [
  {
    id: "1",
    text: "How should I counsel patients on safe, effective use of common medications such as statins, ACE inhibitors, metformin, and SSRIs?",
    category: "Medications",
  },
  {
    id: "2",
    text: "What are the diagnostic criteria and initial management steps for suspected depression or anxiety?",
    category: "Mental Health",
  },
  {
    id: "3",
    text: "How do I determine when a patient with respiratory symptoms requires escalation to emergency care?",
    category: "Emergency",
  },
  {
    id: "4",
    text: "What vaccinations are recommended for adults based on age, comorbidities, and risk factors?",
    category: "Prevention",
  },
  {
    id: "5",
    text: "What is the appropriate workup for chronic cough, and how do I distinguish asthma, GERD, post-nasal drip?",
    category: "Diagnosis",
  },
  {
    id: "6",
    text: "What emergency symptoms should prompt same-day referral—chest pain, neurological deficits, severe infection?",
    category: "Triage",
  },
];

export function SuggestedQuestions({ 
  questions = defaultQuestions, 
  onSelect 
}: SuggestedQuestionsProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <h3 className="font-display font-semibold text-foreground">Quick Start</h3>
        </div>
        <button className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
          Explore all
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {questions.map((question, index) => (
          <button
            key={question.id}
            onClick={() => onSelect?.(question.text)}
            className="group relative text-left p-4 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 opacity-0 animate-fade-in"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {/* Category badge */}
            {question.category && (
              <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground mb-3">
                {question.category}
              </span>
            )}
            
            <p className="text-sm text-foreground leading-relaxed line-clamp-2 group-hover:text-primary transition-colors">
              {question.text}
            </p>
            
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
              <ChevronRight className="h-5 w-5 text-primary" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
