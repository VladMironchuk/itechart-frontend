import { ReactNode } from "react";

export const SectionContainer: React.FC<{ title: string; children: ReactNode }> = ({ title, children }) => (
  <section className="section">
    <h3>{title}</h3>
    {children}
  </section>
);
