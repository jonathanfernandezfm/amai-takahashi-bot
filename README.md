# AMAI TAKAHASHI BOT

## Code explanation
### Configuration file
`utils/config.js`

Here you can find some bot configuration that should not be changed

### Bot command reloading
Everytime the bot is initialized or restarted, the commands are automatically reloaded when the `ready` event is fired.

This is done automatically and there is no need to manually update them by running a command

### Bot start
`index.js`

This is the main file.
Here the Discord client is initialized and assigned some variables that are neede to store the interactions. Aswell as reading the TOKEN variable and using it for logging in the bot.

It uses `handlers/*.js` to load all the commands/events/tasks files that we have.

### Commands
`commands/*`

These files contain the commands configuration. They are automatically updated on bot start and they define a specific structure that is needed for the bot to work.

The `execute` function is the code that will run when the command is execute

### Events
`events/*.js`

These events are listened to when the bot is initialized.
These events refer to Discord Bot native events firing.

We just have `ready` and `interactionCreate`

### Utils
`utils/*.js`

Util files like configuration, functions, embed creation, etc.

Here you can also find the command to register the commands, ran everytime the bot is executed and updating the commands automatically.

## Environment variables
```
TOKEN = discord_bot_token
CLIENT_ID = discord_app_id
DATABASE_URL = database_url
```

## Instalation

`pnpm install`

## Run

`pnpm start`

## Develop

`pnpm run dev`