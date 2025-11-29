import style from './Button.module.css';

function Button({ text, variant="", className = "", ...props }) {
  return (<button className={`${style[variant]} ${className}`} {...props}>{text}</button>);
};

export default Button