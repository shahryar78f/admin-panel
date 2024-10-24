import { useState } from "react";
import logo from "../assets/logo.webp";
import CustomInput from "./shared/CustomInput";
import CutomButtom from "./shared/CutomButtom";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { postUserData } from "../services/queries";
export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const registerHandler = async () => {
    if (!form.username || !form.password || !form.confirmPassword) {
      return toast.error("لطفا فیلد‌های مورد نظر رو پر کنید!");
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("رمز عبور با هم مطابقت ندارد!");
    }

    setIsLoading(true);

    try {
      const { res, error } = await postUserData(form);

      if (error) {
        toast.error(error.message);
      } else {
        if (res && res.data) {
          toast.success("حساب کاربری ایجاد شد!");
        } else {
          toast.error("پاسخ نامعتبری از سرور دریافت شد.");
        }
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-form">
      <div>
        <img src={logo} alt="logo" />
        <h2>فرم ثبت نام</h2>
      </div>
      <div>
        <CustomInput
          type="text"
          name="username"
          value={form.username}
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
        <CutomButtom
          title="ثبت نام"
          className="buttom-form_register"
          isLoading={isLoading}
          onClick={registerHandler}
        />
        <Link to="/login">حساب کاربری دارید؟</Link>
      </div>
    </div>
  );
}
