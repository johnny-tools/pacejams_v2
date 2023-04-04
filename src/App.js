// import './style.scss';
import SearchTempo from './features/searchapi/SearchTempo';
import Header from './components/Header';
import GenreList from './features/display/GenreList';
import GetStarted from './pages/GetStarted'
import BackgroundVid from './components/BackgroundVid'
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <BackgroundVid /> */}
      <Header />
      {/* <GetStarted /> */}
      <SearchTempo />
      {/* <SearchForm /> */}
      {/* <GenreList /> */}
    </div>
  );
}

export default App;
