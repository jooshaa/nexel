"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface AddToCartButtonProps {
  name: string;
}

export function AddToCartButton({ name }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    if (added) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.97 }}
      className={`w-full py-4 rounded-xl text-sm font-semibold tracking-wider transition-all duration-300 ${
        added
          ? "bg-gray-900 text-white"
          : "bg-gray-900 text-white hover:bg-gray-700"
      }`}
    >
      {added ? "✓ Added to Bag" : `Add to Bag — ${name}`}
    </motion.button>
  );
}
