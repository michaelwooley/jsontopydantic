import {
    Box,
    Flex,
    Stack,
    Text, IconButton
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import * as constants from "lib/constants";
import { FaGithub } from "react-icons/fa";


export default function Nav() {
    return (
        <>
            <Box px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box><Text fontSize="xl" fontWeight="bold">
                        {constants.APP_NAME}
                    </Text></Box>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <ColorModeSwitcher />
                            <IconButton
                                size="md"
                                fontSize="lg"
                                variant="ghost"
                                color="current"
                                marginLeft="2"
                                href={constants.APP_GITHUB_LINK}
                                target={"_blank"}
                                icon={<FaGithub />}
                                aria-label="View source"
                                as={"a"}
                            />

                            {/* <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={'https://avatars.dicebear.com/api/male/username.svg'}
                                    />
                                </MenuButton>
                                <MenuList alignItems={'center'}>
                                    <br />
                                    <Center>
                                        <Avatar
                                            size={'2xl'}
                                            src={'https://avatars.dicebear.com/api/male/username.svg'}
                                        />
                                    </Center>
                                    <br />
                                    <Center>
                                        <p>Username</p>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    <MenuItem>Your Servers</MenuItem>
                                    <MenuItem>Account Settings</MenuItem>
                                    <MenuItem>Logout</MenuItem>
                                </MenuList>
                            </Menu> */}
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}