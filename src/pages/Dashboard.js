import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();

  const getKeys = async () => {
    const token = Cookies.get("x-token");
    if (!token) {
      navigate("/");
    }

    const response = await fetch(process.env.REACT_APP_API + "/keys", {
      headers: {
        "x-token-api": token,
      },
    });

    const json = await response.json();
    if (json.status === "success") {
      setData(json.data);
    }
  };

  const handleLogout = async () => {
    await Cookies.remove("x-token");
    navigate("/");
  };

  useEffect(() => {
    getKeys();
  }, []);

  return (
    <div className='w-full bg-gray-100 min-h-screen flex justify-center items-center'>
      <div className='shadow-md w-10/12 md:w-5/12 bg-white flex justify-center flex-col p-10 rounded-md space-y-4'>
        <p className='text-gray-700 font-bold text-center'>Your API KEY </p>
        <p className='text-center text-green-500'>{data?.keys}</p>
        <table className='border border-gray-500 text-center'>
          <tr>
            <th className='border border-gray-700'>Limit Quota</th>
            <th className='border border-gray-700'>Uses</th>
          </tr>
          <tr>
            <td className='border border-gray-700'>{data?.limit}</td>
            <td className='border border-gray-700'>{data?.uses}</td>
          </tr>
        </table>
        <button className='bg-indigo-500 text-white py-1'>
          View Documentation API
        </button>
        <button
          onClick={handleLogout}
          className='bg-indigo-500 text-white py-1'>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
