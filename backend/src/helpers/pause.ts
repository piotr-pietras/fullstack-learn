export const pause = async (ms: number) => {
  const promise = new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

  return promise;
};
