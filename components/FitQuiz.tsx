"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const quizSteps = [
  {
    question: "How does your current bra band feel?",
    options: [
      "It rides up my back.",
      "It feels snug and stays in place.",
      "It digs in and feels tight.",
    ],
  },
  {
    question: "How do the cups fit?",
    options: [
      "There's gaping at the top.",
      "My breasts spill over the top.",
      "They fit perfectly.",
    ],
  },
  {
    question: "What's your biggest bra struggle?",
    options: [
      "Straps that slip.",
      "Underwire that pokes.",
      "Lack of support.",
      "Not enough coverage.",
    ],
  },
];

// A simple rules engine for the quiz
function calculateFit(answers: Record<number, string>) {
  let size = "34B"; // Default
  let style = "Plunge"; // Default
  let confidence = 75; // Default

  // Example rule 1: Band size
  if (answers[0]?.includes("rides up")) {
    size = "32C"; // Smaller band, larger cup (sister size)
    confidence -= 10;
  } else if (answers[0]?.includes("digs in")) {
    size = "36A"; // Larger band, smaller cup (sister size)
    confidence -= 10;
  }

  // Example rule 2: Cup fit
  if (answers[1]?.includes("gaping")) {
    style = "Demi-Cup"; // Better for less top fullness
    confidence += 5;
  } else if (answers[1]?.includes("spill over")) {
    style = "Full Coverage";
    confidence += 5;
  }

  // Example rule 3: Main struggle
  if (answers[2]?.includes("support")) {
    style = "Balconette";
  }

  return { size, style, confidence: Math.max(50, Math.min(99, confidence)) };
}


export function FitQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<{ size: string; style: string; confidence: number } | null>(null);

  const handleNext = () => {
    if (step < quizSteps.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate and set the result
      const fitResult = calculateFit(answers);
      setResult(fitResult);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [step]: value });
  };

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [step]: value });
  };

  const saveResult = () => {
    if (result) {
      localStorage.setItem("fitQuizResult", JSON.stringify(result));
      alert("Your fit profile has been saved!");
    }
  };

  if (result) {
    return (
      <div className="p-6 border rounded-2xl bg-card text-center">
        <h3 className="text-xl font-bold mb-2">Your Fit Profile</h3>
        <p className="text-muted-foreground mb-4">We recommend the following based on your answers:</p>
        <div className="space-y-4 my-6">
          <div>
            <p className="text-sm text-muted-foreground">Recommended Size</p>
            <p className="text-3xl font-bold">{result.size}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Best Style for You</p>
            <p className="text-3xl font-bold">{result.style}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Confidence Score</p>
            <p className="text-3xl font-bold">{result.confidence}%</p>
          </div>
        </div>
        <Button onClick={saveResult}>Save My Fit Profile</Button>
      </div>
    );
  }

  const currentStep = quizSteps[step];

  return (
    <div className="p-6 border rounded-2xl bg-card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">{currentStep.question}</h3>
        <RadioGroup onValueChange={handleAnswerChange} value={answers[step]}>
          {currentStep.options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrev} disabled={step === 0}>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={!answers[step]}>
          {step === quizSteps.length - 1 ? "Get My Results" : "Next"}
        </Button>
      </div>
    </div>
  );
}
