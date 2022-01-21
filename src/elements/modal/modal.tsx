import "./modal.scss";
import React, { ReactNode, useContext } from "react";
import ReactDOM from "react-dom";
import AppContext from "@/context/context";
import FormButton from "../button/button";
import crossIcon from "@/assets/images/cross-icon.png";

const ModalOverlay: React.FC<{ title: string; children: ReactNode[] }> = ({ title, children }) => {
  const { setIsVisible } = useContext(AppContext);

  return (
    <form className="modal">
      <div className="wrapper">
        <h3 className="modal__title">{title}</h3>
        <button type="button" className="cancel-button" onClick={setIsVisible}>
          <img className="cancel" src={crossIcon} alt="cancel" />
        </button>
      </div>
      {children}
      <FormButton url="/api/auth/signIn/" method="POST" />
    </form>
  );
};

const Modal: React.FC<{ title: string; children: ReactNode[] }> = ({ title, children }) => (
  <>
    {ReactDOM.createPortal(
      <ModalOverlay title={title}>{children}</ModalOverlay>,
      document.getElementById("modal") as HTMLElement
    )}
  </>
);

export default Modal;
