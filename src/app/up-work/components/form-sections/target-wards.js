import FormicInput from "../ui/formik-input";

export const AddingTargetWardsBlock = () => {
  const filtersInputs = [
    {
      labelText: "All of these words",
      toolTipText: "Here you can add target wards and we will use all off them",
      fieldName: "searchWords.includeWords",
      fieldType: "text",
      placeholder: `Ex: (WP | developer) & (create*)`,
    },
    {
      labelText: "None of these words",
      toolTipText: "Here you can add exception words",
      fieldName: "searchWords.excludeWords",
      fieldType: "text",
      placeholder: `Ex: js, debag`,
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-[30px] mx-auto justify-center">
        {filtersInputs.map((data, index) => (
          <FormicInput key={index} data={data} />
        ))}
      </div>
    </>
  );
};
