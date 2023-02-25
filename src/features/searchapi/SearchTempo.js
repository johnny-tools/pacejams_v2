import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
import { useState, useEffect, useRef } from "react";

const CLIENT_ID = "cc9134429c674743814f08bcbf5173ad";
const CLIENT_SECRET = "3b572c5185da443583ca0e22dbcb8740";

const SearchTempo = () => {
  const [accessToken, setAccessToken] = useState("");
  const [playlistURLs, setplaylistURLs] = useState("");
  // const [trackIDs, setTrackIDs] = useState([]);

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
  async function search() {
    console.log("Search for " + searchInput.current);

    // Get request using search to get the Artist ID
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    const trackIDs = await fetch(
      "https://api.spotify.com/v1/search?q=" +
        searchInput.current +
        "&type=playlist",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const playlistURLs = data.playlists.items.map((x) => x.tracks.href);
        console.log(playlistURLs);
        const playlistTracks = playlistURLs.map((url) =>
          fetch(url, searchParameters)
            .then((response) => response.json())
            .then((data) => {
              data.items.map((item) => {
                const trackInfo = {
                  name: item.track.name,
                  id: item.track.id,
                };
                console.log(trackInfo);
                // let allTrackInfo = [];
                // allTrackInfo = {...allTrackInfo,trackInfo};

                // console.log(allTrackInfo);
              });
            })
        );
        return;
      });
  }

  const searchInput = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    search();
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="searchSongs"></Label>
              <Input
                type="search"
                name="searchSongs"
                id="searchSongs"
                placeholder='Type "workout" to search top workout playlists'
                ref={searchInput}
              />
            </FormGroup>
            <Button onClick={search} color="primary">
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {/* <Container>
            <Row className="mx-2 row row-cols-4">
            {tracks.map( (track, i)=> {
              return (
                <Card>
                <Card.Img src={track.images[0].url} />
                <Card.Body>
                  <Card.Title>{track.name}</Card.Title>
                </Card.Body>
              </Card>
              )
            })}
              
            </Row>
          </Container> */}
    </Container>
  );
};

export default SearchTempo;
