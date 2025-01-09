import { Box, Heading, Text } from "@chakra-ui/react"

const UserCard = ({ user }) => {
  return (
    <Box bg="blue.500" maxW="sm" overflow="hidden" p={4} borderRadius="md">
      <Heading as="h3" fontFamily={"Times New Roman"} textAlign={"center"} fontWeight={"extrabold"} fontSize="4xl">{user.name}</Heading>
      <Text textAlign={"center"} fontFamily={"Times New Roman"} fontSize="xl"  fontWeight={"bold"} mt={3}>Subject: {user.subject} </Text>
      <Text textAlign={"center"} fontFamily={"Times New Roman"} fontSize="xl" fontWeight={"bold"} mt={3}> Course Code: ({user.code})
      </Text>
      <Text textAlign={"center"} fontFamily={"Times New Roman"} fontSize={"2xl"} mt={3}>Description: </Text>
      <Text fontSize="medium" fontFamily={"Times New Roman"} mt={1} textAlign={"center"}>{user.description}</Text>
     
    </Box>
  )
}

export default UserCard