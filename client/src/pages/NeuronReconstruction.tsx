import { Row } from 'react-bootstrap';

function NeuronReconstruction() {
    return (
        <div>
            <div className="gap-50"></div>
            <Row className="d-flex justify-content-center">
                <div className="ratio ratio-16x9 video-page">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/hjQsEM5q8Mc?si=HX8mgRgmLdaLIiXC"
                        title="YouTube video player" allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" >
                    </iframe>
                </div>
            </Row>
        </div>
    );
}

export default NeuronReconstruction;