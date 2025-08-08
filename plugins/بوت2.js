let handler = async (m, { conn }) => {
  let audio = 'https://files.catbox.moe/s3q6di.opus'
  let thumbnail = await (await fetch('https://files.catbox.moe/2odzkn.jpg')).buffer()

  await conn.sendMessage(m.chat, {
    audio: { url: audio },
    mimetype: 'audio/mp4',
    ptt: true,
    fileName: '𝐴𝐻𝑀𝐴𝐷-𝑀𝐴𝐹𝐼𝐴.mp3',
    contextInfo: {
      externalAdReply: {
        title: "𝑴𝑨𝑭𝑰𝑨",
        body: "𝑴𝑨𝑭𝑰𝑨",
        thumbnail: thumbnail,
        mediaType: 1,
        renderLargerThumbnail: true,
        mediaUrl: "https://wa.me/201208076133",
        sourceUrl: "https://wa.me/201208076133"
      }
    }
  }, {
    quoted: m,
    buttons: [
      { buttonId: '.الاوامر', buttonText: { displayText: '🧾 عرض الأوامر' }, type: 1 }
    ],
    headerType: 1
  });
};

handler.customPrefix = /^(بوت2)$/i;
handler.command = new RegExp;
export default handler;