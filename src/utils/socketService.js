import { io } from "socket.io-client";

const SOCKET_URL = 'https://realtime.wonbybid.com';
// const SOCKET_URL = 'http://192.168.0.104:7000';

class WSService {
  initialzeSocket = async (userId) => {
    // const authContext = useContext(AuthContext)
    console.log(userId)
    try {
      this.socket = io(SOCKET_URL, {
        transports: ['websocket', 'polling'],
        query: {
          userId: userId
        }
      })
      // console.log('initialzing socket', this.socket);TTIJ0NLR64G95LZGXAEQ
      // console.log('initialzing socket');
      this.socket.on("connect", (data) => {
        console.log("=== socket connectd ===");
        // console.log("data: ", data);
      })
      this.socket.on("disconnect", (data) => {
        console.log("=== socket disconnected ===");
      })
      this.socket.on("error", (data) => {
        console.log("=== socket error ===");
      })
    } catch (error) {
      console.log("=== socket is not initialized ===", error);
    }
  }
  on(event, data = {}) {
    this.socket.on(event, data)
  }
  emit(event, cb) {
    this.socket.emit(event, cb)
  }

  removeListener(listName) {
    this.socket.removeListener(listName)
  }
}

const socketServices = new WSService();
export default socketServices;