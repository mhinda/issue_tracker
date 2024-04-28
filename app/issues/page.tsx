import prisma from '@/prisma/client'
import { Button, Flex, Table } from '@radix-ui/themes'
import React from 'react'
import IssueStatusBadge from '../components/IssueStatusBadge'
import IssueActions from './IssueActions'
import Link from '../components/Link'
import { Issue, Status } from '@prisma/client'
import { ArrowUpIcon, DoubleArrowLeftIcon } from '@radix-ui/react-icons'
import Pagination from '../components/Pagination'
import IssueTable, { columnNames, IssueQuery } from './IssueTable'

interface Props {
  searchParams: IssueQuery
}
const IssuesPage = async ({ searchParams }: Props) => {
  
  const statuses = Object.values(Status);
  const status = 
    statuses.includes(searchParams.status) ? 
    searchParams.status : undefined

  const where = { status }
  
  const orderBy = columnNames.includes(searchParams.orderBy) ? 
    {[searchParams.orderBy]: 'asc'} : undefined

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 4;
  
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  })

  const issueCount = await prisma.issue.count({ where })

  return (
    <Flex direction='column' gap='3'>
      <IssueActions />
      <IssueTable 
        searchParams={searchParams} 
        issues={issues} 
      />
      <Pagination 
        itemCount={issueCount} 
        pageSize={pageSize} 
        currentPage={page} 
      />
    </Flex>
  )
}

export default IssuesPage