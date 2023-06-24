import { useState } from 'react';
import GetStarted from '../screens/GetStarted'
import SearchTempo from '../features/searchapi/SearchTempoNew';

export const PaceCalculator = ({userInfo, updateDesiredTracks}) => {
  
  const { gender, mpm, height, genre } = userInfo;

  console.log(updateDesiredTracks)

  console.log('USERINFO>>>', userInfo);
  console.log('gender', gender);
  const maleAveStepLth = 0.415;
  const femaleAveStepLth = 0.413;
  // let feetPerMile = 5280;
  const inchesPerMile = 63360;
  // let stride = parseFloat(stride).toFixed(1);
  const maleStepLth = height * 12 * maleAveStepLth;

  const femaleStepLth = height * 12 * femaleAveStepLth;
  // console.log(maleAveStepLth);
  let stepLth = '';

  if (gender === 'Male') {
    stepLth = maleStepLth.toFixed(1);
  } else {
    stepLth = femaleStepLth.toFixed(1);
  }
  console.log('Step Lth', stepLth);

  const stepsPerMile = inchesPerMile / stepLth;
  console.log('steps per mile', stepsPerMile);

  //fastPace could possibly be used to return faster songs. I'm guessing this will not be as comfortable as someone running to half this pace.
  const fastPace = Math.round(stepsPerMile / mpm);
  // console.log(fastPace);
  const minTempo = Math.round(fastPace / 2)
  const maxTempo = minTempo + 2;
  
  const calculatedTempos = {
    minTempo: minTempo,
    maxTempo: maxTempo
  }
   
  console.log('CALCULATED TEMPOS >>>>', calculatedTempos);
  console.log(minTempo);
  
   console.log(maxTempo);
  //minTempo and maxTempo is created to provide a range of tempos so that it will return more songs for the playlist. This can be adjusted after testing.
  //minTempo and maxTempo are divided by two to provide a more comfortable tempo to run to. Runners will actualy step to the one-and-two-and-three-and-four-and beats rather than on the one-two-three-four beats.

  return (
    <SearchTempo userInfo={userInfo} calculatedTempos={calculatedTempos} updateDesiredTracks={updateDesiredTracks}/>
    //<div>pace calculator </div>
  )
};