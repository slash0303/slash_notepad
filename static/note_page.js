/* 참고 링크 
 * https://choar816.tistory.com/156
 */

/* note page 상단 title 세팅 */
function setTitle(){
    let noteTitle = document.getElementById("noteTitle"); 
    let titleData = localStorage.getItem("noteTitle");

    noteTitle.innerHTML = titleData;
}

/* note page 렌더 */
function Render(){
    // json 불러오기
    const fileDir = "../static/data/note_data.json";    // note 데이터가 담긴 json파일
    fetch(fileDir).then((response)=>response.json())
    .then((strcData)=>{
        let recDiv = document.getElementById("recDiv");
        let chnDiv = document.getElementById("chnDiv");
        let noteDiv = document.getElementById("noteDiv");

        /*note_data.json의 recent, chain, all을 변수에 각각 할당*/
        let recentNotes = strcData.recNotes;
        let chainNotes = strcData.chnNotes;
        let allNotes = strcData.allNotes;
        let noteData = strcData.notes;
        
        let cateList;
        let noteList;

        for(i = 0; i < 3; i++){
            switch(i){
                /* Recent notes 렌더 */
                case 0:
                    cateList = recentNotes.cateTitl;
                    noteList = noteData;

                    noteBoxSetCont(cateList, noteList, recDiv);
                    
                    break;
                
                /* Chained notes 렌더 */
                case 1:
                    cateList = chainNotes.cateTitl;
                    noteList = noteData;

                    noteBoxSetCont(cateList, noteList, chnDiv);

                    break;
                
                /* All notes 렌더 */
                case 2:
                    cateList = allNotes.cateTitl;
                    noteList = noteData;
                    
                    noteBoxSetCont(cateList, noteList, noteDiv);

                    break;
            }
        }
    });
    noteMainContSet();
    // title 설정
    document.title = document.getElementById("noteTitle").innerHTML + " - Slash Notepad";
}

/* noteRender 함수에서 반복되는 구문 묶음 
 * cate: 카테고리 데이터, note: 노트 데이터, div: 추가 내용이 배치 될 영역 */
function noteBoxSetCont(cate, note, div){
    /* cate버튼 추가 */
    for(x=0; x < cate.length; x++){
        console.log(note)
        let cateKey = cate[x];
        let noteArr = note[cateKey];
        console.log(noteArr);
        console.log(cateKey);

        let cateBtn = document.createElement("button");
        let cateTxt = document.createTextNode(cateKey);
        let cateDiv = document.createElement("div");

        /* cateDiv 속성 설정 */
        cateDiv.setAttribute("id", cateKey + "-div-" + x);
        cateDiv.setAttribute("class", "side-cate-area");
        /* cateBtn 속성 설정 */
        cateBtn.setAttribute("id", cateKey + x);
        cateBtn.setAttribute("class", "side-cate-btn");
        cateBtn.appendChild(cateTxt);
        /* 요소 추가 */
        div.appendChild(cateDiv);
        cateDiv.appendChild(cateBtn);
        /* note버튼 (cate의 하위요소) 추가 */
        for (y = 0; y < noteArr.length; y++){
            let noteName = noteArr[y];

            /* noteBtn 속성 설정 */
            let noteBtn = document.createElement("button");
            let noteTxt = document.createTextNode(noteName);
            let noteId = `notePage-${cateKey}-${noteName}-${x}-${y}`
            noteBtn.setAttribute("id", noteId);
            noteBtn.setAttribute("class", "side-note-btn");
            noteBtn.setAttribute("onclick", "pageTrans(id)");
            noteBtn.appendChild(noteTxt);
            /* 요소 추가 */
            cateDiv.appendChild(noteBtn);
        }
    }
}

/** 노트 저장 함수 */
function noteSav(){
    // textArea 값 읽어들임
    let noteArea = document.getElementById("textBox");
    let noteText = noteArea.innerHTML;
    let noteAlign = getComputedStyle(noteArea)["textAlign"];
    // URL 파라미터 중 cate, note 읽어들임 
    let URLParams = new URL(location.href).searchParams;
    let cate = URLParams.get("cate");
    let note = URLParams.get("note");

    // 메모 json 객체
    let textObj ={
        "note": {
            "noteText": noteText,
            "chain": {},
            "align": noteAlign
        },
        "params": {
            "cate": cate,
            "note": note
        }
    }

    console.log(textObj);

    let data = {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(textObj)
    };
    let APIAddress = location.href.split("?")[0];
    fetch(APIAddress, data).then((res)=>res.text());
}

/** 노트 변경 감지 함수*/
function noteChangeDetect(){
    let noteArea = document.getElementById("textBox");
    // 노트 입력 변경사항 감지 event listener
    noteArea.addEventListener("input", ()=>{
        noteSav();
    });
}

/** textarea(교체 후 div) 채워넣는 함수 */
function noteMainContSet(){
    let noteArea = document.getElementById("textBox");
    // url에서 파라미터 가져오기 (cate, note)
    let URLParams = new URL(location.href).searchParams;
    let cate = URLParams.get("cate");
    let note = URLParams.get("note");
    
    let fileDir = "../static/data/note_text.json";
    fetch(fileDir).then(response=>response.json())
    .then(noteData=>{
        try{
            let noteText = noteData[cate][note]["noteText"];
            noteArea.innerText = noteText;
            noteArea.style["textAlign"] = noteData[cate][note]["align"];
        }
        catch{
            noteArea.innerText = "";
        }
    });
}

/** tool box의 text align 기능 함수 */
function textAlign(id){
    let alignLBtn = document.getElementById("alignLeft");
    let alignCBtn = document.getElementById("alignCenter");
    let alignRBtn = document.getElementById("alignRight");
    let textArea = document.getElementById("textBox");

    const hiColor = "#D9D9D9";
    const noneColor = "#00000000";

    switch(id){
        case "alignLeft":
            textArea.style["textAlign"]= "left";
            alignLBtn.style["backgroundColor"] = hiColor;
            alignCBtn.style["backgroundColor"] = noneColor;
            alignRBtn.style["backgroundColor"] = noneColor;
            break;

        case "alignCenter":
            textArea.style["textAlign"] = "center";
            alignCBtn.style["backgroundColor"] = hiColor;
            alignLBtn.style["backgroundColor"] = noneColor;
            alignRBtn.style["backgroundColor"] = noneColor;
            break;

        case "alignRight":
            textArea.style["textAlign"] = "right";
            alignRBtn.style["backgroundColor"] = hiColor;
            alignLBtn.style["backgroundColor"] = noneColor;
            alignCBtn.style["backgroundColor"] = noneColor;
            break;
    }

    noteSav();
    
}

/** 텍스트 선택 감지 함수 */
function textSelect(){
    selectedArea = window.getSelection();

    addEventListener("selectionchange", ()=>{
        // text 선택한 부분 버튼 누르면 효과 적용되게 만들기
        console.log("selected");
    });
}

/** 텍스트 사이즈 변경 함수 - 선택 감지 후 특정 부분만 키우기. 선택 된 부분은 div로 감싸기 */
function textSize(){
    
}

/** 텍스트 속성 변경 함수 - 선택 감지 후 특정 부분만 적용시키기. 선택 된 부분에 태그 달기 */
function textAttr(){

}