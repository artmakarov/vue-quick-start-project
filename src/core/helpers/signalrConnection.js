import * as signalR from '@aspnet/signalr';
import { BASE_URL } from '../consts';

const SignalR = {
  createConnection() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(BASE_URL)
      .build();

    this.connection.onclose(() => {
      // console.log(`<h6>Debug</h6> Connection closed with error: ${e} : Disconnected`);
    });
  },

  getConnection() {
    if (!this.connection) this.createConnection();

    return this.connection;
  },
};

export default SignalR;
