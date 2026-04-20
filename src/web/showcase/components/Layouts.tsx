
export const FeatureCard = ({ title, children, icon }: { title: string, children: ReactNode, icon?: ReactNode }) => (
  <div className="feature-card" style={{ 
    background: "var(--card-bg)", 
    border: "1px solid var(--border)", 
    borderRadius: "8px", 
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--accent)", fontWeight: "bold", fontSize: "14px" }}>
      {icon}
      <span>{title}</span>
    </div>
    <div style={{ color: "var(--text)", fontSize: "13px" }}>
      {children}
    </div>
  </div>
);

