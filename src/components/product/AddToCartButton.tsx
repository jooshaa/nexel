"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

interface AddToCartButtonProps {
  name: string;
}

export function AddToCartButton({ name }: AddToCartButtonProps) {
  const { t } = useLanguage();
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
      {added ? t("addedToBag") : `${t("addToBag")} — ${name}`}
    </motion.button>
  );
}
