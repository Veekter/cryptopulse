import * as sdk from 'node-appwrite'

export const {
    NEXT_PROJECT_ID: PROJECT_ID, NEXT_API_KEY: API_KEY, DATABASE_ID, PATIENTS_COLLECTION_ID, DOCTOR_COLLECTION_ID, APPOINTMENT_COLLECTION_ID, 
    NEXT_PUBLIC_BUCKET_ID: BUCKET_ID, NEXT_PUBLIC_ENDPOINT: ENDPOINT
} = process.env

const client = new sdk.Client();

// client
//     .setEndpoint(ENDPOINT!)
//     .setProject(PROJECT_ID!)
//     .setKey(API_KEY!)

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6698c3fb00004bd7a923')
    .setKey('3ea8685b5555836a4d3322594510fc8fd22a2c563098f5c848505b9585685b80d9f048db808df36383e3674a1a139f2400321fe3bfd2cebdbda703ba4baa007a3c96e42014f51e565929b1321693ef0ac6d8bd92c9a4403085629a3ac83397e6140bb00a47dbba2843d74350c1ba220074bb5700f62e0ae65c4a3aa97cca1359')


export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);