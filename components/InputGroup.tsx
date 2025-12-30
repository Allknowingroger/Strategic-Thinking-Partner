import React from 'react';

interface InputGroupProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  as?: 'input' | 'textarea';
  icon: React.ReactNode;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  as = 'input',
  icon,
}) => {
  const commonProps = {
    id,
    value,
    onChange,
    placeholder,
    className: 'w-full bg-white border-2 border-slate-300 rounded-md py-2 pl-10 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors',
  };

  const InputComponent = as === 'textarea'
    ? <textarea {...commonProps} rows={4} />
    : <input type="text" {...commonProps} />;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-slate-500">{icon}</span>
        </div>
        {InputComponent}
      </div>
    </div>
  );
};

export default InputGroup;