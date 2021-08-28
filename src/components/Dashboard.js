import React, { useState, useEffect } from "react";
import { useHistory, Redirect, Link } from "react-router-dom";

import {
	createEmployee,
	deleteEmployee,
	fetchEmployee,
	isAuthenticated,
	signout,
} from "./ApiCalls";

const Dashboard = () => {
	// state to toggle modal
	const [modal, setModal] = useState(false);
	// object state that holds employess input data
	const [employeeData, setEmployeeData] = useState({
		firstname: "",
		lastname: "",
		address: "",
		dob: "",
		mobile: "",
		city: "",
	});
	// state to holds validation error of employee registration
	const [validationError, setValidationError] = useState([]);
	// state that contains employees that are previously exist in db;
	const [employeeFromDb, setEmployeeFromDb] = useState([]);
	// initializing useHostory hook
	const history = useHistory();
	// signout method for manager
	const signoutManager = () => {
		// calling the signout method which calling the signout API
		signout();
		// redirect to login after successfully signout
		history.push("/login");
	};

	// function that collects all employees that that are existed in db;
	const getEmployeeData = async () => {
		// checking if token and user info available in localstorage
		if (localStorage.getItem("mbjwt")) {
			// destructure user and token from localstorage
			const { user, token } = JSON.parse(localStorage.getItem("mbjwt"));
			// calling the Fectch employee API
			const response = await fetchEmployee(user._id, token);

			setEmployeeFromDb(() => {
				return response.employee;
			});
		}
	};
	// useEffect hook to call the getEmployeeData function which calling the fetchEmployee API
	useEffect(() => {
		getEmployeeData();
	}, [employeeFromDb]);
	// function that handles the onchange event of all the input tag of add employee form
	const inputChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setEmployeeData((preVal) => {
			return {
				...preVal,
				[name]: value,
			};
		});
	};
	// function to call the addEmployee APi
	const addEmployee = async (e) => {
		e.preventDefault();
		// checking the token and user info exist in localstorage
		if (localStorage.getItem("mbjwt")) {
			// destructure the token and user from localstorage
			const { user, token } = JSON.parse(localStorage.getItem("mbjwt"));
			// calling the create Employee Api
			const response = await createEmployee(user._id, token, employeeData);
			if (response.status === "validation error") {
				setValidationError(() => {
					return response.error;
				});
			} else {
				setValidationError(() => {
					return [];
				});
			}
			if (response.status === "ok") {
				setModal(false);
				setEmployeeData(() => {
					return {
						firstname: "",
						lastname: "",
						address: "",
						dob: "",
						mobile: "",
						city: "",
					};
				});
			}
		}
	};

	// function to show error
	const ShowValidationError = () => {
		return (
			<>
				{validationError.length > 0 &&
					validationError.map((error, ind) => {
						return (
							<>
								<p style={{ color: "red" }}>{error}</p>
							</>
						);
					})}
			</>
		);
	};
	// function to toogle modal state value
	const toggleModal = () => {
		setModal(() => {
			return true;
		});
	};
	// function to delete Employee
	const employeeDelete = async (empId) => {
		let check = window.confirm("Are you sure to delete");
		if (check) {
			// checking the token and user info exist in localstorage
			if (localStorage.getItem("mbjwt")) {
				// destructure the token and user from localstorage
				const { user, token } = JSON.parse(localStorage.getItem("mbjwt"));
				// calling the delete Employee API
				await deleteEmployee(user._id, token, empId);
			}
		}
	};
	// function to close modal
	const closeModal = () => {
		setModal(false);
	};

	return (
		<>
			{!isAuthenticated() && <Redirect to="/login" />}
			<div className="dashboard-menu">
				<button className="btn btn-danger" onClick={signoutManager}>
					Logout
				</button>
				<button className="btn btn-success " onClick={toggleModal}>
					Add Employee
				</button>
			</div>
			{modal && (
				<div id="modal">
					<div id="modal-form">
						<div id="closeBtn" onClick={closeModal}>
							X
						</div>
						<h2>Employee Create Form</h2>
						<form id="emp-update-form" onSubmit={addEmployee}>
							<div>
								<lable>Enter first name</lable>
								<input
									type="text"
									name="firstname"
									value={employeeData.firstname}
									onChange={inputChange}
								/>
							</div>
							<div>
								<lable>Enter last name </lable>
								<input
									onChange={inputChange}
									type="text"
									name="lastname"
									value={employeeData.lastname}
								/>
							</div>
							<div>
								<lable>Enter Address</lable>
								<textarea
									onChange={inputChange}
									name="address"
									value={employeeData.address}
								></textarea>
							</div>
							<div>
								<lable>Enter DOB </lable>
								<input
									onChange={inputChange}
									type="date"
									name="dob"
									value={employeeData.dob}
								/>
							</div>
							<div>
								<lable>Enter Mobile </lable>
								<input
									onChange={inputChange}
									type="number"
									name="mobile"
									value={employeeData.mobile}
								/>
							</div>
							<div>
								<lable>Enter City </lable>
								<input
									onChange={inputChange}
									type="text"
									name="city"
									value={employeeData.city}
								/>
							</div>
							<button type="submit">Create</button>
							<ShowValidationError />
						</form>
					</div>
				</div>
			)}

			<table className="table">
				<thead className="thead-dark">
					<tr>
						<th scope="col">Employee ID</th>
						<th scope="col">First Name</th>
						<th scope="col">Last Name</th>
						<th scope="col">Address</th>
						<th scope="col">DOB</th>
						<th scope="col">Mobile</th>
						<th scope="col">City</th>
						<th>opperations</th>
					</tr>
				</thead>
				<tbody>
					{employeeFromDb.length > 0 &&
						employeeFromDb.map((emp, index) => {
							return (
								<tr>
									<td>{emp.empId}</td>
									<td>{emp.firstname}</td>
									<td>{emp.lastname}</td>
									<td>{emp.address}</td>
									<td>{emp.dob}</td>
									<td>{emp.mobile}</td>
									<td>{emp.city}</td>
									<td>
										<button
											id="deleteBtn"
											onClick={() => {
												employeeDelete(emp._id);
											}}
										>
											Delete
										</button>

										<Link
											exact
											to={{
												pathname: `/dashboard/employee/update/${emp._id}`,
											}}
										>
											update
										</Link>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</>
	);
};
export default Dashboard;
