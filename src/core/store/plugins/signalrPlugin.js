import { equals } from 'ramda';
import SignalR from '../../helpers/signalrConnection';

export default function createSignalRPlugin() {
  const connection = SignalR.getConnection();

  return (store) => {
    connection.start();

    let lastSessionObj = {};

    connection.on('notification-changed', (data) => {
      const sessionChangeObj = JSON.parse(data);

      if (!equals(lastSessionObj, sessionChangeObj)) {
        lastSessionObj = sessionChangeObj;

        store.dispatch('notification/updateSessions', sessionChangeObj);
      }
    });

    connection.on('monitoring-signalvalue', (signal) => {
      store.dispatch('markers/updateSignalValue', JSON.parse(signal));
    });
  };
}
