export const updateError = (message, stateUpdater) => {
  stateUpdater(message);
  setTimeout(() => {
    stateUpdater("");
  }, 3000);
};

export const isValidEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

export const isValidObjectForm = (obj) => {
  return Object.values(obj).every((item) => item.trim());
};
