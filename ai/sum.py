from transformers import pipeline
from embed import SentenceTransformer
import time
class Summarizer:
    def __init__(self):
        self.summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
        self.sentence_transformer = SentenceTransformer()

    def sum(self, article):
        print(article)
        start = time.time()
        summarization = self.summarizer(article, max_length=130, min_length=30, do_sample=False)
        sumtext = summarization[0]['summary_text']
        embedding = self.sentence_transformer.calculatevec(sumtext)
        ti = (time.time()-start)
        return {"embedding":embedding, "time":ti, "text":sumtext}