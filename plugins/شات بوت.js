let handler = m => m;

handler.all = async function (m) {
  if (m.key.fromMe) return; // منع البوت من الرد على نفسه

  let chat = global.db.data.chats[m.chat];

  if (chat.isBanned) return;

  let fake = {
    key: {
      fromMe: false,
      participant: '201208076133@s.whatsapp.net',
      remoteJid: '120363384250924818@g.us',
    },
    message: {
      conversation: '｢🍷┊𝐌𝐀𝐅𝐈𝐀┊🍭｣'
    },
    participant: '0@s.whatsapp.net',
  };

  // **الردود المسجلة**
  if (/^احا$/i.test(m.text)) { 
    conn.reply(m.chat, `*احتين عل احتك😆*`, fake);
  }

  if (/^موفي$/i.test(m.text)) { 
    conn.reply(m.chat, `*عايز ايه يا زفت*`, fake);
  }

  if (/^الحمدلله$/i.test(m.text)) { 
    conn.reply(m.chat, `*ادام الله حمدك*`, fake);
  }

  if (/^عبيط|يا عبيط|اهبل|غبي$/i.test(m.text)) { 
    conn.reply(m.chat, `*انت يبيبي 🥲❤️*`, fake);
  }

  if (/^مفيتي$/i.test(m.text)) { 
    conn.reply(m.chat, `*ارغي عايز ايه*`, fake);
  }

  if (/^يب$/i.test(m.text)) { 
    conn.reply(m.chat, `*يعم استرجل وقول نعم 🐦❤*`, fake);
  }

  if (/^الاستور$/i.test(m.text)) { 
    conn.reply(m.chat, `*مطوري و حبيبي😊*`, fake);
  }

  if (/^بوت خرا|بوت زفت|خرا عليك$/i.test(m.text)) { 
    conn.reply(m.chat, `*م هقل نفسي وارد عل واحد زيك😒🗿*`, fake);
  }

  if (/^منور|منوره$/i.test(m.text)) { 
    conn.reply(m.chat, `*بنوري انا 🫠💔*`, fake);
  }

  if (/^بنورك|دا نورك|نورك الاصل|نور نورك$/i.test(m.text)) { 
    conn.reply(m.chat, `*يعم بنوري انا 🫠🐦*`, fake);
  }

  if (/^امزح|بهزر$/i.test(m.text)) { 
    conn.reply(m.chat, `*دمك تقيل متهزرش تاني😒*`, fake);
  }

  if (/^في ايه$/i.test(m.text)) { 
    conn.reply(m.chat, `*انا معرفش حاجه🙂*`, fake);
  }

  if (/^تست$/i.test(m.text)) { 
    conn.reply(m.chat, `*موجود عايز ايه🗿*`, fake);
  }

  if (/^بتعمل ايه دلوقتي|بتعمل اي$/i.test(m.text)) { 
    conn.reply(m.chat, `*انت مالك😒*`, fake);
  }

  if (/^انا جيت$/i.test(m.text)) { 
    conn.reply(m.chat, `*امشي تاني*`, fake);
  }

  if (/^حرامي|سارق$/i.test(m.text)) { 
    conn.reply(m.chat, `*تتهم بريء بالسرقة من دون تحري او بحث عن حقيقة ليست ملموسة ارحنا واعمل شرطي ثم افتح فمك وثرثر فكلامك كـجاهل واحد بل جهلاً ارحم من حديثك تتصنع دور الشرطي وكأنك محقق بالله اصمت ولا تحرج نفسك ارحنا وارح أعصابك ان اكرمك الله بعقل فبسكوتك اقتل جهلك*`, fake);
  }

  if (/^ملل|مللل|ملللل|زهق$/i.test(m.text)) { 
    conn.reply(m.chat, `*لانك موجود🗿*`, fake);
  }

  if (/^🤖$/i.test(m.text)) { 
    conn.reply(m.chat, `انت بوت عشان ترسل الملصق ده 🐦`, fake);
  }

  if (/^🐦‍⬛$/i.test(m.text)) { 
    conn.reply(m.chat, `🐦`, fake);
  }

  if (/^ايه$/i.test(m.text)) { 
    conn.reply(m.chat, `*بلاش ارد احسن🌝🤣*`, fake);
  }

  if (/^نعم$/i.test(m.text)) { 
    conn.reply(m.chat, `*حد ناداك 🌚🐦*`, fake);
  }

  if (/^كيفك|شخبارك|علوك|عامل ايه|اخبارك|اي الدنيا$/i.test(m.text)) { 
    conn.reply(m.chat, `*ملكش فيه🗿*`, fake);
  }

  if (/^🐤$/i.test(m.text)) { 
    conn.reply(m.chat, `🐦`, fake);
  }
  
  if (/^تصبح علي خير|تصبحوا علي خير$/i.test(m.text)) { 
    conn.reply(m.chat, `وانت من اهل الخير حبيبي✨💜`, fake);
  }
  
  if (/^ببحبك بوت|حبك|بوت بحبك$/i.test(m.text)) { 
    conn.reply(m.chat, `اسكت بدل ما انادي مطوري يفشخك🥷🏻`, fake);
  }
   
  if (/^🙂$/i.test(m.text)) { 
    conn.reply(m.chat, `بص بعيد🙂`, fake);
  }
  
  if (/^باي$/i.test(m.text)) { 
    conn.reply(m.chat, `*غور ما بطيقه🗿*`, fake);
  }
   
  if (/^هلا$/i.test(m.text)) { 
    conn.reply(m.chat, `*نعم عايز ايه🗿*`, fake);
  }

  return !0;
}

export default handler;