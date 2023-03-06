// import Heart from './Heart';
import GenreCard from "./GenreCard";

const messages = [
    "80's Rock",
    "Workout",
    "90's Rock",
    "2000's Rock",
    'Dance',
    'Hip Hop',
    'Techno'
];

const GenreList = () => {
    return (
        <div className='hearts-container'>
            {messages.map((message, index) => (
                <GenreCard key={index} msg={message} />
            ))}
        </div>
    )
}

export default GenreList;