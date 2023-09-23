// src/components/Home.tsx
import React from 'react';
import { Row } from 'react-bootstrap';
import ProjectsCarousels from '../components/ProjectsCarousels'

const Home: React.FC = () => {
    return (
        <div>
            <div className="gap-50"></div>
            <Row>
                <ProjectsCarousels />
            </Row>
        </div>
    );
};

export default Home;