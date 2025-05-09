import { Container, Stack, Text } from "@chakra-ui/react";
import Navbar from "./components/ui/Navbar";
import UserGrid from "./components/ui/UserGrid";
import { useState } from "react";

export const BASE_URL = "https://mytmurmp-0b5da00d391e.herokuapp.com/";
function App() {
  const [users, setUsers] = useState([]);

  return (
    <Stack minH={"100vh"} bg="white" justifyContent="space-between">
      <Navbar setUsers={setUsers} />

      <Container maxW={"1000px"} my={2} bgColor={"orange"} borderRadius={16} p={5}>
        <Text
          fontSize={{ base: "3xl", md: "50" }}
          fontWeight={"bold"}
          letterSpacing={"2px"}
          textTransform={"uppercase"}
          justifyContent={"center"}
          textAlign={"center"}
          mt={-4}
          mb={4}
        >
          <Text color={"#004c9b"} as={"span"}>
            All Professor Reviews
          </Text>
        </Text>

        <UserGrid users={users} setUsers={setUsers} />
        
      </Container>
      <Text
        fontSize="sm"
        textAlign="center"
        color="gray.500"
        py={4}
        mt="auto"
      >
        © {new Date().getFullYear()} MyTMURMP All rights reserved. 
      </Text>
    </Stack>
  );
}

export default App;