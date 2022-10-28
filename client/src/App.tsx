import React, { useState, useEffect } from "react";
import "./App.css";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import About from "components/About";

const apiUrl = "https://ufgjji253b.execute-api.us-east-1.amazonaws.com/prod";
const defaultJsonObject = '{\n\t"foo": 5, \n\t"barBaz": "hello"\n}';
const defaultOptions = { forceOptional: false, snakeCased: false };
const loadingMessage = "# loading...";
const invalidJsonMessage = "# invalid json";

type RequestOptions = {
  forceOptional: boolean;
  snakeCased: boolean;
};

type RequestBody = {
  data: string;
  options: RequestOptions;
};

function App() {
  const [options, setOptions] = useState(defaultOptions);
  const [jsonObject, setJsonObject] = useState(defaultJsonObject);
  const [pydanticModel, setPydanticModel] = useState("");

  useEffect(() => {
    if (validJson(jsonObject)) {
      fetchConversion(jsonObject, options.forceOptional, options.snakeCased);
    } else {
      setPydanticModel(invalidJsonMessage);
    }
  }, [jsonObject, options]);

  function validJson(newValue: string): boolean {
    try {
      JSON.parse(newValue);
    } catch (_) {
      return false;
    }
    return true;
  }

  function onChange(newValue: string) {
    setJsonObject(newValue);
  }

  function fetchConversion(
    newValue: string,
    forceOptional: boolean,
    snakeCased: boolean
  ) {
    console.log("fetching");
    setPydanticModel(loadingMessage);
    const requestOptions: RequestOptions = { forceOptional, snakeCased };
    const requestBody: RequestBody = {
      data: newValue,
      options: requestOptions,
    };
    const url = new URL(apiUrl);
    const opts = {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(requestBody),
    };

    fetch(url.toString(), opts)
      .then((response) => {
        if (response.status === 422) {
          setPydanticModel(invalidJsonMessage);
        }
        return response.json();
      })
      .then((data) => {
        setPydanticModel(data.model);
      });
  }

  return (
    <div className="App">
      <h1>JSON to Pydantic Converter</h1>
      <div className="editor-container">
        <div className="editor">
          <h3>JSON</h3>
          <AceEditor
            value={jsonObject}
            mode="json"
            theme="monokai"
            onChange={onChange}
            name="json-editor"
            editorProps={{ $blockScrolling: true }}
          />
        </div>
        <div className="editor">
          <h3>Pydantic</h3>
          <AceEditor
            value={pydanticModel}
            mode="python"
            theme="monokai"
            name="python-editor"
            editorProps={{ $blockScrolling: true }}
          />
        </div>
      </div>
      <div className="options-container">
        <h3>Options</h3>
        <div className="option">
          <p className="control">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={options.forceOptional}
                onChange={(e) =>
                  setOptions({ ...options, forceOptional: e.target.checked })
                }
              />
              Specify every field as Optional
            </label>
          </p>
        </div>
        <div className="field">
          <p className="option">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={options.snakeCased}
                onChange={(e) =>
                  setOptions({ ...options, snakeCased: e.target.checked })
                }
              />
              Alias camelCase fields as snake_case
            </label>
          </p>
        </div>
      </div>
      <br></br>
      <About></About>
    </div>
  );
}

export default App;
