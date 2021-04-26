// const API1_URL = "https://www.boardgamegeek.com/xmlapi/";
const API_URL = "https://www.boardgamegeek.com/xmlapi2/";
var parser = require("fast-xml-parser");

const defaultOptions = {
  attributeNamePrefix: "",
  ignoreAttributes: false,
  textNodeName: "text",
};

export async function fetchAPI(endpoint: string, options = defaultOptions) {
  const headers = {
    // "Content-Type": "application/json"
  };

  const res = await fetch(API_URL + endpoint, {
    method: "GET",
    headers,
  });

  try {
    const text = await res.text();
    return parser.parse(text, options);
  } catch (e) {
    throw new Error(e);
  }
}
