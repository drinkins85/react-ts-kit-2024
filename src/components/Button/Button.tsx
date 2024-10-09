import React from 'react';
import cn from 'classnames';

import './Button.scss'

export enum ButtonColor {
  BLACK = 'black',
  RED = 'red',
  WHITE = 'white'
}

export enum ButtonSize {
  STANDARD = 'standard',
  LARGE = 'large'
}

type IButtonProps = {
  title: string;
  color?: ButtonColor;
  size?: ButtonSize;
};

const Button: React.FC<IButtonProps> = (props) => {
  const {
    title = '',
    color = ButtonColor.BLACK,
    size = ButtonSize.STANDARD,
  } = props;

  const onTitleClick = () => {
    console.log('button click');
  };

  return (
    <button
      type="button"
      onClick={onTitleClick}
      className={cn('Button', color, size)}
    >
      {title}
    </button>
  );
}

export default Button;
