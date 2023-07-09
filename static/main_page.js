let widSetCount = true;

/** 처음 박스 클릭 시  */
function setSecBox(id){
    console.log(id + "클릭 됨");
    
    // 두 번째 박스 너비 변경
    let secBox = document.getElementById("secBox");
    secBox.style.width = "25%";

    // 두 번째 박스 제목 설정
    let pressedBtn  = document.getElementById(id);
    let secTitl = document.getElementById("secTitl");
    let setText = pressedBtn.innerText;

    secTitl.innerText = setText;

    // 두 번째 박스 컨텐츠 설정
    setSecCont(id);
    
    // firBox의 텍스트 색상 변경
    setFirTxtColor(id);
}

/** secBox에 컨텐츠 설정 */
function setSecCont(id){
    id += "s"   // id json key에 맞게 변환

    // secCont 삭제 및 새로 생성
    let secBoxDiv = document.getElementById("secBox");
    let prevContDiv = document.getElementById("secCont");
    console.log(prevContDiv);
    prevContDiv.remove();
    let contDiv = document.createElement("div");
    contDiv.setAttribute("id", "secCont");
    
    const fileDir = "../static/data/note_data.json";    // note 데이터가 담긴 json파일
    fetch(fileDir).then((response)=>response.json())
    .then((strcData)=>{

        let cateData = strcData[id].cateTitl;
        let noteData = strcData.notes;
        // cateBtn 추가
        for(x = 0; x < cateData.length; x++){
            let cateKey = cateData[x];
            let cateDiv = document.createElement("div");
            let cateP = document.createElement("p");
            let cateBtn = document.createElement("button");
            let cateTxt = document.createTextNode(cateKey);

            // cateDiv 속성 설정
            cateDiv.setAttribute("id", cateKey + "-div-" + x);
            cateDiv.setAttribute("class", "cate-group");
            // cateBtn 속성 설정
            cateBtn.setAttribute("id", "secCate" + "-" + x);
            cateBtn.setAttribute("class", "cate-btn");
            cateBtn.appendChild(cateTxt);
            // 자식요소 설정
            cateP.appendChild(cateBtn);
            cateDiv.appendChild(cateP);
            contDiv.appendChild(cateDiv);
            
            // noteBtn 추가
            let noteArr = noteData[cateKey]
            for(y = 0; y < noteArr.length; y++){
                console.log(noteArr);
                let noteP = document.createElement("p");
                let noteBtn = document.createElement("button");
                let noteTxt = document.createTextNode(noteArr[y]);
                
                // noteBtn 속성 설정
                let noteIdForm = `secNote-${cateKey}-${noteData[cateKey][y]}-${x}-${y}`;
                noteBtn.setAttribute("id", noteIdForm);
                noteBtn.setAttribute("class", "note-btn");
                noteBtn.setAttribute("onclick", "pageTrans(id)");
                noteBtn.appendChild(noteTxt);
                noteBtn.addEventListener("mouseover", ()=>{prevBoxCont(noteIdForm)});
                noteBtn.addEventListener("mouseleave", ()=>{
                    let prevTitl = document.getElementById("prevTitl");
                    prevTitl.remove();
                    let prevText = document.getElementById("prevText");
                    prevText.remove();
                })
                // 자식요소 설정
                noteP.appendChild(noteBtn);
                cateDiv.appendChild(noteP);
            }

            // secBox에 최종 결과물 삽입
            secBoxDiv.appendChild(contDiv);
        }
    });
}

/** prevBox에 컨텐츠 설정 */
function prevBoxCont(id){
    // id 슬라이싱
    let idArr = id.split("-");  // 0: secNote, 1: 노트 카테고리, 2: 노트명, 3, 4: x번째 카테고리 y번째 노트
    const fileDir = "../static/data/note_text.json";
    fetch(fileDir).then(response=>response.json())
    .then(data=>{
        let cateName = idArr[1];
        let noteName = idArr[2];
        let noteData = data[cateName][noteName]["noteText"];
        let noteDataNode = document.createTextNode(noteData);
        let TitlDataNode = document.createTextNode(noteName);
        // prevText 속성 설정
        let noteText = document.createElement("div");
        noteText.setAttribute("id", "prevText");
        noteText.setAttribute("class", "preview-text");
        noteText.appendChild(noteDataNode);
        // prevTitl 속성 설정
        let prevTitl = document.createElement("div");
        prevTitl.setAttribute("id", "prevTitl");
        prevTitl.setAttribute("class", "preview-title");
        prevTitl.appendChild(TitlDataNode);

        // prevBox에 최종 결과물 삽입
        let prevBox = document.getElementById("prevBox");
        prevBox.appendChild(prevTitl);
        prevBox.appendChild(noteText);
    });
}

/** cateBtn 클릭 시 색상 변경*/
function setFirTxtColor(id){

    let recCate = document.getElementById("recCate");
    let recNote = document.getElementById("recNote");
    let allNote = document.getElementById("allNote");

    const hiColor = "#8CD75E"
    const black = "#000000"

    if(id == "recCate"){
        recCate.style.color = hiColor;
        recNote.style.color = black;
        allNote.style.color = black;
    }
    else if(id == "recNote"){
        recNote.style.color = hiColor;
        recCate.style.color = black;
        allNote.style.color = black
    }
    else if(id == "allNote"){
        allNote.style.color = hiColor;
        recCate.style.color = black;
        recNote.style.color = black;
    }
}

let cateBtnCount = 1;

function addCateBtn(cateBtnCount){
    let cateBtn = document.createElement("button");
    let secBox = document.getElementById("secBox");

    cateBtn.setAttribute("id","secCate" + cateBtnCount);
    cateBtn.setAttribute("class", "second-content");

    secBox.appendChild(cateBtn);
}

function addNoteBtn(noteBtnCount){
    let noteBtn = document.createElement("button");
    let parCate = document.getElementById("cateNote");

    noteBtn.setAttribute("id","secNote" + noteBtnCount);
    noteBtn.setAttribute("class", "second-content");
    noteBtn.setAttribute("onclick","pageTrans(id)");

    parCate.appendChild(noteBtn);
}

function cateClicked(id){
    let befCateId = localStorage.getItem("befCate");
    let befCate = document.getElementById(befCateId);
    localStorage.setItem("befCate", id);
    let cateBtn = document.getElementById(id);
    befCate.style.color = "#676767";
    cateBtn.style.color = "#95d16f";
}



    /** 박스 확장 애니메이션(3.4s), 컨텐츠 수정 
     * https://jongdai.tistory.com/54 - 애니메이션
     * https://ludeno-studying.tistory.com/79 - 요소 추가
     * https://zion827.tistory.com/31 - 요소 수정
     * https://fresh-mint.tistory.com/entry/css-%EB%93%9C%EB%9E%98%EA%B7%B8-%EB%B0%A9%EC%A7%80 - css 드래그 방지 코드
     * 참고해서 코드 짤 것
     */