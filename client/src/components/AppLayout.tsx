import React from 'react';
import { Box, Flex } from "@chakra-ui/react";

export default function AppLayout({ sidebarOpen, navbar, footer, sidebar, ...props }: React.PropsWithChildren<{ sidebarOpen: boolean, navbar: React.ReactNode; footer: React.ReactNode; sidebar: React.ReactNode; }>) {
    return (
        <Flex
            direction={"column"}
            height={"100vh"}
        >
            {navbar}
            <Flex
                flex='1' px={4}
                overflow={"hidden"}
            >

                <Box width={"20vw"} hidden={!sidebarOpen} px={4} overflow={"auto"}>
                    {sidebar}
                </Box>

                <Box flex='1' px={4} overflow={"auto"}>
                    {props.children}
                </Box>
            </Flex>
            {footer}
        </Flex >
    );
}
