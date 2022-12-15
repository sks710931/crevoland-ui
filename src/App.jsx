
import React from 'react';
import { Routes , Route} from 'react-router-dom';
import './App.css';
import Layout from "./layout/layout";
import { MintPage } from './pages/mint/mint';
import { StakingPage } from './pages/staking/staking';

function App() {
  return (
    <div className="App">
        <Layout >
          <Routes>
            <Route path="/" element={<MintPage />} />
            <Route path="/staking" element={<StakingPage />} />
          </Routes>
        </Layout>
    </div>
  );
}

export default App;
