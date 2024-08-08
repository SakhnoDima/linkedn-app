const Input = ({ field, form, ...props }) => {
  return (
    <input
      {...field}
      {...props}
      className="border-[2px] border-gray-300 p-2 rounded w-[500px] box-border"
    />
  );
};

export default Input;
