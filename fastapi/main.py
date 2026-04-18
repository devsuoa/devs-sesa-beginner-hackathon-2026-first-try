from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import RedirectResponse
from random import choice, randint
from pydantic import BaseModel
import requests
from questions_and_answers import qa_dict

app = FastAPI()

class TextInput(BaseModel):
    text: str


class AnswerInput(BaseModel):
    id: str
    input_answer: str


@app.get("/random")
def get_random_species():
    species = ["Rulix", "Grob", "Kindor"]
    return {"species": choice(species)}


@app.get("/ticket")
def get_random_number():
    return {"ticket_number": randint(0, len(qa_dict))}


@app.get("/")
def root():
    return RedirectResponse(url="/docs")


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}


@app.post("/check")
def check_text(input: TextInput):
    result = requests.post("https://xjnlal-ip-202-36-244-225.tunnelmole.net/")
    return {"result": False}


@app.post("/convertID")
def convert_id(input: TextInput):
    try:
        id_value = int(input.text)
        return {"id": id_value}
    except ValueError:
        return {"error": "Invalid input. Please provide a valid integer."}


@app.post("/askAI")
def ask_ai(input: TextInput):
    pass


def fetch(url):
    response = requests.get(url)
    
    if response.status_code != 200:
        return {"error": "Failed to fetch"}
    
    return response.json()



@app.get("/getQuestion")
def get_question():
   random_id = randint(1, len(qa_dict))
   question = qa_dict[random_id][0]
   return {
        "id": random_id,
        "question": question
    }


@app.post("/checkAnswer")
def check_answer(data: AnswerInput):
    # {"id": data.id, "answer": data.input_answer}
    result = requests.post("https://xjnlal-ip-202-36-244-225.tunnelmole.net/", json={"answer": data.input_answer, "rightAnswer": qa_dict[int(data.id)][1]})
    return {"result": result.json()}
