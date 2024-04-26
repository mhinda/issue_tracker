'use client'

import {ErrorMessage, Spinner } from '@/app/components'
import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import { z } from 'zod';

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
  const [isSubmitting, setSubmitting] = useState(false)
  const onSubmit = handleSubmit(async (data) => {
          try {
            setSubmitting(true);
            await axios.post('/api/issues', data)
            router.push('/issues')
          } catch (error) {
            setSubmitting(false);
            setError('An unexpexted error occurred.')
          }
        })

  return ( 
    <div className='max-w-xl' >
      {error && <Callout.Root className='mb-2' color='red'>
        <Callout.Text>
          {error}
        </Callout.Text>
      </Callout.Root>}
      <form className='space-y-3'
        onSubmit={onSubmit}>
        <TextField.Root placeholder='Title' {...register('title')}>
          <TextField.Slot />
        </TextField.Root>
        <ErrorMessage>
          {errors.title?.message}
        </ErrorMessage>
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE {...field} placeholder='Description ...' />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>Add New Issue {isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  )
}

export default NewIssuePage