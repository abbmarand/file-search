from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)
qa_model = pipeline("question-answering", "distilbert-base-cased-distilled-squad")

@app.route('/qa', methods=['POST'])
def answer_question():
    data = request.get_json()
    question = data.get('q')
    context = data.get('c')
    result = qa_model(question=question, context=context)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
