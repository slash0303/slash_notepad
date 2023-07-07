from flask import Flask, render_template

app = Flask(__name__)

@app.route("/", methods=["GET"])
def main_page():
    return render_template("main_page.html")

@app.route("/note_page", methods=["GET", "POST"])
def note_page():
    return render_template("note_page.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0")