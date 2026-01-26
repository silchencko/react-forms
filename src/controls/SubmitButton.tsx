type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isSubmitting?: boolean;
  isValid?: boolean;
}
export const SubmitButton = ({isSubmitting = false, isValid = true, className = 'btn-primary', children}: SubmitButtonProps) => {
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
