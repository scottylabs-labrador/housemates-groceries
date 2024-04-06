from flask import Flask
from ocr import scan_receipt

"""
https://flask.palletsprojects.com/en/3.0.x/quickstart/
https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project"""

app = Flask(__name__)

@app.route("/receiptLines")
def hello_world():
    print("hi i am here")
    return {'time': 5}

"""
@app.route("/scan", methods=["POST"])
def scan_receipt_image(img):
    # Image is a 
    scan_receipt(img, "receipt_img")"""