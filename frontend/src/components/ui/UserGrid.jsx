import { Grid, Flex, Text, Spinner} from '@chakra-ui/react'
import UserCard from './UserCard';
import React, { useState, useEffect } from 'react';


const UserGrid = ({users, setUsers}) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getUsers= async () => {
      try{
        const res = await fetch('http://localhost:5000/api/reviews');
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.error);
        }
        setUsers(data);
      }
      catch(error){
        console.error('Error loading JSON data:', error);
      } finally{
        setIsLoading(false);
      }
    }
    getUsers();
  },[setUsers]);

  console.log(users);
  return (
  
    <>
    <Grid templateColumns={{
        base: '1fr',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)', 
    }}
    gap={6}>
       { users.map((user) => (
        <UserCard key={user.id} user={user} />
        ))}     
    </Grid>
    {isLoading && (
      <Flex justifyContent={"center"}>
        <Spinner color="blue" size={"xl"} />
      </Flex>
    )}
    {!isLoading && users.length === 0 && (
      <Flex justifyContent={"center"}>
        <Text >
          <Text color="#004c9b" as={"span"} fontSize={"2xl"} fontWeight={"bold"} mr={2} >
            Oops! No reviews found, please add a review.
          </Text>
        </Text>
      </Flex>
    )}
    </>

  );
}

export default UserGrid

