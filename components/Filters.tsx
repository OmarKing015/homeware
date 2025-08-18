"use client";

import * as React from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

// Mock filter options
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = ["Black", "White", "Nude", "Blush", "Espresso"];
const fabrics = ["Cotton", "Modal", "Lace", "Mesh", "Silk"];
const supportLevels = ["Low", "Medium", "High", "Max"];

export function Filters() {
  return (
    <aside className="w-full md:w-64 lg:w-72 p-4 border rounded-2xl">
      <h3 className="text-lg font-semibold mb-4">Filter By</h3>
      <div className="space-y-6">
        <div>
          <Label htmlFor="size-filter" className="font-medium">Size</Label>
          <Select>
            <SelectTrigger id="size-filter">
              <SelectValue placeholder="All Sizes" />
            </SelectTrigger>
            <SelectContent>
              {sizes.map((size) => (
                <SelectItem key={size} value={size.toLowerCase()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="color-filter" className="font-medium">Color</Label>
           <Select>
            <SelectTrigger id="color-filter">
              <SelectValue placeholder="All Colors" />
            </SelectTrigger>
            <SelectContent>
              {colors.map((color) => (
                <SelectItem key={color} value={color.toLowerCase()}>
                  {color}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="fabric-filter" className="font-medium">Fabric</Label>
           <Select>
            <SelectTrigger id="fabric-filter">
              <SelectValue placeholder="All Fabrics" />
            </SelectTrigger>
            <SelectContent>
              {fabrics.map((fabric) => (
                <SelectItem key={fabric} value={fabric.toLowerCase()}>
                  {fabric}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="support-filter" className="font-medium">Support Level</Label>
           <Select>
            <SelectTrigger id="support-filter">
              <SelectValue placeholder="All Support Levels" />
            </SelectTrigger>
            <SelectContent>
              {supportLevels.map((support) => (
                <SelectItem key={support} value={support.toLowerCase()}>
                  {support}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
       <Button className="w-full mt-8">Apply Filters</Button>
    </aside>
  );
}
