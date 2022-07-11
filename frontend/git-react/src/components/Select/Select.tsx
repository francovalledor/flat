import React, { useState } from "react";

export interface SelectOption {
  name: string;
  value: string;
}

interface SelectParams {
  name: string;
  options: SelectOption[]
  defaultValue: string;
}

const Select: React.FC<SelectParams> = ({name, options, defaultValue}) => {
  const [value, setValue] = useState<string>(defaultValue);

  return (
    <select className="form-select" name={name} value={value} onChange={(v) => setValue(v.target.value)}>
      {options.map(
        (o) => <option value={o.value}>{o.name}</option>
      )}
    </select>
  )
};

export default Select;
