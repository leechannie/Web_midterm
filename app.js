const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const msg = require('dialog');


const app = express();
const port =process.env.PORT||8000;
//app.set('port', process.env.PORT||8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()); 
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './'))); //static을 현재 폴더로 연결 (그렇기에 이미지들은 img/로 한 번 더 폴더를 들어가야함)
const users = {}; //유저 정보 유지 
const title = {};

// 아이디와 비밀번호가 맞으면 main 페이지로 이동 
app.get('/', (req, res) => {
    console.log(req.cookies.start);
    if(req.cookies.start) //cookie-parser로 cookie 데이터를 넣어줌
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

// pug를 이용한 sns.pug 가는 루틴
app.get('/sns', (req, res) => {
    res.render('sns');
});

// guest.html로 가는 루틴
app.get('/guest', (req, res) => {
    res.sendFile(path.join(__dirname,'./guest.html')); 
});

// gallery.html로 가는 루틴
app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname,'./gallery.html')); 
});

// 이름이나 생일이 틀리면 틀렸음을 알리고 처음으로 가는 루틴
app.get('/retry', (req, res) => {
    msg.info("이름 혹은 생일이 틀렸어요❌");
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

// guestUser에 users 데이터 전달 
app.get('/users', (req, res) => { 
    res.send(users);
});

// guest.html form에 담긴 name과 memo 데이터를 받음
app.post('/user', (req, res) => { 
    const {name, memo} = req.body;
    const id = Date.now(); 
    users[id] = {name, memo}; //users에 index로 현재 시간을 넣어 name과 memo 저장
    res.end();
});

// id를 기반으로 name과 memo 수정
app.put('/user/:id', (req, res) => { 
    const {name, memo} = req.body;
    users[req.params.id] = {name, memo};
    res.end();
});

// id를 기반으로 name과 memo 삭제 
app.delete('/user/:id', (req, res) => { 
    delete users[req.params.id];
    res.end();
});

// 라우터로 묶기 
app.route('/title')
    // galleyTitle에 데이터 전달 
    .get( (req, res) => {  
        console.log(title);
        res.send(title);
    })
    // galleyTitle을 통해 form에 담긴 title 가져오기 (form이 여러개지만 누적형 데이터가 아니기에 하나로 통일해 사용)
    .post( (req, res) => {
        const a = req.body.title; //body-parser 사용
        title.제목 = a;
        res.end();
});

// 오류 처리 
app.use ((err, req, res, next) => {
 res.status(401).send(err.message);
}); 

app.listen(app.get('port'), () => {
    console.log(`App liestening at http://localhost:${app.get('port')}`)
})
