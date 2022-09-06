const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// 퀴즈 시작 버튼 클릭
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); //정보 박스 실행
};

// 종료 버튼 클릭
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //정보 박스 숨기기
};

// 계속하기 버튼 클릭
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //정보박스 숨기기
    quiz_box.classList.add("activeQuiz"); //퀴즈 박스 실행
    showQuetions(0); //showQestions 함수 호출
    queCounter(1); //1개의 매개변수를 queCounter에 전달
    startTimer(10); //startTimer 함수 호출
    startTimerLine(0); //startTimerLine 함수 호출
};

let timeValue = 10;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// 다시하기 버튼 클릭
restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz"); //퀴즈 박스 실행
    result_box.classList.remove("activeResult"); //경과 박스 숨기기
    timeValue = 10;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //showQestions 함수 호출
    queCounter(que_numb); //que_numb 값을 queCounter에 전달
    clearInterval(counter); //카운터 초기화
    clearInterval(counterLine); //counterLine 초기화
    startTimer(timeValue); //startTimer 함수 호출
    startTimerLine(widthValue); //startTimerLine 함수 호출
    timeText.textContent = "남은 시간"; //timeText의 텍스트를 남은 시간으로 변경
    next_btn.classList.remove("show"); //다음 버튼 숨기기
};

// 퀴즈 종료 버튼 클릭
quit_quiz.onclick = () => {
    window.location.reload(); //재시작
};

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// 다음 문제 버튼 클릭
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        //질문 수가 총 질문 길이보다 작은 경우
        que_count++; //que_count 값 증가
        que_numb++; //que_numb 값 증가
        showQuetions(que_count); //showQestions 함수 호출
        queCounter(que_numb); //que_numb 값을 queCounter에 전달
        clearInterval(counter); //counter 초기화
        clearInterval(counterLine); //counterLine 초기화
        startTimer(timeValue); //startTimer 함수 호출
        startTimerLine(widthValue); //startTimerLine 함수 호출
        timeText.textContent = "남은 시간"; //timeText를 남은 시간으로 변경
        next_btn.classList.remove("show"); //다음 버튼 숨기기
    } else {
        clearInterval(counter); //counter 초기화
        clearInterval(counterLine); //counterLine 초기화
        showResult(); //showResult 함수 호출
    }
};

