'use client'

import { Box, Button, Callout, TextArea, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage =  () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>()
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
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE {...field} placeholder='Description ...' />}
        />
        <Button>Add New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage