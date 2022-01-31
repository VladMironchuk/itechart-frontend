import { ReactNode } from "react";
import ReactDOM from "react-dom";
import crossIcon from "@/assets/images/cross-icon.png";

type ModalProps = {
  onClose: () => void;
  title: string;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = (props) => {
  const { title, onClose, children } = props;

  return (
    <>
      {ReactDOM.createPortal(
        <div className="modal">
          <div className="wrapper">
            <h3 className="modal__title">{title}</h3>
            <button type="button" className="cancel-button" onClick={onClose}>
              <img className="cancel" src={crossIcon} alt="cancel" />
            </button>
          </div>
          {children}
        </div>,
        document.getElementById("modal") as HTMLElement
      )}
    </>
  );
};

export default Modal;
