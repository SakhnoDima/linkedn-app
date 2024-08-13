import FormicInput from "../ui/formik-input";

export const BiddingOptions = () => {
  const biddingOptions = [
    {
      labelText: "18. Add Team Name",
      toolTipText: "Here you can choose available freelancers.",
      fieldName: "biddingOptions.team",
      fieldType: "text",
      placeholder: `Ex: My Team Name`,
    },
    {
      labelText: "19. Freelancer Name",
      toolTipText:
        "Here you can select the freelancer from whom this offer came.",
      fieldName: "biddingOptions.freelancer",
      fieldType: "text",
      placeholder: `Ex: Name Surname`,
    },
    {
      labelText: "20. Propose with a Specialized freelancer profile",
      toolTipText: "Here you can select a freelancer profile.",
      fieldName: "biddingOptions.profile",
      fieldType: "text",
      placeholder: `Ex: Freelancer Profile`,
    },
  ];

  return (
    <div className="flex flex-col gap-[30px] mx-auto justify-center">
      {biddingOptions.map((option, index) => (
        <FormicInput key={index} data={option} />
      ))}
    </div>
  );
};
