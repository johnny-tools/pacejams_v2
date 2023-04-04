
// import Authenticate from '../../features/searchapi/Authentication';
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
import { all } from "axios";

const CLIENT_ID = "cc9134429c674743814f08bcbf5173ad";
const CLIENT_SECRET = "3b572c5185da443583ca0e22dbcb8740";

const SearchTempo = () => {
  const [accessToken, setAccessToken] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [allTrackInfo, setAllTrackInfo] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [trackName, setTrackName] = useState([]);


  useEffect(() => {
    // API Access Token
    var authParameters = {
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

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  // Search
  const search = async () => {
    console.log("Search for " + searchQuery);

    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    const trackIDs = await fetch(
      "https://api.spotify.com/v1/search?q=" +
      encodeURIComponent(searchQuery) +
        "&type=playlist&market=US",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const playlistURLs = data.playlists.items.map((x) => x.tracks.href);
        // console.log(playlistURLs);

    const allTrackInfoPromises = playlistURLs.map((url) =>
    fetch(url, searchParameters)
      .then((response) => response.json())
      .then((data) => {
        const tracks = data.items.map((item) => ({
          id: item.track.id,
          name: item.track.name,
          artist: item.track.artists[0].name,
          album: item.track.album.name,
          tempo: null,
          danceability: null,
          energy: null,
          valence: null,
        }));
        const audioFeaturesPromises = tracks.map((track) =>
          fetch(
            `https://api.spotify.com/v1/audio-features/${track.id}`,
            searchParameters
          )
            .then((response) => response.json())
            .then((data) => {
              track.tempo = data.tempo;
              track.danceability = data.danceability;
              track.energy = data.energy;
              track.valence = data.valence;
            })
        );
        Promise.all(audioFeaturesPromises).then(() => {
          setAllTrackInfo((prevTrackInfo) => [...prevTrackInfo, ...tracks]);
          
        });
        // console.log(allTrackInfo);

        // Testing tempo filtering // eventially the hard coded tempos will be replaced with variables.
        const desiredTempo = allTrackInfo.filter((track) => track.tempo >= 110 && track.tempo <= 115)
        console.log(desiredTempo);
      })
  );
  
        return;
      });
  };

  

          const handleSubmit = (e) => {
            e.preventDefault();
            search();
          };

          return (
        <Container fluid className="border">
              <Form onSubmit={handleSubmit}>
                <Row className="justify-content-md-center">
                  <Col md="6">
                    <FormGroup>
                      <Label for="searchSongs"></Label>
                      <Input
                        type="search"
                        name="searchSongs"
                        id="searchSongs"
                        placeholder='Type "workout" to search top workout playlists'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </FormGroup>
                    <Button onClick={search} color="primary">
                      Search
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          );
};

export default SearchTempo;