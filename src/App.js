import { Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import Labyrinth from './pages/Labyrinth/Labyrinth';
import Home from './pages/Home/Home';
import NoMatch from './pages/NoMatch';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/labyrinth" element={<Labyrinth />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return <Outlet />;
}
