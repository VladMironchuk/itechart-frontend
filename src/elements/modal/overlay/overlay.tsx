import { FormEventHandler, ReactNode } from "react";
import ReactDOM from "react-dom";
import useHttp from "@/hooks/useHttp";

type ModalOverlayProps = {
  url: string;
  method?: string;
  body: { [keyof: string]: string };
  cb: () => void;
  children: ReactNode[];
};

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  const { children, url, method = "POST", cb, body } = props;

  const { sendRequest } = useHttp();

  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    sendRequest(
      {
        url,
        method,
        body,
      },
      null
    );
    cb();
  };

  return (
    <form className="modal" onSubmit={submitHandler}>
      {children}
    </form>
  );
};

const Modal: React.FC<ModalOverlayProps> = ({ children, url, method, cb, body }) => (
  <>
    {ReactDOM.createPortal(
      <ModalOverlay url={url} method={method} body={body} cb={cb}>
        {children}
      </ModalOverlay>,
      document.getElementById("modal") as HTMLElement
    )}
  </>
);

export default Modal;
