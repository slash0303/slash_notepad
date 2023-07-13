from flask import Flask, render_template, request
from eaxtension import jsonE
from eaxtension import LogE

app = Flask(__name__)

@app.route("/", methods=["GET"])
def main_page():
    return render_template("main_page.html")

@app.route("/note_page", methods=["GET"])
def note_page():
    return render_template("note_page.html")

# note page의 text area POST 요청 처리 함수
@app.route("/note_page", methods=["POST"])
def note_sav():
    # POST로 받아온 json 데이터
    received_data = request.get_json()
    received_note = received_data["note"]
    received_params = received_data["params"]
    cate = received_params["cate"]
    note = received_params["note"]

    # 이전 json에 덮어쓰기
    prev_notes = jsonE.load("./static/data/note_text.json")
    try:
        prev_notes[cate][note] = received_note
    except KeyError:
        data_form = {}
        data_form[note] = received_note
        prev_notes[cate] = data_form
    
    LogE.g("prev notes", prev_notes)

    jsonE.dumps("./static/data/note_text.json", prev_notes, silent=True)
    
    # recent_manage 인자
    note_dict = {"cate": cate, "note": note}
    recent_manage(note_dict)
    return ""

@app.route("/add_page", methods=["GET"])
def add_page():
    return render_template("add_page.html")

# recent notes 항목 관리 함수
def recent_manage(current_note):
    LogE.d("받아온거", current_note)
    note_data = jsonE.load("./static/data/note_data.json")
    rec_notes = note_data["recNotes"]["cateTitl"]
    rec_len = len(rec_notes)
    if current_note["cate"] in rec_notes:
        LogE.d("response note", current_note["note"])
        pass
    else:
        del rec_notes[rec_len - 1]
        new_rec_notes = [current_note["cate"]] + rec_notes
        note_data["recNotes"]["cateTitl"] = new_rec_notes
        jsonE.dumps("./static/data/note_data.json", note_data)
    return ""

# 추가된 노트 관리 함수
def add_manage(added_note):
    note_data = jsonE.load("./static/data/note_text.json")
    notes = note_data["notes"]
    try:
        prev_cate_notes = notes[added_note["cate"]]
        prev_cate_notes.append(added_note["cate"])
        notes[added_note["cate"]] = prev_cate_notes
    except:
        notes[added_note["cate"]] = [added_note["note"]]

if __name__ == "__main__":
    app.run(host="0.0.0.0")