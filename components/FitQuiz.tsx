"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import Link from "next/link";

// English version
const quizStepsEn = [
  {
    question: "How does your bra band usually feel on you?",
    options: [
      "It rides up and feels loose.",
      "It feels snug and stays put.",
      "It digs in and feels too tight.",
    ],
  },
  {
    question: "How do the cups sit on your breasts?",
    options: [
      "There’s gaping at the top.",
      "My breasts spill over the top.",
      "They hug me just right.",
    ],
  },
  {
    question: "What’s your biggest bra struggle?",
    options: [
      "Straps that keep slipping.",
      "Underwire poking my skin.",
      "Not enough support.",
      "Not enough sexy coverage.",
    ],
  },
];

// Egyptian Arabic (Alexandria, playful, sexy vibe)
const quizStepsAr = [
  {
    question: "البرا بتاعتك بيحسسك بإيه في الضهر؟",
    options: [
      "بيطلع لفوق ومش ماسك كويس.",
      "ماسك حلو ومظبوط عليا.",
      "بيشد جامد ومضيّقني.",
    ],
  },
  {
    question: "الكوبايات بتقعد إزاي على صدرك؟",
    options: [
      "في فراغ من فوق كده.",
      "البرستات بتفلت من فوق.",
      "مظبوطين عليا وواخديني بالحضن.",
    ],
  },
  {
    question: "أكتر حاجة بتضايقك في البرا",
    options: [
      "الحمالات بتقع على طول.",
      "السلك بيغرّز في جلدي.",
      "مفيش دعم كفاية.",
      "مفيش كفرج كده يبان سيكسي.",
    ],
  },
];

function calculateFit(answers: Record<number, string>) {
  let size = "34B";
  let style = "Plunge";
  let confidence = 75;

  if (answers[0]?.includes("loose") || answers[0]?.includes("فوق")) {
    size = "32C";
    confidence -= 10;
  } else if (answers[0]?.includes("tight") || answers[0]?.includes("مضيّقني")) {
    size = "36A";
    confidence -= 10;
  }

  if (answers[1]?.includes("gaping") || answers[1]?.includes("فراغ")) {
    style = "Demi-Cup";
    confidence += 5;
  } else if (answers[1]?.includes("spill") || answers[1]?.includes("تفلت")) {
    style = "Full Coverage";
    confidence += 5;
  }

  if (answers[2]?.includes("support") || answers[2]?.includes("دعم")) {
    style = "Balconette";
  }

  return { size, style, confidence: Math.max(50, Math.min(99, confidence)) };
}

export function FitQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<{ size: string; style: string; confidence: number } | null>(null);
  const [lang, setLang] = useState<"en" | "ar">("en");

  const quizSteps = lang === "en" ? quizStepsEn : quizStepsAr;

  const handleNext = () => {
    if (step < quizSteps.length - 1) {
      setStep(step + 1);
    } else {
      const fitResult = calculateFit(answers);
      setResult(fitResult);
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [step]: value });
  };

  if (result) {
    return (
      <div className="p-6 border rounded-2xl bg-card text-center">
        <h3 className="text-xl font-bold mb-2">
          {lang === "en" ? "Your Fit Profile" : "البروفايل بتاع مقاسك"}
        </h3>
        <p className="text-muted-foreground mb-4">
          {lang === "en"
            ? "We recommend the following based on your answers:"
            : "ده اللي نرشحهولك من إجاباتك:"}
        </p>
        <div className="space-y-4 my-6">
          <div>
            <p className="text-sm text-muted-foreground">
              {lang === "en" ? "Recommended Size" : "المقاس المناسب"}
            </p>
            <p className="text-3xl font-bold">{result.size}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {lang === "en" ? "Best Style for You" : "أحلى ستايل ليكي"}
            </p>
            <p className="text-3xl font-bold">{result.style}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {lang === "en" ? "Confidence Score" : "درجة الثقة"}
            </p>
            <p className="text-3xl font-bold">{result.confidence}%</p>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <a href="/fit-quiz">
            <Button>{lang === "en" ? "Retest" : "جرّبي تاني"}</Button>
          </a>
          <Button variant="outline" onClick={() => setLang(lang === "en" ? "ar" : "en")}>
            {lang === "en" ? "عربي" : "English"}
          </Button>
        </div>
      </div>
    );
  }

  const currentStep = quizSteps[step];

  return (
    <div className="p-6 border rounded-2xl bg-card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">{currentStep.question}</h3>
        <Button variant="outline" size="sm" onClick={() => setLang(lang === "en" ? "ar" : "en")}>
          {lang === "en" ? "عربي" : "English"}
        </Button>
      </div>
      <RadioGroup onValueChange={handleAnswerChange} value={answers[step]}>
        {currentStep.options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={option} />
            <Label htmlFor={option}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={handlePrev} disabled={step === 0}>
          {lang === "en" ? "Previous" : "قبل"}
        </Button>
        <Button onClick={handleNext} disabled={!answers[step]}>
          {step === quizSteps.length - 1
            ? lang === "en"
              ? "Get My Results"
              : "وريني النتيجة"
            : lang === "en"
            ? "Next"
            : "بعد"}
        </Button>
      </div>
    </div>
  );
}
