const CLIENT_ID = "cc9134429c674743814f08bcbf5173ad";
const CLIENT_SECRET = "3b572c5185da443583ca0e22dbcb8740";

export const authParameters = {
  method: "Post",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body:
    "grant_type=client_credentials&client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET,
};

export const fetchAccessToken = async () => {
  const result = await fetch(
    "https://accounts.spotify.com/api/token",
    authParameters
  );
  const token = (await result.json()).access_token;
  return token;
};

export const searchParameters = (token) => ({
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const searchPlayList = async (selectedGenre) => {
  const token = await fetchAccessToken();
  const result = await fetch(
    "https://api.spotify.com/v1/search?q=" +
      encodeURIComponent(selectedGenre) +
      "&type=playlist&market=US",
    searchParameters(token)
  );
  const resultList = await result.json();
  const playlistURLs = resultList.playlists.items.map((x) => x.tracks.href);
  return playlistURLs;
};


export const getTrackData = async (playlistUrl) => {
  // console.log(playlistUrl);
  const token = await fetchAccessToken();
  const data = await fetch(playlistUrl, searchParameters(token));
  return await data.json();
};

export const getAudioFeatures = async (id, minTempo, maxTempo) => {
  try {
    const token = await fetchAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/audio-features/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
      console.log(data);
    // Check if the tempo is within the desired range
    if (data.tempo >= minTempo && data.tempo <= maxTempo) {
      return data;
    } else {
      return null; // Tempo is outside the desired range, return null
    }
  } catch (e) {
    return null; // Error occurred, return null
  }

  // restructure code here
};

