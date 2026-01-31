import {TextField} from "../../../controls/TextField.tsx";
import {useFormContext, useFormState, type UseFormReturn} from "react-hook-form";

type OtherReceiverFormType = {
  otherReceiver: OtherReceiverType
}

export const OtherReceiver = () => {
  const { register, watch }: UseFormReturn<OtherReceiverFormType> = useFormContext<OtherReceiverFormType>();
  const { errors } = useFormState<OtherReceiverFormType>({ name: 'otherReceiver' });
  const err = errors.otherReceiver;
  const hideOtherReceiver = watch('sameReceiver');
  return (
    <div className="row mb-3">
      <div className="col">
        <TextField
          label="Customer Name"
          {...register('otherReceiver.name', {
            required: {
              value: hideOtherReceiver,
              message: 'Customer name is required'
            }
          })}
          error={errors.otherReceiver?.name}
        />
      </div>
      <div className="col">
        <div className="form-floating">
          <TextField
            label="Phone Number"
            error={errors.otherReceiver?.mobile}
            {...register('otherReceiver.mobile', {
              required: {
                value: hideOtherReceiver,
                message: 'Phone number is required'
              },
              minLength: { value: 10, message: "Phone number has to be 10 elements long"},
              maxLength: { value: 10, message: "Phone number has to be 10 elements long"},
              pattern: { value: /^\d+$/, message: 'Phone number must contain only numbers' },
              validate: {
                hasCode: (value: string) => value.startsWith('380') || 'Phone number must starts from 380 code'
              }
            })}
          />
        </div>
      </div>
    </div>
  )
}
