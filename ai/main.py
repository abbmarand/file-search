from flask import Flask, request, jsonify
from transformers import AutoModelForQuestionAnswering, AutoTokenizer, pipeline, GPT2Tokenizer, TFGPT2LMHeadModel
app = Flask(__name__)
roberta = "deepset/xlm-roberta-large-squad2"
qapipe = pipeline('question-answering', model=roberta, tokenizer=roberta)
tokenizer = AutoTokenizer.from_pretrained("Intel/dynamic_tinybert")
gpttokenizer = GPT2Tokenizer.from_pretrained('gpt2')
model = AutoModelForQuestionAnswering.from_pretrained("Intel/dynamic_tinybert")
gptmodel = TFGPT2LMHeadModel.from_pretrained('gpt2')
@app.route('/qa', methods=['POST'])
def answer_question():
    data = request.get_json()
    question = data.get('q')
    context = data.get('c')
    QA_input = {
    'question': question,
    'context': context,}
    result = qapipe(QA_input)
    return jsonify(result)

@app.route('/gpt', methods=['POST'])
def gpt_ans():
    data = request.get_json()
    question = data.get('q')
    encoded_input = gpttokenizer(question, return_tensors='tf')
    output = gptmodel.generate(**encoded_input)
    decoded = gpttokenizer.decode(output[0])
    return decoded

if __name__ == '__main__':
    app.run(debug=True)
