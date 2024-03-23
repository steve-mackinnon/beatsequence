import { useEffect, useState } from "react";

export function useMobileMode(): boolean {
  const [mobileMode, setMobileMode] = useState(false);

  useEffect(() => {
    const handleResize = (): void => {
      setMobileMode(document.body.clientWidth < 708);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return mobileMode;
}
