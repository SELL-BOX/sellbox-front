# sellbox-front

<div align=center><h2>📚 STACKS</h2></div>

<div align=center>
  <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white">
  <img src="https://img.shields.io/badge/Tailwind CSS
-06B6D4.svg?style=for-the-badge&logo=Tailwind CSS
&logoColor=white">
  <br/>
  <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white">
  <img src="https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=Storybook&logoColor=white">
  <br>
</div>

## 개발환경 설정

```powershell
npm install

$Env:API_SERVER = "http://127.0.0.1:8443"
node ./env/writeEnv.js

npm run dev
```

## 실행
```powershell
docker run -p 3000:3000 -e API_SERVER=http://127.0.0.1:8443 cola314/sellbox-front:latest
```