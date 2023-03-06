// import './style.scss';
import './App.css';
import SearchTempo from './features/searchapi/SearchTempo';
import Header from './components/Header';
import GenreList from './features/display/GenreList';


function App() {
  return (
    <div className="App">
      <Header />
      <SearchTempo />
      {/* <GenreList /> */}
    </div>
  );
}

export default App;
