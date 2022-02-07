import { ReactNode, useRef } from "react";
import ReactDOM from "react-dom";
import crossIcon from "@/assets/images/cross-icon.png";
import useOnClickOutside from "@/hooks/useOnClickOutside";

type Props = {
  onClose: () => void;
  title: string;
  children: ReactNode;
};

const Modal: React.FC<Props> = (props) => {
  const { title, onClose, children } = props;

  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef, onClose);

  return (
    <>
      {ReactDOM.createPortal(
        <div ref={modalRef} className="modal">
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
