import { Container, Col, Row, Button } from 'reactstrap';
import { motion } from "framer-motion";
import eighties from '../../app/assets/img/Eighties.png';
import nineties from '../../app/assets/img/Nineties.png';

const messages = [
        {
            text: "Pop",
            image: {
                backgroundImage: "url(" + eighties + ")"
            },
            boxcolor: {
                backgroundColor: "#947FFE"
            }
        },
        {
            text: "Hip-Hop",
            image: {
                backgroundImage: "url(" + nineties + ")"
            },
            boxcolor: {
                backgroundColor: "#7AF4E0"
            }
        },
        {
            text: "Rock",
            image: {
                backgroundImage: "url(" + nineties + ")"
            },
            boxcolor: {
                backgroundColor: "#7DE774"
            }
        },
        {
            text: "Dance",
            image: {
                backgroundImage: "url(" + nineties + ")"
            },
            boxcolor: {
                backgroundColor: "#ED8A77"
            }
        },
        {
            text: "Country",
            image: {
                backgroundImage: "url(" + nineties + ")"
            },
            boxcolor: {
                backgroundColor: "#F3F37A"
            }
        },
        {
            text: "Party",
            image: {
                backgroundImage: "url(" + nineties + ")"
            },
            boxcolor: {
                backgroundColor: "#D4A86A"
            }
        },
        {
            text: "Alternative",
            image: {
                backgroundImage: "url(" + nineties + ")"
            },
            boxcolor: {
                backgroundColor: "#E874AE"
            }
        },
        {
            text: "Punk",
            image: {
                backgroundImage: "url(" + nineties + ")"
            },
            boxcolor: {
                backgroundColor: "#8A77ED"
            }
        },
        {
            text: "Summer",
            image: {
                backgroundImage: "url(" + nineties + ")"
            },
            boxcolor: {
                backgroundColor: "#76EBD8"
            }
        },
        {
            text: "Workout",
            image: {
                backgroundImage: "url(" + nineties + ")"
            },
            boxcolor: {
                backgroundColor: "#7EE874"
            }
        },
    
];

const GenreList = () => {

    return (
    <div className='content'>
        <Container fluid>
            <Row className= 'justify-content-center'>
                {messages.map((message, index) => (
                    <Col sm="auto" className='align-text-center mx-3 my-3'>
                            <motion.div className="boxstyle shadow-lg"
                            style={message.boxcolor} 
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                            <div className='px-4 py-3 text-wrap'>
                                <h2 className='text-wrap'>{ message.text }</h2>
                            </div>
                            </motion.div>
                    </Col>
                ))}
                
            </Row>
        </Container>
    </div>
    )
}


export default GenreList;