import { useNavigate } from "react-router-dom";
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

function ProjectsCarousels() {
    const navigate = useNavigate();
    return (
        <div id="projects" className="carousel slide d-flex justify-content-center">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#projects" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#projects" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#projects" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner backgroundColor d-flex">
                <div className="carousel-item" data-bs-interval="2000">
                    <div className="carousel-caption d-flex flex-column justify-content-center h-100"
                        onClick={() => navigate("NeuronReconstruction")}>
                        <h3>Neuron reconstruction project</h3>
                        <p className="h6 overflow-auto h-50">Extract morphorlogy from a the picture of a real neuron,
                            assign electro-physiological properties and run computational simulations.</p>
                    </div>
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                    <div className="carousel-caption d-flex flex-column justify-content-center h-100"
                        onClick={() => navigate("CyberAscension")}>
                        <h3>The only way to survive</h3>
                        <p className="h6 overflow-auto h-50">Human race is evolved from the surface of earth. That's why we are only
                            adapted to such a small environment. But the environment is always changing. Cybernetic ascension is not
                            only beneficial to development, but also neccessary to avoid extinction.</p>
                    </div>
                </div>
                <div className="carousel-item active" data-bs-interval="2000">
                    <div className="carousel-caption d-flex flex-column justify-content-center h-100"
                        onClick={() => navigate("SpiritualTranscendece")}>
                        <h3>Prepare for cybernetic ascension</h3>
                        <p className="h6 overflow-auto h-50">
                            Are you ready to face death and be reborn? Do you worry about the lose of humanity after cybernetic ascension?
                            Learn the essence of self-consciousness and find your purpose in the universe. Make spiritual transcendence
                            before your physical transformation.
                        </p>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#projects" data-bs-slide="prev" tabIndex={-1}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#projects" data-bs-slide="next" tabIndex={-1}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default ProjectsCarousels;