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

export const searchPlayList = async (selectedGenre, minTempo, maxTempo) => {
  const token = await fetchAccessToken();
  const limit = 50; // Number of tracks to retrieve per request
  let offset = 0;
  let allResults = [];

  while (allResults.length < 100) {
    const result = await fetch(
      `https://api.spotify.com/v1/recommendations?limit=${limit}&offset=${offset}&market=US&seed_genres=${encodeURIComponent(selectedGenre)}&min_tempo=${minTempo}&max_tempo=${maxTempo}`,
      searchParameters(token)
    );

    const resultList = await result.json();

    if (resultList.tracks && resultList.tracks.length > 0) {
      // console.log('resultList',resultList);
      const onlyPopularSongs = resultList.tracks.filter(item => item.popularity >= 70);
      // console.log('popular songs',onlyPopularSongs);
      
      allResults.push(...onlyPopularSongs);
      offset += limit;
    } else {
      break; // No more results
    }
  }

  // Ensure exactly 100 tracks are returned
  allResults = allResults.slice(0, 100);

  return allResults;
};







// export const getTrackData = async (playlistUrl) => {
//   // console.log(playlistUrl);
//   const token = await fetchAccessToken();
//   const data = await fetch(playlistUrl, searchParameters(token));
//   return await data.json();
// };

// export const getAudioFeatures = async (id) => {
//   try {
//     const token = await fetchAccessToken();
//     const data = await fetch(
//       `https://api.spotify.com/v1/audio-features/${id}`,
//       searchParameters(token)
//     );
//     return data.json();
//   } catch (e) {
//     return {};
//   }
// };