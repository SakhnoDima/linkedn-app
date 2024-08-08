import Checkbox from "@/app/components/checkbox";
import { Tooltip } from "@/app/components/tooltip";
import { ErrorMessage, Field } from "formik";
import { useEffect } from "react";
import { BsCurrencyDollar } from "react-icons/bs";

export const JobType = ({ values, setFieldValue }) => {
  useEffect(() => {
    const minFix = values.searchFilters.jobType.fixedJobType.min;
    const maxFix = values.searchFilters.jobType.fixedJobType.max;
    const minHour = values.searchFilters.jobType.hourlyJobType.min;
    const maxGHour = values.searchFilters.jobType.hourlyJobType.max;
    if (minFix || maxFix) {
      setFieldValue("searchFilters.jobType.fixedJobType.enabled", true);
    } else if (!minFix && !maxFix) {
      setFieldValue("searchFilters.jobType.fixedJobType.enabled", false);
    }

    if (minHour || maxGHour) {
      setFieldValue("searchFilters.jobType.hourlyJobType.enabled", true);
    } else if (!minHour && !maxGHour) {
      setFieldValue("searchFilters.jobType.hourlyJobType.enabled", false);
    }
  }, [
    values.searchFilters.jobType.fixedJobType.min,
    values.searchFilters.jobType.fixedJobType.max,
    values.searchFilters.jobType.hourlyJobType.min,
    values.searchFilters.jobType.hourlyJobType.min,
    setFieldValue,
  ]);

  return (
    <div className="mb-4">
      <div className="flex space-x-2">
        <p className="mb-2">7. Job type</p>
        <Tooltip
          text={`Chose hourly or fixed job type and prefer average price`}
        />
      </div>
      <div className="flex flex-col gap-4 p-2 ">
        <div className="flex  flex-row gap-4 justify-around">
          <label
            htmlFor="hourlyJobType"
            className="flex gap-2 items-center  justify-between hover:cursor-pointer"
          >
            <Field
              id="hourlyJobType"
              type="checkbox"
              name="searchFilters.jobType.hourlyJobType.enabled"
              checked={values.searchFilters.jobType.hourlyJobType.enabled}
              onChange={() => {
                setFieldValue(
                  "searchFilters.jobType.hourlyJobType.enabled",
                  !values.searchFilters.jobType.hourlyJobType.enabled
                );
                if (values.searchFilters.jobType.hourlyJobType.enabled) {
                  setFieldValue(
                    "searchFilters.jobType.hourlyJobType.min",
                    null
                  );
                  setFieldValue(
                    "searchFilters.jobType.hourlyJobType.max",
                    null
                  );
                }
              }}
              as={Checkbox}
            />
            <p className="min-w-[50px]">Hourly</p>
          </label>
          <div className="flex flex-row gap-4 ">
            <div className="flex gap-2 items-center relative">
              <BsCurrencyDollar className="absolute top-[5px] left-1 w-[20px] h-[20px]" />
              <Field
                name="searchFilters.jobType.hourlyJobType.min"
                type="number"
                placeholder="Min"
                className="w-[158px] py-[4px] pl-[22px]"
                value={values.searchFilters.jobType.hourlyJobType.min || ""}
              />
              <ErrorMessage
                name="searchFilters.jobType.hourlyJobType.min"
                component="div"
                className="text-red-500 absolute top-[-4px] right-0"
              />
              <p>/hr</p>
            </div>
            <div className="flex gap-2 items-center relative">
              <BsCurrencyDollar className="absolute top-[5px] left-1 w-[20px] h-[20px]" />
              <Field
                name="searchFilters.jobType.hourlyJobType.max"
                type="number"
                placeholder="Max"
                className="w-[158px] py-[4px] pl-[22px]"
                value={values.searchFilters.jobType.hourlyJobType.max || ""}
              />
              <ErrorMessage
                name="searchFilters.jobType.hourlyJobType.max"
                component="div"
                className="text-red-500 absolute top-[-4px] right-0"
              />
              <p>/hr</p>
            </div>
          </div>
        </div>
        <div className="flex  flex-row gap-4 justify-around">
          <label
            htmlFor="fixedJobType"
            className="flex gap-2 items-center  justify-between hover:cursor-pointer"
          >
            <Field
              id="fixedJobType"
              name="searchFilters.jobType.fixedJobType.enabled"
              type="checkbox"
              checked={values.searchFilters.jobType.fixedJobType.enabled}
              onChange={() => {
                setFieldValue(
                  "searchFilters.jobType.fixedJobType.enabled",
                  !values.searchFilters.jobType.fixedJobType.enabled
                );
                if (values.searchFilters.jobType.fixedJobType.enabled) {
                  setFieldValue("searchFilters.jobType.fixedJobType.min", null);
                  setFieldValue("searchFilters.jobType.fixedJobType.max", null);
                }
              }}
              as={Checkbox}
            />
            <p className="min-w-[50px]">Fixed</p>
          </label>
          <div className="flex flex-row gap-4 ">
            <div className="flex gap-2 items-center relative">
              <BsCurrencyDollar className="absolute top-[5px] left-1 w-[20px] h-[20px]" />
              <Field
                name="searchFilters.jobType.fixedJobType.min"
                type="number"
                placeholder="Min"
                className="w-[158px] py-[4px] pl-[22px]"
                value={values.searchFilters.jobType.fixedJobType.min || ""}
              />
              <p>/hr</p>
            </div>
            <div className="flex gap-2 items-center relative">
              <BsCurrencyDollar className="absolute top-[5px] left-1 w-[20px] h-[20px]" />
              <Field
                name="searchFilters.jobType.fixedJobType.max"
                type="number"
                placeholder="Max"
                className="w-[158px] py-[4px] pl-[22px]"
                value={values.searchFilters.jobType.fixedJobType.max || ""}
              />
              <p>/hr</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
