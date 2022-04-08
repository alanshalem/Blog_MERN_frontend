// Create a base URL for adding a new query parameter
// Replaces existing queries of the same name & maintains multiple query syntax
export const handleParams = (location, name, value) => {
  let baseUrl = location.pathname;

  if (baseUrl[baseUrl.length - 1] !== "/") {
    baseUrl = baseUrl.concat("/");
  }

  let existingQueries = location.search
    .split("&")
    .filter((query) => query !== "");

  existingQueries.forEach((query) => {
    if (query.includes(name)) {
      if (query.includes("?")) {
        baseUrl = baseUrl.concat("?", `${name}=${value}`);
      } else {
        baseUrl = baseUrl.concat("&", `${name}=${value}`);
      }
    } else {
      //If there is already 1 query
      if (baseUrl.includes("?")) {
        baseUrl = baseUrl.concat("&", query);
      } else {
        baseUrl = baseUrl.concat("?", query);
      }
    }
  });

  if (existingQueries.length === 0) {
    baseUrl = baseUrl.concat("?", `${name}=${value}`);
  }

  return baseUrl;
};

export const getParamValue = (location, name) => {
  let params = location.search.split("&");
  let param = null;
  for (let i = 0; i < params.length; i++) {
    if (params[i].includes(name)) {
      param = params[i].split("=")[1];
    }
  }
  return param;
};
