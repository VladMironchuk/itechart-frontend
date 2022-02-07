import "./layout.scss";
import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./header/header";
import Footer from "./footer/footer";
import SignInModal from "@/elements/modal/signInModal";
import SignUpModal from "@/elements/modal/signUpModal";
import { modalActions, ModalState } from "@/redux/slices/modal";

type Props = { children: ReactNode };

const Layout: React.FC<Props> = (props) => {
  const { children } = props;

  const isSignInVisible = useSelector((state: { modal: ModalState }) => state.modal.isSignInVisible);
  const isSignUpVisible = useSelector((state: { modal: ModalState }) => state.modal.isSignUpVisible);

  const dispatch = useDispatch();

  const onSignIn = () => {
    dispatch(modalActions.toggleSignIn());
  };

  const onSignUp = () => {
    dispatch(modalActions.toggleSignUp());
  };

  return (
    <>
      {isSignInVisible && <SignInModal signInHandler={onSignIn} />}
      {isSignUpVisible && <SignUpModal signUpHandler={onSignUp} />}
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
