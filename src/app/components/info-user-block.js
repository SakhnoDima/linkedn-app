import { FaCheck, FaRegUserCircle } from "react-icons/fa";

const itemsClasses = "flex gap-2 items-baseline";
const itemStyle = "whitespace-nowrap text-xl";

const InfoUserBlock = ({ userInfo }) => {
  return (
    <div className="relative group">
      <FaRegUserCircle
        size={30}
        className="hover:fill-main-blue hover:cursor-pointer"
      />
      <div className="hidden absolute  top-[34px] left-[-150%] border-2 border-main-blue rounded-lg bg-white px-2 py-4 group-hover:block">
        <ul className="flex flex-col gap-4">
          <li className={itemsClasses}>
            <p className={itemStyle}>User email:</p> <p>{userInfo.email}</p>
          </li>
          <li className={itemsClasses}>
            <p className={itemStyle}>User id:</p>
            <p>{userInfo.id}</p>
          </li>
          <li className={itemsClasses}>
            <p className={itemStyle}>Linkedin:</p>
            <FaCheck
              className={`${
                userInfo.isLinkedinAuth ? "fill-green-600" : "fill-red-500"
              }`}
            />
          </li>
          <li className={itemsClasses}>
            <p className={itemStyle}>UpWork:</p>
            <FaCheck
              className={`${
                userInfo.isUpWorkAuth ? "fill-green-600" : "fill-red-500"
              }`}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InfoUserBlock;
