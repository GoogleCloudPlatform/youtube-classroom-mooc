from flask import Flask, jsonify, current_app, request, render_template
from classroom import get_courses, enroll_student

app = Flask(__name__, static_folder='static', static_url_path='/static')
# app = Flask(__name__, static_url_path='/static')


@app.route("/")
def index():
    return current_app.send_static_file('view.html')


@app.route("/studyhall")
def studyhall():
    return current_app.send_static_file('studyhall.html')


# @app.route("/bg.png")
# def image():
#     return current_app.render_template('bg.png')


@app.route("/courses")
def courses():
    courses = get_courses()
    return jsonify(courses)


@app.route("/enroll", methods=["GET", "POST"])
def enroll():
    if request.method == 'POST':
        print(request.json)
        content = request.json
        result = enroll_student(content["email"], "532418880209", "4k6mr7m")
        return jsonify(result)
    else:
        return jsonify("Post requests only")


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)
