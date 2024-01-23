from transformers import GPT2Tokenizer, TFGPT2LMHeadModel


def main():
    tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
    text = "generate a seach query from this question: 'how do I create a file in'"
    encoded_input = tokenizer(text, return_tensors='tf')
    model = TFGPT2LMHeadModel.from_pretrained('gpt2')
    output = model.generate(**encoded_input)
    decoded = tokenizer.decode(output[0])
    print(decoded)


if __name__ == '__main__':
    main()