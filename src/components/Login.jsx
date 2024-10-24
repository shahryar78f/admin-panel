import { useState } from "react";
import logo from "../assets/logo.webp";
import CustomInput from "./shared/CustomInput";
import CutomButtom from "./shared/CutomButtom";
import { Link, useNavigate } from "react-router-dom";
import { postLoginUserData } from "../services/queries";
import toast from "react-hot-toast";
import { setTokenCookie } from "../utils/function";
export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const loginHandler = async () => {
    if (!form.username || !form.password) {
      return toast.error("لطفا فیلد‌های مورد نظر رو پر کنید!");
    }

    setIsLoading(true);

    try {
      const { res, error } = await postLoginUserData(form);

      if (error) {
        toast.error(error.message);
      } else {
        if (res && res.data) {
            setTokenCookie(res.data.token)
          console.log(res.data.token);
          toast.success("با موفقیت وارد شدید!");
        } else {
          toast.error("پاسخ نامعتبری از سرور دریافت شد.");
        }
        navigate("/products");
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
        <h2>فرم ورود</h2>
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
          placeholder="ورود"
        />
      </div>
      <div className="buttom-form">
        <CutomButtom
          title="ورود"
          className="buttom-form_register"
          onClick={loginHandler}
          isLoading={isLoading}
        />
        <Link to="/register">ایجاد حساب کاربری!</Link>
      </div>
    </div>
  );
}
