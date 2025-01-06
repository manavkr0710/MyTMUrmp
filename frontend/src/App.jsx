import { Container, Stack, Text } from "@chakra-ui/react";


function App() {

  return (
    <Stack minH={"100vh"} bg="white">

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

      </Container>
    </Stack>
  );
}

export default App;