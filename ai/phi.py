
from transformers import T5Tokenizer, T5ForConditionalGeneration

tokenizer = T5Tokenizer.from_pretrained("google/flan-t5-base")
model = T5ForConditionalGeneration.from_pretrained("google/flan-t5-base")

input_text = "Generate A web-search query for this question: I have a problem where when I do the command 'cat readme.txt' I get the error no permissions"
input_ids = tokenizer(input_text, return_tensors="pt").input_ids

outputs = model.generate(input_ids, max_length=4096)
print(tokenizer.decode(outputs[0]))
