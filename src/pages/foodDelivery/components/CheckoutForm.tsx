import {Select} from "../../../controls/Select.tsx";
import { useFormContext, type UseFormReturn } from "react-hook-form";

type CheckoutFormType = {
  delivery: CheckoutType
}
export const CheckoutForm = () => {
   const paymentOptions: SelectOptionType<string>[] = [
    { value: '', label: 'Select payment method' },
    { value: 'online', label: 'Online' },
    { value: 'cash', label: 'Cash' }
  ];

  const deliveryInOptions: SelectOptionType<number>[] = [
    { value: 0, label: 'Select delivery time' },
    { value: 30, label: 'Half an Hour' },
    { value: 60, label: 'Hour' },
    { value: 120, label: '2 Hours' },
    { value: 180, label: '3 Hours' },
  ];

  const {register, formState:{errors}}: UseFormReturn<CheckoutFormType> = useFormContext<CheckoutFormType>();
  const err = errors.delivery;

  return (<>
    <div className="text-start fw-bold mt-4 mb-2">Checkout details</div>

      <div className="row mb-3">
        <div className="col">
          <Select
            label="Payment Method"
            options={paymentOptions}
            {...register('delivery.paymentMethod', {
              required: 'Payment method is required'
            })}
            error={err?.paymentMethod}
          />
        </div>
        <div className="col">
          <Select
            label="Delivery Within"
            options={deliveryInOptions}
            {...register('delivery.deliveryIn', {
              required: 'Delivery time is required',
              validate: {
                notZero: (value: number) => (value !== 0 && value !== '0') || 'Please select delivery time'
              }
            })}
            error={err?.deliveryIn}
          />
        </div>
      </div>
  </>)
}
