import {useForm, FormProvider, type UseFormReturn} from "react-hook-form";
import {CheckoutForm} from "./components/CheckoutForm.tsx";
import {AddressForm} from "./components/AddressForm.tsx";
import {FoodDeliveryMain} from "./components/FoodDeliveryMain.tsx";
import {SubmitButton} from "../../controls/SubmitButton.tsx";
import {OrderFoodItems} from "./components/OrderFoodItems.tsx";

export default function RHFFoodDelivery () {
  const methods: UseFormReturn<FoodDeliveryType> = useForm<FoodDeliveryType>({
    mode: 'onChange',
    defaultValues: {
      orderNo: new Date().valueOf(),
      name: '',
      mobile: '',
      email: '',
      sameReceiver: true,
      otherReceiver: {
        name: '',
        mobile: '',
      },
      foodItems: [
        { foodId: 0, price: 0, quantity: 1, totalPrice: 0 },
      ],
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
        <OrderFoodItems />
        <CheckoutForm />
        <AddressForm />
      </FormProvider>

      <SubmitButton control={control}>Submit</SubmitButton>
    </form>
  )
}
