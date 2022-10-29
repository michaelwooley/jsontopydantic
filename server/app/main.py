from app.lib.models import TranslateRequest, TranslateResponse
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Json, Field
from mangum import Mangum
from typing import Optional

from app.lib.dmcg_api import generate as generate_pydantic_schema


app = FastAPI(title="JsonToPydantic")
app.openapi()
origins = ["*"]  # TODO SET THIS!!!

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)


@app.post("/", name="translate", response_model=TranslateResponse, tags=["codegen"])
async def post_generate_pydantic_schema(
    basic_request: TranslateRequest,
) -> TranslateResponse:
    """Generates pydantic model(s) from JSON examples (and - I think - Openapi as well).

    TODO The main controller here should capture stdout/stderr for reporting to end-user.

    Args:
        basic_request (_type_): _description_

    Returns:
        _type_: _description_
    """
    out = generate_pydantic_schema(req=basic_request)
    return TranslateResponse(py=out)


handler = Mangum(app)
