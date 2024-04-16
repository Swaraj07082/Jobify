
import { ProfileForm } from '@/Components/Form'
import { FormDataContextProvider } from '@/Context/FormDataContextProvider'

import React from 'react'

export default function page() {
  return (
    <>
    <FormDataContextProvider>
    <ProfileForm/>
    </FormDataContextProvider>
    </>
  )
}
