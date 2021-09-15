import axios from "axios";

const SET_ARTIST = "SET_ARTIST",
  SET_ARTISTS = "SET_ARTISTS",
  SET_TOP_SONGS = "SET_TOP_SONGS";

const INITIAL_STATE = {
  artists: [],
  topSongs: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ARTIST: {
      return {
        ...state,
        artists: [...state.artists, action.artist],
      };
    }
    case SET_ARTISTS: {
      return {
        ...state,
        artists: action.artists,
      };
    }
    case SET_TOP_SONGS:
      return {
        ...state,
        topSongs: action.topSongs,
      };
    default:
      return state;
  }
};

export const setArtists = (artists) => {
  return {
    type: SET_ARTISTS,
    artists,
  };
};
const setArtist = (artist) => {
  return {
    type: SET_ARTIST,
    artist,
  };
};

export const saveArtists = (artists) => {
  const mappedArtists = artists.map((artist) => {
    // const artist = track.artists[0];
    // const album = track.album;
    //artist.images[0].url
    // return {
    //   artistName: artist.name,
    //   artistId: artist.id,
    //   songName: track.name,
    //   songId: track.id,
    //   artworkUrl: album.images[0].url,
    //   artistImageUrl: "",
    //   albumId: album.id,
    //   audioUrl: track.uri,
    // };
    return {
      name: artist.name,
      artistImageUrl: artist.images[0].url,
    };
  });
  console.log("mappped", mappedArtists);
  return (dispatch) => {
    axios
      .put(`/api/artists/`, { artists: mappedArtists })
      .then(({ data }) => dispatch(setArtists(data)));
  };
};

export const fetchArtist = (artistId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/artists/${artistId}`);

      dispatch(setArtist(data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchArtists = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/artists/`);
      dispatch(setArtists(data));
    } catch (e) {
      console.log(e);
    }
  };
};
const setArtistTopSongs = (topSongs) => {
  return {
    type: SET_TOP_SONGS,
    topSongs,
  };
};

export const fetchArtistTopSongs = (artistId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/artists/${artistId}/top-tracks`);
      dispatch(setArtistTopSongs(data));
    } catch (e) {
      console.log(e);
    }
  };
};
