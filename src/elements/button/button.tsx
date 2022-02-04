import "./button.scss";

type ButtonProps = {
  title: string;
  isSubmit?: boolean;
  className?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = (props) => {
  const { title, isSubmit, className, onClick } = props;

  return (
    <button onClick={onClick} className={`button ${className || ""}`} type={isSubmit ? "submit" : "button"}>
      {title}
    </button>
  );
};

export default Button;
