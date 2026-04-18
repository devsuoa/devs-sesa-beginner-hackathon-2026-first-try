import os
from random import randint

import requests
from data import questions_answers
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from fastapi import FastAPI

load_dotenv()

EXPRESS_URL = os.getenv("EXPRESS_URL", "http://localhost:8001")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

app = FastAPI()

# cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnswerInput(BaseModel):
    id: int
    answer: str


@app.get("/getQuestion")
def get_question():
    # randint is inclusive (includes both end points)
    id = randint(0, len(questions_answers) - 1)
    question = questions_answers[id][0]

    return {"id": id, "question": question}

@app.get("/v2/getQuestion")
def get_question():
    # randint is inclusive (includes both end points)
    id = randint(0, len(questions_answers) - 1)
    question = questions_answers[id][0]

    critical = questions_answers[id][2] # true or false

    return {"id": id, "question": question, "critical": critical}


@app.post("/checkAnswer")
def check_answer(data: AnswerInput):
    # {"id": data.id, "answer": data.input_answer}
    result = requests.post(
        EXPRESS_URL,
        json={
            "answer": data.answer,
            "modelAnswer": questions_answers[data.id][1],
        },
    )

    return {"result": result.json()}
