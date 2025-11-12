// const randomRecord = await fetch(URL.concat("/RandomRecord/Random"));
// await randomRecord.json();
// console.log(randomRecord);

// const random = document.querySelector("#random");
const userAvatar = document.querySelector("#userAvatar");
const userData = document.querySelector(".userData");
let token;

async function AuthFetch(url, method="get") {
	return await fetch(url, {
		method,
		headers: {
			"Authorization": `Bearer ${token}`,
			"Content-Type": "application/json"
		}
	})
}

async function GetRandomRecord() {
	const result =  await fetch(URL.concat("/RandomRecord/Random"));

	const randomRecord = await result.json();
	console.log("RandomRecord: ", randomRecord);
	return randomRecord
	// if (result)
	// 	return result;
}

async function GetAvatar() {
	const result = await fetch(URL.concat("/User/Avatar"), {
		headers: {
			"Authorization": `Bearer ${token}`
		}
	});
	console.log("Authorization is successfully!")
	const avatar = await result.text();
	console.log("avatar: ", avatar);
	return avatar;

	// if (result) 
	// 	return result;
}

async function GetUser() {
	let preUser = localStorage.getItem("user");
	if (!preUser) {
		const result = await AuthFetch(URL.concat("/User"));
		const user = await result.json();
		console.log("user: ", user);
		return user;
	}  else {
		// return JSON.parse(JSON.parse(JSON.parse(preUser)))
		let parse1 = JSON.parse(preUser);
		return parse1
		// console.log("parse1: ", parse1);
		// let parse2 = JSON.parse(parse1);
		// console.log("parse2: ", parse2)
		// let parse3 = JSON.parse(parse2);
		// console.log("parse3: ", parse3)
		// return parse3
	}
}

function DeleteFormLogin() {
	const exitButton = document.createElement("button");
	exitButton.textContent = "Выход"
	exitButton.id = "exit"

	register.appendChild(exitButton);


	let exit = document.querySelector("#exit")
	console.log("exit button: ", exit)
	if (exit) {
		exit.addEventListener("click", function () {
			console.log("exit")
			this.remove();
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			window.location.reload()
		})
	}
	document.querySelector("#login").remove();
}

(async () => {
token = localStorage.getItem("token");
if (token) {
	const user = await GetUser();
	console.log("user: ", user);
	if (user) {
		localStorage.setItem("user", JSON.stringify(user));
		let img = document.createElement("img");
		img.src = user.avatar;
		img.alt = "avatar"
		img.width = "100"
		img.height = '100'

		let name = document.createElement("p");
		name.textContent = `Ваше имя: ${user.name}`;

		let token_tag = document.createElement("p");
		token_tag.textContent = `Ваш токен: ${token}`;

		// userData.appendChild(img, name, token_tag)
		userData.appendChild(img);
		userData.appendChild(name);
		userData.appendChild(token_tag);

		DeleteFormLogin()
	}


	// GetRandomRecord()
	// .then(result => result.json())
	// .then(result => random.textContent = result.record)

	// GetAvatar()
	// .then(result => result.text())
	// .then(result => userAvatar.src = result);
}
})()
