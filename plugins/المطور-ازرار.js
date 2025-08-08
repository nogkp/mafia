import fetch from 'node-fetch';

let handler = async (m, { conn }) => {

   await m.react('🧚‍♀️');

   let username = conn.getName(m.sender);

   let sender = m.sender.split('@')[0];

   let developerJid = '201208076133@s.whatsapp.net';

   // جهة اتصال المطور

   let list = [{

       displayName: "｢🍷┊𝑀𝐴𝐹𝐼𝐴┊🍷｣",

       vcard: `BEGIN:VCARD\nVERSION:3.0\nFN: ⎯⎯｢🍷┊𝐴𝐻𝑀𝐴𝐷┊🍷｣⎯⎯\nitem1.TEL;waid=201208076133:201208076133\nitem1.X-ABLabel:⎯⎯『 𝐌𝐀𝐅𝐈𝐀 ✦ 𝐎𝐖𝐍𝐄𝐑 』⎯⎯\nEND:VCARD`,

   }];

   await conn.sendMessage(m.chat, {

       contacts: {

           displayName: `${list.length} جهة اتصال`,

           contacts: list

       }

   }, { quoted: m });

   // رسالة للمستخدم

   let txt = `╭──〔 مرحباً بك 〕──╮

⌯ الاسم: *${username}*

⌯ أرسل ما تريد للمطور برسالة واحدة فقط.

⌯ يرجى عدم الإزعاج، وسيتم الرد فور التفرغ.

╰─────•◈•─────╯`;

   await conn.sendMessage(m.chat, {

       text: txt,

       footer: '｢🍷┊𝑀𝐴𝐹𝐼𝐴┊🍷｣',

       buttons: [

           {

               buttonId: ".الاوامر",

               buttonText: { displayText: '☰ أوامر البوت' },

               type: 1

           }

       ],

       viewOnce: true,

       headerType: 1

   }, { quoted: m });

   // رسالة تلقائية للمطور

   await conn.sendMessage(developerJid, {

       text: `⌯ المستخدم *${username}*\n⌯ يحاول التواصل معك.\n⌯ رابط حسابه: wa.me/${sender}`

   });

};

handler.help = ['owner', 'الاونر', 'المطور', 'المالك', 'مطور'];

handler.tags = ['main'];

handler.command = /^(owner|creator|المالك|المطور|الاونر|مطورك|مطور)$/i;

export default handler;