export const searchReducer = (state = { text: "" }, action) => {
  switch (action.type) {
    case "SEARCH_QUERY":
      return { ...state, ...action.payload }; //(action.payload == will have the user information)

    default:
      return state;
  }
};
