import { combineReducers } from "redux";

import auth from "./reducers/auth";
import spotifyuser from "./reducers/spotifyuser";
import audio from "./reducers/audio";
import artists from "./reducers/artists";

const rootReducer = combineReducers({
  auth,
  spotifyuser,
  audio,
  artists,
});

export default rootReducer;
