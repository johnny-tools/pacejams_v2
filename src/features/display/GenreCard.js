import { Card, CardBody, CardText, Button } from 'reactstrap';


const colors = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info'
];

const GenreCard = (props) => {
  
    return ( 
      colors.map(color => {
        console.log(colors.indexOf(color));
        console.log(colors.length);
          return ( <Button size='lg' color={color}> 
          { props.msg }
        </Button>
        )
      }
     )
    )
 
}
 
export default GenreCard;