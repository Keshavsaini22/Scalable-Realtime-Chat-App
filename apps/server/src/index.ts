import http from "http";
import SocketService from "./socket";

async function init(){

    const socketService = new SocketService();

    const hhtpServer = http.createServer();
    const PORT = process.env.PORT || 4000;

    socketService.io.attach(hhtpServer);

    hhtpServer.listen(PORT,()=>
    console.log(`Server started at http://localhost:${PORT}`));

    socketService.initListeners();
}

init()