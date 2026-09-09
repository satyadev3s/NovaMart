import { Sparkles } from "lucide-react";

export default function Loader({ message = "Loading curated collection..." }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 20px",
        gap: "16px",
      }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          border: "3px solid var(--slate-200)",
          borderTopColor: "var(--brand-600)",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <p style={{ color: "var(--slate-500)", fontSize: "14px", fontWeight: 500 }}>
        {message}
      </p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
