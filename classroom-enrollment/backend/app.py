from flask import Flask, jsonify, current_app, request
from classroom import get_courses, enroll_student
app = Flask(__name__, static_folder='frontend',)


@app.route("/")
def index():
    return current_app.send_static_file('view.html')


@app.route("/courses")
def courses():
    courses = get_courses()
    return jsonify(courses)


@app.route("/enroll", methods=["GET", "POST"])
def enroll():
    if request.method == 'POST':
        print(request.json)
        content = request.json
        result = enroll_student(content["email"], "520709412969", "mhj7kfr")
        return jsonify(result)
    else:
        return jsonify("Post requests only")


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=False)
