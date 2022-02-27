import { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
    fullname: "",
    phone_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(process.env.REACT_APP_API + "/auth/register", {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (json.status === "success") {
      toast.success("successfully register an account");
      navigate("/");
    } else {
      toast.error(json?.message);
    }
  };

  return (
    <div className='w-full bg-gray-100 min-h-screen flex justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='shadow-md w-10/12 md:w-5/12 bg-white flex justify-center flex-col p-10 rounded-md space-y-4'>
        <h1 className='text-indigo-500 text-center text-4xl font-semibold'>
          Register
        </h1>
        <FormInput
          label='Fullname'
          type='text'
          name='fullname'
          value={input.fullname}
          handleChange={handleChange}
        />
        <FormInput
          label='Phone Number'
          type='text'
          name='phone_number'
          value={input.phone_number}
          handleChange={handleChange}
        />
        <FormInput
          label='Email'
          type='text'
          name='email'
          value={input.email}
          handleChange={handleChange}
        />
        <FormInput
          label='Password'
          type='password'
          name='password'
          value={input.password}
          handleChange={handleChange}
        />
        <button
          type='submit'
          className='rounded-md bg-indigo-500 text-white py-1'>
          Register
        </button>
        <p className='text-gray-500'>
          <Link to='/'>
            <span className='text-indigo-500'>Back to Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
