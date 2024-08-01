const Toggle = ({ field, form, className, ...props }) => {
  return (
    <input
      {...field}
      {...props}
      type="checkbox"
      className={`toggle ${className}`}
    />
  );
};

export default Toggle;
