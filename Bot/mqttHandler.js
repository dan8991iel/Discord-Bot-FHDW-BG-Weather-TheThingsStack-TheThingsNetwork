const mqtt = require('mqtt');



function createMqttClient(ttnAppUser, ttnAppPw, ttnAdress, ttnAppDevice, ttnSubTopic, handleMessageCallback) {
    const mqttClient = mqtt.connect(ttnAdress, {
        username: ttnAppUser,
        password: ttnAppPw,
    });

    mqttClient.on('connect', () => {
        console.log('Connected to The Things Network via MQTT');

        mqttClient.subscribe(`v3/${ttnAppUser}@ttn/devices/${ttnAppDevice}/${ttnSubTopic}`, { qos: 2 }, (err, granted) => {
            if (err) {
                console.error('Failed to subscribe:', err);
            } else {
                console.log(`Successfully subscribed to topic: ${granted[0].topic}`);
            }
        });
    });

    mqttClient.on('subscribe', (topic, granted) => {
        console.log(`Successfully subscribed to topic: ${topic}`);
    });

    mqttClient.on('error', error => {
        console.error('MQTT error:', error);
    });

    mqttClient.on('message', handleMessageCallback);

    return mqttClient;
}

module.exports = createMqttClient;