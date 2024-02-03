Based on boot.dev "Build a Web Crawler" series.

---

I used node from docker. See below:
```sh
docker run -it --name node -v "$PWD":/home/node/app node:18
docker exec -it node sh
```
Then run:
```sh
cd /home/node/app
npm install
node main.js https://wagslane.dev
```
