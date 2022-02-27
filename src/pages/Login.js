import { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(process.env.REACT_APP_API + "/auth/login", {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (json.status === "success") {
      Cookies.set("x-token", json.data.token, { expires: 1 });
      toast.success("Login successfully");
      navigate("/dashboard");
    }
  };

  return (
    <div className='w-full bg-gray-100 min-h-screen flex justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='shadow-md w-10/12 md:w-5/12 bg-white flex justify-center flex-col p-10 rounded-md space-y-4'>
        <h1 className='text-indigo-500 text-center text-4xl font-semibold'>
          Login
        </h1>
        <FormInput
          label='Email'
          type='text'
          value={input.email}
          name='email'
          handleChange={handleChange}
        />
        <FormInput
          label='Password'
          type='password'
          value={input.password}
          name='password'
          handleChange={handleChange}
        />
        <button
          type='submit'
          className='rounded-md bg-indigo-500 text-white py-1'>
          Login
        </button>
        <p className='text-gray-500'>
          Dont Have Account ?{" "}
          <Link to='/register'>
            <span className='text-indigo-500'>Register Now</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
