import fs from 'fs';
import { fileTypeFromBuffer } from 'file-type';

const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `*〘 ❗ 〙 اكــتــب اســم الــمــلــف*`;

  const q = m.quoted || m;
  const mime = q.mimetype || '';
  const isTextMessage = q.text;
  const path = `plugins/${text}.js`;
  let isAdd = false;
  let isDel = false;

  let fileContent = '';

  switch (command) {
    case 'ح':
      if (!q || (!isTextMessage && !mime)) {
        throw `*〘 ❗ 〙 ريــب عـلـي رسـالـة عـشـان احـفـظـهـا فـي الـبـلـوجـنـس بـتـاعـتـك*`;
      }

      try {
        if (isTextMessage) {
          fileContent = isTextMessage.trim();
          if (!fileContent) throw `*〘 ❗ 〙 مـيـنـفـعـش احـفـظ بـلـوجـن فـاضـي 🐦*`;
          fs.writeFileSync(path, fileContent, 'utf8');
          isAdd = true;
        } else if (mime === 'application/javascript') {
          const buffer = await q.download();
          fileContent = buffer.toString('utf8');
          if (!fileContent.trim()) throw `*〘 ❗ 〙 الملف فاضي او لا يحتوي علي كلمات صالحة.*`;
          fs.writeFileSync(path, fileContent, 'utf8');
          isAdd = true;
        } else {
          throw `*〘 ❗ 〙 الملف مش مدعوم.*`;
        }
      } catch (error) {
        throw `*〘 ❗ 〙 حدث خطا اثناء حفظ :* ${error.message || error}`;
      }
      break;

    case 'م':
      if (!fs.existsSync(path)) {
        throw `*〘 ❗ 〙 الملف "${path}" مش موجود عشان احذفو*`;
      }

      try {
        fs.unlinkSync(path);
        isDel = true;
      } catch (error) {
        throw `*〘 ❗ 〙 حدث خطأ أثناء حذف الملف :* ${error.message || error}`;
      }
      break;

    default:
      throw `*〘 ❗ 〙 الأمر غير معروف
      استخدم أحد الأوامر التالية :*
      - ${usedPrefix}ح
      - ${usedPrefix}م`;
  }


  if (isAdd) {
    m.reply(`〘 ✅ 〙 *ضـن حـفـظـت الـمـلـف :* *"${path}" بـنـجـاح 🍨*`);
  } else if (isDel) {
    m.reply(`〘 ✅ 〙 *ضـن حـذفـت :* *"${path}" بـنـجـاح 🍨*`);
  }
};

handler.help = ['احفظ', 'امسح'];
handler.tags = ['owner'];
handler.command = ['ح', 'م'];
handler.owner = true;

export default handler;