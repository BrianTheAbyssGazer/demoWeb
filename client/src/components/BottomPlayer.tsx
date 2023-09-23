// src/components/Navbar.tsx
import React from 'react';
import { Navbar } from 'react-bootstrap';
import bgm from '../assets/Icarus.mp3';
import ReactAudioPlayer from 'react-audio-player';

const BottomPlayer: React.FC = () => {
    return (
        <Navbar fixed="bottom" expand="lg" className="bg-secondary text-center align-items-baseline bg-opacity-50 p-0 m-0 align-middle">
            <ReactAudioPlayer volume={0} src={bgm} autoPlay={true} />
        </Navbar>
    );
};

export default BottomPlayer;