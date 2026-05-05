"use client";

import { ProductColor } from "@/lib/productData";

interface ColorSelectorProps {
  colors: ProductColor[];
  selected: string;
  onChange: (name: string) => void;
}

export function ColorSelector({ colors, selected, onChange }: ColorSelectorProps) {
  return (
    <div className="flex items-center gap-3">
      {colors.map((color) => (
        <button
          key={color.name}
          title={color.name}
          onClick={() => onChange(color.name)}
          className="relative w-7 h-7 rounded-full transition-transform duration-200 hover:scale-110 focus:outline-none"
          style={{ backgroundColor: color.hex }}
        >
          {selected === color.name && (
            <span
              className="absolute inset-0 rounded-full ring-2 ring-offset-2 ring-gray-900"
              aria-hidden="true"
            />
          )}
        </button>
      ))}
    </div>
  );
}
