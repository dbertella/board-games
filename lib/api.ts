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
async function sleep(fn: Function, delay: number, ...args: any) {
  await timeout(delay);
  return fn(...args);
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

  try {
    if (res.ok) {
      const text = await res.text();
      return parser.parse(text, options);
    }
    if (retries > 0) {
      console.log("Retries left: " + retries);
      console.log("for: " + endpoint);
      const response = await sleep(() => {
        fetchAPI(endpoint, options, retries - 1);
      }, (MAX_RETRIES - retries) * 1000);
      return response;
    } else {
      throw new Error("No more retries");
    }
  } catch (e) {
    throw new Error(e);
  }
}
