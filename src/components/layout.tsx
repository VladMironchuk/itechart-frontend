import "./layout.scss";
import { ReactNode, useState } from "react";
import Header from "./header/header";
import Footer from "./footer/footer";
import SignInModal from "@/elements/modal/signInModal";
import SignUpModal from "@/elements/modal/signUpModal";

type LayoutProps = { children: ReactNode };

const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props;

  const [isSignInVisible, setSignInIsVisible] = useState(false);
  const [isSignUpVisible, setSignUpIsVisible] = useState(false);

  const toggleSignInModal = () => {
    setSignInIsVisible((prevState) => !prevState);
  };

  const toggleSignUpModal = () => {
    setSignUpIsVisible((prevState) => !prevState);
  };

  return (
    <>
      {isSignInVisible && <SignInModal signInHandler={toggleSignInModal} />}
      {isSignUpVisible && <SignUpModal signUpHandler={toggleSignUpModal} />}
      <Header signInHandler={toggleSignInModal} signUpHandler={toggleSignUpModal} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
