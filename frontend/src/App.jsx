import { Container, Stack, Text } from "@chakra-ui/react";
import Navbar from "./components/ui/Navbar";
import UserGrid from "./components/ui/UserGrid";
import { useState } from "react";

export const BASE_URL = import.meta.env.MODE === "development" ? "http://127.0.0.1:5000/" : "https://mytmurmp.onrender.com/";
function App() {
  const [users, setUsers] = useState([]);

  return (
    <Stack minH={"100vh"} bg="white">
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
    </Stack>
  );
}

export default App;