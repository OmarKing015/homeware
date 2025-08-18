"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useBasketStore from "@/store/store"; // Note: The store is named useBasketStore but contains more now.

export function DiscreetModeToggle() {
  const { isDiscreet, toggleDiscreetMode } = useBasketStore();

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="discreet-mode"
        checked={isDiscreet}
        onCheckedChange={toggleDiscreetMode}
      />
      <Label htmlFor="discreet-mode">Discreet Mode</Label>
    </div>
  );
}
