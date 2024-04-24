'use client'

import { Box, Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod'

// interface IssueForm {
//   title: string;
//   description: string;
// }

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage =  () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  })
  const [error, setError] = useState('');
  
  return ( 
    <div className='max-w-xl' >
      {error && <Callout.Root className='mb-2' color='red'>
        <Callout.Text>
          {error}
        </Callout.Text>
      </Callout.Root>}
      <form className='space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data)
            router.push('/issues')
          } catch (error) {
            setError('An unexpexted error occurred.')
          }
        })}>
        <TextField.Root placeholder='Title' {...register('title')}>
          <TextField.Slot />
        </TextField.Root>
          {errors.title && <Text as='p' color='red'>{errors.title.message}</Text> }
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE {...field} placeholder='Description ...' />}
        />
          {errors.description && <Text as='p' color='red'>{errors.description.message}</Text> }
        <Button>Add New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage