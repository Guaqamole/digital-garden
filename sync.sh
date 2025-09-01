timestamp=$(TZ='Asia/Seoul' date '+%Y-%m-%d %H:%M:%S')

git pull

git add .
git commit -m "Quartz sync: $timestamp"
git push origin v4
