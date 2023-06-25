import { useState } from 'react';
import { Container, Col, Row, Button } from 'reactstrap';
import { motion } from 'framer-motion';
import { Formik, Form } from 'formik';
import SearchTempo from '../features/searchapi/SearchTempoNew';
import   { PaceCalculator }   from '../utils/paceCalculator'

const genres = [
  {
    id: 1,
    text: 'Pop',
    boxcolor: {
      backgroundColor: '#947FFE',
    },
    value: 'pop',
  },
  {
    id: 2,
    text: 'Hip-Hop',
    boxcolor: {
      backgroundColor: '#7AF4E0',
    },
    value: 'hiphop',
  },
  {
    id: 3,
    text: 'Rock',
    boxcolor: {
      backgroundColor: '#7DE774',
    },
    value: 'rock',
  },
  {
    id: 4,
    text: 'Dance',
    boxcolor: {
      backgroundColor: '#ED8A77',
    },
    value: 'dance',
  },
  {
    id: 5,
    text: 'Country',
    boxcolor: {
      backgroundColor: '#F3F37A',
    },
    value: 'country',
  },
  {
    id: 6,
    text: '80s Hits',
    boxcolor: {
      backgroundColor: '#D4A86A',
    },
    value: '80s Hits',
  },
  {
    id: 7,
    text: '90s Hits',
    boxcolor: {
      backgroundColor: '#E874AE',
    },
    value: '90s Hits',
  },
  {
    id: 8,
    text: 'Punk',
    boxcolor: {
      backgroundColor: '#8A77ED',
    },
    value: 'punk',
  },
  {
    id: 9,
    text: 'Summer',
    boxcolor: {
      backgroundColor: '#76EBD8',
    },
    value: 'summer',
  },
  {
    id: 10,
    text: 'Workout',
    boxcolor: {
      backgroundColor: '#7EE874',
    },
    value: 'workout',
  },
];

const GenreList = (props) => {

    const handleSubmit = (genreValue) => {
        // console.log(genreValue);
        props.handleSubmit(genreValue);
      };

  return (
    <Container className='content' fluid>
       <Row>
        {genres.map((genre, index) => (
          <Col className='mx-2 my-3'>
            <motion.button
              className='boxstyle shadow-lg'
              style={genre.boxcolor}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              type='submit'
              name={genre.text}
              onClick={() => handleSubmit(genre.value)}
            >
              <div className='d-flex justify-content-center px-1 py-1'>
                <h2 className='text-wrap'>{genre.text}</h2>
              </div>
            </motion.button>
          </Col> 
        ))}
        </Row>
    </Container>
  );
};

export default GenreList;