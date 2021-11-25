import 'antd/dist/antd.css';

import { Route, Routes } from 'react-router-dom';

import CoinsList from './components/CoinsList';
import CoinDetails from './components/CoinDetails';

const App = () => (
  <Routes>
    <Route path="/" element={<CoinsList />} />
    <Route path="/:coinId/" element={<CoinDetails />} />
  </Routes>
);

export default App;
