import { ReactNode } from "react";

type SectionContainerProps = { title: string; children: ReactNode };

const SectionContainer: React.FC<SectionContainerProps> = (props) => {
  const { title, children } = props;
  return (
    <section className="section">
      <h3>{title}</h3>
      {children}
    </section>
  );
};

export default SectionContainer;
