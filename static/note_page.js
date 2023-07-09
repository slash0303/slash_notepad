/* 참고 링크 
 * https://choar816.tistory.com/156
 */

/* note page 상단 title 세팅 */
function setTitle(){
    let noteTitle = document.getElementById("noteTitle"); 
    let titleData = localStorage.getItem("noteTitle");

    noteTitle.innerHTML = titleData;
}

/* note page 왼쪽 note list박스 렌더 */
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
        
}

/* noteRender 함수에서 반복되는 구문 묶음 
 * cate: 카테고리 데이터, note: 노트 데이터, div: 추가 내용이 배치 될 영역 */
function noteBoxSetCont(cate, note, div){
    /* cate버튼 추가 */
    for(x=0; x < cate.length; x++){
      let cateKey = cate[x];
      let noteArr = note[cateKey];

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

/*노트 저장 함수 */
function noteSav(){
    // textArea 값 읽어들임
    let noteArea = document.getElementById("textBox");
    let noteText = noteArea.value;
    // URL 파라미터 중 cate, note 읽어들임 
    let URLParams = new URL(location.href).searchParams;
    let cate = URLParams.get("cate");
    let note = URLParams.get("note");

    // note_text.json 불러옴
    fetch("../static/data/note_text.json").then(response=>response.json())
    .then(noteTexts=>{
        // 메모 json 객체
        let textObj = {
            "noteText": noteText,
            "chain":{}
        };

        // 노트 텍스트 원본 객체에 수정사항을 반영한 노트 덮어쓰기
        console.log(noteTexts);
        noteTexts[cate][note] = textObj;

        let data = {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(noteTexts)
        };
        let APIAddress = location.href.split("?")[0];
        fetch(APIAddress, data).then((res)=>res.text());
    });
}

/** 노트 변경 감지 함수*/
function noteChangeDetect(){
    let noteArea = document.getElementById("textBox");
    // 노트 입력 변경사항 감지 event listener
    noteArea.addEventListener("input", ()=>{
        noteSav();
    });
}

/** textarea 채워넣는 함수 */
function noteMainContSet(){
    let noteArea = document.getElementById("textBox");
    let URLParams = new URL(location.href).searchParams;
    let cate = URLParams.get("cate");
    let note = URLParams.get("note");
    
    let fileDir = "../static/data/note_text.json";
    fetch(fileDir).then(response=>response.json())
    .then(noteData=>{
        let noteText = noteData[cate][note]["noteText"];
        noteArea.value = noteText;
    })
}