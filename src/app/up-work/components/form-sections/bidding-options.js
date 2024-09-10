import FormicInput from "../ui/formik-input";

export const BiddingOptions = ({ account }) => {
  const biddingOptions = [
    {
      labelText: "Add Team Name",
      toolTipText: "Here you can choose available freelancers.",
      fieldName: "biddingOptions.team",
      fieldType: "text",
      placeholder: `Ex: My Team Name`,
    },
    {
      labelText: "Freelancer Name",
      toolTipText:
        "Here you can select the freelancer from whom this offer came.",
      fieldName: "biddingOptions.freelancer",
      fieldType: "text",
      placeholder: `Ex: Name Surname`,
    },
    {
      labelText: "Propose with a Specialized freelancer profile",
      toolTipText: "Here you can select a freelancer profile.",
      fieldName: "biddingOptions.profile",
      fieldType: "text",
      placeholder: `Ex: Freelancer Profile`,
    },
  ];

  const filteredBiddingOptions =
    account !== "agency-account" ? biddingOptions.slice(1) : biddingOptions;

  return (
    <div className="flex flex-col gap-[30px] mx-auto justify-center">
      {filteredBiddingOptions.map((option, index) => (
        <FormicInput key={index} data={option} index={index} />
      ))}
    </div>
  );
};
