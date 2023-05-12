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
    import axios from "axios";
    
    const CLIENT_ID = "cc9134429c674743814f08bcbf5173ad";
    const CLIENT_SECRET = "3b572c5185da443583ca0e22dbcb8740";
    
    const SearchTempo = () => {
        const [accessToken, setAccessToken] = useState("");
        const [playlistTracks, setPlaylistTracks] = useState([]);
        const [allTrackInfo, setAllTrackInfo] = useState([]);
        const [searchQuery, setSearchQuery] = useState("");
        const [trackName, setTrackName] = useState([]);
        const [newTrackInfo, setNewTrackInfo] = useState([]);
    
        useEffect(() => {
        const getAccessToken = async () => {
            try {
            const response = await axios.post(
                "https://accounts.spotify.com/api/token",
                "grant_type=client_credentials",
                {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization:
                    "Basic " +
                    btoa(CLIENT_ID + ":" + CLIENT_SECRET),
                },
                }
            );
            setAccessToken(response.data.access_token);
            } catch (error) {
            console.error(error);
            }
        };
        getAccessToken();
        }, []);

    
        const search = async () => {
                console.log("Search for " + searchQuery);
            
                const searchParameters = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken,
                },
                };
            
                try {
                        const response = await axios.get(
                            "https://api.spotify.com/v1/search",
                            {
                            ...searchParameters,
                            params: {
                                q: searchQuery,
                                type: "playlist",
                                market: "US",
                            },
                            }
                        );
                        const playlistURLs = response.data.playlists.items.map(
                            (x) => x.tracks.href
                        );

                        const allTrackInfoPromises = playlistURLs.map((url) =>
                            axios.get(url, searchParameters)
                        );
                    
                        const allTrackInfoResponses = await Promise.all(
                            allTrackInfoPromises
                        );
                    
                        const allTrackInfoData = await Promise.all(
                            allTrackInfoResponses.map((response) => response.data)
                        );
                        
                        const tracks = allTrackInfoData.flatMap((item) => {
                            // console.log(item.items);
                            item.items.map((track) => {
                                const response = axios.get(
                                    `https://api.spotify.com/v1/audio-features/${track.track.id}`,
                                    {
                                        headers: {
                                            Authorization: `Bearer ${accessToken}`,
                                        },
                                    }
                                );
                                return response.data;
                            });
                            console.log(response.data);
                        }
                        

                        //     item.items.map((track) => {
                        // const trackInfo = {
                        //         id: track.track.id,
                        //         name: track.track.name,
                        //         artist: track.track.artists[0].name,
                        //         album: track.track.album.name,
                        //         tempo: null,
                        //         danceability: null,
                        //         energy: null,
                        //         valence: null,
                        //         }
                        //         // console.log(trackInfo);
                        //         setNewTrackInfo((prevArr) => [...prevArr, trackInfo]);
                        //     })
                        );
                        
                        // console.log(tracks);

                    } catch (error) {
                        console.error(error);
                    }
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
                        <Button color="primary">
                            Search
                        </Button>
                        </Col>
                    </Row>
                    </Form>
                </Container>
                );
    };
    
    export default SearchTempo;