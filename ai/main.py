from flask import Flask, request, jsonify
from sum import SentenceTransformer
from texthandler import texthandler
import time
textsplitter = texthandler()
app = Flask(__name__)

sentence_transformer = SentenceTransformer()

@app.route('/sum', methods=['POST'])
def sum_ans():
    start = time.time()
    data = request.get_json()
    article = data.get('f')
    if not article:
        return "No article found in request", 400
    ans = sentence_transformer.calculatevec(article)
    embedding_list = ans[0]
    end = time.time()
    return { "time": end-start, 'result': embedding_list }


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
