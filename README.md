# TheThingsNetwork-DiscordBot-FHDW-WeatherData

A Discord bot that fetches weather data from The Things Network/Stack and displays it in Discord. The data is transferred from the weather station to The Things Network/Stack via LoRaWAN.

## Prerequisites

- Node.js (v14.0.0 or newer)
- NPM (v6.0.0 or newer)
- A Discord bot token
- The Things Network/Stack Application ID and API Key

## Installation

1. Clone the repository:

git clone https://github.com/dan8991iel/TheThingsNetwork-DiscordBot-FHDW-WeatherData.git

2. Install the required dependencies:

npm install

3. Create a `config.json` file in the project directory and add your Discord bot token, TTN Application ID, and API Key:

```json
{
  "token": "your-discord-bot-token",
  "ttnAppID": "your-ttn-application-id",
  "ttnApiKey": "your-ttn-api-key"
}
```

## Usage

1. Start the bot:

node index.js

2. The bot should now be running. Test it in your Discord server by sending the "!weather" command.

## Deployment

To deploy the bot to a cloud server, follow the Heroku deployment guide or the guide for the hosting platform of your choice.

## License

This project is licensed under the MIT License.