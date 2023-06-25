import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { setCurrentUser, selectCurrentUser } from './userSlice';
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
} from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Sidebar from '../components/sidebar/sidebar';
import { PaceCalculator } from '../utils/paceCalculator';
import GenreList from './GenreList';

const GetStarted = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [guideText, setguideText] = useState("Let's Get Started");
  const [userInfo, setUserInfo] = useState({});
  // const [userInfo, setUserInfo] = useState([]);
  // const currentUser = useSelector(selectCurrentUser)
  const handleSubmit = (values) => {
    setUserInfo({
      gender: values.gender,
      mpm: values.mpm,
      height: values.height,
      genre: values.genre
    });
  };

  useEffect(() => {
    if (Object.keys(userInfo).length > 0) {
      console.log(userInfo); 
      // PaceCalculator( userInfo );
    }
  }, [userInfo]);

  return (
    <Container className='screen-container' fluid>
      <div className='content'>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            gender: '',
            mpm: '',
            height: '',
          }}
          onSubmit={handleSubmit}
        >
          <Form>
            <FormGroup row>
              <Label htmlFor='gender' className='text-white'>Gender</Label>
              <Field as='select' name='gender' className='form-control'>
                <option selected>Choose one</option>
                <option>Male</option>
                <option>Female</option>
              </Field>
              <ErrorMessage name='gender'>
                {(msg) => <p className='text-danger'>{msg}</p>}
              </ErrorMessage>
            </FormGroup>
            <FormGroup row>
              <Label htmlFor='mpm' className='text-white'>Minutes / Mile</Label>
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
              <Label for='height' className='text-white'>Height</Label>
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
              <Label htmlFor='genre' className='text-white'>Select a Genre</Label>
              <Field as='select' name='genre' className='form-control'>
                <option></option>
                <option>80s Hits</option>
                <option>90s Hits</option>
                <option>2000s</option>
                <option>Rap</option>
                <option>Top Workout</option>
                <option>Dance</option>
                <option>Beach Party</option>
                <option>EDM</option>
                <option>Alternative</option>
                <option>Blue Grass</option>
                <option>Country</option>
                <option>Pop</option>
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
      </div>
      {Object.keys(userInfo).length > 0 && (
  <PaceCalculator
  userInfo={userInfo}
    // gender={userInfo.gender}
    // mpm={userInfo.mpm}
    // height={userInfo.height}
    // genre={userInfo.genre}
    handleSubmit={handleSubmit} // Pass the handleSubmit function
  />
)}
    </Container>
  );
};

export default GetStarted;
