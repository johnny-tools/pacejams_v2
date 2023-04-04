import React from 'react'
import runner from '../app/assets/runner.mp4'

const BackgroundVid = () => {

    const vidStyle = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: '55%',
        transform: 'scale(1) translate(1, 5%)',
        zIndex: '-1'
    }
    return (
        <div className="backgroundVideo">
            <video autoPlay loop muted style={vidStyle}>
                <source src={runner} type='video/mp4' />
            </video>
        </div>
  );
}
 
export default BackgroundVid;