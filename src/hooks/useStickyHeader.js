import { useState, useEffect } from "react";
import { CONFIG } from "../config/constants";

export function useStickyHeader() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > CONFIG.scrollThreshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isCompact;
}
