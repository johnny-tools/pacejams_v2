import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Button,
  Input,
  Col,
  Container,
  Row,
} from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import SearchTempo from '../features/searchapi/SearchTempoNew';


const GenreList = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [guideText, setguideText] = useState("Let's Get Started");
  // const [userInfo, setUserInfo] = useState({});

  // const currentUser = useSelector(selectCurrentUser)

  const handleSubmitForm = (values) => {
    props.handleSubmit(values); // Pass userInfo to the handleSubmit function
    setIsOpen(false);
    setguideText('You Rock!');
  };

  const handleFirstClick = () => {
    setIsOpen(true);
    setguideText('Set Your Pace');
  };

  return (
    <Container className='content' fluid>
      <div className='content'>
        <AnimatePresence>
          <motion.div
            transition={{ layout: { duration: 1, type: 'spring' } }}
            layout
            onClick={() => handleFirstClick()}
            className='card'
          >
            <motion.h2 layout='position'>{guideText}</motion.h2>

            {isOpen && (
              <motion.div className='expand'>
                <motion.div className='userInfoForm'>
                  <Formik
                    initialValues={{
                      firstName: '',
                      lastName: '',
                      gender: '',
                      mpm: '',
                      height: '',
                      genre: ''
                    }}
                    onSubmit={handleSubmitForm}
                  >
                    <Form>
                      <FormGroup row>
                        <Label htmlFor='gender' style={{ color: 'white' }}>
                          Gender
                        </Label>
                        <Field
                          as='select'
                          name='gender'
                          className='form-control'
                        >
                          <option selected>Choose one</option>
                          <option>Male</option>
                          <option>Female</option>
                        </Field>
                        <ErrorMessage name='gender'>
                          {(msg) => <p className='text-danger'>{msg}</p>}
                        </ErrorMessage>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor='mpm' style={{ color: 'white' }}>
                          Minutes / Mile
                        </Label>
                        <Field as='select' name='mpm' className='form-control'>
                          <option selected>
                            How many minutes would you like to run per mile?
                          </option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                          <option>10</option>
                          <option>11</option>
                          <option>12</option>
                          <option>13</option>
                          <option>14</option>
                          <option>15</option>
                        </Field>
                        <ErrorMessage name='mpm'>
                          {(msg) => <p className='text-danger'>{msg}</p>}
                        </ErrorMessage>
                      </FormGroup>
                      <FormGroup row>
                        <Label for='height' style={{ color: 'white' }}>
                          Height
                        </Label>
                        <Field
                          type='number'
                          name='height'
                          step='0.1'
                          placeholder='ex: 6.1'
                          className='form-control'
                        />
                        <ErrorMessage name='height'>
                          {(msg) => <p className='text-danger'>{msg}</p>}
                        </ErrorMessage>
                      </FormGroup>
                      <FormGroup row>
                        <Label htmlFor='genre' style={{ color: 'white' }}>
                          Genre
                        </Label>
                        <Field as='select' name='genre' className='form-control'>
                          <option selected>
                          </option>
                          <option>Pop</option>
                          <option>Workout</option>
                          <option>Dance</option>
                          <option>Hip Hop</option>
                          <option>Country</option>
                          <option>EDM</option>
                          <option>Alternative</option>
                          <option>Rock</option>
                          <option>Rap</option>
                          <option>Party</option>
                        </Field>
                        <ErrorMessage name='genre'>
                          {(msg) => <p className='text-danger'>{msg}</p>}
                        </ErrorMessage>
                      </FormGroup>
                      <Button type='submit' color='warning'>
                        Let's Go!
                      </Button>
                    </Form>
                  </Formik>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Container>
  );
};

export default GenreList;