import { Row } from 'react-bootstrap';

function CyberAscension() {
    return (
        <div>
            <div className="gap-50"></div>
            <Row className="d-flex justify-content-center">
                <div className="ratio ratio-16x9 video-page">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/o48X3_XQ9to?si=o4iFHZYQ7dCJh2Wa"
                        title="YouTube video player" allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
                    </iframe>
                </div>
            </Row>
        </div>
    );
}

export default CyberAscension;