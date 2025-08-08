let handler = async (m, { conn }) => {
  let audio = 'https://files.catbox.moe/gx6wxd.mp3'

  await conn.sendMessage(m.chat, {
    audio: { url: audio },
    mimetype: 'audio/mp4',
    ptt: true,
    fileName: '𝐴𝐻𝑀𝐴𝐷-𝑀𝐴𝐹𝐼𝐴.mp4',
  }, {
    quoted: m,
    buttons: [
      { buttonId: '.الاوامر', buttonText: { displayText: '🧾 عرض الأوامر' }, type: 1 }
    ],
    headerType: 1
  });
};

handler.customPrefix = /^بوم$/i;
handler.command = new RegExp;
export default handler;