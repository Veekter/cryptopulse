"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../ui/CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patients.actions"
import { users } from "@/lib/appwrite.config"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from 'next/image'

 
const  RegisterForm = ( { user }: { user: User }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)


  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({ name, email, phone}: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //console.log(values)
    setIsLoading(true)
    try {
      const userData = {name, email, phone}

      const user =   await createUser(userData)

      if (user) router.push(`/patients/${user.$id}/register`)
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
            <h1 className="header">Welcome 👋</h1>
            <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
             <h2 className="sub-header">Personal Information.</h2>
            </div>    
        </section>

        < CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
            < CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="email"
                label="Email"
                placeholder="johndoe@email.com"
                iconSrc="/assets/icons/email.svg"
                iconAlt="email"
            />

            < CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="phone"
                label="phone number"
                placeholder="(555) 123-4567"
            />  
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        < CustomFormField
                fieldType={FormFieldType.DATEPICKER}
                control={form.control}
                name="birthDate"
                label="Date of Birth"
                placeholder="Date of Birth"
                
            />

            < CustomFormField
                fieldType={FormFieldType.SKELETON}
                control={form.control}
                name="gender"
                label="Gender"
                placeholder="gender"
                renderSkeleton={(field) => (
                    <FormControl>
                        <RadioGroup className="flex h-11 gap-6 xl:justify-between" onValueChange={field.onChange} defaultValue="field.value">
                           {GenderOptions.map((option) => (
                            <div key={option} className="radio-group">
                                <RadioGroupItem 
                                    value={option}
                                    id={option}
                                />
                                <Label htmlFor={option} className="cursor-pointer">
                                    {option}
                                </Label>
                            </div>
                           ))}
                        </RadioGroup>
                    </FormControl>

                )}
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            < CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="address"
                label="Address"
                placeholder="14th Street, Mukuru Kwa Njenga"
                
            />

            < CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="occupation"
                label="Occupation"
                placeholder="Kamagera Umoina Sacco"
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            < CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="emergencyContactName"
                label="Emergency contact name"
                placeholder="Guardian's name"
               
            />

            < CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="emgergencyContactNumber"
                label="Emergency contact number"
                placeholder="(555) 123-4567"
            />
        </div>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
             <h2 className="sub-header">Medical Information.</h2>
            </div>    
        </section>

        < CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary Physician"
            placeholder="Select a physician"
        >
           {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
                <div className="flex cursor-pointer gap-2">
                <Image 
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt={doctor.name}
                    className="rounded-full border border-dark-500"
                />
                <p>{doctor.name}</p>
                </div>
            </SelectItem>

           ))} 
        </CustomFormField>

        <div className="flex flex-col gap-6 xl:flex-row">
        < CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insuranceProvider"
            label="Insurance Provider"
            placeholder="NHIF/SHIF"
            
        />

        < CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insurancePolicyNumber"
            label="Insurance policy number"
            placeholder="ABC123456789"
        />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        < CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="allergies"
            label="Allergies (if any)"
            placeholder="Penuts, Penicilin, Pollen"
            
        />

        < CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="currentMedication"
            label="Current medication (if any)"
            placeholder="Ibuprofen 200mg, Paracetamol 500mg"
        />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        < CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="familyMedicalHistory"
            label="Family medical history"
            placeholder="Mother had brain damage, Father is a hoe."
            
        />

        < CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="pastMedicalHistory"
            label="Past medical history"
            placeholder="Appendectomy, Tonsillectomy"
        />
        </div>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
             <h2 className="sub-header">Identification and Verification.</h2>
            </div>    
        </section>
       
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm