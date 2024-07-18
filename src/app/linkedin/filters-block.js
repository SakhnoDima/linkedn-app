import UsersLinkedinFilters from "../components/user-linkedin-filters";

const FiltersBlock = () => {

  return (
    <div className="py-[50px] ">
      <h2 className="text-3xl text-center mb-[8px] font-bold ">
       Target List
      </h2>
      <UsersLinkedinFilters />
    </div>
  );
};

export default FiltersBlock