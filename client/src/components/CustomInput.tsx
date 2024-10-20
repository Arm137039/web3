import React from 'react';
import { Form, Input } from 'antd';

interface CustomInputProps {
  name: string;
  placeholder: string;
  rules?: any[];
  type?: string;
  className?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ name, placeholder, rules, type = 'text', className }) => (
  <Form.Item name={name} rules={rules}>
    <Input type={type} placeholder={placeholder} className={className} />
  </Form.Item>
);

export default CustomInput;