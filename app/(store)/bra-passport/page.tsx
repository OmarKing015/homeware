import { BraPassport } from "@/components/BraPassport";

export default function BraPassportPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-2">Bra Passport</h1>
      <p className="text-center text-muted-foreground mb-8">
        Find your size with us by telling us what size you wear in another brand.
      </p>
      <BraPassport />
    </div>
  );
}
