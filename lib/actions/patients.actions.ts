'use server';

import { ID, Query } from "node-appwrite"
import { BUCKET_ID, DATABASE_ID, databases, ENDPOINT, PATIENTS_COLLECTION_ID, PROJECT_ID, storage, users } from "../appwrite.config"
import { encryptData, parseStringify } from "../utils"

import { InputFile } from "node-appwrite/file"

export const createUser = async (user: CreateUserParams) => {
    try {
        console.log("Trying to create a user...")
        const newUser = await users.create(ID.unique(), user.email, user.phone, undefined, user.name) 
        console.log("Created new user:", {newUser})

        return parseStringify(newUser)
        
    } catch (error: any) {
        if(error && error?.code  === 409) {
            const documents = await users.list([
                Query.equal('email', [user.email])
            ])

            return documents?.users[0]
        }

        console.log(error)
    }
}

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId);

        return parseStringify(user)
    } catch (error) {
        console.log(error);
    }
}

export const getPatient = async (userId: string) => {
    try {
        const patients = await databases.listDocuments(
            DATABASE_ID!,
            PATIENTS_COLLECTION_ID!,
            [
                Query.equal('userId', userId)
            ]
        );

        return parseStringify(patients.documents[0])
    } catch (error) {
        console.log(error)
    }
}


export const registerPatient = async ({ identificationDocument, ...patient }: RegisterUserParams ) => {
    try {
        let file;

        if(identificationDocument){
            const inputFile =  InputFile.fromBuffer(
                identificationDocument?.get('blobFile') as Blob,
                identificationDocument?.get('fileName') as string,
            )

            file  = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
        }

        let patientData = {
            userId: patient.userId,
            name: patient.name,
            email: patient.email,
            phone: patient.phone,
            birthDate: patient.birthDate,
            gender: patient.birthDate,
            address: patient.address,
            occupation: patient.occupation,
            emergencyContactName: patient.emergencyContactName,
            emergencyContractNumber: patient.emergencyContactNumber,
            primaryPhysician: patient.primaryPhysician,
            insuranceProvider: patient.insuranceProvider,
            insurancePolicyNumber: patient.insurancePolicyNumber,
            allergies: patient.allergies,
            currentMedication: patient.currentMedication,
            familyMedicalHistory: patient.familyMedicalHistory,
            pastMedicalHistory: patient.pastMedicalHistory,
            identificationType: patient.identificationType,
            identificationNumber: patient.identificationNumber,
            privacyConsent: patient.privacyConsent
        }

        let encryptedPatientData = {
            userId: patient.userId,
            name: patient.name,
            email: patient.email,
            phone: encryptData(patient.phone),
            birthDate: patient.birthDate,
            gender: patient.gender,
            address: encryptData(patient.address),
            occupation: patient.occupation,
            emergencyContactName: encryptData(patient.emergencyContactName),
            emergencyContactNumber: encryptData(patient.emergencyContactNumber),
            primaryPhysician: patient.primaryPhysician,
            insuranceProvider: encryptData(patient.insuranceProvider),
            insurancePolicyNumber: encryptData(patient.insurancePolicyNumber),
            allergies: encryptData(patient.allergies),
            currentMedication: encryptData(patient.currentMedication),
            familyMedicalHistory: encryptData(patient.familyMedicalHistory),
            pastMedicalHistory: encryptData(patient.pastMedicalHistory),
            identificationType: encryptData(patient.identificationType),
            identificationNumber: encryptData(patient.identificationNumber),
            privacyConsent: patient.privacyConsent
        }

        

        const newpatient = await databases.createDocument(
            DATABASE_ID!,
            PATIENTS_COLLECTION_ID!,
            ID.unique(),
            {
                identificationDocumentId: file?.$id || null,
                identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
                ...encryptedPatientData
            }
        )

        console.log({encryptedPatientData})

        return parseStringify(newpatient);  

    } catch (error) {
        console.log(error)
    }
}