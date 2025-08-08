#!/bin/bash
GREEN='\033[0;32m'

# تأكد إن مجلد tmp موجود وأعطيه صلاحية كتابة
mkdir -p /home/container/tmp
chmod 777 /home/container/tmp

# كرر تشغيل البوت لو وقف
while :
do
  echo ""
  npm start
  sleep 1
done
