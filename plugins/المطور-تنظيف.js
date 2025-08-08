let handler = async (m, { conn }) => {
  let txt = '`اخــتــر الــمــهــمــةة :`';

  const buttons = [
    { buttonId: '.نظف', buttonText: { displayText: '⏋🧁︱ تــنـظـيـف الــسـيـسـون ︱🧁⎿' }, type: 1 },
    { buttonId: '.dchat', buttonText: { displayText: '⏋🍨︱ تــنـظـيـف الــمـحـادثــة ︱🍨⎿' }, type: 1 },
  ];

  await conn.sendMessage(m.chat, {
    text: txt,
    footer: '♯ 𓆩𝐌𝐀𝐅𝐈𝐀-𝐁𝐎𝐓𓆪 ⚡',
    buttons: buttons,
    headerType: 1
  }, { quoted: m });
};

handler.command = /^تنظيف$/i;
export default handler;