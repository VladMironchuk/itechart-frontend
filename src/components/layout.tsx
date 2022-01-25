import "./layout.scss";
import { ReactNode, useState } from "react";
import Header from "./header/header";
import Footer from "./footer/footer";
import SignInModal from "@/elements/modal/signInModal";
import SignUpModal from "@/elements/modal/signUpModal";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSignInVisible, setSignInIsVisible] = useState(false);
  const [isSignUpVisible, setSignUpIsVisible] = useState(false);

  const toggleModal = (param: "in" | "up") => {
    switch (param) {
      case "in":
        return () => {
          setSignInIsVisible((prevState) => !prevState);
        };
      case "up":
        return () => {
          setSignUpIsVisible((prevState) => !prevState);
        };
      default:
        return () => {};
    }
  };

  return (
    <>
      {isSignInVisible && <SignInModal signInHandler={toggleModal("in")} />}
      {isSignUpVisible && <SignUpModal signUpHandler={toggleModal("up")} />}
      <Header signInHandler={toggleModal("in")} signUpHandler={toggleModal("up")} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
