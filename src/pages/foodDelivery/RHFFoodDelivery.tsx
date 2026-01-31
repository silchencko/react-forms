import {useForm, FormProvider, type UseFormReturn} from "react-hook-form";
import {CheckoutForm} from "./components/CheckoutForm.tsx";
import {AddressForm} from "./components/AddressForm.tsx";
import {FoodDeliveryMain} from "./components/FoodDeliveryMain.tsx";
import {SubmitButton} from "../../controls/SubmitButton.tsx";

export default function RHFFoodDelivery () {
  const methods: UseFormReturn<FoodDeliveryType> = useForm<FoodDeliveryType>({
    mode: 'onChange',
    defaultValues: {
      orderNo: new Date().valueOf(),
      name: '',
      mobile: '',
      email: '',
      delivery: {
        paymentMethod: '',
        deliveryIn: 0,
      },
      address: {
        street: '',
        landmark: '',
        city: 'Dnipro',
        state: 'Ukraine',
      }
    }
  });
  const { handleSubmit, control } = methods;

  const onSubmit = async (data: FoodDeliveryType) => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log(data);
  }

  const onError = (errors) => {
    console.log("Error ", errors);
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>

      <FormProvider {...methods}>
        <FoodDeliveryMain />
        <CheckoutForm />
        <AddressForm />
      </FormProvider>

      <SubmitButton control={control}>Submit</SubmitButton>
    </form>
  )
}
