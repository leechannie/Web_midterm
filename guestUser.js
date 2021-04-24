//페이지 로딩 시 사용자 데이터 가져오는 함수
async function getUser(){
    try {
        const res = await axios.get('/users');
        const users = res.data;

        const list = document.getElementById('list');
        list.innerHTML = '';

        //사용자마다 반복적으로 화면 표시 및 이벤트 연결
        Object.keys(users).map(function(key){ //users는 배열
            //1. 사용자 영역, 이름 DOM 객체 생성
            const userDiv = document.createElement('div');
            const span = document.createElement('span');
            const d = new Date(); //날짜와 시간 추가 
            const day = d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()+" "+ d.getHours()+":"+d.getMinutes();
            span.innerHTML = users[key].name + 
                                ' ('+ day + ') <br>' + users[key].memo +'&nbsp &nbsp';
        
            //2. 사용자 수정 버튼 생성
            const edit = document.createElement('button');
            edit.textContent = '수정';
            // 수정버튼 클릭 이벤트
            edit.addEventListener('click', async() => {
                const name = prompt('수정할 이름을 입력하세요');
                const memo = prompt('수정할 글을 입력하세요');
                if(!name || !memo){
                    return alert('수정할 이름과 글을 반드시 입력하셔야 합니다');
                }
                try{
                    //서버에 사용자 수정 요청 & getUser() 실행
                    await axios.put('/user/' + key, {name, memo});
                    getUser();
                } catch(err){
                    console.error(err);
                }
            });

            //3. 사용자 삭제 버튼 생성
            const remove = document.createElement('button');
            remove.textContent = '삭제';

            //삭제 버튼 클릭 이벤트 리스너 등록
            remove.addEventListener('click', async() => {
                try{ //사용자 삭제 요청 
                    await axios.delete('/user/' + key);
                    getUser();
                }catch(err){
                    console.error(err);
                }
            });

            //출력
            userDiv.appendChild(span);
            userDiv.appendChild(edit);
            userDiv.appendChild(remove);
            list.appendChild(userDiv);
            console.log(res.data);
        });
    }catch(err){
        console.error(err);
    }
}

//화면 로딩 시 getUsesr 호출
window.onload = getUser;

//폼 제출시 실행
document.getElementById('form').addEventListener('submit', async(e) =>{
    e.preventDefault();

    const name = e.target.name.value;
    const memo = e.target.memo.value;
    if (!name || !memo){
        return alert('이름과 방명록을 입력하세요');
    }
    try {
        // 특정 사용자에 대한 key값을 넣어서 전달 
        await axios.post('/user', {name, memo});
        getUser();
    }catch (err){
        console.error(err);
    }
    //입력 form 초기화
    e.target.name.value="";
    e.target.memo.value = "";
});