let handler = async (m, { conn }) => {
  global.mutedUsers = global.mutedUsers || {};
  if (!m.message || !m.sender || !m.chat.endsWith('@g.us')) return;

  if (global.mutedUsers[m.sender]) {
    try {
      await conn.sendMessage(m.chat, {
        delete: {
          remoteJid: m.chat,
          fromMe: false,
          id: m.key.id,
          participant: m.sender
        }
      });
    } catch (e) {
      console.error('فشل حذف رسالة:', e);
    }
  }
};

export default handler;