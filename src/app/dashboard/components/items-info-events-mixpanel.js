import React from "react";

const formatTime = (unixTime, timeAgoString = null) => {
  // Створюємо об'єкт Date з Unix-часу (в мілісекундах)
  const biddingDate = new Date(unixTime * 1000);
  const createdDate = new Date(unixTime * 1000);

  // Якщо передано timeAgoString, обробляємо його
  if (timeAgoString) {
    const [_, amount, unit] = timeAgoString.match(/(\d+)\s(\w+)/);

    const timeToSubtract = parseInt(amount);

    // В залежності від одиниць вимірювання, віднімаємо відповідний час
    switch (unit) {
      case "seconds":
      case "second":
        createdDate.setSeconds(createdDate.getSeconds() - timeToSubtract);
        break;
      case "minutes":
      case "minute":
        createdDate.setMinutes(createdDate.getMinutes() - timeToSubtract);
        break;
      case "hours":
      case "hour":
        createdDate.setHours(createdDate.getHours() - timeToSubtract);
        break;
      default:
        console.error("Unsupported time unit in the string");
        break;
    }
  }

  // Отримуємо годину, хвилини та секунди
  const biddingHours = String(biddingDate.getHours()).padStart(2, "0");
  const biddingMinutes = String(biddingDate.getMinutes()).padStart(2, "0");
  const biddingSeconds = String(biddingDate.getSeconds()).padStart(2, "0");

  const createdHours = String(createdDate.getHours()).padStart(2, "0");
  const createdMinutes = String(createdDate.getMinutes()).padStart(2, "0");
  const createdSeconds = String(createdDate.getSeconds()).padStart(2, "0");

  // Повертаємо об'єкт з двома значеннями: форматованим часом та новим часом після вирахування
  return {
    formattedTime: `${biddingHours}:${biddingMinutes}:${biddingSeconds}`,
    modifiedTime: timeAgoString
      ? `${createdHours}:${createdMinutes}:${createdSeconds}`
      : null,
  };
};

const ItemsInfoEvents = ({ data }) => {
  return (
    <tbody>
      {data.map((item, index) => {
        const { formattedTime, modifiedTime } = formatTime(
          item.properties.time,
          item.properties.publishedDate
        );
        return (
          <tr key={index} className="text-center">
            <td>{item.event}</td>
            <td>{item.properties.scanName}</td>
            <td>{item.properties.freelancer}</td>
            <td>
              {item.properties.targetLink ? (
                <a
                  className="underline hover:cursor-pointer hover:text-main-blue"
                  href={item.properties.targetLink}
                >
                  View job posting
                </a>
              ) : (
                "-"
              )}
            </td>

            <td>{formattedTime}</td>
            <td>{modifiedTime ? modifiedTime : "-"}</td>
            <td>
              {item.properties.requiredConnects
                ? item.properties.requiredConnects
                : "-"}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default ItemsInfoEvents;
