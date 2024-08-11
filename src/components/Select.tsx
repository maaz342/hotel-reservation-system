import React from 'react';
import { Select } from 'antd';

interface SelectComponentProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
}

const { Option } = Select;

const SelectComponent: React.FC<SelectComponentProps> = ({
  value,
  onChange,
  options,
  placeholder
}) => {
  return (
    <Select value={value} onChange={onChange} placeholder={placeholder}>
      {options.map((opt) => (
        <Option key={opt.value} value={opt.value}>
          {opt.label}
        </Option>
      ))}
    </Select>
  );
};

export default SelectComponent;
export {};
