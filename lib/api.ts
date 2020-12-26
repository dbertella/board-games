// const API1_URL = "https://www.boardgamegeek.com/xmlapi/";
const API_URL = "https://www.boardgamegeek.com/xmlapi2/";
var parser = require("fast-xml-parser");

export async function fetchAPI(endpoint: string) {
  const headers = {
    // "Content-Type": "application/json"
  };

  const res = await fetch(API_URL + endpoint, {
    method: "GET",
    headers,
  });

  const options = {
    attributeNamePrefix: "",
    ignoreAttributes: false,
    attrNodeName: "attr", //default is 'false'
    textNodeName: "text",
  };
  try {
    const text = await res.text();
    return parser.parse(text, options);
  } catch (e) {
    throw new Error(e);
  }
}
