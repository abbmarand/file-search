from flask import Flask, request, jsonify
from transformers import AutoModelForQuestionAnswering, AutoTokenizer, pipeline

app = Flask(__name__)
model_name = "deepset/roberta-base-squad2"
nlp = pipeline('question-answering', model=model_name, tokenizer=model_name)
model = AutoModelForQuestionAnswering.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)
@app.route('/qa', methods=['POST'])
def answer_question():
    data = request.get_json()
    question = data.get('q')
    context = data.get('c')
    QA_input = {
    'question': question,
    'context': context,}
    result = nlp(QA_input)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)

