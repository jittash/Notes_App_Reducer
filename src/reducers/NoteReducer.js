export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTE":
      return [
        ...state,
        {
          id: new Date().getTime().toString(),
          title: action.payload.title,
          description: action.payload.description
        }
      ];
    case "DELETE_NOTE":
      const filteredArray = state.filter((note) => {
        return note.id !== action.id;
      });
      return filteredArray;
    case "DELETE_ALL":
      return [];
    default:
      return state;
  }
};
