let widSetCount = true;

/** 처음 박스 클릭 시  */
function setSecTxt(id){
    console.log(id + "클릭 됨");
    
    let pressedBtn  = document.getElementById(id);
    let secTitl = document.getElementById("secTitl");
    
    let setText = pressedBtn.innerText;

    secTitl.innerText = setText;

    setFirTxtColor(id);
}

/** cate btn 클릭 시 색상 변경*/
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