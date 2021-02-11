export const ADD_USERS = "ADD_USERS";
export const ADD_QUESTIONS = "ADD_QUESTIONS";
export const ADD_ANSWERS = "ADD_ANSWERS";
export const ADD_REVIEWED = "ADD_REVIEWED";

export const initialState = {
  users: [],
  questions: [],
  answers: [],
  reviewed: []
};


export const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case ADD_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };

    case ADD_ANSWERS:
      return {
        ...state,
        answers: action.payload,
      };

      case ADD_REVIEWED:
      return {
        ...state,
        reviewed: action.payload,
      };

    default:
      return { ...state };
  }
};
