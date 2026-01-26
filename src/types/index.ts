type SelectOptionType<OptionValue> = {
  value: OptionValue;
  label: string;
}

type FoodDeliveryMainType = {
  orderNo: number;
  name: string;
  mobile: string;
  email: string;
}

type CheckoutType = {
  paymentMethod: string;
  deliveryIn: number;
}

type AddressType = {
  street: string,
  landmark: string,
  city: string,
  state: string,
}

type FoodDeliveryType = {
  address: AddressType;
  delivery: CheckoutType;
} & FoodDeliveryMainType
