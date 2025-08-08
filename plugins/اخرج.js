let handler = async (m, { conn, text, command }) => {
let id = text ? text : m.chat  
await conn.reply(id, '┊❄️┊:•⪼ حاضر ي مطوري اخذت امر من مطوري بالخروح احبكوا ودع🥺💔') 
await conn.groupLeave(id)}
handler.command = /^(اخرج|اطلع|غادر|خروج)$/i
handler.group = true
handler.rowner = true
export default handler