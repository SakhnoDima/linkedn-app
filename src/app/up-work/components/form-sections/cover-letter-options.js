import FormicTextArea from "../ui/formik-textArea";
import { ErrorMessage, Field } from "formik";
import { Tooltip } from "@/app/components/tooltip";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export const CoverLetterOptions = () => {
  const coverLetterOptions = [
    {
      labelText: "21. Cover Letter",
      toolTipText:
        "This cover letter will be used in all your job applications.",
      fieldName: "coverLetterOptions.coverLetterTemplate",

      fieldType: "text",
      placeholder: `Ex: [This is my cover letter]`,
      fieldClassName: "h-[300px]",
    },
    {
      labelText: "22. Freelancer skills",
      toolTipText:
        "To add individuality to the letter, identify the freelancer's main skills.",
      fieldName: "coverLetterOptions.freelancerSkills",

      fieldType: "text",
      placeholder: `Ex: Super boy`,
      fieldClassName: "h-[100px]",
    },
  ];
  const freelancerLinkInputs = [
    {
      labelText: "23. Freelancer Github Link",
      icon: (
        <FaGithub className="absolute top-[5px] left-1 w-[20px] h-[20px]" />
      ),
      toolTipText: "Freelancer Github Link",
      name: "coverLetterOptions.additionalLinks.gitHub",
      placeholder: "Github",
    },
    {
      labelText: "24. Freelancer Linkedin Link",
      icon: (
        <FaLinkedin className="absolute top-[5px] left-1 w-[20px] h-[20px]" />
      ),
      toolTipText: "Freelancer Linkedin Link",
      name: "coverLetterOptions.additionalLinks.linkedIn",
      placeholder: "Linkedin",
    },
  ];

  return (
    <div className="flex flex-col gap-[30px] mx-auto justify-center">
      {coverLetterOptions.map((option, index) => (
        <FormicTextArea key={index} data={option} />
      ))}

      {freelancerLinkInputs.map((option, index) => (
        <div key={index}>
          <div className="mb-2 flex items-center gap-2">
            <p>{option.labelText}</p>
            <Tooltip text={option.toolTipText} />
          </div>
          <label className="flex gap-2 items-center relative">
            {option.icon}
            <Field
              name={option.name}
              type="text"
              placeholder={option.placeholder}
              className="w-[100%] py-[4px] pl-[28px]"
            />

            <ErrorMessage
              name="searchFilters.jobType.hourlyJobType.min"
              component="div"
              className="text-red-500 absolute top-[-4px] right-0"
            />
          </label>
        </div>
      ))}
    </div>
  );
};
