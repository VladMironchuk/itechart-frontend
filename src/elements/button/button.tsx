import "./button.scss";

type ButtonProps = {
  title: string;
  type: "button" | "submit" | "reset" | undefined;
  className?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = (props) => {
  const { title, type, className, onClick } = props;

  return (
    <button onClick={onClick} className={`button ${className || ""}`} type={type}>
      {title}
    </button>
  );
};

export default Button;
