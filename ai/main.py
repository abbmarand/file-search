from flask import Flask, request, jsonify
from transformers import AutoModelForQuestionAnswering, AutoTokenizer, pipeline, T5Tokenizer, T5ForConditionalGeneration
from sum import Summarizer
from texthandler import texthandler
import time
textsplitter = texthandler()
app = Flask(__name__)
roberta = "deepset/xlm-roberta-large-squad2"
qapipe = pipeline('question-answering', model=roberta, tokenizer=roberta)
tokenizer = AutoTokenizer.from_pretrained("Intel/dynamic_tinybert")
model = AutoModelForQuestionAnswering.from_pretrained("Intel/dynamic_tinybert")

llmtokenizer = T5Tokenizer.from_pretrained("google/flan-t5-base")
llmmodel = T5ForConditionalGeneration.from_pretrained("google/flan-t5-base")
summarizer = Summarizer()
@app.route('/qa', methods=['POST'])
def answer_question():
    data = request.get_json()
    question = data.get('q')
    context = data.get('c')
    encoded_input = llmtokenizer(f"Can you generate a seach question from this meaning to make it more objective and concise: {question}", return_tensors="pt")
    output = llmmodel.generate(**encoded_input, max_length=4096)
    decoded = llmtokenizer.decode(output[0])
    print(decoded)
    QA_input = {
    'question': decoded,
    'context': context,}
    result = qapipe(QA_input)
    post_encoded_input = llmtokenizer(f"This is how you {decoded}: '{result['answer']}'. can you give the answer in the context of this question: '{question}'?", return_tensors="pt")
    post_output = llmmodel.generate(**post_encoded_input, max_length=4096)
    post_decoded = llmtokenizer.decode(post_output[0])
    return jsonify(post_decoded)

@app.route('/gpt', methods=['POST'])
def gpt_ans():
    data = request.get_json()
    question = data.get('q')
    encoded_input = llmtokenizer(question, return_tensors="pt")
    output = llmmodel.generate(**encoded_input)
    decoded = llmtokenizer.decode(output[0])
    return decoded

@app.route('/sum', methods=['POST'])
def sum_ans():
    data = request.get_json()
    article = data.get('f')
    if not article:
        return "No article found in request", 400
    ans = summarizer.sum(article)
    embedding_list = ans['embedding'].tolist()
    return {'result': embedding_list[0] , "text":ans['text'], "time":ans['time']}

@app.route('/split', methods=['POST'])
def split():
    data = request.get_json()
    article = data.get('f')
    if not article:
        return "No article found in request", 400
    pre = time.time()
    ans = textsplitter.split_text(article)
    post = time.time()
    return {'result': ans , "time": post-pre}

if __name__ == '__main__':
    app.run(debug=True)
