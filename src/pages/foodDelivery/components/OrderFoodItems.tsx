import {
  useFormContext,
  useFormState,
  useFieldArray,
  useWatch,
  type UseFormReturn,
  type UseFormStateReturn,
  type UseFieldArrayReturn,
  type FieldArrayPath
} from "react-hook-form";
import { TextField } from "../../../controls/TextField.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import { loadFoodItems } from "../../../db";
import { Select } from "../../../controls/Select.tsx";
import { roundNumber } from "../../../utils.ts";

type OrderFoodItemsFormType = {
  checkTotal: number;
  foodItems: OrderFoodItemType[]
}
export const OrderFoodItems = () => {
  const [ foodList, setFoodItems ] = useState<FoodItemType[]>([]);
  const [ foodOptions, setFoodOptions ] = useState<SelectOptionType<string>[]>([]);

  useEffect(() => {
    const fList = loadFoodItems();
    setFoodItems(fList)
    const options = fList.map(item => ({ value: item.foodId, label: item.name }));
    setFoodOptions([{value: 0, label: 'Select'}, ...options]);
  }, []);

  const { register, trigger, getValues, setValue}: UseFormReturn<OrderFoodItemsFormType> = useFormContext<OrderFoodItemsFormType>();
  const { errors }: UseFormStateReturn<OrderFoodItemsFormType> = useFormState<OrderFoodItemsFormType>({ name: "foodItems" });
  const {
    fields,
    append,
    remove
  }: UseFieldArrayReturn<OrderFoodItemsFormType, FieldArrayPath<OrderFoodItemsFormType>, "id">
    = useFieldArray<OrderFoodItemsFormType>({
    name: 'foodItems',
    rules: {
      minLength: {
        value: 2,
        message: "The minimum order is 2"
      }
    }});

  const selectedFoodItems: OrderFoodItemType[] = useWatch({
    name: 'foodItems'
  });
  useWatch({ name: 'checkTotal' });

  useEffect(() => updateCheckTotal(), [selectedFoodItems]);

  const updateCheckTotal = () => {
    const check = selectedFoodItems.reduce((total, item) => total + item.totalPrice, 0);
    const total = roundNumber(check);
    setValue('checkTotal', total);
  }

  const onAppend = () => {
    append({ foodId: 0, price: 0, quantity: 1, totalPrice: 0});
  }

  const onFoodChange = (event: ChangeEvent<HTMLSelectElement>, rawIndex: number) => {
    const foodId = parseInt(event.target.value);
    const price = foodId == 0 ? 0 :
      foodList.find(food => food.foodId == foodId)?.price || 0;
    setValue(`foodItems.${rawIndex}.price`, price);
    updateTotalPrice(rawIndex);
  }

  const updateTotalPrice = (rawIndex: number) => {
    const { price, quantity } = getValues(`foodItems.${rawIndex}`)
    let totalPrice = 0;
    if (quantity && quantity > 0) totalPrice = price * quantity;
    const roundedPrice = roundNumber(totalPrice);
    setValue(`foodItems.${rawIndex}.totalPrice`, roundedPrice);
  }

  return (<>
      <table id="food" className="table table-dorderless table-hover">
        <thead>
          <tr>
            <td>Food Item</td>
            <td className="text-start">Price</td>
            <td>Quantity</td>
            <td className="text-start">Tot.Price</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) =>(
            <tr key={field.id}>
              <td>
                <Select
                  options={foodOptions}
                  onBlur={() => trigger(`foodItems`)}
                  error={errors.foodItems?.[index]?.foodId}
                  {...register(`foodItems.${index}.foodId`, {
                    valueAsNumber: true,
                    validate: {
                      isRequired: (value: string) => value !== 0 || 'Please select a food item'
                    },
                    onChange: (e) => {onFoodChange(e, index)}
                  })}
              />
              </td>
              <td className="text-start align-middle">{"$" + getValues(`foodItems.${index}.price`)}</td>
              <td>
                 <TextField
                  type="number"
                  min={0}
                  {...register(`foodItems.${index}.quantity` as const, {
                    valueAsNumber: true,
                    required: 'Minimum 1',
                    min: (value: number) => value > 1 || 'Minimum 1',
                    onChange: () => updateTotalPrice(index)
                  })}
                  onBlur={() => trigger(`foodItems`)}
                  error={errors.foodItems?.[index]?.quantity}/>
              </td>
              <td className="text-start align-middle">{"$" + getValues(`foodItems.${index}.totalPrice`)}</td>
              <td>
                {fields.length > 1 && (
                  <button className="btn btn-sm btn-outline-danger" data-tooltip="Remove" onClick={() => remove(index)}>
                    X
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          {fields.length > 1 && (
            <tr className="border-top">
              <td colSpan="2"></td>
              <td>Total</td>
              <td className="text-start align-middle">{'$' + getValues('checkTotal')}</td>
              <td></td>
            </tr>
          )}
          {errors.foodItems?.root && (<tr>
            <td colSpan={5} className="text-center">
              <p className="small text-danger">{errors.foodItems?.root?.message}</p>
            </td>
          </tr>)}
        </tfoot>
    </table>

    <button type="button" className="btn mt-3 btn-sm btn-secondary" onClick={onAppend}>Add</button>
  </>)
}
