import React, { useState, useEffect } from "react";
import { Redirect, useParams, Link } from "react-router-dom";
import { getAnEmployee, isAuthenticated, updateEmployee } from "./ApiCalls";

const UpdateEmployee = () => {
	// const [employee, setEmployee] = useState({});
	var x = {};
	const { empId } = useParams();
	const [res, setRes] = useState("");
	useEffect(async () => {
		if (localStorage.getItem("mbjwt")) {
			const { user, token } = JSON.parse(localStorage.getItem("mbjwt"));
			const response = await getAnEmployee(empId, user._id, token);
			// console.log(response);
			// setEmployee(() => {
			// 	const obj = response.employee;
			// 	return obj;
			// });
			x.firstname = response.employee.firstname;
			x.lastname = response.employee.lastname;
			x.address = response.employee.address;
			x.dob = response.employee.dob;
			x.mobile = response.employee.mobile;
			x.city = response.employee.city;
		}
	});
	const [empData, setEmpData] = useState(x);

	const inputChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setEmpData((preValue) => {
			return { ...preValue, [name]: value };
		});
	};
	const updateAnEmployee = async (e) => {
		e.preventDefault();
		if (localStorage.getItem("mbjwt")) {
			const { user, token } = JSON.parse(localStorage.getItem("mbjwt"));
			const response = await updateEmployee(empId, user._id, token, empData);
			console.log(response);
			if (response.status === "ok") {
				setRes(response.message);
			}
		}
	};
	return (
		<>
			{!isAuthenticated() && <Redirect to="/login" />}
			<div>
				<h2>Update Employee</h2>
				<form id="emp-update-form" onSubmit={updateAnEmployee}>
					<div>
						<lable>Enter first name</lable>
						<input
							type="text"
							name="firstname"
							value={empData.firstname}
							onChange={inputChange}
						/>
					</div>
					<div>
						<lable>Enter last name </lable>
						<input
							onChange={inputChange}
							type="text"
							name="lastname"
							value={empData.lastname}
						/>
					</div>
					<div>
						<lable>Enter Address</lable>
						<textarea
							onChange={inputChange}
							name="address"
							value={empData.address}
						></textarea>
					</div>
					<div>
						<lable>Enter DOB </lable>
						<input
							onChange={inputChange}
							type="date"
							name="dob"
							value={empData.dob}
						/>
					</div>
					<div>
						<lable>Enter Mobile </lable>
						<input
							onChange={inputChange}
							type="number"
							name="mobile"
							value={empData.mobile}
						/>
					</div>
					<div>
						<lable>Enter City </lable>
						<input
							onChange={inputChange}
							type="text"
							name="city"
							value={empData.city}
						/>
					</div>
					<button type="submit">Update Employee</button>{" "}
					<Link to="/dashboard">Go To Dashboard</Link>
					<p style={{ color: "green" }}>{res != "" ? res : ""}</p>
				</form>
			</div>
		</>
	);
};
export default UpdateEmployee;
