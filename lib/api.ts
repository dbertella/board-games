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

  try {
    const text = await res.text();
    return parser.parse(text);
  } catch (e) {
    throw new Error(e);
  }
}
