import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Main } from './Components/Main';
import ZenBubbleGame from './Pages/Bubble';
import PuzzleGameSection from './Pages/Puzzle';



function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/bubble" element={<ZenBubbleGame />} />
      <Route path="/puzzle" element={<PuzzleGameSection />} />

    </Routes>
   </Router>
  );
}

export default App;
