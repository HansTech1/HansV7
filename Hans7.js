const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fetch = require('node-fetch'); // Ensure to install node-fetch

const client = new Client({ authStrategy: new LocalAuth() });

const prefix = '.';
const botName = 'Hans Md';
const ownerName = 'Hans Tech';

// Generate QR code for authentication
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Bot is ready
client.on('ready', () => {
    console.log(`${botName} is ready!`);
});

// Message handler
client.on('message', async (message) => {
    if (message.body.startsWith(prefix)) {
        const command = message.body.slice(prefix.length).trim().split(' ')[0];
        await handleCommand(command, message);
    }
});

// Command handler
async function handleCommand(command, message) {
    const args = message.body.split(' ').slice(1);

    switch (command) {
        case 'ping':
            const pingResponse = await ping();
            message.reply(pingResponse);
            break;
        case 'help':
            message.reply(getHelpMenu());
            break;
        case 'info':
            message.reply(`Bot Name: ${botName}\nCreated by: ${ownerName}\nVersion: 1.0\nCommands: ${prefix}help for a full list.`);
            break;
        case 'owner':
            message.reply(`Owner Name: ${ownerName}\nContact: [Your Contact Info]\nMore info: [Website or Social Media Links]`);
            break;
        case 'mentions':
            message.reply(`Cool Mentions:\n- @user1: The Legend\n- @user2: The Genius\n- @user3: The MVP\n- @user4: The Wizard\nFeel free to mention anyone!`);
            break;
        case 'joke':
            message.reply(getRandomJoke());
            break;
        case 'quote':
            message.reply(getRandomQuote());
            break;
        case 'meme':
            message.reply(getRandomMeme());
            break;
        case 'roll':
            const rollResult = Math.floor(Math.random() * 6) + 1;
            message.reply(`You rolled a ${rollResult}`);
            break;
        case 'trivia':
            message.reply(getRandomTrivia());
            break;
        case 'rps':
            const rpsChoice = args[0];
            const rpsResult = playRockPaperScissors(rpsChoice);
            message.reply(rpsResult);
            break;
        case 'guess':
            const guessNumber = Math.floor(Math.random() * 10) + 1;
            message.reply(`Guess a number between 1-10. The number is ${guessNumber}.`);
            break;
        case '8ball':
            const question = args.join(' ');
            const magic8BallResponse = getMagic8BallResponse();
            message.reply(magic8BallResponse);
            break;
        case 'flip':
            const coinFlip = Math.random() < 0.5 ? 'Heads' : 'Tails';
            message.reply(`You flipped: ${coinFlip}`);
            break;
        case 'math':
            const expression = args.join(' ');
            const mathResult = eval(expression); // Use with caution
            message.reply(`Result: ${mathResult}`);
            break;
        case 'challenge':
            message.reply(getRandomChallenge());
            break;
        case 'choose':
            const options = args.join(' ').split(',');
            const chosenOption = options[Math.floor(Math.random() * options.length)].trim();
            message.reply(`I choose: ${chosenOption}`);
            break;
        case 'anagram':
            const anagramWord = args[0];
            const anagramResult = getAnagram(anagramWord);
            message.reply(`Anagram for ${anagramWord}: ${anagramResult}`);
            break;
        case 'wordguess':
            const wordGuess = args[0];
            message.reply(`Guess the word! It has ${wordGuess.length} letters.`);
            break;
        case 'draw':
            const item = args.join(' ');
            message.reply(`Drawing a random item: ${item}... (this is a placeholder)`);
            break;
        case 'fortune':
            message.reply(getRandomFortune());
            break;
        case 'riddle':
            message.reply(getRandomRiddle());
            break;
        case 'weather':
            message.reply("Weather feature is coming soon! (This is a placeholder)");
            break;

        // Download commands
        case 'downloadImage':
            const imgUrl = args[0];
            await downloadFile(imgUrl, 'image', message);
            break;
        case 'downloadVideo':
            const videoUrl = args[0];
            await downloadFile(videoUrl, 'video', message);
            break;
        case 'downloadSong':
            const songUrl = args[0];
            await downloadFile(songUrl, 'audio', message);
            break;
        case 'downloadPDF':
            const pdfUrl = args[0];
            await downloadFile(pdfUrl, 'pdf', message);
            break;
        case 'downloadDoc':
            const docUrl = args[0];
            await downloadFile(docUrl, 'doc', message);
            break;
        case 'downloadZip':
            const zipUrl = args[0];
            await downloadFile(zipUrl, 'zip', message);
            break;
        case 'downloadMP3':
            const mp3Url = args[0];
            await downloadFile(mp3Url, 'audio', message);
            break;
        case 'downloadMP4':
            const mp4Url = args[0];
            await downloadFile(mp4Url, 'video', message);
            break;
        case 'downloadGIF':
            const gifUrl = args[0];
            await downloadFile(gifUrl, 'gif', message);
            break;
        case 'downloadTXT':
            const txtUrl = args[0];
            await downloadFile(txtUrl, 'text', message);
            break;
        case 'downloadCSV':
            const csvUrl = args[0];
            await downloadFile(csvUrl, 'csv', message);
            break;
        case 'downloadXML':
            const xmlUrl = args[0];
            await downloadFile(xmlUrl, 'xml', message);
            break;
        case 'downloadMarkdown':
            const mdUrl = args[0];
            await downloadFile(mdUrl, 'markdown', message);
            break;
        case 'downloadEPUB':
            const epubUrl = args[0];
            await downloadFile(epubUrl, 'epub', message);
            break;
        case 'downloadJSON':
            const jsonUrl = args[0];
            await downloadFile(jsonUrl, 'json', message);
            break;
        case 'downloadPPT':
            const pptUrl = args[0];
            await downloadFile(pptUrl, 'ppt', message);
            break;
        case 'downloadMPG':
            const mpgUrl = args[0];
            await downloadFile(mpgUrl, 'video', message);
            break;
        case 'downloadAVI':
            const aviUrl = args[0];
            await downloadFile(aviUrl, 'video', message);
            break;
        case 'downloadWAV':
            const wavUrl = args[0];
            await downloadFile(wavUrl, 'audio', message);
            break;

        default:
            message.reply('Unknown command! Use .help for a list of commands.');
    }
}

