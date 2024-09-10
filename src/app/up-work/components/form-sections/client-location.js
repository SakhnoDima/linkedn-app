import FormicInput from "../ui/formik-input";

export const ClientLocation = () => {
  const locationData = {
    labelText: "Clients Location",
    toolTipText: "Here you can add customer locations",
    fieldName: "searchFilters.clientLocation",
    fieldType: "text",
    placeholder: `Ex: United Kingdom | United States`,
  };

  return (
    <div className="mb-4">
      <FormicInput data={locationData} />
    </div>
  );
};
