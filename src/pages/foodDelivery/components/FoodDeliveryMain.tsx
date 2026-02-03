import {TextField} from "../../../controls/TextField.tsx";
import {useFormContext, type UseFormReturn, useFormState, useWatch} from "react-hook-form";
import {OtherReceiver} from "./OtherReceiver.tsx";

export const FoodDeliveryMain = () => {
  const { register }: UseFormReturn<FoodDeliveryMainType> = useFormContext<FoodDeliveryMainType>();
  const { errors } = useFormState<FoodDeliveryMainType>({ name:
      ['orderNo', 'name', 'mobile', 'email', 'sameReceiver']
  });

  const hideOtherReceiver = useWatch({ name: 'sameReceiver' });

  return (<>
    <div className="row mb-3">
      <div className="col">
        <TextField
          disabled={true}
          label="Order No"
          {...register('orderNo')}
        />
      </div>
      <div className="col">
        <div className="form-floating">
          <TextField
            label="Phone Number"
            error={errors.mobile}
            {...register('mobile', {
              required: 'Phone number is required',
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
    <div className="row mb-3">
      <div className="col">
        <TextField
          label="Customer Name"
          {...register('name', {
            required: 'Customer name is required'
          })}
          error={errors.name}
        />
      </div>
      <div className="col">
        <TextField
          type="email"
          label="Email"
          {...register('email', {
            pattern: {value: /^[^@]+@[^@]+\.[^@]+$/, message: 'Invalid email address'}
          })}
          error={errors.email}
        />
      </div>
    </div>
    <div className="form-check text-start mb-3">
      <input className="form-check-input" type="checkbox" {...register('sameReceiver')} id="sameRecaiver" />
      <label htmlFor="sameRecaiver">
        I'm receiving the order
      </label>
    </div>
      {!hideOtherReceiver && (<OtherReceiver />)}
  </>)
}
