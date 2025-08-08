let handler = async (m, { conn }) => {
  let stickerUrl = 'https://files.catbox.moe/uglb3a.webp' // ← ملصق تجربة

  await conn.sendMessage(m.chat, {
    sticker: { url: stickerUrl }
  }, { quoted: m });
};

handler.customPrefix = /^بوسها$/i;
handler.command = new RegExp;
export default handler;