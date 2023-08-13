import { useState, useEffect } from "react";
import { getAudioFeatures, getTrackData, searchPlayList } from "./spotifyService";
import { useNavigate } from 'react-router-dom';
import Player from "../../screens/player/player";

const SearchTempo = ({ updateDesiredTracks, genre, calculatedTempos }) => {
  const [desiredTracks, setDesiredTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    search({genre, calculatedTempos});
  }, [genre, calculatedTempos]);
  


  const search = async ({ genre, calculatedTempos }) => {
    const { minTempo, maxTempo } = calculatedTempos;
    // console.log('>>>', genre);
    console.log('>>>>', calculatedTempos);

    const tracksData = await searchPlayList(genre, minTempo, maxTempo);
    // console.log('tracksData', tracksData);

    const uniqueIds = new Set();
    const filteredArray = [];

    for (const item of tracksData) {
      if (!uniqueIds.has(item.id)) {
        uniqueIds.add(item.id);
        filteredArray.push(item);
      }
    }

    // console.log('filtered Array',filteredArray);

   

    // const uniqueTrackIds = [...new Set(tracksData.filter((track) => track.id))];
    // console.log('uniqueTrackIds',uniqueTrackIds);


  //   const playLists = await Promise.all(
  //     playlistUrls.map(async (url) => {
  //       const trackResponse = await getTrackData(url);
  //       return trackResponse;
  //     })
  //   );

  //   console.log('Playlist', playLists);

  //   const tracks = playLists.flatMap((playlist) => {
  //     const trackData = playlist.items
  //       .filter((item) => item.track !== null && item.track.preview_url !== null)
  //       .map((item) => ({
  //         id: item.track.id,
  //         name: item.track.name,
  //         artist: item.track.artists[0].name,
  //         album: item.track.album.name,
  //         previewUrl: item.track.preview_url,
  //         tempo: null,
  //         danceability: null,
  //         energy: null,
  //       }));
  //     return trackData;
  //   });

  //   console.log('Tracks', tracks);

  //   const tempos = await Promise.all(
  //     tracks
  //       .filter((track, index) => {
  //         return tracks.indexOf(track) === index;
  //       })
  //       .map(async (track) => {
  //         const audioFeatures = await getAudioFeatures(track.id);
  //         return audioFeatures;
  //       })
  //   );

  //   console.log('Tempos', tempos);

  //   const tracksWithData = tracks.map((track, index) => {
  //     const { tempo, danceability, energy } = tempos[index];
  //     return {
  //       ...track,
  //       tempo,
  //       danceability,
  //       energy,
  //     };
  //   });

  //   console.log('TracksWithData', tracksWithData)
  //   console.log('minTempo', minTempo);
  //   console.log('maxTempo', maxTempo);

  //   const filteredTempos = tracksWithData.filter(
  //     (track) => track.tempo >= minTempo && track.tempo <= maxTempo
  //   );

  //   console.log('FilteredTempos', filteredTempos);
    
  //   const uniqueTrackIds = [...new Set(filteredTempos.map((track) => track.id))];
  //   console.log('UniqueTrackIds',uniqueTrackIds);
  //   const desiredTracks = uniqueTrackIds.map((id) => filteredTempos.find((track) => track.id === id));
  //   console.log('DesiredTracks', desiredTracks);
  setDesiredTracks(filteredArray);
  setIsLoading(false);
  };

  useEffect(() => {
    if (!isLoading && desiredTracks.length > 0) {
      updateDesiredTracks(desiredTracks);
      navigate('/player'); // Navigate after loading and desiredTracks are set
    }
  }, [isLoading, desiredTracks, navigate]);

  // return (
  //   isLoading ? (
  //     <p>Loading...</p>
  //   ) : desiredTracks.length > 0 ? (
  //     desiredTracks
  //   ) : (
  //     <p>No tracks available.</p>
  //   )
  // );
};

export default SearchTempo;
