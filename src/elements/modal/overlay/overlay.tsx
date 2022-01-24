import { FormEventHandler, ReactNode } from "react";
import ReactDOM from "react-dom";
import useHttp from "@/helpers/useHttp";

const ModalOverlay: React.FC<{
  url: string;
  method?: string;
  body: { [keyof: string]: string };
  cb: () => void;
  children: ReactNode[];
}> = ({ children, url, method = "POST", cb, body }) => {
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

const Modal: React.FC<{
  url: string;
  method?: string;
  body: { [keyof: string]: string };
  cb: () => void;
  children: ReactNode[];
}> = ({ children, url, method, cb, body }) => (
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
