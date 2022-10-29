import React, { useState, useEffect, useRef } from "react";
import { useSize } from "@chakra-ui/react-use-size";
import { Box, Center, Flex, SimpleGrid, StackDivider, VStack, Text, Square, Heading } from "@chakra-ui/react";
import AceEditor, { IAceEditorProps } from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

export default function EditorPanel({ title, ...aceProps }: { title: string; } & IAceEditorProps) {
    const elementRef = useRef(null);
    const dimensions = useSize(elementRef);

    return (

        <Flex bg='tomato' direction={"column"}>
            <Heading as={"h3"}>{title}</Heading>
            <Box flex='1' bg='magenta' ref={elementRef}>
                {dimensions && (
                    <AceEditor
                        height={`${dimensions.height}px`}
                        width={`${dimensions.width}px`}
                        
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