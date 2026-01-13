import { Message, Reference, ChatMode } from "@/types/chat";

// Medical response templates based on common queries
const medicalResponses: Record<string, { content: string; references: Reference[] }> = {
  heart: {
    content: `For acute heart failure exacerbation, the recommended laboratory workup includes:

• **Brain Natriuretic Peptide (BNP) or NT-proBNP** — Essential for diagnosis and prognosis. Elevated levels (>100 pg/mL for BNP, >300 pg/mL for NT-proBNP) support HF diagnosis. [1, 2]

• **Complete Blood Count (CBC)** — To assess for anemia, which can exacerbate heart failure symptoms. [1]

• **Basic Metabolic Panel (BMP)** — Includes electrolytes (Na, K), BUN, creatinine to evaluate renal function and guide diuretic therapy. [2, 3]

• **Troponin I or T** — To rule out acute coronary syndrome as a precipitant. [1, 2]

• **Thyroid Function Tests (TSH)** — Thyroid disorders can precipitate or worsen heart failure. [3]

• **Liver Function Tests** — To assess for hepatic congestion. [2]`,
    references: [
      { id: 1, text: "Yancy CW, et al. 2017 ACC/AHA/HFSA Heart Failure Guidelines. Circulation. 2017;136(6):e137-e161." },
      { id: 2, text: "Ponikowski P, et al. 2016 ESC Guidelines for Heart Failure. European Heart Journal. 2016;37(27):2129-2200." },
      { id: 3, text: "McDonagh TA, et al. 2021 ESC Guidelines for Heart Failure. European Heart Journal. 2021;42(36):3599-3726." },
    ],
  },
  diabetes: {
    content: `For comprehensive diabetes management, consider the following approach:

• **HbA1c Testing** — Target <7% for most adults. Test every 3-6 months depending on control. [1, 2]

• **Fasting Plasma Glucose** — Target 80-130 mg/dL preprandial for most adults. [1]

• **Lipid Panel** — Annual screening; target LDL <100 mg/dL (<70 mg/dL if high CV risk). [2]

• **Renal Function** — Annual eGFR and urine albumin-to-creatinine ratio to screen for diabetic nephropathy. [1, 3]

• **Retinal Examination** — Annual dilated eye exam for early detection of diabetic retinopathy. [2]

• **Foot Examination** — Comprehensive foot exam annually, including monofilament testing. [1]`,
    references: [
      { id: 1, text: "American Diabetes Association. Standards of Care in Diabetes—2024. Diabetes Care. 2024;47(Suppl 1)." },
      { id: 2, text: "Davies MJ, et al. Management of Hyperglycemia in Type 2 Diabetes, 2022. Diabetes Care. 2022;45(11):2753-2786." },
      { id: 3, text: "KDIGO 2022 Clinical Practice Guideline for Diabetes Management in CKD. Kidney International. 2022;102(5S):S1-S127." },
    ],
  },
  pain: {
    content: `For evaluation of severe abdominal pain with vomiting, a systematic approach is recommended:

• **Initial Assessment** — Vital signs, pain characteristics (location, onset, radiation), associated symptoms. Red flags include fever, hypotension, peritoneal signs. [1, 2]

• **Laboratory Studies:**
  - CBC with differential (infection, anemia)
  - CMP (electrolytes, renal/hepatic function)
  - Lipase (pancreatitis)
  - Urinalysis (UTI, nephrolithiasis)
  - Pregnancy test in reproductive-age females [1, 3]

• **Imaging Considerations:**
  - CT abdomen/pelvis with contrast — Most sensitive for acute pathology
  - Ultrasound — First-line for biliary disease, pregnancy
  - X-ray — Obstruction, free air [2, 3]

• **Differential Diagnosis by Quadrant:**
  - RUQ: Cholecystitis, hepatitis
  - LUQ: Splenic pathology, pancreatitis
  - RLQ: Appendicitis, ovarian torsion
  - LLQ: Diverticulitis, colitis [1]`,
    references: [
      { id: 1, text: "Cartwright SL, Knudson MP. Evaluation of Acute Abdominal Pain in Adults. Am Fam Physician. 2008;77(7):971-978." },
      { id: 2, text: "Macaluso CR, McNamara RM. Evaluation and Management of Acute Abdominal Pain. Int J Gen Med. 2012;5:789-797." },
      { id: 3, text: "Natesan S, et al. Evidence-Based Medicine Approach to Abdominal Pain. Emerg Med Clin North Am. 2016;34(2):165-190." },
    ],
  },
  hypertension: {
    content: `For hypertension management, follow current evidence-based guidelines:

• **Blood Pressure Targets:**
  - General population: <130/80 mmHg
  - Elderly (≥65 years): <130/80 mmHg if tolerated
  - Diabetes or CKD: <130/80 mmHg [1, 2]

• **First-line Medications:**
  - ACE inhibitors or ARBs — Preferred in diabetes, CKD, heart failure
  - Calcium channel blockers — Effective in elderly, Black patients
  - Thiazide diuretics — Cost-effective, proven outcomes [1, 3]

• **Lifestyle Modifications:**
  - DASH diet (Dietary Approaches to Stop Hypertension)
  - Sodium restriction (<2,300 mg/day, ideally <1,500 mg)
  - Regular aerobic exercise (150 min/week)
  - Weight management (BMI 18.5-24.9)
  - Alcohol limitation [2, 3]

• **Monitoring:**
  - Home BP monitoring recommended
  - Follow-up every 3-6 months once at goal [1]`,
    references: [
      { id: 1, text: "Whelton PK, et al. 2017 ACC/AHA Hypertension Guideline. J Am Coll Cardiol. 2018;71(19):e127-e248." },
      { id: 2, text: "Williams B, et al. 2018 ESC/ESH Guidelines for Hypertension. European Heart Journal. 2018;39(33):3021-3104." },
      { id: 3, text: "James PA, et al. 2014 Evidence-Based Guideline for Hypertension (JNC 8). JAMA. 2014;311(5):507-520." },
    ],
  },
  infection: {
    content: `For suspected infection assessment, consider the following evaluation:

• **Sepsis Screening (qSOFA criteria):**
  - Respiratory rate ≥22/min
  - Altered mental status
  - Systolic BP ≤100 mmHg
  Score ≥2 indicates high risk for poor outcomes [1, 2]

• **Laboratory Workup:**
  - CBC with differential
  - Comprehensive metabolic panel
  - Lactate level (≥2 mmol/L suggests tissue hypoperfusion)
  - Procalcitonin (bacterial vs viral differentiation)
  - Blood cultures (2 sets from different sites) [1, 3]

• **Source-Specific Testing:**
  - Urinalysis and urine culture
  - Chest X-ray
  - Lumbar puncture if meningitis suspected
  - Wound/abscess cultures if applicable [2, 3]

• **Empiric Antibiotic Selection:**
  - Broad-spectrum coverage initially
  - De-escalate based on culture results
  - Consider local resistance patterns [1]`,
    references: [
      { id: 1, text: "Rhodes A, et al. Surviving Sepsis Campaign: International Guidelines. Intensive Care Med. 2017;43(3):304-377." },
      { id: 2, text: "Singer M, et al. The Third International Consensus Definitions for Sepsis (Sepsis-3). JAMA. 2016;315(8):801-810." },
      { id: 3, text: "Evans L, et al. Surviving Sepsis Campaign: 2021 Guidelines. Intensive Care Med. 2021;47(11):1181-1247." },
    ],
  },
  default: {
    content: `Based on your clinical query, here is a structured approach:

• **Initial Assessment** — Gather comprehensive history including onset, duration, associated symptoms, and relevant medical history. [1]

• **Physical Examination** — Focus on systems relevant to the presenting complaint. Note vital signs and any red flag findings. [1, 2]

• **Diagnostic Workup** — Consider appropriate laboratory studies and imaging based on clinical suspicion. [2]

• **Differential Diagnosis** — Generate a prioritized list based on history, exam, and initial findings. [1, 3]

• **Management Plan** — Evidence-based treatment recommendations with appropriate follow-up. [3]

Would you like me to provide more specific guidance on any particular aspect of this case?`,
    references: [
      { id: 1, text: "Bickley LS. Bates' Guide to Physical Examination and History Taking. 13th ed. Wolters Kluwer; 2021." },
      { id: 2, text: "Jameson JL, et al. Harrison's Principles of Internal Medicine. 21st ed. McGraw-Hill; 2022." },
      { id: 3, text: "UpToDate. Evidence-based clinical decision support. Wolters Kluwer. 2024." },
    ],
  },
};

