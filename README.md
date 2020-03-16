# Poetry Bot for Slack
## Set your environment variables for:

- SLACK_BOT_TOKEN
- SLACK_SIGNING_SECRET

## Create a slack app with these scopes

- channels:history
View messages and other content in public channels that Poetry Bot has been added to

- chat:write
Send messages as @poetry_bot

- groups:history
View messages and other content in private channels that Poetry Bot has been added to

- im:history
View messages and other content in direct messages that Poetry Bot has been added to

- mpim:history
View messages and other content in group direct messages that Poetry Bot has been added to


## Backend setup
run `node index.js` on your server
run `ngrok http <PORT>` to get it up and running with online access
Make sure you enable events on slack. Your request URL will be `NGROK_URL/slack/events`
host it somewhere if you want!