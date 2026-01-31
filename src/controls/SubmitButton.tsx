import type {Control} from "react-hook-form";
import {useFormState} from "react-hook-form";

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  control?: Control<any, any>
}
export const SubmitButton = ({ className = 'btn-primary', control = undefined, children}: SubmitButtonProps) => {
  let isSubmitting = false;
  let isValid = true;

  if (control) ({ isSubmitting, isValid } = useFormState({ control }));

  return (
    <button disabled={!isValid || !!isSubmitting} type="submit" className={`btn mt-3 ${className}`}>
      {isSubmitting && (<>
        <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
        <span>Submitting...</span>
        </>)
      || !isSubmitting && children || 'Submit'
      }
    </button>
  )
}
