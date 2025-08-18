"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// Mock data: In a real app, this would be more extensive.
const otherBrands = ["Victoria's Secret", "Aerie", "ThirdLove", "Savage X Fenty"];
const bandSizes = ["30", "32", "34", "36", "38", "40"];
const cupSizes = ["A", "B", "C", "D", "DD", "DDD/F", "G"];

// Simple conversion logic: vs -> our brand is one cup size down
const conversionTable: Record<string, Record<string, string>> = {
  "victoria's secret": { cup: "-1" },
  "aerie": { cup: "0" }, // Same
  "thirdlove": { cup: "+1" }, // Our cups are smaller
  "savage x fenty": { cup: "-1" },
};

export function BraPassport() {
  const [brand, setBrand] = useState("");
  const [band, setBand] = useState("");
  const [cup, setCup] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleConversion = () => {
    if (!brand || !band || !cup) {
      setResult("Please fill in all fields.");
      return;
    }

    const brandKey = brand.toLowerCase();
    const conversion = conversionTable[brandKey];
    if (!conversion) {
      setResult(`Sorry, we don't have conversion data for ${brand} yet.`);
      return;
    }

    const cupIndex = cupSizes.indexOf(cup);
    const newCupIndex = cupIndex + parseInt(conversion.cup, 10);

    if (newCupIndex < 0 || newCupIndex >= cupSizes.length) {
      setResult("Could not convert size accurately.");
      return;
    }

    const ourSize = `${band}${cupSizes[newCupIndex]}`;

    // Calculate sister sizes
    const bandIndex = bandSizes.indexOf(band);
    const sisterSizeUp = bandIndex > 0 ? `${bandSizes[bandIndex - 1]}${cupSizes[newCupIndex + 1]}` : null;
    const sisterSizeDown = bandIndex < bandSizes.length - 1 ? `${bandSizes[bandIndex + 1]}${cupSizes[newCupIndex - 1]}` : null;

    setResult({
      recommended: ourSize,
      rationale: `Based on ${brand}, we've adjusted your cup size.`,
      sisterUp: sisterSizeUp,
      sisterDown: sisterSizeDown,
    });
  };

  return (
    <div className="p-6 border rounded-2xl bg-card">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="brand">Brand</Label>
          <Select onValueChange={setBrand}>
            <SelectTrigger id="brand"><SelectValue placeholder="Select a brand" /></SelectTrigger>
            <SelectContent>{otherBrands.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="band">Band Size</Label>
          <Select onValueChange={setBand}>
            <SelectTrigger id="band"><SelectValue placeholder="Select a band size" /></SelectTrigger>
            <SelectContent>{bandSizes.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="cup">Cup Size</Label>
          <Select onValueChange={setCup}>
            <SelectTrigger id="cup"><SelectValue placeholder="Select a cup size" /></SelectTrigger>
            <SelectContent>{cupSizes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={handleConversion} className="w-full">Find My Size</Button>
      {result && (
        <div className="mt-6 p-4 bg-secondary rounded-lg text-center space-y-2">
          <p className="text-sm font-medium">{result.rationale}</p>
          <p className="text-lg">We recommend size: <span className="font-bold text-2xl">{result.recommended}</span></p>
          {(result.sisterUp || result.sisterDown) && <p className="text-sm text-muted-foreground pt-2">Your sister sizes might be:</p>}
          <div className="flex justify-center gap-4">
            {result.sisterUp && <span className="font-mono p-2 bg-background rounded-md">{result.sisterUp}</span>}
            {result.sisterDown && <span className="font-mono p-2 bg-background rounded-md">{result.sisterDown}</span>}
          </div>
        </div>
      )}
    </div>
  );
}
