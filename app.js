const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const msg = require('dialog');

const app = express();
app.set('port', process.env.PORT||8000);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'img'))); //static을 img로 설정해 img파일의 이미지를 불러올 수 있게함

// 아이디와 비밀번호가 맞으면 main 페이지로 이동 
app.get('/', (req, res) => {
    console.log(req.cookies.start);
    if(req.cookies.start) 
        res.sendFile(path.join(__dirname,'./main.html')); 
    else
        res.redirect('/start');
});

// start.html로 가는 루틴
app.get('/start', (req, res) => {
    res.sendFile(path.join(__dirname,'./start.html')); 
});

// main.html로 가는 루틴
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname,'./main.html')); 
});

// sns.html로 가는 루틴
app.get('/sns', (req, res) => {
    res.sendFile(path.join(__dirname,'./sns.html')); 
});

// 아이디나 비밀번호가 틀리면 틀렸음을 알리고 처음으로 가는 루틴
app.get('/retry', (req, res) => {
    msg.info("아이디나 비밀번호가 틀렸어요❌");
    res.sendFile(path.join(__dirname,'./start.html')); 
});

// body-parser과 cookie-parser를 이용해 로그인 내용을 저장
app.post('/start', (req, res) => { 
    const {name, bday} = req.body //body-parser과 구조분해 할당
    console.log(req.body);

    if(name == '이찬희' & bday=='0213'){
        res.cookie('start', true, {  //cookie-parser
            maxAge: 60000, 
            httpOnly: true,
            secure: false,
            path:'/',
        } );
        res.redirect('/');
    } else{
        res.redirect('/retry'); //틀리면 retry로 가서 알림을 줌
    }
});


app.listen(app.get('port'), () => {
    console.log(`App liestening at http://localhost:${app.get('port')}`)
})