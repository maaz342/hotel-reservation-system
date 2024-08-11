import React from 'react';
import { Button } from 'antd';

interface ButtonComponentProps {
  onClick: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  type?: 'default' | 'primary' | 'dashed' | 'link' | 'text';
  htmlType?: 'button' | 'submit' | 'reset';
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  onClick,
  children,
  type = 'primary',
  htmlType = 'button'
}) => {
  return (
    <Button type={type} onClick={onClick} htmlType={htmlType}>
      {children}
    </Button>
  );
};

export default ButtonComponent;

export {};
