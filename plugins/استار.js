import axios from 'axios';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (args.length < 2) {
    return conn.sendMessage(m.chat, {
      text: `*_لـيـس هـکـذا مـثـال:_*\n${usedPrefix + command} MeDdo FOX`,
    }, { quoted: m });
  }

  const [textL, textR] = args;
  const apiUrl = `https://api.nekorinn.my.id/maker/ba-logo?textL=${encodeURIComponent(textL)}&textR=${encodeURIComponent(textR)}`;

  try {
    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: `*_تـم صـنـاعـه الـلوجو_*\nالاسم الاول: ${textL}\nالاسم الثاني: ${textR}`,
    }, { quoted: m });
  } catch (err) {
    console.error(err);
    m.reply('حدث خطا.');
  }
};

handler.command = ['ستار_لوجو', 'لوجو_ستار'];
handler.help = ['logo'];
handler.tags = ['foxx'];

export default handler;