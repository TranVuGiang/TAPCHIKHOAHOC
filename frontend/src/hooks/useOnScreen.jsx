import { useEffect, useState } from "react";

function useOnScreen(ref) {
    const [isIntersecting, setIntersecting] = useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting),
        { threshold: 0.1 }
      );
  
      if (ref.current) {
        observer.observe(ref.current);
      }
  
      return () => observer.disconnect();
    }, []);
  
    return isIntersecting;
  }
  
  export default useOnScreen;
  