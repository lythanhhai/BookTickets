const initial = {
  userId: null,
  username: "",
  accessToken: "",
  tokenType: "",
};

const authenReducer = (state = initial, action) => {
  switch (action.type) {
    case "loginAction":
      return {
        ...state,
        userId: action.payload.userId,
        username: action.payload.username,
        accessToken: action.payload.accessToken,
        tokenType: action.payload.tokenType,
      };
    case "signupAction":
      return {
        ...state,
        userId: action.payload.userId,
        username: action.payload.username,
        accessToken: action.payload.accessToken,
        tokenType: action.payload.tokenType,
      };
    case "logoutAction":
      return {
        ...state,
        userId: action.payload.userId,
        username: action.payload.username,
        accessToken: action.payload.accessToken,
        tokenType: action.payload.tokenType,
      };
    default:
      return state;
  }
};

export default authenReducer;
