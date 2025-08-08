import fetch from 'node-fetch';

const handler = async (m, {conn, args, command, usedPrefix}) => {
  // Verificar que se proporcionó una URL
  if (!args[0]) {
    throw `*مـطـلـوب لـيـنـڪ الـفـيـديـو 🦆🍨*
• *مـثـال :* ${usedPrefix + command} https://www.facebook.com/watch?v=636541475139`;
  }
  
  // Verificar que la URL sea de Facebook
  if (!args[0].match(/www.facebook.com|fb.watch/g)) {
    throw `*مـطـلوب لـيـنـڪ الـفـيـديـو 🦆🍨*
• *مـثـال :* ${usedPrefix + command} https://www.facebook.com/watch?v=636541475139`;
  }
  
  // Indicar que se está procesando
  m.react(`⌛`);
  
  try {
    // Usar la API de siputzx para obtener los enlaces de descarga
    const apiUrl = `https://api.siputzx.my.id/api/d/facebook?url=${encodeURIComponent(args[0])}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    // Verificar si la respuesta fue exitosa
    if (!data.status) {
      throw new Error('No se pudo obtener el video de Facebook');
    }
    
    // Obtener la URL del video en la mejor calidad disponible
    const videoOptions = data.data;
    
    if (!videoOptions || videoOptions.length === 0) {
      throw new Error('No se encontraron enlaces de descarga');
    }
    
    // Prefiere la resolución HD si está disponible, sino usa SD
    const hdVideo = videoOptions.find(v => v.resolution.includes('HD'));
    const sdVideo = videoOptions.find(v => v.resolution.includes('SD'));
    const videoUrl = hdVideo ? hdVideo.url : (sdVideo ? sdVideo.url : videoOptions[0].url);
    
    // Enviar el video al chat
    await conn.sendFile(
      m.chat,
      videoUrl,
      'facebook_video.mp4',
      `*𝐇𝐈𝐆𝐇 𝐐𝐔𝐀𝐋𝐈𝐓𝐘 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐕𝐈𝐃𝐄𝐎*

> *♯ ⊀𝑴𝑨𝑭𝑰𝑨  • 𝑩𝑶𝑻 ✸*`,
      m
    );
    
    // Reacción de éxito
    m.react(`✅`);
    
  } catch (error) {
    // Manejar errores
    console.error('Error al descargar el video:', error);
    m.react(`❌`);
    m.reply(`⚠️ *خطأ اثناء احضار الفيديو الخاص بك*`);
  }
};

// Configuración del comando
handler.help = ['fb', 'facebook', 'fbdl'];
handler.tags = ['downloader'];
handler.command = /^(facebook|fb|فيسبوك|فيس)$/i;
handler.limit = 0; // Reducido de 3 a 2 por mayor eficiencia
handler.register = true;

export default handler;