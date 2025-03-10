# This is an old school project, read more at: ./OLD:md

## To run it

Pgvector and postgres is required. this is how you install it:
https://github.com/pgvector/pgvector

```bash
cd web && npm i 
```

Create ./web/.env and input

```.env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/filesearch"
```

```bash
npx prisma migrate deploy
```

```bash
npm run dev
```

## Open new window and set up python
```bash
cd ai && pip install torch transformers flask spacy
```

```bash
python main.py
```
