import { ComfortCheckinSurvey } from "@/components/ComfortCheckinSurvey";

export default function ComfortCheckinPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Comfort Check-in</h1>
        <p className="text-muted-foreground">Let us know how you're feeling in your new items.</p>
      </div>
      <ComfortCheckinSurvey />
    </div>
  );
}
