import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigationbar from './components/Navigationbar';
import Home from './pages/Home'; // Import the Home component
import RegistrationSignIn from './pages/RegistrationSignIn';
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './AuthContext'; // Import the AuthProvider
import './App.css';
import BottomPlayer from './components/BottomPlayer';
import NeuronReconstruction from './pages/NeuronReconstruction';
import CyberAscension from './pages/CyberAscension';
import SpiritualTranscendece from './pages/SpiritualTranscendece';
import ErrorPage from './pages/ErrorPage';
import TestPage from './pages/testPage';

const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <AuthProvider>
                    <Navigationbar />
                    <Container className="m-0 p-0" fluid>
                        <Routes>
                            <Route path="/" element={<Home />} /> {/* Use exact to match the root path */}
                            <Route path="RegistrationSignIn" element={<RegistrationSignIn />} />
                            <Route path="NeuronReconstruction" element={<NeuronReconstruction />} />
                            <Route path="SpiritualTranscendece" element={<SpiritualTranscendece />} />
                            <Route path="CyberAscension" element={<CyberAscension />} />
                            <Route path="testPage" element={<TestPage />} />
                            <Route path='*' element={<ErrorPage />} />
                        </Routes>
                        <BottomPlayer />
                    </Container>
                </AuthProvider>
            </Router>
        </div>
    );
};

export default App;