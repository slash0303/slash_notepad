/**html 페이지 간 이동 함수 */
function pageTrans(id){

  let location;
  
  let idArr = id.split("-");

  /**header의 버튼에서 넘어갈 때 */
  if(idArr[0] == "addBtn"){
    location = "note_page";
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
  
  document.location.href = location;
}

/**main_page에서 note_page로 title text 전달 함수 (localStorage에 title text 저장) */
function sendTitle(id){
    let noteTitle = document.getElementById(id).innerHTML;
    localStorage.setItem("noteTitle", noteTitle);
}