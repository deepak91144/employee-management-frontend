import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import managerRegister, { authenticate, isAuthenticated } from "./ApiCalls";
import { useHistory } from "react-router-dom";

const Register = () => {
	const history = useHistory();
	// object state to hold all the input values
	const [data, setData] = useState({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		address: "",
		dob: "",
		company: "",
	});
	// state to hold the error response
	const [responseError, setResponseError] = useState([]);
	// state to hold the error if the email previously exist in db
	const [emailExist, setEmailExist] = useState("");
	// funtion to handle the input event of all input
	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setData((preVal) => {
			return {
				...preVal,
				[name]: value,
			};
		});
	};

	// function runs when registration form submited
	const registerManager = async (e) => {
		e.preventDefault();
		// calling the function which calls the ragister API and passing employee details
		const response = await managerRegister(data);
		// working with various condition of response
		if (response.status == "validation error") {
			setResponseError(() => {
				return [response.error];
			});
			setEmailExist("");
		}
		if (response.status == "email exist") {
			setEmailExist(response.message);
			setResponseError(() => {
				return [];
			});
		}
		// if employee regisred successfully
		if (response.status == "ok") {
			response.status = undefined;
			response.message = undefined;
			// calling the authenticate function with store the token and user info into local storage
			authenticate(response);
			// redirect the the dashboard page once employee successfully signed up
			history.push("/dashboard");
		}
	};
	const ShowError = () => {
		// scrolling to the top of page to show errors
		window.scrollTo(0, 0);
		// convert array to string to print on screes
		const ans = responseError.join(",");
		return <>{ans}</>;
	};

	return (
		<>
			{isAuthenticated() && <Redirect to="/dashboard" />}

			<div className="container h-100">
				<div className="row d-flex justify-content-center align-items-center h-100">
					<div className="col-lg-12 col-xl-11">
						<div className="card text-black">
							<div className="card-body p-md-5">
								<div className="row justify-content-center">
									<div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
										<p style={{ color: "red" }}>
											{responseError.length > 0 ? <ShowError /> : emailExist}
										</p>
										<h3 id="registerHeading">Manager Register Form</h3>
										<form className="mx-1 mx-md-4" onSubmit={registerManager}>
											<div className="d-flex flex-row align-items-center mb-4">
												<i className="fas fa-user fa-lg me-3 fa-fw"></i>

												<div className="form-outline flex-fill mb-0">
													<label className="form-label">Enter First Name</label>
													<input
														type="text"
														className="form-control"
														name="firstname"
														value={data.firstname}
														onChange={handleChange}
													/>
												</div>
											</div>
											<div className="d-flex flex-row align-items-center mb-4">
												<i className="fas fa-user fa-lg me-3 fa-fw"></i>

												<div className="form-outline flex-fill mb-0">
													<label className="form-label">Enter Last Name</label>
													<input
														type="text"
														className="form-control"
														name="lastname"
														value={data.lastname}
														onChange={handleChange}
													/>
												</div>
											</div>

											<div className="d-flex flex-row align-items-center mb-4">
												<i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
												<div className="form-outline flex-fill mb-0">
													<label className="form-label">Your Email</label>
													<input
														type="email"
														className="form-control"
														name="email"
														value={data.email}
														onChange={handleChange}
													/>
												</div>
											</div>

											<div className="d-flex flex-row align-items-center mb-4">
												<i className="fas fa-lock fa-lg me-3 fa-fw"></i>
												<div className="form-outline flex-fill mb-0">
													<label className="form-label">Password</label>
													<input
														type="password"
														className="form-control"
														name="password"
														value={data.password}
														onChange={handleChange}
													/>
												</div>
											</div>

											<div className="d-flex flex-row align-items-center mb-4">
												<i className="fas fa-map-marker fa-lg me-3 fa-fw"></i>
												<div className="form-outline flex-fill mb-0">
													<label className="form-label">Enter Address</label>
													<textarea
														className="form-control"
														name="address"
														value={data.address}
														onChange={handleChange}
													></textarea>
												</div>
											</div>
											<div className="d-flex flex-row align-items-center mb-4">
												<i className="fas fa-birthday-cake fa-lg me-3 fa-fw"></i>
												<div className="form-outline flex-fill mb-0">
													<label className="form-label">
														Chose Your Date Of Birth
													</label>
													<input
														type="date"
														className="form-control"
														name="dob"
														value={data.dob}
														onChange={handleChange}
													/>
												</div>
											</div>
											<div className="d-flex flex-row align-items-center mb-4">
												<i className="fas fa-building fa-lg me-3 fa-fw"></i>
												<div className="form-outline flex-fill mb-0">
													<label className="form-label">
														Enter Company Name
													</label>

													<input
														type="text"
														className="form-control"
														name="company"
														value={data.company}
														onChange={handleChange}
													/>
												</div>
											</div>

											<div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
												<button
													type="submit"
													className="btn btn-primary btn-lg"
												>
													Register
												</button>
												<div id="loginHere">
													<Link to="/login"> Login Here</Link>
												</div>
											</div>
										</form>
									</div>
									<div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Register;
