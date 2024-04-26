'use client'
import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red'>
          <TrashIcon />
            Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm deletion</AlertDialog.Title>
        <AlertDialog.Description> Are you sure you want to delete an issue.</AlertDialog.Description>
        <Flex mt='4' gap='3'>
          <AlertDialog.Cancel>
            <Button>Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color='red' onClick={async () => {
                await axios.delete(`/api/issues/${issueId}`);
                router.push('/issues')
                router.refresh()
              }}>Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
    
  )
}

export default DeleteIssueButton