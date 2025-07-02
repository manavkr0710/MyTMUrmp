import { Grid, Flex, Text } from '@chakra-ui/react'
import UserCard from './UserCard';
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '@/App';


const UserGrid = ({users, setUsers}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [displayUsers, setDisplayUsers] = useState([]);
  
  // Sample review that loads immediately
  const sampleReview = {
    id: "sample-001",
    name: "Dr. Ali Miri",
    subject: "Computer Science",
    code: "CPS109",
    description: "Dr. Ali Miri is an excellent professor who explains complex concepts clearly and is always available during office hours. His assignments are challenging but fair, and his lectures are engaging and informative."
  };
  
  // Initialize with sample review immediately
  useEffect(() => {
    setDisplayUsers([sampleReview]);
  }, []);
  
  // Fetch actual reviews in background
  useEffect(() => {
    const getUsers = async () => {
      try {
        // Note the fixed URL with added slash
        const res = await fetch(BASE_URL + '/api/reviews');
        
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await res.json();
        
        if (Array.isArray(data) && data.length > 0) {
          // If we get real reviews, add them after the sample
          setDisplayUsers([sampleReview, ...data]);
          setUsers(data);
        }
      }
      catch(error) {
        console.error('Error loading JSON data:', error);
        // Keep sample review on error
        setDisplayUsers([sampleReview]);
        setUsers([]);
      }
    }
    
    getUsers();
  }, [setUsers]);

  console.log('Display users:', displayUsers);
  return (
  
    <>
    <Grid templateColumns={{
        base: '1fr',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)', 
    }}
    gap={6}>
       {displayUsers.map((user) => (
        <UserCard 
          key={user.id || `user-${Math.random()}`} 
          user={user} 
          isSample={user.id === "sample-001"}
        />
        ))}     
    </Grid>
    {isLoading && (
      <Flex justifyContent={"center"}>
        
      </Flex>
    )}
    {!isLoading && users.length === 0 && (
      <Flex justifyContent={"center"}>
        <Text >
          <Text color="#004c9b" as={"span"} fontSize={"2xl"} fontWeight={"bold"} mr={2} >
           
          </Text>
        </Text>
      </Flex>
    )}
    </>

  );
}

export default UserGrid

