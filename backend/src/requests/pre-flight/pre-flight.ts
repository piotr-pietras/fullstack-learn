export const buildPreFlightRequest = () => {
  return {
    path: "",
    method: "OPTIONS",
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Headers": "authoriaztion",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Max-Age": 86400,
    },
    needAuth: false,
    buildResBody: () => Promise.resolve(""),
  };
};
