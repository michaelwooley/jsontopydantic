import React from "react";
import {
    Stack,
    Text, Heading, Link
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export default function About(): JSX.Element {
    return (
        <>
            <Stack spacing={2}>
                <Heading as="h2">What is this?</Heading>
                <Text>
                    JSON to Pydantic is a tool that lets you convert JSON objects into
                    Pydantic models.  <Link href="https://www.json.org/json-en.html" isExternal>
                        JSON <ExternalLinkIcon mx='2px' />
                    </Link>{" "}
                    is the de-facto data interchange format of the internet, and{" "}
                    <Link href="https://pydantic-docs.helpmanual.io/" isExternal>
                        Pydantic <ExternalLinkIcon mx='2px' />
                    </Link>is a
                    library that makes parsing JSON in Python a breeze.
                </Text>
                <Text>
                    To generate a Pydantic model from a JSON object, enter it into the
                    JSON editor and watch a Pydantic model automagically appear in the
                    Pydantic editor.
                </Text>
                <Text>
                    Pydantic models are generated via the experimental{" "}

                    <Link href="https://github.com/koxudaxi/datamodel-code-generator" isExternal>
                        datamodel-code-generator <ExternalLinkIcon mx='2px' />
                    </Link>
                    .
                </Text>
            </Stack>

        </>
    );
}