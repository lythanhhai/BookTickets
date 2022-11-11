const loginAction = (item) => {
  return {
    type: "loginAction",
    payload: item,
  };
};
const signupAction = (item) => {
  return {
    type: "signupAction",
    payload: item,
  };
};
const logoutAction = (item) => {
  return {
    type: "logoutAction",
    payload: item,
  };
};

export { loginAction, signupAction, logoutAction };
