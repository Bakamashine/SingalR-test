const connection = new signalR.HubConnectionBuilder()
    .withUrl(URL.concat("/chat"))
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
	console.log("Receive message: ", message)
	let context = `
	<div>${user}: ${message}</div>
	`
	messages.innerHTML += context;
});

start()

const button = document.querySelector("#send");
const message_input = document.querySelector("#message");
// console.log("button: ", button);
button.addEventListener('click', () => {
	console.log("sended!")
	let message = message_input.value;
	console.log("message: ", message)
	user = JSON.parse(localStorage.getItem("user"));

	connection.invoke("SendMessage", user.name, message)
});