// 배열에서 문제 및 옵션 가져오기
function showQuetions(index) {
    const que_text = document.querySelector(".que_text");

    //질문 및 옵션에 대한 새 span 및 div 태그를 만들고 배열 인덱스를 사용하여 값 전달
    let que_tag =
        "<span>" +
        questions[index].numb +
        ". " +
        questions[index].question +
        "</span>";
    let option_tag =
        '<div class="option"><span>' +
        questions[index].options[0] +
        "</span></div>" +
        '<div class="option"><span>' +
        questions[index].options[1] +
        "</span></div>" +
        '<div class="option"><span>' +
        questions[index].options[2] +
        "</span></div>" +
        '<div class="option"><span>' +
        questions[index].options[3] +
        "</span></div>";
    que_text.innerHTML = que_tag; //que_tag 내부에 새 span 태그 추가
    option_list.innerHTML = option_tag; //option_tag 안에 새 div 태그 추가

    const option = option_list.querySelectorAll(".option");

    // onclick 속성을 사용 가능한 모든 옵션(모두 선택 가능)으로 설정
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// 아이콘에 대한 새 div 태그 만들기
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//옵션을 클릭한 경우
function optionSelected(answer) {
    clearInterval(counter); //counter 초기화
    clearInterval(counterLine); //counterLine 초기화
    let userAns = answer.textContent; //사용자 선택 옵션 가져오기
    let correcAns = questions[que_count].answer; //배열에서 정답 얻기
    const allOptions = option_list.children.length; //모든 옵션 항목 얻기

    if (userAns == correcAns) {
        //사용자가 선택한 옵션이 배열의 정답과 같은 경우
        userScore += 1; //스코어 1증가
        answer.classList.add("correct"); //정답에 초록색 효과 추가
        answer.insertAdjacentHTML("beforeend", tickIconTag); //정답에 체크 아이콘 추가
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect"); //오답에 빨간색 효과 추가
        answer.insertAdjacentHTML("beforeend", crossIconTag); //오답에 X표 아이콘 추가
        console.log("Wrong Answer");

        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) {
                //배열 응답과 일치하는 옵션이 있는 경우
                option_list.children[i].setAttribute("class", "option correct"); //일치하는 옵션에 초록색 추가
                option_list.children[i].insertAdjacentHTML(
                    "beforeend",
                    tickIconTag
                ); //일치하는 옵션에 체크아이콘 추가
                console.log("Auto selected correct answer.");
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //사용자가 옵션을 선택하면 다른 모든 옵션을 비활성화
    }
    next_btn.classList.add("show"); //사용자가 옵션을 선택한 경우 다음 버튼 표시
}

//결과
function showResult() {
    info_box.classList.remove("activeInfo"); //정보 상자 숨기기
    quiz_box.classList.remove("activeQuiz"); //퀴즈 상자 숨기기
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3) {
        // 3점 이상을 얻은 경우
        //새로운 스팬 태그 생성 및 총 점수 번호 및 총 맞힌 문제 수
        let scoreTag =
            "<span>완벽합니다! 🎉, <p>" +
            questions.length +
            "</p> 점 만점에 <p>" +
            userScore +
            "</p>점 받았습니다</span>";
        scoreText.innerHTML = scoreTag; //score_Text 내부에 새 스팬 태그 추가
    } else if (userScore > 1) {
        // 1점 이상을 얻은 경우
        let scoreTag =
            "<span>잘했습니다! 😎,  <p>" +
            questions.length +
            "</p>점 만점에 <p>" +
            userScore +
            "</p>점 받았습니다</span>";
        scoreText.innerHTML = scoreTag;
    } else {
        // 다 틀린 경우
        let scoreTag =
            "<span>아쉽네요.. 😐, <p>" +
            questions.length +
            "</p> 점 만점에 <p>" +
            userScore +
            "</p>점 받았습니다</span>";
        scoreText.innerHTML = scoreTag;
    }
}

//타이머
function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time; //timeCount 값을 시간 값으로 변경
        time--; //시간 값 감소
        if (time < 9) {
            //남은시간이 9보다 작은 경우
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; //시간 값 앞에 0 추가
        }
        if (time < 0) {
            //0보다 작은 경우
            clearInterval(counter); //counter 초기화
            timeText.textContent = "시간 초과"; //남은 시간을 시간 초과로 바꿈
            const allOptions = option_list.children.length; //모든 옵션 항목 얻기
            let correcAns = questions[que_count].answer; //배열에서 정답 얻기
            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correcAns) {
                    //배열 정답과 일치하는 옵션이 있는 경우
                    option_list.children[i].setAttribute(
                        "class",
                        "option correct"
                    ); //일치하는 옵션에 초록색 추가
                    option_list.children[i].insertAdjacentHTML(
                        "beforeend",
                        tickIconTag
                    ); //정답에 체크표시 추가
                    console.log("시간 초과: Auto selected correct answer.");
                }
            }
            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled"); // 답을 선택하면 다른 답들 비활성화
            }
            next_btn.classList.add("show"); //아무것도 선택하지 않으면 다음 버튼 보이기
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 20);
    function timer() {
        time += 1; //시간 값을 1 추가
        time_line.style.width = time + "px"; //흐른 시간을 px단위로 time_line 너비 늘리기
        if (time > 549) {
            //시간 값이 549보다 큰 경우
            clearInterval(counterLine); //counterLine 초기화
        }
    }
}

function queCounter(index) {
    //새 스팬 태그 생성 및 문제 번호 및 전체 문제 전달
    let totalQueCounTag =
        "<span><p>" +
        questions.length +
        "</p> 문제 중 <p>" +
        index +
        "</p> 번째 문제</span>";
    bottom_ques_counter.innerHTML = totalQueCounTag; //bottom_ques_counter 내부에 새 스팬 태그 추가
}
