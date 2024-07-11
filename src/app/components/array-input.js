import React from 'react';

const ArrayInput = ({ field, form, ...props }) => {
    const handleChange = (e) => {
        const value = e.target.value.split(',').map(item => item.trim());
        form.setFieldValue(field.name, value);
    };

    return (
        <input
            {...field}
            {...props}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-[500px] mt-1"
        />
    );
};

export default ArrayInput;

