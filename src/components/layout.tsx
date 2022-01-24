import "./layout.scss";
import { ReactNode, useContext } from "react";
import Header from "./header/header";
import Footer from "./footer/footer";
import AppContext from "@/context/context";
import SignInModal from "@/elements/modal/signInModal";
import SignUpModal from "@/elements/modal/signUpModal";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isSignInVisible, isSignUpVisible } = useContext(AppContext);

  return (
    <>
      {isSignInVisible && <SignInModal />}
      {isSignUpVisible && <SignUpModal />}
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
