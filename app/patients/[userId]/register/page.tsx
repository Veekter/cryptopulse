import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patients.actions'
import Image from 'next/image'
import React from 'react'

import * as Sentry from '@sentry/nextjs'

const Register  = async ({ params: { userId } }: SearchParamProps) => {
    const user = await getUser(userId)

    Sentry.metrics.set("user_view_register", user.name)

  return (
    <div className="flex h-screen max-h-screen remove-scrollbar">

      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-col py-10">
          <Image 
            src="/assets/icons/trans-logo.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

        <RegisterForm user={user} />
        <p className="copyright py-10">
            © 2024 Cryptopulse | Group 2
        </p>
          
        </div>
      </section>

      <Image 
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  )
}

export default Register 