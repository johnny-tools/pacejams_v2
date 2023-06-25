import React, { useEffect, useRef, useState } from 'react';
import './player.css';
import {
  Col,
  Row,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  Container,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

export default function Player({ desiredTracks, userInfo }) {
  const [selectedTrack, setSelectedTrack] = useState('');
  const audioPlaying = useRef(null);
  console.log('USERINFO>>>', userInfo);
  const playAudio = () => {
    audioPlaying.current.play();
  };

  const pauseAudio = () => {
    audioPlaying.current.pause();
  };

  const setCurrentTrack = (track) => {
    setSelectedTrack(track.previewUrl);
    playAudio();
  };

  return (
    <Container className='screen-container' fluid>
      <Container className='content' fluid>
        <Container className='text-light' style={{ overflow: 'scroll', height: '50%' }}>
          <ListGroup numbered flush>
            {desiredTracks.map((track, index) => {
              return (
                <ListGroupItem tag='button' id={index} onClick={() => setCurrentTrack(track)}>
                  {track.name}
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Container>
        <Row>
          <Col>
            <audio id='currentTrack' controls src={selectedTrack} ref={audioPlaying}></audio>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}