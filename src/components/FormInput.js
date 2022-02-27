const FormInput = ({ label, type, value, name, handleChange }) => {
  return (
    <div className='flex flex-col text-gray-500'>
      <label>{label} : </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className='w-full rounded-md border border-gray-200 p-2'
      />
    </div>
  );
};

export default FormInput;
