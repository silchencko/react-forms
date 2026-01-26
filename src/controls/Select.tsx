import { forwardRef, ForwardedRef} from 'react';
import type {FieldError} from "react-hook-form";

type SelectProps =  React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: FieldError;
  className?: string;
  options: SelectOptionType[];
}
export const Select = forwardRef((props: SelectProps, ref: ForwardedRef<HTMLSelectElement>) => {
  const {
    label,
    className = '',
    error,
    options,
    ...other
  } = props
  return (
    <div className="form-floating">
      <select
        className={`form-select ${className}`}
        {...other}
        ref={ref}
      >
        { options.map((option, index) => (
          <option value={option.value} key={index}>{option.label}</option>
        ))}
      </select>
      <label>{label}</label>
      {
        error &&
        <p className="small text-danger">{error.message}</p>
      }
    </div>
  )
})
