import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {

let res = await fetch('https://api.waifu.pics/sfw/waifu')

if (!res.ok) throw await res.text()

let json = await res.json()

if (!json.url) throw `${lenguajeGB['smsAvisoFG']()}`

conn.sendFile(m.chat, json.url, 'error.jpg', `موز اوي البت دي 😂`, m)

conn.sendButton(m.chat, `موز اوي البت دي 😂`, wm, json.url, [['ابــــعـت تــانـي', `/${command}`]], null, null, m)

}

handler.help = ['waifu']

handler.tags = ['anime']

handler.command = /^(بنات)$/i

export default handler