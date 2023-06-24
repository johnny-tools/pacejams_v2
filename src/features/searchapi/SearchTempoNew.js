import {
  Col,
  Row,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  Container,
} from "reactstrap";
import { useState, useEffect } from "react";
import {
  getAudioFeatures,
  getTrackData,
  searchPlayList,
} from "./spotifyService";
import GenreList from "../../screens/GenreList";
import GetStarted from "../../screens/GetStarted";
import PaceCalculator from "../../utils/paceCalculator";
import Player from "../../screens/player/player";

const SearchTempo = async ({ updateDesiredTracks, userInfo, calculatedTempos }) => {
    const { genre } = userInfo;
    const { minTempo, maxTempo } = calculatedTempos;

    console.log('USERINFO>>>', userInfo);

    //Bringing in the playlistUrls from the searchPlaylist function in the spotifyService.js file. Passing in the searchQuery value from the form and sending it to the function parameter.
    const playlistUrls = await searchPlayList(genre);

    //
    const playLists = await Promise.all(
      playlistUrls.map(async (url) => {
        const trackResponse = await getTrackData(url);
        return trackResponse;
      })
    );
       console.log(playLists);
    const tracks = playLists.flatMap((playlist) => {
       const trackData =  playlist.items
          .filter((item) => item.track !== null && item.track.preview_url !== null)
          .map((item) => 
          // console.log(item)
            ({
                id: item.track.id,
                name: item.track.name,
                artist: item.track.artists[0].name,
                album: item.track.album.name,
                previewUrl: item.track.preview_url,
                tempo: null,
                danceability: null,
                energy: null,
            })
          )
          return trackData;
      });
      
    console.log(tracks);

    const tempos = await Promise.all(
      tracks
      .filter((track, index) => {
        return tracks.indexOf(track) === index;
      })
      .map(async (track) => {
        const audioFeatures = await getAudioFeatures(track.id, minTempo, maxTempo);
      
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
      
      console.log('tracks with data', tracksWithData);

      const filteredTempos = tracksWithData.filter(
        (track) => track.tempo >= minTempo && track.tempo <= maxTempo
      );
      const desiredTracks = [...new Set(filteredTempos.map(track => track.id))].map(id => {
        return filteredTempos.find(track => track.id === id);
      });
      
    console.log("DSIRED_TEMPS>>>", desiredTracks);
      updateDesiredTracks(desiredTracks);

};

export default SearchTempo;
