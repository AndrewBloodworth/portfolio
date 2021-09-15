import axios from "axios";

const SET_USER = "SET_USER",
  SET_TOP_ARTISTS = "SET_TOP_ARTISTS",
  SET_TOP_TRACKS_BY_ARTIST = "SET_TOP_TRACKS_BY_ARTIST";

const INITIAL_STATE = {
  user: {},
  topArtists: [],
  topTracks: [],
  selectedSong: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
    case SET_TOP_ARTISTS:
      return {
        ...state,
        topArtists: action.topArtists,
      };
    case SET_TOP_TRACKS_BY_ARTIST:
      return {
        ...state,
        topTracks: action.topTracks,
      };
    default:
      return state;
  }
};

const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const fetchUser = (token) => {
  return async (dispatch) => {
    try {
      const getIdUrl = "https://api.spotify.com/v1/me",
        { data } = await axios(getIdUrl, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      dispatch(setUser(data));
    } catch (e) {
      console.log(e);
    }
  };
};

const setUserTopArtists = (topArtists) => {
  return {
    type: SET_TOP_ARTISTS,
    topArtists,
  };
};

export const fetchUserTopArtists = (token, range = "long_term") => {
  return async (dispatch) => {
    try {
      const getIdUrl = `https://api.spotify.com/v1/me/top/artists?time_range=${range}`,
        { data } = await axios(getIdUrl, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      dispatch(setUserTopArtists(data.items));
      //dispatch(saveArtists(data.items));
    } catch (e) {
      console.log(e);
    }
  };
};

const setUserTopTracks = (topTracks) => {
  return {
    type: SET_TOP_TRACKS_BY_ARTIST,
    topTracks,
  };
};

export const fetchUserTopTracks = (token, range = "long_term") => {
  return async (dispatch) => {
    try {
      const getIdUrl = `https://api.spotify.com/v1/me/top/tracks?limit=1000&time_range=${range}`,
        { data } = await axios(getIdUrl, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      dispatch(setUserTopTracks(data.items));
      //dispatch(saveSongs(data.items));
    } catch (e) {
      console.log(e);
    }
  };
};
