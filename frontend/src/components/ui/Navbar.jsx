import { Text, Box, Button, Container, Flex } from '@chakra-ui/react'
import { useState } from 'react';
import { IoMoon } from 'react-icons/io5'
import { LuSun } from 'react-icons/lu'
import CreateUser from './CreateUser';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

   const handleToggle = () => {
    const appContainer = document.querySelector(".chakra-stack");
    const isDark = appContainer.style.backgroundColor === "gray";
    appContainer.style.backgroundColor = isDark ? "white" : "gray";
    setIsDarkMode(!isDarkMode);
  };


  return (
    <Container
        bgGradient="to-r" gradientFrom="blue.500" gradientTo="blue.900"
        borderRadius={16}
    >
      <Box my={8} borderRadius={8} bgGradient="to-r" gradientFrom="yellow.200" gradientTo="yellow.500">
        <Flex h="16" alignItems="center" justifyContent="space-between">
          
          {/* Left side */}
          <Flex flex={1} />

          {/* Center */}
          <Flex
            align="center"
            justify= "center"
            flex={1}
          >
            <Text fontSize={"40px"} fontFamily={"Times New Roman"} bgGradient="to-r" gradientFrom="gray.500" gradientTo="yellow.800" bgClip={"text"}> 
              MyTMURateMyProf
            </Text>
          </Flex>

          {/* Right side */}
          <Flex gap={4} align="center" justify="flex-end" flex={1}>
            <Button borderColor={"blue"}  bg={'blue.500'} onClick={handleToggle}>
              {isDarkMode ? <LuSun /> : <IoMoon />}
            </Button>
            <CreateUser />
          </Flex>
        </Flex>
      </Box>
    </Container>
  );

};

export default Navbar
