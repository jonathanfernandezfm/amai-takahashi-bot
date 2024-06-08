FROM node:20

# Create the bot's directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY package.json /usr/src/bot
RUN npm install
RUN npm i -g pino-pretty

COPY . /usr/src/bot

EXPOSE 3302
# Start the bot.
CMD ["npm", "start"]