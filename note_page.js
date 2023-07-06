/* 참고 링크 
 * https://choar816.tistory.com/156
 * 
 */

/* note page 상단 title 세팅 */
function setTitle(){
    let noteTitle = document.getElementById("noteTitle"); 
    let titleData = localStorage.getItem("noteTitle");

    noteTitle.innerHTML = titleData;
    console.log(titleData);
}

function titleSlice(){
    let noteTitle = document.getElementById("noteTitle");
    let headerWid = document.getElementById("header");
    let TitlBtnWid = document.getElementById("titlBtn").offsetWidth;
    let addBtnWid = document.getElementById("addBtn").offsetWidth;
    /*
     * width 받아서 header - (titlebtn + addbtn) = title
     */
}

/*note page 왼쪽 note list박스 렌더 */
function noteListRender(){
    let strcData;

    // json 불러오기
    const fileDir = "./data/note_data.json";    // note 데이터가 담긴 json파일
    fetch(fileDir).then((response)=>response.json())
    .then((strcData)=>{
        let recDiv = document.getElementById("recDiv");
        let chnDiv = document.getElementById("chnDiv");
        let noteDiv = document.getElementById("noteDiv");

        /*note_data.json의 recent, chain, all을 변수에 각각 할당*/
        let recentNotes = strcData.recentNotes;
        let chainNotes = strcData.chainNotes;
        let allNotes = strcData.allNotes;

        console.log(recentNotes);
        console.log(chainNotes);
        console.log(allNotes);
        
        let cateList;
        let noteList;

        for(i = 0; i < 3; i++){
            switch(i){
                /*Recent notes 렌더 */
                case 0:
                    cateList = recentNotes.cateTitl;
                    noteList = recentNotes.noteTitl;

                    noteRenderRepeat(cateList, noteList, recDiv);
                    
                    break;
                
                /*Chained notes 렌더 */
                case 1:
                    cateList = chainNotes.cateTitl;
                    noteList = chainNotes.noteTitl;

                    noteRenderRepeat(cateList, noteList, chnDiv);

                    break;
                
                /*All notes 렌더 */
                case 2:
                    cateList = allNotes.cateTitl;
                    noteList = allNotes.noteTitl;
                    
                    noteRenderRepeat(cateList, noteList, noteDiv);

                    break;
                    // TODO 문제상황: 제목이 안나옴;
            }
        }
        /*각 카테고리의 하위 노트 가져오기 */
    });
        
}

/* noteRender 함수에서 반복되는 구문 묶음 
 * cate: 카테고리 데이터, note: 노트 데이터, div: 추가 내용이 배치 될 영역 */
function noteRenderRepeat(cate, note, div){
    /*cate버튼 추가 */
    for(x = 0; x < cate.length; x++){
      let cateKey = cate[x];
      let noteArr = note[cateKey];

      let cateBtn = document.createElement("button");
      let cateTxt = document.createTextNode(cateKey);
      let cateDiv = document.createElement("div");

      /*cateDiv 속성 설정 */
      cateDiv.setAttribute("id", cateKey + "-div-" + x);
      cateDiv.setAttribute("class", "side-cate-area");
      /*cateBtn 속성 설정 */
      cateBtn.setAttribute("id", cateKey + x);
      cateBtn.setAttribute("class", "side-cate-btn");
      cateBtn.appendChild(cateTxt);
      /*요소 추가 */
      div.appendChild(cateDiv);
      cateDiv.appendChild(cateBtn);

      /*note버튼 (cate의 하위요소) 추가 */
      for (y = 0; y < noteArr.length; y++){
          let noteName = noteArr[y];
          
          /*noteBtn 속성 설정 */
          let noteBtn = document.createElement("button");
          let noteTxt = document.createTextNode(noteName);
          let noteId = noteName + x + "-" + y
          noteBtn.setAttribute("id", noteId);
          noteBtn.setAttribute("class", "side-note-btn");
          noteBtn.appendChild(noteTxt);
          /**요소 추가 */
          cateDiv.appendChild(noteBtn);
      }
  }
}

/*노트 기록 함수(임시) */
function noteSav(){
    let noteArea = document.getElementById("text-box");
    let noteText = noteArea.innerHTML;

    const fileDir = "./data/note_text.json";

    fetch(fileDir).then(response=>response.json())      // fetch로 읽은 데이터를 json으로 변환
    .then(data=>{
        data;
        // TODO: 저장 기능 구현

    })
}

/*노트 변경 감지 함수*/
function noteChangeDetect(){
    let noteArea = document.getElementById("text-box");
    // 노트 입력 변경사항 감지 event listener
    noteArea.addEventListener("input", ()=>{
        console.log(noteArea.value);
    });
}