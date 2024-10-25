import { useState } from "react";
import CustomInput from "../shared/CustomInput";

export default function AddProduct({ form, setForm }) {
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div className="add-product">
      <CustomInput
        label="نام کالا"
        type="text"
        name="name"
        value={form.name}
        onChange={onChange}
        placeholder="نام کالا"
      />
      <CustomInput
        label="تعداد موجودی"
        type="number"
        name="quantity"
        value={form.quantity}
        onChange={onChange}
        placeholder="تعداد"
      />
      <CustomInput
        label="قیمت"
        type="number"
        name="price"
        value={form.price}
        onChange={onChange}
        placeholder="قیمت"
      />
    </div>
  );
}
