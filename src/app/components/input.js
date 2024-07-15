const Input = ({ field, form, ...props }) => {
    return (
        <input
            {...field}
            {...props}
            className="border border-gray-300 p-2 rounded w-[500px] mt-1"
        />
    );
};

export default Input;





