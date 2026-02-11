type SelectOptionType<OptionValue> = {
  value: OptionValue;
  label: string;
}

type OtherReceiverType = {
  name: string;
  mobile: string;
}

type FoodDeliveryMainType = {
  orderNo: number;
  name: string;
  mobile: string;
  email: string;
  sameReceiver: boolean;
  otherReceiver: OtherReceiverType;
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

type FoodItemType = {
  foodId: number;
  name: string;
  price: number;
}

type OrderFoodItemType = {
  foodId: number;
  price: number;
  quantity: number;
  totalPrice: number;
}

type FoodDeliveryType = {
  foodItems: OrderFoodItemType[];
  address: AddressType;
  delivery: CheckoutType;
} & FoodDeliveryMainType
