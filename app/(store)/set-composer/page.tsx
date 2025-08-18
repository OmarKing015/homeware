import { SetComposer } from "@/components/SetComposer";

export default function SetComposerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Set Composer</h1>
        <p className="text-muted-foreground">Build your perfect set, piece by piece.</p>
      </div>
      <SetComposer />
    </div>
  );
}
