import prisma from '@/prisma/client'
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes'
import { IssueStatusBadge } from './components'
import Link from 'next/link'

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { created_at: 'desc'},
    take: 5,
    include: {
      user: true
    }
   })
   
   return (
    <Card>
      <Heading size='4' mb='4'>Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {issues.map(issue =>(
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify='between'>
                  <Flex direction='column' align='start'>
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.user && (
                  <Avatar  
                    src={issue.user.image!}
                    fallback="?"
                    size='2'
                    radius='full'
                  />)}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  )
}

export default LatestIssues