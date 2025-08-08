import fetch from 'node-fetch'

var handler = async (m, { conn, isOwner, usedPrefix, command, text }) => {
  if (!isOwner) return m.reply("❌ هذا الأمر مخصص للمطور فقط.");

  conn.dropmail = conn.dropmail ? conn.dropmail : {};
  let id = 'بريد';
  let lister = ['انشاء', 'رساله', 'حذف'];
  const [feature, inputs, inputs_, inputs__, inputs___] = text.split(' ');

  if (!lister.includes(feature)) {
    return m.reply('*❕ مثال:*\n' + usedPrefix + command + ' انشاء\n\n*حدد نوعًا موجودًا:*\n' + lister.map((v, index) => '  ○ ' + v).join('\n'));
  }

  if (feature === 'انشاء') {
    try {
      let eml = await random_mail();
      const timeDiff = new Date(eml[2]) - new Date();
      conn.dropmail[id] = [
        await m.reply('*📧 ايميل:*\n' + eml[0] + '\n\n*🆔 تعريف:*\n' + eml[1] + '\n\n*⏳ الصلاحية:*\n' + msToTime(timeDiff) + '\n\nمثال *' + usedPrefix + command + ' رساله*'),
        eml[0],
        eml[1],
        eml[2],
      ];
    } catch (e) {
      await m.reply("❌ حصل خطأ: " + e.message);
    }
  }

  if (feature === 'رساله') {
    if (!conn.dropmail[id]) return m.reply('*⚠️ لا توجد رسائل، قم بإنشاء بريد إلكتروني أولاً*\n\n❕ مثال\n*' + usedPrefix + command + ' انشاء*');

    try {
      const eml = await get_mails(conn.dropmail[id][2]);
      const teks = eml[0].map((v, index) => {
        return `*📥 ايميل [ ${index + 1} ]*\n*من:* ${v.fromAddr}\n*إلى:* ${v.toAddr}\n*📩 الرسالة:* ${v.text}\n*📦 الحجم:* ${formatSize(v.rawSize)}\n*🎯 العنوان:* ${v.headerSubject}\n*⬇️ رابط التحميل:* ${v.downloadUrl}`;
      }).join('\n\n________________________\n\n');

      await m.reply(teks || '*📭 صندوق الوارد فارغ*\n\n❕ مثال: *' + usedPrefix + command + ' حذف* لحذف الرسائل');
    } catch (e) {
      await m.reply("❌ حصل خطأ أثناء جلب الرسائل.");
    }
  }

  if (feature === 'حذف') {
    if (!conn.dropmail[id]) return m.reply('*⚠️ لا يوجد بريد إلكتروني لحذفه*');

    try {
      delete conn.dropmail[id];
      await m.reply('*✅ تم حذف البريد الإلكتروني بنجاح*');
    } catch (e) {
      await m.reply("❌ حصل خطأ أثناء الحذف.");
    }
  }
};

handler.help = ['dropmail'];
handler.tags = ['implementos'];
handler.command = /^(بريد)$/i;

export default handler;

// --------- الدوال المساعدة -----------

function msToTime(duration) {
  var seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  return `${hours}h ${minutes}m ${seconds}s`;
}

function formatSize(sizeInBytes) {
  var units = ['B', 'KB', 'MB', 'GB'];
  let index = 0;
  while (sizeInBytes >= 1024 && index < units.length - 1) {
    sizeInBytes /= 1024;
    index++;
  }
  return sizeInBytes.toFixed(2) + ' ' + units[index];
}

async function random_mail() {
  const link = 'https://dropmail.me/api/graphql/web-test-wgq6m5i?query=mutation%20%7BintroduceSession%20%7Bid%2C%20expiresAt%2C%20addresses%20%7Baddress%7D%7D%7D';
  const response = await fetch(link);
  const data = await response.json();
  const email = data.data.introduceSession.addresses[0].address;
  const id = data.data.introduceSession.id;
  const time = data.data.introduceSession.expiresAt;
  return [email, id, time];
}

async function get_mails(id) {
  const link = `https://dropmail.me/api/graphql/web-test-wgq6m5i?query=query%20(%24id%3A%20ID!)%20%7Bsession(id%3A%24id)%20%7B%20addresses%20%7Baddress%7D%2C%20mails%7BrawSize%2C%20fromAddr%2C%20toAddr%2C%20downloadUrl%2C%20text%2C%20headerSubject%7D%7D%20%7D&variables=%7B%22id%22%3A%22${id}%22%7D`;
  const response = await fetch(link);
  const data = await response.json();
  return [data.data.session.mails, data.data.session.mails.length];
}