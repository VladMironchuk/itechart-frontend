import "./layout.scss";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import Header from "./header/header";
import Footer from "./footer/footer";
import SignInModal from "@/elements/modal/signInModal";
import SignUpModal from "@/elements/modal/signUpModal";
import { ModalState } from "@/redux/slices/modal";

type Props = { children: ReactNode };

const Layout: React.FC<Props> = (props) => {
  const { children } = props;

  const isSignInVisible = useSelector((state: { modal: ModalState }) => state.modal.isSignInVisible);
  const isSignUpVisible = useSelector((state: { modal: ModalState }) => state.modal.isSignUpVisible);

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
