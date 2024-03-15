import spacy
class texthandler:
    def __init__(self):
         self.nlp = spacy.load("en_core_web_lg")
         
    def remove_stop_words(self,text):
        doc = self.nlp(text)
        text_parts = [token.text for token in doc if not token.is_stop]
        return " ".join(text_parts)

    def split_sentences(self,text):
        doc = self.nlp(text)
        sentences = [sent.text for sent in doc.sents]
        return sentences

    def group_sentences_semantically(self, sentences, threshold):
        docs = [self.nlp(sentence) for sentence in sentences]
        segments = []

        start_idx = 0
        end_idx = 1
        segment = [sentences[start_idx]]
        while end_idx < len(docs):
            if docs[start_idx].similarity(docs[end_idx]) >= threshold:
                segment.append(str(docs[end_idx]))
            else:
                segments.append(" ".join(segment))
                start_idx = end_idx
                segment = [sentences[start_idx]]
            end_idx += 1


        if segment:
            segments.append(" ".join(segment))
        return segments


    def split_text(self, text, chunk_size=100000):
        segments = []
        # Split text into chunks
        chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]
        # Process each chunk
        for chunk in chunks:
            sentences = self.split_sentences(chunk)
            segments.extend(self.group_sentences_semantically(sentences, 0.65))
        return segments
