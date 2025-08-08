
let handler = async (m, { conn, isAdmin, isOwner }) => {
  if (!m.isGroup) return m.reply('❌ هذا الأمر يعمل في المجموعات فقط');
  if (!(isAdmin || isOwner)) return m.reply('❌ هذا الأمر مخصص للإدمن فقط');

  let chat = global.db.data.chats[m.chat];
  if (!chat) global.db.data.chats[m.chat] = {};
  let antilink = chat.antiLink || false;

  await conn.sendMessage(m.chat, {
    text: `⚙️ *إعداد مضاد الروابط:*

🔗 الحالة الحالية: ${antilink ? '✅ مفعل' : '❌ معطل'}

يمكنك التبديل بين التشغيل والإيقاف باستخدام الأزرار التالية:`,
    buttons: [
      { buttonId: '.on antilink', buttonText: { displayText: '✅ تشغيل' }, type: 1 },
      { buttonId: '.off antilink', buttonText: { displayText: '❌ إيقاف' }, type: 1 }
    ],
    footer: 'مافيا بوت ⚡',
    headerType: 1
  }, { quoted: m });
};

handler.command = ['مضاد-لينكات'];
handler.group = true;
handler.admin = true;

export default handler;