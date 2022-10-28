import crypto from "crypto";

export const getRandomToken = () => {
  const token = crypto.randomBytes(20).toString("hex");
  return token;
};
