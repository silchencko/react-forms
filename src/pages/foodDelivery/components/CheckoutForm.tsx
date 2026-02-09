import {Select} from "../../../controls/Select.tsx";
import {useFormContext, type UseFormReturn, useFormState, useWatch} from "react-hook-form";

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

  const { register }: UseFormReturn<CheckoutFormType> = useFormContext<CheckoutFormType>();
  const { errors } = useFormState<CheckoutFormType>({ name: 'delivery' });
  const err = errors.delivery;

  // const deliveryWarning = watch('delivery.deliveryIn') === '180' ? 'Delivery is out working hours. We will deliver next day at 8 am.' : '';
  const deliveryWarning = useWatch({
    name: 'delivery.deliveryIn',
    compute: (deliveryIn: string) => {
      return deliveryIn === '180' ? 'Delivery is out working hours. We will deliver next day at 8 am.' : '';
    },
  });

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
    <p>{deliveryWarning}</p>
  </>)
}
