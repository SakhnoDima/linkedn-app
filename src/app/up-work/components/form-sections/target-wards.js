import FormicInput from "../ui/formik-input";

export const AddingTargetWardsBlock = () => {
  const filtersInputs = [
    {
      labelText: "1. All of these words",
      toolTipText: "Here you can add target wards and we will use all off them",
      fieldName: "searchWords.allOfTheseWords",
      fieldType: "text",
      placeholder: `Ex: WP | developer`,
    },
    {
      labelText: "2.Any of these words",
      toolTipText: "Here you can add target wards and we will use any off them",
      fieldName: "searchWords.anyOfTheseWords",
      fieldType: "text",
      placeholder: `Ex: WP | developer`,
    },
    {
      labelText: "3. None of these words",
      toolTipText: "Here you can add exception words",
      fieldName: "searchWords.noneOfTheseWords",
      fieldType: "text",
      placeholder: `Ex: js | debag`,
    },
    {
      labelText: "4. The exact phrase",
      toolTipText: "Here you can add exact phrase",
      fieldName: "searchWords.theExactPhrase",
      fieldType: "text",
      placeholder: `Ex: wordpress developer`,
    },
  ];
  return (
    <>
      <div className="grid grid-cols-2 gap-[30px] mx-auto justify-center">
        {filtersInputs.map((data, index) => (
          <FormicInput key={index} data={data} />
        ))}
      </div>
    </>
  );
};
