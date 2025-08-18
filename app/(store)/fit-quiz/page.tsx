import { FitQuiz } from "@/components/FitQuiz";

export default function FitQuizPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-2">Find Your Perfect Fit</h1>
      <p className="text-center text-muted-foreground mb-8">
        Answer a few questions to get a personalized size and style recommendation.
      </p>
      <FitQuiz />
    </div>
  );
}
