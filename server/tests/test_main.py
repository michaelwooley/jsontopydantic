import json
from app.lib.models import TranslateOptions, TranslateRequest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_read_main():
    data = TranslateRequest(
        data=json.dumps(
            [
                {"data": {"foo": 5}},
                {"data": {"foo": 5}},
                {"data": {"foo": 5}},
                {"data": {"foo": 5}},
            ]
        ),
        options=json.loads(TranslateOptions().json()),
    )
    # print(data.json())
    # print(data.data)
    response = client.post("/", data=data.json())
    assert response.status_code == 200
