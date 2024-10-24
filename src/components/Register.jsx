import { useState } from "react";
import logo from "../assets/logo.webp";
import CustomInput from "./shared/CustomInput";
import CutomButtom from "./shared/CutomButtom";
export default function Register() {
  const [form, setForm] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  console.log(form);
  return (
    <div className="register-form">
      <div>
        <img src={logo} alt="logo" />
        <h2>فرم ثبت نام</h2>
      </div>
      <div>
        <CustomInput
          type="text"
          name="userName"
          value={form.userName}
          onChange={onChange}
          placeholder="نام کاربری"
        />
        <CustomInput
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="رمز عبور"
        />
        <CustomInput
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={onChange}
          placeholder="تکرار رمز عبور"
        />
      </div>
      <div className="buttom-form">
        <CutomButtom title="ثبت نام" className="buttom-form_register" />
        <a href="/login">حساب کاربری دارید؟</a>
      </div>
    </div>
  );
}
