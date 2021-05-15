// const API1_URL = "https://www.boardgamegeek.com/xmlapi/";
const API_URL = "https://www.boardgamegeek.com/xmlapi2/";
var parser = require("fast-xml-parser");

const defaultOptions = {
  attributeNamePrefix: "",
  ignoreAttributes: false,
  textNodeName: "text",
};

const MAX_RETRIES = 5;

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchAPI(
  endpoint: string,
  options = defaultOptions,
  retries: number = MAX_RETRIES
): Promise<any> {
  const headers = {
    // "Content-Type": "application/json"
  };

  const res = await fetch(API_URL + endpoint, {
    method: "GET",
    headers,
  });

  if (res.ok) {
    const text = await res.text();
    return parser.parse(text, options);
  }
  if (retries > 0) {
    console.log("Retries left: " + retries);
    console.log("for: " + endpoint);
    await timeout((MAX_RETRIES - retries) * 1000);
    return fetchAPI(endpoint, options, retries - 1);
  } else {
    throw new Error("BGG is not responding and no more retries");
  }
}
