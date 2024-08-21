export const transformQuery = (includeString, excludeString) => {
  includeString = includeString.replace(/&/g, "AND").replace(/\|/g, "OR");

  const excludeTerms = excludeString.split(",").map((term) => term.trim());

  const formattedExcludeTerms = excludeTerms
    .filter((term) => term.length > 0)
    .map((term) => (term.includes(" ") ? `"${term}"` : term));

  const excludeQuery = `AND NOT (${formattedExcludeTerms.join(" OR ")})`;

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

export const timeCreator = (minutes, hours) => {
  const min = minutes ? minutes : "*";
  const hour = hours ? hours : "*";

  const [UTC0Hour, UTC0Min] = getUTC0Time(hour, min);

  if (!minutes && !hours) {
    return "0 * * * *";
  } else if (!minutes && hours) {
    return `0 ${process.env.NEXT_PUBLIC_PRODUCTION ? hour : UTC0Hour} * * *`;
  } else {
    return `${process.env.NEXT_PUBLIC_PRODUCTION ? min : UTC0Min} ${
      process.env.NEXT_PUBLIC_PRODUCTION ? hour : UTC0Hour
    } * * *`;
  }
};

const getUTC0Time = (hour, min) => {
  let localDate = new Date();

  localDate.setHours(hour === "*" ? 0 : hour);
  localDate.setMinutes(min === "*" ? 0 : min);
  localDate.setSeconds(0);

  let UTC0Date = new Date(localDate.toUTCString());

  let UTC0Hour = hour === "*" ? "*" : UTC0Date.getUTCHours();
  let UTC0Min = min === "*" ? "*" : UTC0Date.getUTCMinutes();

  return [UTC0Hour, UTC0Min];
};
