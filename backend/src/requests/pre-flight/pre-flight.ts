export const buildPreFlightRequest = () => {
  return {
    path: "",
    method: "OPTIONS",
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Headers": "authorization",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    },
    needAuth: false,
    buildResBody: () => Promise.resolve(""),
  };
};
