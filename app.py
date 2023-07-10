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

@app.route("/note_page", methods=["POST"])
def note_sav():
    # POST로 받아온 json 데이터
    received_data = request.get_json()
    received_note = received_data["note"]
    received_params = received_data["params"]
    cate = received_params["cate"]
    note = received_params["note"]

    prev_notes = jsonE.load("./static/data/note_text.json")
    try:
        prev_notes[cate][note] = received_note
    except KeyError:
        data_form = {}
        data_form[note] = received_note
        prev_notes[cate] = data_form

    
    jsonE.dumps("./static/data/note_text.json", prev_notes, silent=True)
    return ""


if __name__ == "__main__":
    app.run(host="0.0.0.0")