// Ping command with detailed information
async function ping() {
    const startTime = Date.now();
    const pingMessage = await client.sendMessage('Ping test message...');
    const endTime = Date.now();
    const pingTime = endTime - startTime;
    await pingMessage.delete(); // Clean up test message
    return `Ping Test:\nResponse Time: ${pingTime} ms\nBot is online and functioning!`;
}

// Help menu
function getHelpMenu() {
    return `✨ **Command Menu for ${botName}** ✨

    **📊 General Commands:**
    - ${prefix}ping: Check bot responsiveness.
    - ${prefix}help: Show this command list.
    - ${prefix}info: Get information about the bot.
    - ${prefix}owner: Get information about the owner.

    **🎉 Fun Commands:**
    - ${prefix}joke: Get a random joke.
    - ${prefix}quote: Get a random quote.
    - ${prefix}meme: Get a random meme.
    - ${prefix}trivia: Get a random trivia question.
    - ${prefix}riddle: Get a random riddle.

    **🎲 Games:**
    - ${prefix}roll: Roll a dice (1-6).
    - ${prefix}rps <rock/paper/scissors>: Play rock-paper-scissors.
    - ${prefix}guess <number>: Guess a number (1-10).
    - ${prefix}8ball <question>: Ask the magic 8-ball.
    - ${prefix}flip: Flip a coin.
    - ${prefix}challenge: Get a random challenge.
    - ${prefix}choose <option1>, <option2>: Randomly choose between options.
    - ${prefix}anagram <word>: Get an anagram for a word.
    - ${prefix}wordguess <word>: Guess the word.

    **🔄 Downloads:**
    - ${prefix}downloadImage <url>: Download an image from the given URL.
    - ${prefix}downloadVideo <url>: Download a video from the given URL.
    - ${prefix}downloadSong <url>: Download a song from the given URL.
    - ${prefix}downloadPDF <url>: Download a PDF from the given URL.
    - ${prefix}downloadDoc <url>: Download a DOC file from the given URL.
    - ${prefix}downloadZip <url>: Download a ZIP file from the given URL.
    - ${prefix}downloadMP3 <url>: Download an MP3 file from the given URL.
    - ${prefix}downloadMP4 <url>: Download an MP4 file from the given URL.
    - ${prefix}downloadGIF <url>: Download a GIF from the given URL.
    - ${prefix}downloadTXT <url>: Download a TXT file from the given URL.
    - ${prefix}downloadCSV <url>: Download a CSV file from the given URL.
    - ${prefix}downloadXML <url>: Download an XML file from the given URL.
    - ${prefix}downloadMarkdown <url>: Download a Markdown file from the given URL.
    - ${prefix}downloadEPUB <url>: Download an EPUB file from the given URL.
    - ${prefix}downloadJSON <url>: Download a JSON file from the given URL.
    - ${prefix}downloadPPT <url>: Download a PPT file from the given URL.
    - ${prefix}downloadMPG <url>: Download an MPG file from the given URL.
    - ${prefix}downloadAVI <url>: Download an AVI file from the given URL.
    - ${prefix}downloadWAV <url>: Download a WAV file from the given URL.

    **💬 Mentions:**
    - ${prefix}mentions: Get cool mentions for fun.
    `;
}

