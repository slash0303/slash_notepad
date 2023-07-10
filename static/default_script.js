/**html 페이지 간 이동 함수 */
function pageTrans(id){

  let location;
  
  let idArr = id.split("-");

  /**header의 버튼에서 넘어갈 때 */
  if(idArr[0] == "addBtn"){
    location = "add_page";
  }
  else if(idArr[0] == "titlBtn"){
    location = "/";
  }
  /**main_page의 secBox에서 넘어갈 때 */
  else if(idArr[0] == "secNote"){
    location = "note_page" + "?" + `cate=${idArr[1]}&note=${idArr[2]}`;

    sendTitle(id);
  }
  /**note_page의 noteBox에서 넘어갈 때 */
  else if(idArr[0] == "notePage"){
    let idArr = id.split("-");
    location = "note_page" + "?" + `cate=${idArr[1]}&note=${idArr[2]}`;

    sendTitle(id);
  }
  // add_page의 commit 버튼을 눌렀을 때
  else if(idArr[0]=="commitBtn"){
    let nameArr = addSendTitle();
    location = "note_page" + "?" + `cate=${nameArr[0]}&note=${nameArr[1]}`;

  }
  
  document.location.href = location;
}

/**main_page에서 note_page로 title text 전달 함수 (localStorage에 title text 저장) */
function sendTitle(id){
    let noteTitle = document.getElementById(id).innerHTML;
    localStorage.setItem("noteTitle", noteTitle);
}

/** add_page에서 note_page로 title text 전달 및 백엔드에 POST요청 */
function addSendTitle(){
  let cateName = document.getElementById("cateName").value;
  let noteName = document.getElementById("noteName").value;
  localStorage.setItem("noteTitle", noteName);

  let postObj = {
    "cate": cateName,
    "note": noteName
  }

  let data = {
    method:"POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postObj)
  }

  const APIAddress = location.href;
  fetch(APIAddress, postObj);

  return [cateName, noteName];
}