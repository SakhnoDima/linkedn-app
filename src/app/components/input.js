const Input = ({ field, form, className, ...props }) => {
  return (
    <input
      {...field}
      {...props}
      className={`border-[2px] border-gray-300 p-2 rounded box-border focus:outline-none focus:border-main-blue ${className}`}
    />
  );
};

export default Input;
