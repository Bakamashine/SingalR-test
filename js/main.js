const connection = new signalR.HubConnectionBuilder()
    .withUrl(URL.concat("/chat"), {
    	accessTokenFactory: () => {
    		let token = localStorage.getItem("token");
    		console.log("connection token: ", token)
    		return token;
    	}
    })
    .configureLogging(signalR.LogLevel.Information)
    .build();
    console.log("connection1: ", connection)


async function start() {
	try {
		await connection.start();
		console.log("SignalR Connected");
	} catch (err) {
		console.error(err);
		setTimeout(start, 5000);
	}
}


connection.onclose(async () => {
	await start();
})

const messages = document.querySelector("#messages")
connection.on("ReceiveMessage", (user, message) => {
	console.log(`Получение сообщение от пользователя ${user}: ${message}`)
	let context = `
	<div>${user}: ${message}</div>
	`
	messages.innerHTML += context;
});

start()

const button = document.querySelector("#send");
const message_input = document.querySelector("#message");
const userId_input = document.querySelector("#userId");
// console.log("button: ", button);
button.addEventListener('click', () => {
	console.log("sended!")
	let message = message_input.value;
	let userId = userId_input.value;
	console.log("message: ", message)
	console.log("Other userId", userId)
	user = JSON.parse(localStorage.getItem("user"));

	// connection.invoke("SendMessage", user.name, message)

	fetch(URL.concat("/User/SendMessage"), {
		method: "post",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			UserId: userId,
			Text: message
		})
	})
});