import fetch from 'node-fetch';
const handler = async (m, {conn, text}) => {
  try {
    const res = await fetch('https://api.thedogapi.com/v1/images/search');
    const img = await res.json();
    const caption = `_©𝑀𝐴𝐹𝐼𝐴 𝑊𝐴 𝐵𝑂𝑇_`.trim();
    conn.sendFile(m.chat, img[0].url, 'dog.jpg', caption, m);
  } catch {
    throw '*Error!*';
  }
};
handler.help = ['dog'];
handler.tags = ['random'];
handler.command = /^كلب$/i;
handler.fail = null;
export default handler;