export const userReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return action.payload; //(action.payload == will have the user information)

    case "LOGGOUT":
      return action.payload; //

    default:
      return state;
  }
};
