import axios from "axios";
import history from "../../utils/history";

const SET_AUTH = "SET_AUTH";
const RESET_AUTH = "RESET_AUTH";
const SET_PRE_CHECK_FAILED = "SET_PRE_CHECK_FAILED";
const SET_LOGIN = "SET_LOGIN";
const SET_TOKEN = "SET_TOKEN";

const INITIAL_STATE = {
  auth: {},
  loggedIn: false,
  preCheck: false,
  token: {},
};

const setAuth = (auth) => ({ type: SET_AUTH, auth });

export const setLogin = (loggedIn) => {
  return {
    type: SET_LOGIN,
    loggedIn,
  };
};
export const setFailed = () => {
  return {
    type: SET_PRE_CHECK_FAILED,
  };
};
export const me = () => async (dispatch) => {
  try {
    const res = await axios.get("/auth/me", { credentials: "include" });
    const storage = window.localStorage;
    const guestItems = storage.getItem("guestcart");
    console.log("ME", guestItems);
    if (guestItems) {
      await axios.post(
        `/api/guestcart/persist/${res.data.id}`,
        JSON.parse(guestItems)
      );
    }
    dispatch(setAuth(res.data));
    console.log("HERE", "redircet", res.data);
    history.push("/");
  } catch (err) {
    dispatch(setFailed());
    console.log(err);
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      await axios.post(`/auth/${method}`, { username, password });
      //history.push("/");
      dispatch(me());
      //history.push("/");
      dispatch(setLogin(true));
      history.push("/");
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const reset = () => {
  return {
    type: RESET_AUTH,
  };
};
export const resetAuth = () => async (dispatch) => {
  try {
    history.push("/");
    await axios.delete("/auth/logout");
    dispatch(reset());
  } catch (err) {
    console.log(err);
  }
};
export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    token,
  };
};
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_LOGIN:
      return { ...state, loggedIn: action.loggedIn };
    case SET_AUTH:
      return { ...state, auth: action.auth, loggedIn: true, preCheck: true };
    case RESET_AUTH:
      return { auth: {}, loggedIn: false, preCheck: false };
    case SET_PRE_CHECK_FAILED:
      return { ...state, preCheck: true };
    case SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }
    default:
      return state;
  }
}
