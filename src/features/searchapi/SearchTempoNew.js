import { useState, useEffect } from "react";
import { getAudioFeatures, getTrackData, searchPlayList } from "./spotifyService";
import Player from "../../screens/player/player";

const SearchTempo = ({ genre, calculatedTempos }) => {
  const [desiredTracks, setDesiredTracks] = useState([]);

  useEffect(() => {
    search(genre, calculatedTempos);
  }, [genre, calculatedTempos]);

  const search = async (genre, calculatedTempos) => {
    const { minTempo, maxTempo } = calculatedTempos;
    console.log('>>>', genre);
    console.log('>>>>', calculatedTempos);
    const playlistUrls = await searchPlayList(genre);

    const playLists = await Promise.all(
      playlistUrls.map(async (url) => {
        const trackResponse = await getTrackData(url);
        return trackResponse;
      })
    );

    const tracks = playLists.flatMap((playlist) => {
      const trackData = playlist.items
        .filter((item) => item.track !== null && item.track.preview_url !== null)
        .map((item) => ({
          id: item.track.id,
          name: item.track.name,
          artist: item.track.artists[0].name,
          album: item.track.album.name,
          previewUrl: item.track.preview_url,
          tempo: null,
          danceability: null,
          energy: null,
        }));
      return trackData;
    });

    const tempos = await Promise.all(
      tracks
        .filter((track, index) => {
          return tracks.indexOf(track) === index;
        })
        .map(async (track) => {
          const audioFeatures = await getAudioFeatures(track.id);
          return audioFeatures;
        })
    );

    console.log(tempos);

    const tracksWithData = tracks.map((track, index) => {
      const { tempo, danceability, energy } = tempos[index];
      return {
        ...track,
        tempo,
        danceability,
        energy,
      };
    });

    const filteredTempos = tracksWithData.filter(
      (track) => track.tempo >= minTempo && track.tempo <= maxTempo
    );
    
    const uniqueTrackIds = [...new Set(filteredTempos.map((track) => track.id))];
    const desiredTracks = uniqueTrackIds.map((id) => filteredTempos.find((track) => track.id === id));

    setDesiredTracks(desiredTracks);
    console.log('desiredTracks>>>', desiredTracks);
  };

  // return (
  //   <div>
  //     <Player desiredTracks={desiredTracks} />
  //     {/* Render other JSX elements here based on desiredTracks */}
  //   </div>
  // );
};

export default SearchTempo;