// Download file function
async function downloadFile(url, type, message) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to download file.');

        const buffer = await res.buffer();
        const fileName = url.split('/').pop();
        await client.sendMessage(message.from, { url: buffer, filename: fileName });
        message.reply(`Downloaded ${type}: ${fileName}`);
    } catch (error) {
        message.reply(`Error downloading ${type}: ${error.message}`);
    }
}

// Sample functions for additional commands
function getRandomJoke() {
    const jokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "What do you call fake spaghetti? An impasta!"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
}

function getRandomQuote() {
    const quotes = [
        "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
        "Life is what happens when you're busy making other plans. - John Lennon",
        "Get busy living or get busy dying. - Stephen King"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function getRandomMeme() {
    const memes = [
        "Meme 1: Why don't scientists trust atoms? Because they make up everything!",
        "Meme 2: I told my computer I needed a break, and now it won't stop sending me KitKat ads.",
        "Meme 3: Why was the math book sad? Because it had too many problems."
    ];
    return memes[Math.floor(Math.random() * memes.length)];
}

function getRandomTrivia() {
    const trivia = [
        "Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still perfectly good to eat!",
        "Did you know? Bananas are berries, but strawberries aren't.",
        "Did you know? Octopuses have three hearts."
    ];
    return trivia[Math.floor(Math.random() * trivia.length)];
}

function getRandomChallenge() {
    const challenges = [
        "Do 10 push-ups!",
        "Try to juggle 3 items!",
        "Drink a glass of water in one go!"
    ];
    return challenges[Math.floor(Math.random() * challenges.length)];
}

function getAnagram(word) {
    return word.split('').sort(() => Math.random() - 0.5).join('');
}

function getMagic8BallResponse() {
    const responses = [
        'Yes', 'No', 'Ask again later', 'Definitely', 
        'Absolutely not', 'It is certain', 'Very doubtful'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function getRandomFortune() {
    const fortunes = [
        "You will find great fortune in unexpected places.",
        "An old friend will re-enter your life soon.",
        "A thrilling time is in your immediate future."
    ];
    return fortunes[Math.floor(Math.random() * fortunes.length)];
}

function getRandomRiddle() {
    const riddles = [
        "What has keys but can't open locks? (Answer: A piano)",
        "What has to be broken before you can use it? (Answer: An egg)",
        "I’m tall when I’m young, and I’m short when I’m old. What am I? (Answer: A candle)"
    ];
    return riddles[Math.floor(Math.random() * riddles.length)];
}

// Initialize the client
client.initialize();
