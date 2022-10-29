import React,{ useRef } from "react";
import { useSize } from "@chakra-ui/react-use-size";
import { Box, Flex, Heading,useColorModeValue } from "@chakra-ui/react";
import AceEditor, { IAceEditorProps } from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

export default function EditorPanel({ title, ...aceProps }: { title: string; } & IAceEditorProps) {
    const elementRef = useRef(null);
    const dimensions = useSize(elementRef);

    return (

        <Flex   bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}  direction={"column"}>
            <Box p={2}>
            <Heading as={"h3"} size={"md"}>{title}</Heading>
            </Box>
            <Box borderRadius={"lg"} flex='1' bg='magenta' ref={elementRef}>
                {dimensions && (
                    <AceEditor
                        height={`${dimensions.height}px`}
                        width={`${dimensions.width}px`}
                        style={{"borderRadius":
                "4px"}}
                        
                        theme="monokai"
                        editorProps={{ $blockScrolling: true }}

                        {...aceProps}
                        // value={pydanticModel}
                        // mode="python"
                        // name="python-editor"
               
                    />)}</Box>
        </Flex>
    );
}