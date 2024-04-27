'use client'

import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data:users , error, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000,
    retry: 3
  })

  if(isLoading) 'Loading ...' 

  if (error) return null;
  
  return (
    <>
      <Toaster />
      <Select.Root 
        defaultValue={issue.userId || "unassigned"}
        onValueChange={ async (userId) => {
          await axios.patch(
            `/zapi/issues/${issue.id}`, 
            (userId == 'unassigned')?  {userId: null} : { userId })
            .catch((error) => toast.error('Changes could not be saved'))
          ; }
      }>
          <Select.Trigger placeholder='Assign ...' />
          <Select.Content>
              <Select.Group> 
                  <Select.Label>Suggestion</Select.Label>
                  <Select.Item value="unassigned">Unassigned</Select.Item>
                  {users?.map(user => <Select.Item key={user.id} value={user.id} >{user.name}</Select.Item>)}
              </Select.Group>
          </Select.Content>
      </Select.Root>
    </>
  )
}

export default AssigneeSelect