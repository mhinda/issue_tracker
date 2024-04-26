import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Link href={`${issueId}/delete`}>
      <Button color='red'>
        <Pencil2Icon />
          Delete Issue
      </Button>
    </Link>
  )
}

export default DeleteIssueButton