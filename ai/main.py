from flask import Flask, request, jsonify
from transformers import AutoModelForQuestionAnswering, AutoTokenizer, pipeline, T5Tokenizer, T5ForConditionalGeneration
app = Flask(__name__)
roberta = "deepset/xlm-roberta-large-squad2"
qapipe = pipeline('question-answering', model=roberta, tokenizer=roberta)
tokenizer = AutoTokenizer.from_pretrained("Intel/dynamic_tinybert")
model = AutoModelForQuestionAnswering.from_pretrained("Intel/dynamic_tinybert")

llmtokenizer = T5Tokenizer.from_pretrained("google/flan-t5-base")
llmmodel = T5ForConditionalGeneration.from_pretrained("google/flan-t5-base")

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

if __name__ == '__main__':
    app.run(debug=True)

#from embed import SentenceTransformer

# Create an instance of the SentenceTransformer class
#sentence_transformer = SentenceTransformer()

# Example usage:
#sentence = "This is an example sentence."
#embedding = sentence_transformer.calculatevec(sentence, 'example')
#print(embedding)
#