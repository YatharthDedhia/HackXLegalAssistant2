from PIL import Image
import base64
import io
import pytesseract
from flask import Flask, request

# Set the path to the Tesseract executable
pytesseract.pytesseract.tesseract_cmd = r'/usr/bin/tesseract'

def ocr_from_base64(base64_image):
    # Decode the base64 image
    decoded_image = base64.b64decode(base64_image)

    # Create a PIL Image object from the decoded image
    image = Image.open(io.BytesIO(decoded_image))

    # Use pytesseract to extract text from the image
    text = pytesseract.image_to_string(image)

    return text

app = Flask(__name__)

@app.route('/ocr', methods=['POST'])
def ocr_endpoint():
    # Get the base64 image from the request
    base64_image = request.json.get('image')

    # Call the ocr_from_base64 function to extract text
    extracted_text = ocr_from_base64(base64_image)

    # Return the extracted text as a JSON response
    return {'text': extracted_text}

if __name__ == '__main__':
    app.run(port=5001)