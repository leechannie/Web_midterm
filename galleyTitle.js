// 폼1에 값이 있으면 가져와 gallery.html의 title1이라는 객체에 넣어줘 제목을 바꿀 수 있게함 
async function getTitle1(){
    try {
        const res = await axios.get('/title');
        const users = res.data;
        console.log (users.제목);

        const title1 = document.getElementById('title1');
        title1.innerHTML = users.제목;
    }catch(err){
        console.error(err);
    }
}

// 폼2의 값을 가져옴 (폼1과 알고리즘 동일)
async function getTitle2(){
    try {
        const res = await axios.get('/title');
        const users = res.data;
        console.log (users.제목);

        const title2 = document.getElementById('title2');
        title2.innerHTML = users.제목;
    }catch(err){
        console.error(err);
    }
}

// 폼3의 값을 가져옴 (폼1과 알고리즘 동일)
async function getTitle3(){
    try {
        const res = await axios.get('/title');
        const users = res.data;
        console.log (users.제목);

        const title3 = document.getElementById('title3');
        title3.innerHTML = users.제목;
    }catch(err){
        console.error(err);
    }
}

// 폼4의 값을 가져옴 (폼1과 알고리즘 동일)
async function getTitle4(){
    try {
        const res = await axios.get('/title');
        const users = res.data;
        console.log (users.제목);

        const title4 = document.getElementById('title4');
        title4.innerHTML = users.제목;
    }catch(err){
        console.error(err);
    }
}


//폼1 제출시 실행
document.getElementById('form1').addEventListener('submit', async(e) =>{
    e.preventDefault();

    //title 객체를 가져옴
    const title = e.target.title.value;
    if (!title){
        return alert('입력하세요');
    }
    try {
        await axios.post('/title', {'title':title});
        getTitle1();
    }catch (err){
        console.error(err);
    }
    //입력 form 초기화
    e.target.title.value="";
});

//폼2 제출시 실행 (폼1과 알고리즘 동일)
document.getElementById('form2').addEventListener('submit', async(e) =>{
    e.preventDefault();

    const title = e.target.title.value;
    if (!title){
        return alert('입력하세요');
    }
    try {
        await axios.post('/title', {'title':title});
        getTitle2();
    }catch (err){
        console.error(err);
    }
    e.target.title.value="";
});


//폼3 제출시 실행 (폼1과 알고리즘 동일)
document.getElementById('form3').addEventListener('submit', async(e) =>{
    e.preventDefault();

    const title = e.target.title.value;
    if (!title){
        return alert('입력하세요');
    }
    try {
        await axios.post('/title', {'title':title});
        getTitle3();
    }catch (err){
        console.error(err);
    }
    e.target.title.value="";
});

//폼4 제출시 실행 (폼1과 알고리즘 동일)
document.getElementById('form4').addEventListener('submit', async(e) =>{
    e.preventDefault();

    const title = e.target.title.value;
    if (!title){
        return alert('입력하세요');
    }
    try {
        await axios.post('/title', {'title':title});
        getTitle4();
    }catch (err){
        console.error(err);
    }
    e.target.title.value="";
});