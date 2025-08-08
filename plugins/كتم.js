let handler = async (m, { conn, command, isAdmin, text, participants }) => {
  if (!isAdmin) throw '*🚫 فقط المسؤولين يمكنهم استخدام هذا الأمر.*';

  let user = m.mentionedJid[0] || m.quoted?.sender;
  if (!user) throw '✳️ منشن الشخص الذي تريد كتمه أو الرد عليه.';

  global.mutedUsers = global.mutedUsers || {};

  if (command === 'كتم') {
    if (global.mutedUsers[user]) throw '😼 هذا المستخدم مكتوم بالفعل.';
    global.mutedUsers[user] = true;
    conn.reply(m.chat, `✅ تم كتم العضو @${user.split('@')[0]}`, m, { mentions: [user] });
  }

  if (command === 'الغاء') {
    if (!global.mutedUsers[user]) throw '🟢 هذا المستخدم غير مكتوم.';
    delete global.mutedUsers[user];
    conn.reply(m.chat, `✅ تم إلغاء كتم العضو @${user.split('@')[0]}`, m, { mentions: [user] });
  }
};

handler.command = /^(كتم|الغاء)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;