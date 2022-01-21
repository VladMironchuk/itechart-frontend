import "./layout.scss";
import { ReactNode, useContext } from "react";
import Header from "./header/header";
import Footer from "./footer/footer";
import AppContext from "@/context/context";
import Modal from "@/elements/modal/modal";
import Input from "@/elements/formInput/formInput";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isVisible } = useContext(AppContext);

  return (
    <>
      {isVisible && (
        <Modal title="Authorization">
          <Input label="Login" />
          <Input label="Password" />
        </Modal>
      )}
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
