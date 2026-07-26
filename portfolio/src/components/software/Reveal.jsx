import { useRef } from "react";
import useIntersection from "../../hooks/useIntersection";

export default function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const visible = useIntersection(ref);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
