import { Link } from "react-router-dom";

export default function PageSwitchLink({ to, label }) {
  return (
    <Link
      to={to}
      style={{
        position: "fixed",
        top: 20,
        right: 32,
        zIndex: 80,
        fontFamily: "'Space Mono', monospace",
        fontSize: 11,
        color: "rgba(255,255,255,0.45)",
        textDecoration: "none",
        letterSpacing: "1px",
        padding: "8px 12px",
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(5,8,16,0.55)",
        backdropFilter: "blur(6px)",
        transition: "all 0.3s ease",
      }}
      onClick={() => {
        try {
          sessionStorage.setItem("introPlayed", "1");
        } catch (e) {}
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#00f5c4";
        e.currentTarget.style.borderColor = "rgba(0,245,196,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "rgba(255,255,255,0.45)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
      }}
    >
      {label}
    </Link>
  );
}
