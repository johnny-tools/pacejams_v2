import { useState } from 'react';
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
import {PaceCalculator} from '../utils/paceCalculator';

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
    });
    // console.log(userInfo);
    setIsOpen(false);
    setguideText('Now Pick Your Jams');
    PaceCalculator(userInfo);
  };

  const handleFirstClick = () => {
    setIsOpen(true);
    setguideText('Set Your Pace');
  };

  return (
    <Container className='screen-container'  fluid>
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
                    }}
                    onSubmit={handleSubmit}
                    
                  >
                    <Form>
                      <FormGroup row>
                        <Label htmlFor='gender'>Gender</Label>
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
                        <Label htmlFor='mpm'>Minutes / Mile</Label>
                        <Field as='select' name='mpm' className='form-control'>
                          <option selected>How many minutes would you like to run per mile?</option>
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
                        <Label for='height'>Height</Label>
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

export default GetStarted;
