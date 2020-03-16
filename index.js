require('dotenv').config()
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN || '<ADD YOUR TOKEN HERE>'
const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET || '<ADD YOUR SECRET HERE>'

const authorsPath = 'http://poetrydb.org/authors'

const { App } = require('@slack/bolt');
const axios = require('axios')

// Initializes your app with your bot token and signing secret
const app = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET
});

app.message('poem', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  const poem = await getPoem()
  say(poem);
});
async function getPoem() {
  const allAuthors = await axios.get(authorsPath)
  const authors = allAuthors.data.authors
  const randAuthorIndex = Math.floor(Math.random() * authors.length)
  const author = authors[randAuthorIndex]
  let allPoemsByAuthor
  try {
    const poemPath = `http://poetrydb.org/author/${author}:abs`
    allPoemsByAuthor = await axios.get(poemPath)
  } catch(e) {
    const poemPath = `http://poetrydb.org/author/${author.split(' ')[0]}`
    allPoemsByAuthor = await axios.get(poemPath)
  }

  const poems = allPoemsByAuthor.data
  let randPoemIndex = Math.floor(Math.random() * poems.length)
  let poem = poems[randPoemIndex].lines.join(",").replace(/,/g, '\n');
  while (parseInt(poems[randPoemIndex].linecount) > 50) {
    randPoemIndex = Math.floor(Math.random() * poems.length)
    poem = poems[randPoemIndex].lines.join(",").replace(/,/g, '\n');
  }
  poem = poem + `-${author}`
  return poem
}


(async () => {
  // Start your app
  await app.start(process.env.PORT || 3001);

  console.log('⚡️ Bolt app is running!');
})();