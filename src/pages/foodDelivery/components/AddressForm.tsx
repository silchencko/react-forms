import { TextField } from "../../../controls/TextField.tsx";
import {useFormContext, type UseFormReturn, useFormState} from "react-hook-form";
import {useEffect} from "react";

type AddressFormType = {
  address: AddressType
}

export const AddressForm = () => {
  const { register, getFieldState }: UseFormReturn<AddressFormType> = useFormContext<AddressFormType>()
  const { errors } = useFormState<AddressFormType>({ name: 'address' });
  const err = errors.address;

  useEffect(() => {
    console.log('Address field state: ', getFieldState('address').error ?
      Object.values(getFieldState('address').error).map(e => e.message)
      : []);
  }, [err]);
  return (<>
    <div className="text-start fw-bold mt-4 mb-2">Delivery Address</div>

    <div className="row mb-3">
        <div className="col">
          <TextField
            label="Street Address"
            error={err?.street}
            {...register('address.street', {
              required: 'Street address is required'
            })}/>
        </div>
        <div className="col">
          <TextField
            label="City"
            error={err?.city}
            {...register('address.city', {
              required: 'City is required'
            })}/>
        </div>
      </div>
    <div className="row mb-3">
        <div className="col">
          <TextField
            label="Landmark"
            error={err?.landmark}
            {...register('address.landmark')}/>
        </div>
        <div className="col">
          <TextField
            label="State"
            error={err?.state}
            {...register('address.state')}/>
        </div>
      </div>

    <p className="text-danger">{getFieldState('address').invalid && 'Address is invalid'}</p>
  </>)
}
