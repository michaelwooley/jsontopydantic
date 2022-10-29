import React from "react";

import About from "components/About";
import { Box, Flex, Grid, GridItem, SimpleGrid, VStack, Text, Button, useDisclosure } from "@chakra-ui/react";
import Navbar from "components/Navbar";
import EditorPanel from "components/EditorLayout";
import AppLayout from "components/AppLayout";

// const apiUrl = "https://ufgjji253b.execute-api.us-east-1.amazonaws.com/prod";
// const defaultJsonObject = '{\n\t"foo": 5, \n\t"barBaz": "hello"\n}';
// const defaultOptions = { forceOptional: false, snakeCased: false };
// const loadingMessage = "# loading...";
// const invalidJsonMessage = "# invalid json";

// type RequestOptions = {
//   forceOptional: boolean;
//   snakeCased: boolean;
// };

// type RequestBody = {
//   data: string;
//   options: RequestOptions;
// };

// function validJson(newValue: string): boolean {
//   try {
//     JSON.parse(newValue);
//   } catch (_) {
//     return false;
//   }
//   return true;
// }


// function App() {
//   const [options, setOptions] = useState(defaultOptions);
//   const [jsonObject, setJsonObject] = useState(defaultJsonObject);
//   const [pydanticModel, setPydanticModel] = useState("");

//   useEffect(() => {
//     if (validJson(jsonObject)) {
//       fetchConversion(jsonObject, options.forceOptional, options.snakeCased);
//     } else {
//       setPydanticModel(invalidJsonMessage);
//     }
//   }, [jsonObject, options]);


//   function onChange(newValue: string) {
//     setJsonObject(newValue);
//   }

//   function fetchConversion(
//     newValue: string,
//     forceOptional: boolean,
//     snakeCased: boolean
//   ) {
//     console.log("fetching");
//     setPydanticModel(loadingMessage);
//     const requestOptions: RequestOptions = { forceOptional, snakeCased };
//     const requestBody: RequestBody = {
//       data: newValue,
//       options: requestOptions,
//     };
//     const url = new URL(apiUrl);
//     const opts = {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json"
//       },
//       body: JSON.stringify(requestBody),
//     };

//     fetch(url.toString(), opts)
//       .then((response) => {
//         if (response.status === 422) {
//           setPydanticModel(invalidJsonMessage);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setPydanticModel(data.model);
//       });
//   }

//   return (
//     <div className="App">
//       <h1>{constants.APP_NAME}</h1>
//       <ColorModeSwitcher></ColorModeSwitcher>
//       <div className="editor-container">
//         <div className="editor">
//           <h3>JSON</h3>
// <AceEditor
//   value={jsonObject}
//   mode="json"
//   theme="monokai"
//   onChange={onChange}
//   name="json-editor"
//   editorProps={{ $blockScrolling: true }}
// />
//         </div>
//         <div className="editor">
// <h3>Pydantic</h3>
// <AceEditor
//   value={pydanticModel}
//   mode="python"
//   theme="monokai"
//   name="python-editor"
//   editorProps={{ $blockScrolling: true }}
// />
//         </div>
//       </div>

//       {/* <div className="options-container">
//         <h3>Options</h3>
//         <div className="option">
//           <p className="control">
//             <label className="checkbox">
//               <input
//                 type="checkbox"
//                 checked={options.forceOptional}
//                 onChange={(e) =>
//                   setOptions({ ...options, forceOptional: e.target.checked })
//                 }
//               />
//               Specify every field as Optional
//             </label>
//           </p>
//         </div>
//         <div className="field">
//           <p className="option">
//             <label className="checkbox">
//               <input
//                 type="checkbox"
//                 checked={options.snakeCased}
//                 onChange={(e) =>
//                   setOptions({ ...options, snakeCased: e.target.checked })
//                 }
//               />
//               Alias camelCase fields as snake_case
//             </label>
//           </p>
//         </div>
//       </div> */}
//       < TranslateOptionsComponent />
//       <br></br>
//       <About />
//     </div>
//   );
// }


function App() {
  const { isOpen: sidebarOpen, onToggle } = useDisclosure();
  return (
    <>
      {/* <VStack
        spacing={2}
        align='stretch'

      >
        <Navbar/>


        <Flex direction={"column"} px={4}>

          <SimpleGrid height={"80vh"} columns={2} spacing={4}>
   
             <EditorPanel title={"JSON"} mode="json"
              name="json-editor"></EditorPanel>
            <EditorPanel title={"pydantic"} mode="python"
              name="python-editor"></EditorPanel>
          </SimpleGrid>
          <About />
        </Flex>

      </VStack> */}
      {/* <Flex
        direction={"column"}
        height={"100vh"}
      >
        <Navbar />
        <Box flex='1' px={4} overflow={"auto"}>
          <SimpleGrid height={"80vh"} columns={2} spacing={4}>
            <EditorPanel title={"JSON"} mode="json"
              name="json-editor"></EditorPanel>
            <EditorPanel title={"pydantic"} mode="python"
              name="python-editor"></EditorPanel>
          </SimpleGrid>
          <About />
        </Box>
        <Box pl='2' bg='magenta' >
          footer
        </Box>
      </Flex> */}

      <AppLayout sidebarOpen={sidebarOpen} navbar={<Navbar />} footer={<Box pl='2' bg='magenta' >
        footer
      </Box>} sidebar={<div>{"asfs".repeat(3553)}</div>}>
        <Button onClick={onToggle}>Click Me</Button>
        <SimpleGrid height={"80vh"} columns={2} spacing={4}>
          <EditorPanel title={"JSON"} mode="json"
            name="json-editor"></EditorPanel>
          <EditorPanel title={"pydantic"} mode="python"
            name="python-editor"></EditorPanel>
        </SimpleGrid>
        <About />
      </AppLayout>
    </>
  );
}
export default App;
