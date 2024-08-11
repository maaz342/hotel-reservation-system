import React from 'react';
import { Input, InputNumber } from 'antd';
import type { InputNumberProps } from 'antd';
interface InputNumComponentProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: number;
}

const InputComponent: React.FC<InputNumComponentProps> = ({
  value,
  onChange,
  type='number',
}) => {
  return (
    <InputNumber  value={value}  />
  );
};

export default InputComponent;
export {};

