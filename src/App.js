
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './Layout/Layout';
import Home from './pages/Home';
import { useState } from 'react';
import Buy from './pages/Buy';
import Matrix from './pages/Matrix';
import Status from './pages/Status';
import Team from './pages/Team';
import History from './pages/History';
import Profile from './pages/Profile';

import LoginScreen from './pages/LoginScreen';
import { useDispatch, useSelector } from 'react-redux';
import Plan from './pages/Plan';
import Admin from './pages/Admin';
import Partner from './pages/Partner';
import { useEffect } from 'react';
import { getPartner } from './redux/partnerAction';
import InvestmentPlan from './pages/admin/InvestmentPlan';
import UserBalance from './pages/admin/UserBalance';

function App() {
  const [mode, setMode] = useState(true);
  const {connected} = useSelector(state => state.web3)
  const dispatch = useDispatch();

  const toggleMode = () => {
    setMode(!mode);
  }

  useEffect(() => {
    if(connected){
         dispatch(getPartner())
    }
  }, [connected])


  return (

    <Router>
        <Routes>
          {connected ? 
                    <Route path="/" element={<Layout mode={mode} toggleMode={toggleMode} />}>
                    <Route index element={<Home mode={mode} />} />
                    <Route path="/buy" element={<Buy mode={mode}/>} />
                    <Route path="/matrix" element={<Matrix mode={mode} />} />
                    <Route path="/reward" element={<Status mode={mode} />} />
                    <Route path="/plans" element={<Plan mode={mode}/>} />
                    <Route path="/team" element={<Team mode={mode} />} />
                    <Route path="/history" element={<History  mode={mode}/>} />
                    <Route path="/profile" element={<Profile mode={mode} />} />
                    <Route path="/admin" element={<Admin mode={mode}/>} >
                      <Route path="/admin/investors" element={<InvestmentPlan/>} />
                      <Route path="/admin/balances" element={<UserBalance/>} />
                      </Route>
                    <Route path="/partner" element={<Partner mode={mode}/>} />
                  </Route>
          :
          <>
          <Route path="/:address" element={<LoginScreen mode={mode} />} />
          <Route path="*" element={<LoginScreen mode={mode} />} />
          </>
          }

        </Routes>
    </Router>

  )
}

export default App
