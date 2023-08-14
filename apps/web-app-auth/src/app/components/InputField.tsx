import { useField } from 'formik';
import React from 'react';

interface InputFieldProps {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  email?: string;
  username?: string;
  password?: string;
  title?: string;
  content?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label>{label}</label>
      <input {...field} {...props} className="mb-4 h-10 rounded-md outline-dorado focus:outline" />
      {meta.error && meta.touched ? <div>{meta.error}</div> : null}
    </>
  );
};

export default InputField;
