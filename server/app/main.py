from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Json, Field
from mangum import Mangum
from typing import Optional

from app.lib.generator import translate


app = FastAPI(title="JsonToPydantic")
app.openapi()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)


class TranslateOptions(BaseModel):
    force_optional: bool = Field(
        default=False,
        alias="forceOptional",
        description="Force everything to be optional.",
        title="Force optiasfonal",
        detail=True,
    )
    snake_cased: bool = Field(default=False, alias="snakeCased")


class BasicRequest(BaseModel):
    data: Json
    options: Optional[TranslateOptions]


class TranslateResponse(BaseModel):
    model: str


@app.post("/", name="translate", response_model=TranslateResponse, tags=["translate"])
async def convert(basic_request: BasicRequest) -> TranslateResponse:
    print(basic_request)
    options = (
        basic_request.options
        if basic_request.options is not None
        else TranslateOptions()
    )
    return TranslateResponse(
        model=translate(
            basic_request.data,
            options.force_optional,
            options.snake_cased,
        )
    )


handler = Mangum(app)
