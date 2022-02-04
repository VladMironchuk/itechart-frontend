import { ReactNode } from "react";

type SectionContainerProps = { title: string; children: ReactNode; classname?: string };

const SectionContainer: React.FC<SectionContainerProps> = (props) => {
  const { title, children, classname } = props;
  return (
    <section className={`section ${classname}`}>
      <h3>{title}</h3>
      {children}
    </section>
  );
};

export default SectionContainer;
