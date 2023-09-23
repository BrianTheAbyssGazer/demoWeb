import { Row } from 'react-bootstrap';
import transcendence from '../assets/transcendence.pdf';

function SpiritualTranscendece() {
    return (
        <Row className="d-flex justify-content-center">
            <iframe src={transcendence} height="1080"> </iframe>
        </Row>
    );
}

export default SpiritualTranscendece;