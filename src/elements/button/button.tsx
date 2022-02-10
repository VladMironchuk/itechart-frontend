import "./button.scss";

type Props = {
  title: string;
  isSubmit?: boolean;
  className?: string;
  onClick?: () => void;
};

const Button: React.FC<Props> = (props) => {
  const { title, isSubmit, className, onClick } = props;

  return (
    <button onClick={onClick} className={`button ${className || ""}`} type={isSubmit ? "submit" : "button"}>
      {title}
    </button>
  );
};

export default Button;
