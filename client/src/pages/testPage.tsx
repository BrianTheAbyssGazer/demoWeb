
function testPage() {
    return (
        <div>
            <div className="gap-50"></div>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title">Login</h2>
                                <form action="#" method="post">
                                    <div className="mb-3">
                                        <label className="form-label">Username:</label>
                                        <input type="text" className="form-control" id="loginUsername" name="loginUsername" required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password:</label>
                                        <input type="password" className="form-control" id="loginPassword" name="loginPassword" required />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mt-4 mt-md-0">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title">Register</h2>
                                <form action="#" method="post">
                                    <div className="mb-3">
                                        <label className="form-label">Username:</label>
                                        <input type="text" className="form-control" id="registerUsername" name="registerUsername" required />
                                    </div>
                                    <div className="mb-3">
                                        <label  className="form-label">Email:</label>
                                        <input type="email" className="form-control" id="registerEmail" name="registerEmail" required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password:</label>
                                        <input type="password" className="form-control" id="registerPassword" name="registerPassword" required />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default testPage;