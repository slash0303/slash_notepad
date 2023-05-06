/**html 페이지 간 이동 함수 */
function pageTrans(id){

  let location = ".html";
  
  /**header의 버튼에서 넘어갈 때 */
  if(id == "addBtn"){
    location = "note_page" + location;
  }
  else if(id == "titlBtn"){
    location = "main_page" + location;
  }
  /**main_page의 secBox에서 넘어갈 때 */
  else if(id.slice(0, 7) == "secNote"){
    location = "note_page" + location;

    sendTitle(id);
  }
  /**note_page의 noteBox에서 넘어갈 때 */
  else if(id.slice(0, 4) == "note"){
    location = "note_page" + location;

    sendTitle(id);
  }
  
  document.location.href = location;
}

/**main_page에서 note_page로 title text 전달 함수 (localStorage에 title text 저장) */
function sendTitle(id){
  let noteTitle = document.getElementById(id).innerHTML;
  localStorage.setItem("noteTitle", noteTitle);
}