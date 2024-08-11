import React from 'react';
import { DatePicker } from 'antd';
import { Dayjs } from 'dayjs';

interface DatePickerComponentProps {
  value: Dayjs | null;
  onChange: (date: Dayjs | null) => void;
  placeholder?: string;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  value,
  onChange,
  placeholder
}) => {
  return (
    <DatePicker value={value} onChange={onChange} placeholder={placeholder} />
  );
};

export default DatePickerComponent;
export {};

