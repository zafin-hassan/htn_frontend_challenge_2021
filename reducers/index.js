export function loginReducer(currentState, action) {
  switch (action.type) {
    case "field": {
      return {
        ...currentState,
        [action.fieldName]: action.payload,
      };
    }
    case "login": {
      return {
        ...currentState,
        error: "",
        isLoading: true,
      };
    }
    case "success": {
      return {
        ...currentState,
        isLoggedIn: true,
        isLoading: false,
      };
    }
    case "error": {
      return {
        ...currentState,
        error:
          "Incorrect username or password! Try using zafin and password 😉",
        isLoggedIn: false,
        isLoading: false,
        username: "",
        password: "",
      };
    }
    case "logOut": {
      return {
        ...currentState,
        username: "",
        password: "",
        isLoggedIn: false,
      };
    }
    case "setEvents": {
      return {
        ...currentState,
        allEvents: action.payload,
        events: action.payload,
      };
    }
    case "setCurrentEvent": {
      return {
        ...currentState,
        currentEvent: action.payload,
      };
    }
    case "filterEvents": {
      return {
        ...currentState,
        events: action.payload,
      };
    }
    default:
      return currentState;
  }
}

export const initialState = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
  isLoggedIn: false,
  allEvents: [],
  events: [],
  currentEvent: {},
};
