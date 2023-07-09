from flask import Flask, render_template, request
from eaxtension import jsonE

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
    received_note = request.get_json()
    
    jsonE.dumps("./static/data/note_text.json", received_note, silent=True)
    return ""


if __name__ == "__main__":
    app.run(host="0.0.0.0")