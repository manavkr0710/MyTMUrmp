import { Box, Heading, Text, Badge } from "@chakra-ui/react"

const UserCard = ({ user, isSample }) => {
  return (
    <Box 
      bg="blue.500" 
      maxW="sm" 
      overflow="hidden" 
      p={4} 
      borderRadius="md"
      position="relative"
      borderWidth={isSample ? "3px" : "0px"}
      borderColor={isSample ? "yellow.300" : "transparent"}
      boxShadow={isSample ? "0 0 10px gold" : "none"}
    >
      {isSample && (
        <Badge 
          colorScheme="yellow" 
          position="absolute" 
          top="5px" 
          right="5px" 
          fontSize="xs"
        >
          Sample
        </Badge>
      )}
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