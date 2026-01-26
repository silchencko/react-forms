import { forwardRef, ForwardedRef } from "react";
import type {FieldError} from "react-hook-form";

type TextFieldProps =  React.InputHTMLAttributes<HTMLInputElement> & {
  type: string;
  label: string;
  className?: string;
  error?: FieldError;
}
export const TextField = forwardRef((props: TextFieldProps , ref: ForwardedRef<HTMLInputElement>) => {
  const {
    type = 'text',
    className = '',
    label,
    error,
    ...other
  } = props
  return (
    <div className="form-floating">
      <input
        type={type}
        className={`form-control ${className}`}
        placeholder={label}
        {...other}
        ref={ref}
      />
      <label>{label}</label>
      {
        error &&
        <p className="small text-danger">{error.message}</p>
      }
    </div>
  )
})
