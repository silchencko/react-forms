import {
  useFormContext,
  useFormState,
  useFieldArray,
  type UseFormReturn,
  type UseFormStateReturn,
  type UseFieldArrayReturn,
  type FieldArrayPath
} from "react-hook-form";
import { TextField } from "../../../controls/TextField.tsx";

type OrderFoodItemsFormType = {foodItems: OrderFoodItemType[]}
export const OrderFoodItems = () => {
  const { register, trigger }: UseFormReturn<OrderFoodItemsFormType> = useFormContext<OrderFoodItemsFormType>();
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
      },
      validate: {
        noDuplicates: (value, values) => {
          const names = values.foodItems.map(item => item.name.trim().toLowerCase());
          const hasDuplicates = names.some((name, index) => names.indexOf(name) !== index);
          return !hasDuplicates || 'Food items must be unique';
        }
      }
    }});

  const onAppend = () => {
    append({ name: "", quantity: 1});
  }

  return (<>
      <table className="table table-dorderless table-hover">
        <thead>
          <tr>
            <td>Food Item</td>
            <td>Quantity</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) =>(
            <tr key={field.id}>
              <td>
                <TextField
                  {...register(`foodItems.${index}.name` as const, {
                    required: 'Food item name is required'
                  })}
                  onBlur={() => trigger(`foodItems`)}
                  error={errors.foodItems?.[index]?.name}/>
              </td>
              <td>
                 <TextField
                  type="number"
                  min={1}
                  {...register(`foodItems.${index}.quantity` as const, {
                    min: {
                      value: 1,
                      message: 'Quantity must be at least 1'
                    }})}
                  onBlur={() => trigger(`foodItems`)}
                  error={errors.foodItems?.[index]?.quantity}/>
              </td>
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
          {errors.foodItems?.root && (<tr>
            <td colSpan={3} className="text-center">
              <p className="small text-danger">{errors.foodItems?.root?.message}</p>
            </td>
          </tr>)}
        </tfoot>
    </table>

    <button type="button" className="btn mt-3 btn-sm btn-secondary" onClick={onAppend}>Add</button>
  </>)
}
