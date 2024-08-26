import React, { useState } from "react";
import moment from "moment-timezone";

const TimezoneSelector = () => {
  const [timezone, setTimezone] = useState("UTC");

  // Получаем все доступные часовые пояса
  const timezones = moment.tz.names();

  // Обработчик изменения часового пояса
  const handleTimezoneChange = (e) => {
    setTimezone(e.target.value);
    let localTime = moment.tz({ hour: 15, minute: 47 }, timezone);
    console.log("local", localTime);

    // Перетворюємо локальний час в UTC
    let utcTime = localTime.utc();
    console.log("utcTime", utcTime.format("YYYY-MM-DD HH:mm:ss"));
  };

  // Получаем текущее время в выбранном часовом поясе
  const currentTime = moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss");

  return (
    <div>
      <label htmlFor="timezone-select">Выберите часовой пояс:</label>
      <select
        id="timezone-select"
        value={timezone}
        onChange={handleTimezoneChange}
      >
        {timezones.map((tz) => (
          <option key={tz} value={tz}>
            {tz}
          </option>
        ))}
      </select>
      <div>
        <h3>Текущее время в {timezone}:</h3>
        <p>{currentTime}</p>
      </div>
    </div>
  );
};

export default TimezoneSelector;
