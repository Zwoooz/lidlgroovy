# LIDL groovy

### LIDL(worse) version of the old groovy discord music bot. 

Ever since YouTube started cracking down on discord music bots no publicly available bots support streaming music from YouTube anymore, often leading to not getting the track you were trying to search for. I got fed up about this and created a bot for mainly this purpose.

I worked on and off on the bot leading to it becoming extremely outdated so I decided to completely rewrite it in TypeScript, with the hope of being able to maintain it better. This is that rewrite (or at least the start of it).

---

## Installation

Clone this repo and cd into it:
```bash
$ git clone https://github.com/Zwoooz/lidlgroovy.git
$ cd lidlgroovy
```

Install dependencies and compile the TypeScript code:
```bash
$ npm install
$ npm run build
```

Create a discord application and bot [here](https://discord.com/developers/applications), copy your bot token and save it for the next step.

Create a `.env` file in the root directory with the following contents:

```.env
TOKEN=YOUR_BOT_TOKEN_HERE
```

To be able to send commands to the bot you need to register them with discord using an api call. This is done by running the following in the root directory:
```bash
$ node dist/deploy-commands.js
```

The bot is now ready to use!

---

## Usage

To start the bot, simply run `npm run start` in the root directory. You should then see a message confirming the bot successfully logged in:
```bash
$ npm run start

> lidlgroovy@1.0.0 start
> node .
(Bot username) is ready!
```

**That's it, your bot is now up and running and you can start sending commands!** 


