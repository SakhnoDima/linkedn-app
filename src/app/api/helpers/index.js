import moment from "moment-timezone";

export const transformQuery = (includeString, excludeString) => {
  includeString = includeString.replace(/&/g, "AND").replace(/\|/g, "OR");

  let excludeQuery = '';
  if (excludeString) {
    const excludeTerms = excludeString.split(",").map((term) => term.trim());

    const formattedExcludeTerms = excludeTerms
        .filter((term) => term.length > 0)
        .map((term) => (term.includes(" ") ? `"${term}"` : term));

    excludeQuery = `AND NOT (${formattedExcludeTerms.join(" OR ")})`;
  }

  return `${includeString} ${excludeQuery}`;
};

export const compleatSearchFilters = async (data) => {
  const searchFilters = {};
  if (data.locations.length > 0) {
    searchFilters.Locations = data.locations;
  }
  if (data.languages.length > 0) {
    searchFilters["Profile language"] = data.languages;
  }
  if (data.title) {
    searchFilters.Keywords = data.title;
  }
  if (data.industries.length > 0) {
    searchFilters.Industry = data.industries;
  }
  if (data.serviceCategories.length > 0) {
    searchFilters["Service categories"] = data.serviceCategories;
  }

  return searchFilters;
};

export const timeCreator = (minutes, hours, timeZone) => {
  const min = minutes ? minutes : "*";
  const hour = hours ? hours : "*";
  console.log(timeZone);

  const [UTC0Hour, UTC0Min] = getUTC0Time(hour, min, timeZone);

  if (!minutes && !hours) {
    return "0 * * * *";
  } else if (!minutes && hours) {
    return `0 ${UTC0Hour} * * *`;
  } else {
    return `${UTC0Min} ${UTC0Hour} * * *`;
  }
};

const getUTC0Time = (hour, minute, timeZone) => {
  let localTime = moment.tz(
    { hour: hour === "*" ? 0 : hour, minute: minute === "*" ? 0 : minute },
    timeZone
  );
  console.log("local time", localTime.format("YYYY-MM-DD HH:mm:ss"));

  let utcTime = localTime.utc();
  console.log("utcH", utcTime.hours());
  console.log("utcM", utcTime.minutes());

  let UTC0Hour = hour === "*" ? "*" : utcTime.hours();
  let UTC0Min = minute === "*" ? "*" : utcTime.minutes();

  return [UTC0Hour, UTC0Min];
};
