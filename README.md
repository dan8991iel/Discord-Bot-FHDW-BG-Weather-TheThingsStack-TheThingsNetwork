# TheThingsNetwork-DiscordBot-FHDW-WeatherData

This Discord bot provides weather data from the FHDW Weatherstation. The bot can subscribe and unsubscribe channels to receive weather updates, list the currently subscribed channels, and unsubscribe all channels at once.

## Prerequisites

- Node.js v14 or higher
- npm (usually bundled with Node.js)
- An active Discord account with administrative access to a server
- A bot and the corresponding bot token from the [Discord Developer Portal](https://discord.com/developers/applications)
- The Things Network/Stack Application ID and API Key

## Creating and Setting Up a Discord Bot

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) and sign in with your Discord account.

2. Click on the "New Application" button, give your application a name, and then click "Create".

3. In the application's settings, click on the "Bot" tab, then click on the "Add Bot" button to create a bot for your application. Confirm by clicking "Yes, do it!".

4. In the "Bot" tab make sure that the "MESSAGE CONTENT INTENT" is set to `true`.

5. Under the "TOKEN" section, click "Copy" to copy your bot token. Keep this token safe, as it will be used to authenticate your bot with Discord.

6. (Optional) Customize your bot's name, profile picture, and other settings as desired.
Open


## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/FHDW-Weatherstation-Discord-Bot.git
```

2. Install the required dependencies:

```bash
...\TheThingsNetwork-DiscordBot-FHDW-WeatherData\Bot> npm install
```
    You might have to navigate to the Bot directory before running `npm install`.
    To navigate use `cd folder_name`

3. Create a config.json file in the Bot directory and add your Discord bot token, client ID, guild ID, and other required details:

```json
{
  "token": "your_discord_bot_token",
  "clientId": "your_discord_bot_client_id",
  "guildId": "your_discord_server_guild_id",
  
  "ttnAppUser": "your_ttn_app_user",
  "ttnAppPw": "your_ttn_app_pw",
  "ttnAdress": "your_ttn_address",
  "ttnAppDevice": "your_ttn_app_device"
}
```
**Example:**
```json
{
  "token": "AAA0000aaa000AAAA000AA.AAA00AAA.aaa-AaaaaAA0000AAAAAAAAAAaaaAAAA00AAAAAA",
  "clientId": "1234567891234567891",
  "guildId": "1234567891234567891",
  
  "ttnAppUser": "hello-world-weather",
  "ttnAppPw": "NXYXX.0A0AAAAAAAA0AAAAAAA4AAA00AAAMAAAAAAAAA.AA0AAAAA0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "ttnAdress": "mqtts://eu1.cloud.thethings.network:8883",
  "ttnAppDevice": "eui-00a0000aa000a000"
}
```


## Usage


1. Invite the bot to your Discord server using the appropriate URL (replace your_discord_bot_client_id with the actual client ID):

https://discord.com/api/oauth2/authorize?client_id=your_discord_bot_client_id&permissions=8&scope=bot

2. Deploy slash commands to your Discord server:

```bash
...\TheThingsNetwork-DiscordBot-FHDW-WeatherData\Bot> node deploy-commands.js
```
    (You might have to restart your Discord-Client afterwards)

3. Run the bot:

3.1. To start the bot, run:

```bash
...\TheThingsNetwork-DiscordBot-FHDW-WeatherData\Bot> npm start
```

3.2. To run the bot in development mode with nodemon, run:

```bash
...\TheThingsNetwork-DiscordBot-FHDW-WeatherData\Bot> npm run dev
```

## Commands

- `/subscribe [channel]`: Subscribe a channel to the FHDW-Weatherstation. If no channel is provided, the current channel will be subscribed.
- `/unsubscribe [channel]`: Unsubscribe a channel from the FHDW-Weatherstation. If no channel is provided, the current channel will be unsubscribed.
- `/list`: List all channels currently subscribed to the FHDW-Weatherstation.
- `/unsubscribe_all`: Unsubscribe all channels from the FHDW-Weatherstation.


## Deployment to a Hosting Platform

To deploy the bot on a hosting platform, follow the platform-specific instructions for Node.js applications. Make sure to include the config.json file with your credentials in the deployment package.

Ensure that the config.json file is included in your deployment and that your bot token and other sensitive information are kept secure.
If the hosting platform supports environment variables, it's recommended to store your credentials as environment variables rather than including them in the config.json file. 

For example, you can deploy the bot to Heroku by following these steps:

1. Create a new app on Heroku and connect your GitHub repository.
2. Enable automatic deployment or manual deployment from the GitHub repository.
3. Set up environment variables in the Heroku app settings for your Discord bot token, client ID, guild ID, and other required details.
4. Deploy the bot to Heroku. The package.json file already contains the necessary scripts for starting the bot.

For more detailed instructions on deploying a Discord bot to Heroku, check out this [guide](https://devcenter.heroku.com/articles/deploying-nodejs).

## License

This project is licensed under the MIT License.
