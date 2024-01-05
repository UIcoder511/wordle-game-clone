import React, { ComponentProps, FC, ReactNode } from 'react'
import  "./Button.css";

type ButtonProps=ComponentProps<'button'>;

type Props={
    btnType:'try' |'play' | 'next';
    children:ReactNode;
} & ButtonProps;

const Button:FC<Props> = ({btnType,children,...props}) => {
  return (
    <button
    className={'styled-btn '+btnType+"-btn"}
    {...props}
  >
    {children}
  </button>
  )
}

export default Button