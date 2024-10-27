// components/AnimatedLayout.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function AnimatedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex flex-col flex-grow"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}