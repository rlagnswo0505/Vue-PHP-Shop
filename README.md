# vue-shop-pjt

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

데이터 삽입 시, PRIMERY KEY나 UNIQUE KEY가 중복되었을 경우 지정한 데이터만 UPDATE하는 방법.
  - on duplicate key update 사용법
  - my.ini 파일을 찾아서
  - innodb_autoinc_lock_mode=0 <- 문구 추가 띄어쓰기 없어야 함

index.js
setInterval(() => {
  let imgs = document.querySelectorAll('img');
  imgs.forEach((img) => {
    img.src = 'https://images.unsplash.com/photo-1497752531616-c3afd9760a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGFuaW1hbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60';
  });
}, 500);

manifest
{
  "manifest_version": 3,
  "name": "image to any",
  "version": "0.1",
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["index.js"]
    }
  ]
}
