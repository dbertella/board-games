// const API1_URL = "https://www.boardgamegeek.com/xmlapi/";
const API_URL = "https://www.boardgamegeek.com/xmlapi2/";
var parser = require("fast-xml-parser");

const defaultOptions = {
  attributeNamePrefix: "",
  ignoreAttributes: false,
  textNodeName: "text",
};

export async function fetchAPI(
  endpoint: string,
  options = defaultOptions,
  retries: number = 5
): Promise<any> {
  const headers = {
    // "Content-Type": "application/json"
  };

  const res = await fetch(API_URL + endpoint, {
    method: "GET",
    headers,
  });

  try {
    if (res.ok) {
      const text = await res.text();
      return parser.parse(text, options);
    }
    if (retries > 0) {
      return fetchAPI(endpoint, options, retries - 1);
    } else {
      throw new Error("No more retries");
    }
  } catch (e) {
    throw new Error(e);
  }
}
