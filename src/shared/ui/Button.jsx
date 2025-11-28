import style from './Button.module.css';

export default function Button({ text, variant="", className = "", ...props }) {
  return (<button className={`${style[variant]} ${className}`} {...props}>{text}</button>);
};