// Keywords to match responses
const keywordMap: Record<string, string[]> = {
  heart: ["heart", "cardiac", "chest pain", "heart failure", "cardio", "ecg", "ekg", "arrhythmia", "palpitation"],
  diabetes: ["diabetes", "blood sugar", "glucose", "hba1c", "insulin", "diabetic", "hyperglycemia"],
  pain: ["stomach", "abdominal", "vomiting", "nausea", "pain", "belly", "gastric"],
  hypertension: ["hypertension", "blood pressure", "bp", "high blood pressure", "antihypertensive"],
  infection: ["infection", "fever", "sepsis", "antibiotic", "bacteria", "viral", "flu", "pneumonia"],
};

function findBestResponse(message: string): { content: string; references: Reference[] } {
  const lowerMessage = message.toLowerCase();
  
  for (const [category, keywords] of Object.entries(keywordMap)) {
    for (const keyword of keywords) {
      if (lowerMessage.includes(keyword)) {
        return medicalResponses[category];
      }
    }
  }
  
  return medicalResponses.default;
}

export function generateSimulatedResponse(userMessage: string, mode: ChatMode): Promise<Message> {
  return new Promise((resolve) => {
    // Simulate network delay (1.5-3 seconds)
    const delay = 1500 + Math.random() * 1500;
    
    setTimeout(() => {
      const response = findBestResponse(userMessage);
      
      // In direct mode, provide shorter responses without as much detail
      const content = mode === "direct" 
        ? response.content.split("\n\n").slice(0, 2).join("\n\n")
        : response.content;
      
      resolve({
        id: Date.now().toString(),
        type: "assistant",
        content,
        references: response.references,
      });
    }, delay);
  });
}

// Generate a title from the first message
export function generateChatTitle(message: string): string {
  const words = message.split(" ").slice(0, 4);
  if (words.length >= 4) {
    return words.join(" ") + "...";
  }
  return message.length > 30 ? message.substring(0, 30) + "..." : message;
}