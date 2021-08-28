const API = "http://localhost:5000/api";
const managerRegister = (employee) => {
	return fetch(`${API}/register`, {
		method: "post",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(employee),
	})
		.then((res) => {
			return res.json();
		})
		.catch((error) => {
			console.log(error);
		});
};
export const managerLogin = (loginDtails) => {
	return fetch(`${API}/login`, {
		method: "post",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(loginDtails),
	})
		.then((res) => {
			return res.json();
		})
		.catch((error) => {
			console.log(error);
		});
};
export const authenticate = (data) => {
	if (typeof window !== "undefined") {
		localStorage.setItem("mbjwt", JSON.stringify(data));
	}
};

export const signout = (next) => {
	if (typeof window !== "undefined") {
		localStorage.removeItem("mbjwt");
		// next();
		return fetch(`${API}/signout`, {
			method: "GET",
		})
			.then((response) => {
				console.log("sigout successfull");
			})
			.catch((error) => {
				console.log(error);
			});
	}
};
export const isAuthenticated = () => {
	if (typeof window == "undefined") {
		return false;
	}
	if (localStorage.getItem("mbjwt")) {
		return JSON.parse(localStorage.getItem("mbjwt"));
	} else {
		return false;
	}
};

// create new employee
export const createEmployee = (managerId, token, employeeData) => {
	return fetch(`${API}/employee/add/${managerId}`, {
		method: "post",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(employeeData),
	})
		.then((Response) => {
			return Response.json();
		})
		.catch((error) => {
			console.log(error);
		});
};

// fetch all employee
export const fetchEmployee = (managerId, token) => {
	return fetch(`${API}/employee/${managerId}`, {
		method: "GET",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => {
			return res.json();
		})
		.catch((error) => {
			console.log(error);
		});
};

export const deleteEmployee = (managerId, token, employeeId) => {
	return fetch(`${API}/employee/delete/${employeeId}/${managerId}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => {
			return res.json();
		})
		.catch((error) => {
			console.log(error);
		});
};
export const getAnEmployee = (empId, managerId, token) => {
	return fetch(`${API}/employee/${empId}/${managerId}`, {
		method: "GET",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => {
			return res.json();
		})
		.catch((error) => {
			console.log(error);
		});
};

// update employee
export const updateEmployee = (empId, managerId, token, employee) => {
	return fetch(`${API}//employee/update/${empId}/${managerId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(employee),
	})
		.then((res) => {
			return res.json();
		})
		.catch((error) => {
			console.log(error);
		});
};
export default managerRegister;
