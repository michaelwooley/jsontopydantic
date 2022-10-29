"""This codegen is strictly meant for dev purposes. Not to be used in app"""
import json
from pathlib import Path
from typing import Callable
from jinja2 import Environment, Template, select_autoescape
from jinja2 import FileSystemLoader
from pydantic import BaseModel

TEMPLATES_DIR = "/home/william.wooley/Documents/jsontopydantic/server/app/lib/templates"  # Path(__file__) / "templates"


def get_template(name: str) -> Template:
    loader = FileSystemLoader(TEMPLATES_DIR)
    env = Environment(loader=loader, autoescape=select_autoescape())
    return env.get_template(name)


def ajv_gen_factory() -> Callable[[type["BaseModel"]], str]:
    template = get_template("ajv-validation.ts.jinja2")

    def f(model: type["BaseModel"]) -> str:
        s = model.schema()
        return template.render(model_name=s["title"], schema=json.dumps(s, indent=2))

    return f


ajv_gen = ajv_gen_factory()
