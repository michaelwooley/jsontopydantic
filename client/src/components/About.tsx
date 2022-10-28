import React from "react";
import logo from "images/GitHub-Mark-Light-120px-plus.png";

export default function About(): JSX.Element {
    return (
        <>
            <div className="about">
                <h2>What is this?</h2>
                <p>
                    JSON to Pydantic is a tool that lets you convert JSON objects into
                    Pydantic models. <a href="https://www.json.org/json-en.html">JSON</a>{" "}
                    is the de-facto data interchange format of the internet, and{" "}
                    <a href="https://pydantic-docs.helpmanual.io/">Pydantic</a> is a
                    library that makes parsing JSON in Python a breeze.
                </p>
                <p>
                    To generate a Pydantic model from a JSON object, enter it into the
                    JSON editor and watch a Pydantic model automagically appear in the
                    Pydantic editor.
                </p>
                <p>
                    Pydantic models are generated via the experimental{" "}
                    <a href="https://github.com/koxudaxi/datamodel-code-generator">
                        datamodel-code-generator
                    </a>
                    .
                </p>
            </div>
            <a href="https://github.com/brokenloop/jsontopydantic">
                <img id="github-logo" src={logo} alt="GitHub Logo" />
            </a>
        </>
    )
}