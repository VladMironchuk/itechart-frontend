import { ReactNode } from "react";

type Props = { title: string; children: ReactNode; classname?: string };

const SectionContainer: React.FC<Props> = (props) => {
  const { title, children, classname } = props;
  return (
    <section className={`section ${classname}`}>
      <h3>{title}</h3>
      {children}
    </section>
  );
};

export default SectionContainer;
