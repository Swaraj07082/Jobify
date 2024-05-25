
import { ProfileForm } from '@/Components/Form'
import { FormDataContextProvider } from '@/Context/FormDataContextProvider'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

import React from 'react'

export default function page() {
  // const session = getServerSession(authOptions)
  // console.log(session)
  return (
    <>
    {/* <FormDataContextProvider> */}
    <ProfileForm/>
    {/* </FormDataContextProvider> */}
    </>
  )
}
