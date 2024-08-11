import React from 'react';
import { Input, InputNumber } from 'antd';

interface InputComponentProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}

const InputComponent: React.FC<InputComponentProps> = ({
  value,
  onChange,
  type,
  placeholder
}) => {
  return (
    <Input type={type} value={value} onChange={onChange} placeholder={placeholder} />
  );
};

export default InputComponent;
export {};

