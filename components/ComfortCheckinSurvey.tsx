"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const surveyQuestions = [
  { id: "strap", question: "How are the straps feeling?", options: ["Just right", "Slipping off", "Digging in"] },
  { id: "band", question: "How's the band?", options: ["Snug & secure", "Too loose", "Too tight"] },
  { id: "cup", question: "And the cups?", options: ["Perfect fit", "A little roomy", "Spilling over"] },
  { id: "breathability", question: "How's the breathability?", options: ["Very breathable", "It's okay", "Not breathable"] },
];

export function ComfortCheckinSurvey() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = () => {
    // In a real app, this would save to a user profile
    console.log("Survey submitted:", answers);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Thank You!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">We've saved your feedback. If something's not right, we're here to help.</p>
          <Button>Request a Free Exchange</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-8">
        {surveyQuestions.map(({ id, question, options }) => (
          <div key={id}>
            <Label className="font-semibold text-lg">{question}</Label>
            <RadioGroup onValueChange={(value) => handleAnswerChange(id, value)} className="mt-2">
              {options.map(opt => (
                <div key={opt} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt} id={`${id}-${opt}`} />
                  <Label htmlFor={`${id}-${opt}`}>{opt}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
        <Button onClick={handleSubmit} className="w-full">Submit Feedback</Button>
      </CardContent>
    </Card>
  );
}
