import React from 'react';
import { Input } from 'antd';

interface InputPasswordComponentProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const InputPasswordComponent: React.FC<InputPasswordComponentProps> = ({
  value,
  onChange,
  placeholder
}) => {
  return (
    <Input.Password value={value} onChange={onChange} placeholder={placeholder} />
  );
};

export default InputPasswordComponent;
export {};

