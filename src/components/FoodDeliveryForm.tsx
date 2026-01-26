import {ChangeEvent, useState} from 'react';

type FoodDelivery = {
  name: string;
  mobile: string;
}

type FoodDeliveryErrors = {
  name: string;
  mobile: string;
}
export default function FoodDeliveryForm() {
  const [values, setValues] = useState<FoodDelivery>({
    name: '',
    mobile: ''
  })
  const [errors, setErrors] = useState<FoodDeliveryErrors>({
     name: '',
    mobile: ''
  })

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: value
    });
  }

  const validate = () => {
    debugger;
    let validationResults: FoodDeliveryErrors = {
      name: '',
      mobile: ''
    }
    if (values.name == '') {
      validationResults.name = 'Name is required'
    }
    if (values.mobile == '') {
      validationResults.mobile = 'Phone number is required'
    }
    if (values.mobile.length !== 13) {
      validationResults.mobile = 'Phone number has to be 13 elements long'
    }
    setErrors(validationResults);
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validate();
    console.log('Form submitted with values:', values);
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-floating mb-3">
        <input
          type="text"
          name="name"
          className={`form-control ${!!errors.name && 'is-invalid'}`}
          id="name"
          value={values.name}
          onChange={onValueChange} />
        <label htmlFor="name">Customer Name</label>
      </div>
      <div className="form-floating">
        <input
          type="text"
          name="mobile"
          className={`form-control ${!!errors.mobile && 'is-invalid'}`}
          id="mobile"
          value={values.mobile}
          onChange={onValueChange} />
        <label htmlFor="mobile">Phone Number</label>
      </div>
      <button type="submit" className="btn btn-primary mt-3">Submit</button>
    </form>
  )
}
