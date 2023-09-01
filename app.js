const puppeteer = require('puppeteer');
require("dotenv").config();

(async () => {
const userId = process.env.USER_ID;
const userPw = process.env.USER_PW;
const nickname = process.env.NICKNAME;
const choosedStudent = process.env.CHOSEN_STUDENT;
const title = process.env.TITLE;
const contents = process.env.CONTENTS;
const imageFile = process.env.IMAGE_FILE;
    

const browser = await puppeteer.launch({headless: false,args:['--window-size=1920,1080']});
const page = await browser.newPage();
await page.setBypassCSP(true);

// Navigate the page to a URL
await page.goto('https://www.classnote.com/login');

// Set screen size
await page.setViewport({width: 1920, height: 1080});

//아이디 비번 입력

await page.waitForSelector('#__next > div.next-j7qwjs.exyd9rc0 > main > div > form > div:nth-child(1) > div > div > div > div > input')
await page.waitForSelector('#current-password')

await page.type('#__next > div.next-j7qwjs.exyd9rc0 > main > div > form > div:nth-child(1) > div > div > div > div > input', userId);
await page.type('#current-password', userPw);

//로그인 버튼 클릭
await page.click('#__next > div.next-j7qwjs.exyd9rc0 > main > div > form > button')

//앨범 클릭
let target = "//p[text()='앨범']/ancestor::a"
await page.waitForXPath(target)
let s = await page.$x(target)
s = s[0]
await s.click()

//-------Loop Here---------

//   작성하기 클릭
target = "//span[text()='작성하기']/ancestor::button"
await page.waitForXPath(target)
s = await page.$x(target)
s = s[0]
await s.click()

//   호칭설정 클릭
target = "//div[text()='글을 작성할 때 표시되는 호칭을 설정해 주세요']/child::*[2]/child::*[1]/child::*[2]/child::*[1]"
await page.waitForXPath(target)
s = await page.$x(target)
s = s[0]
await s.click()

//호칭 입력칸 클릭
target = "//div[text()='글을 작성할 때 표시되는 호칭을 설정해 주세요']/child::*[2]/child::*[1]/child::*[2]/child::*[3]"
await page.waitForXPath(target)
s = await page.$x(target)
s = s[0]
await s.click()
await s.type(nickname)

//호칭 확인 클릭
target = "//button/span[text()='확인']"
await page.waitForXPath(target)
s = await page.$x(target)
s = s[0]
await s.click()

// 학생 선택 클릭
target = "//button/span[text()='학생 선택']/ancestor::button"
await page.waitForXPath(target)
s = await page.$x(target)
s = s[0]
await s.click()

// 학생 선택
target = `//p[text()='${choosedStudent}']/parent::div/parent::div/parent::button`
await page.waitForXPath(target)
s = await page.$x(target)
s = s[0]
await s.click()

// 학생 선택 확인 클릭
target = "//span[text()='선택완료']/ancestor::button"
await page.waitForXPath(target)
s = await page.$x(target)
s = s[0]
await s.click()

//제목 입력
target = "//input[@placeholder='제목을 작성해 주세요.']"
await page.waitForXPath(target)
s = await page.$x(target)
s = s[0]
await s.click()
await s.type(title)

//내용 입력
target = "//textarea[@class='e1s8ox2s2 css-mnfva1 e17mff8u1']"
await page.waitForXPath(target)
s = await page.$x(target)
s = s[0]
await s.click()
await s.type(contents)

//파일 업로드
const inputUploadHandle = await page.$('input[type=file]');
inputUploadHandle.uploadFile(imageFile);


//임시저장 클릭
await new Promise((page) => setTimeout(page, 1000));

target = "//span[text()='임시저장']/ancestor::button"
await page.waitForXPath(target)
s = await page.$x(target)
s = s[0]
await s.click()

})();


//학생 선택 클릭
// await page.click('#app > div.css-2wr4ct.e1m34v9u0 > div > div.css-1cb3fzz.ej8exs40 > main > div.css-16fegd5.ej8exs42 > form > div.css-8vci5m.e1unzpmg0 > div > div > div:nth-child(1) > div.css-ynixsf.e1czd4pz2 > div > button')
// await page.waitForSelector('body > div:nth-child(26) > div > div > div.css-k008qs.e1cqyb8j3 > div.css-rub9yj.eo3jtng0 > div.css-5lvnm7.eo3jtng2')
// const buttons = await page.$$('body > div:nth-child(26) > div > div > div.css-k008qs.e1cqyb8j3 > div.css-rub9yj.eo3jtng0 > div.css-5lvnm7.eo3jtng2 > div button');
// let students = []
// for (let button of buttons) {
//   // 각 버튼의 두 번째 div의 p 태그 텍스트 가져오기
//   let text = await button.$eval('div:nth-child(2) p', node => node.innerText);
//   students.push(text)
// }
// console.log(students)

