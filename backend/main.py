from flask import jsonify, Flask, request
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from services.sender import Sender
import json 
import re

app = Flask(__name__)

EMAIL_REGEX = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"
REGEX_PATH = re.compile(EMAIL_REGEX)

CORS(app, origins=["http://localhost:5173"])

limiter = Limiter(
    key_func=get_remote_address,
    app=app,
    default_limits=["10 per minute"]
)

with open("../SECRETS.json", "r") as f:
    data = json.load(f)

sen = Sender(data["key"],data["mail"])

@app.route("/", methods=["GET"])
@limiter.limit("5 per minute")
def status():
    return jsonify({"status": True})

@app.route("/send", methods=["POST"])
@limiter.limit("10 per minute")
def send():
    info = request.get_json()

    if not data["enabled"]:
        return jsonify({
            "status":False,
            "err":"Not enabled yet.",
        }), 400

    if not info:
        return jsonify({
            "status": False,
            "err": "Invalid JSON!"
        }), 400

    email = info.get("mail")
    content = info.get("content")

    if not email or not REGEX_PATH.fullmatch(email):
        return jsonify({
            "status": False,
            "err": "Invalid email!"
        }), 400

    return sen.send({
        "subject": f"SPECTRUM BITS QUICK CONTACT FROM: {email}",
        "body": f"<h1>This message was written by: {email}</h1>\n{content}"
    })

@app.errorhandler(429)
def ratelimit_handler(e):
    return jsonify({
        "status": False,
        "err": "Too many requests, please slow down.",
        "retry_after": str(e.description)
    }), 429

if __name__ == "__main__":
    app.run(debug=True)