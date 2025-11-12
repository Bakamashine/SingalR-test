const login = document.querySelector("#login");
const email = login.querySelector("#email");
const password =  login.querySelector("#password");

login.addEventListener("submit", async (event) => {
	event.preventDefault();
	console.log("Authorizate");

	const result = await fetch(URL.concat("/Login"), {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			email: email.value,
			password: password.value
		})
	});

	if (result.status == 404) {
		await result.json();

		alert(`Login failed!\n${await result.error}`)
	}
	let token = await result.text();
	console.log("token: ", token);
	localStorage.setItem("token", token);
	window.location.reload()
})
	
