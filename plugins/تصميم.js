import axios from 'axios';

const handler = async (m, { conn, args }) => {
    if (!args[0]) {
        await conn.reply(m.chat, '✨ هذا الامـࢪ يـعـمل عـلي انـشـاء صور ب استـخدام الذكاء الاصطناعي.', m);
        return;
    }

    const prompt = args.join(' ');
    const apiUrl = `https://api.dorratz.com/v3/ai-image?prompt=${prompt}`;

    try {
        conn.reply(m.chat, '*🧧 جــــاࢪ الـتـخـــيـــــل...*', m);

        const response = await axios.get(apiUrl);

        if (response.data && response.data.data && response.data.data.image_link) {
            const imageUrl = response.data.data.image_link;

            await conn.sendMessage(m.chat, { image: { url: imageUrl } }, { quoted: m });
        } else {
            throw new Error('لم استطع تخيل هذه الصوره');
        }
    } catch (error) {
        console.error('حدث خطا:', error);
        await conn.reply(m.chat,`${error}`, m);
    }
};

handler.command = ['تصميم'];
handler.help = ['تخيل'];
handler.tags = ['tools'];

export default handler;