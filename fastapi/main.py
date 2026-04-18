import os
from random import randint

import requests
from data import questions_answers
from dotenv import load_dotenv
from pydantic import BaseModel

from fastapi import FastAPI

load_dotenv()

EXPRESS_URL = os.getenv("EXPRESS_URL", "http://localhost:8001")

app = FastAPI()


class AnswerInput(BaseModel):
    id: int
    answer: str


@app.get("/getQuestion")
def get_question():
    # randint is inclusive (includes both end points)
    id = randint(0, len(questions_answers) - 1)
    question = questions_answers[id][0]

    return {"id": id, "question": question}


@app.post("/checkAnswer")
def check_answer(data: AnswerInput):
    # {"id": data.id, "answer": data.input_answer}
    result = requests.post(
        EXPRESS_URL,
        json={
            "answer": data.answer,
            "rightAnswer": questions_answers[data.id][1],
        },
    )

    return {"result": result.json()}
