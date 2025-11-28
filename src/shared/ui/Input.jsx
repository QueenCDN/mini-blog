import style from './Input.module.css';

export default function Input({type, ph, className='', ...props}) {
  return (<input type={type} className={`${style.inputField} ${className}`} placeholder={ph} {...props}/>)
};