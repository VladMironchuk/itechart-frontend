import "./layout.scss";
import { ReactNode } from "react";
import Header from "./header/header";
import Footer from "./footer/footer";

type Props = { children: ReactNode };

const Layout: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
