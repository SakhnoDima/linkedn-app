import FormicInput from "../ui/formik-input";

export const JobDescriptionsBlock = () => {
  const category = {
    labelText: "Specify category you want",
    toolTipText: "Here you can add category, separate each category by ' | ' ",
    fieldName: "searchFilters.category",
    fieldType: "text",
    placeholder: `Ex: Web | Mobile Design`,
  };
  return (
    <div className="mb-4">
      <FormicInput data={category} />
    </div>
  );
};
