const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { EditPhotoHandler } = require('./feature/edit_foto');
const { ChatAIHandler } = require('./feature/chat_ai');



const client = new Client({
    authStrategy: new LocalAuth()
});



client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {

    const text = msg.body.toLowerCase() || '';

    //check status
   if (msg.body == 'ping') {
        const startTime = Date.now();
        await msg.reply('Sedang menghitung kecepatan bot...');
        const endTime = Date.now();
        const timeDifference = endTime - startTime;
        await msg.reply(`Ping Bot ${timeDifference} milidetik.`);
    }
    //salam
    if (text === 'assalamualaikum') {
        msg.reply('waalaikumsalam');
    }
    if (text === 'hai') {
        msg.reply('hai jugaaa! ,untuk bertanya gunakan .tanya dan buat sebuah pertanyaan yang ingin anda tanyakan');
    }
    if (text === 'saya ingin bertanya') {
        msg.reply('silahkan tanyakan apa yang ingin anda tanyakan , gunakan .tanya apa yang inginanda tanyakan ,akan di jawab sesuai yang anda ketik dengan tepat danjawaban juga akan tepat');
    }

    // edit_bg/bg_color
    if (text.includes("#edit_bg/")) {
        await EditPhotoHandler(text, msg);
    }
    // #ask/question?
    if (text.includes("#ask/")) {
        await ChatAIHandler(text, msg);
    }

});

client.initialize();



