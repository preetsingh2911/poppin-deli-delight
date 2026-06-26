import React, { useState, useEffect } from "react";
import LottieModule from "lottie-react";
import { motion, AnimatePresence } from "motion/react";
import loadingBeans from "@/assets/lottie/loading-beans.json";

// Handle ESM/CJS default export mismatch during SSR
const Lottie = (LottieModule as any).default || LottieModule;

export function IntroLoader() {
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Hide the intro loader after a short delay (e.g. 2.5 seconds)
    // You can adjust this duration to match the Lottie animation length
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  if (!isClient) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
        >
          <div className="w-64 h-64 md:w-80 md:h-80">
            <Lottie 
              animationData={loadingBeans} 
              loop={true} 
            />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-4 font-display text-2xl font-bold text-foreground tracking-widest"
          >
            BREWING...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
