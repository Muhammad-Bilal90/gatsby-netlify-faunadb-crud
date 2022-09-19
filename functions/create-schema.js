#!/usr/bin/env node
// const process = require('process')
require("dotenv").config();
/* bootstrap database in your FaunaDB account - use with `netlify dev:exec <path-to-this-file>` */
const { Client, query } = require('faunadb')

const createFaunaDB = async function () {
  // if (!process.env.FAUNADB_ADMIN_SECRET) {
  //   console.log('No FAUNADB_SERVER_SECRET in environment, skipping DB setup')
  // }
  console.log('Create the database!')
  const client = new Client({
    secret: `fnAEwY1_TCACTJkmXAX2R61NaaL-s3gS0vNu36xF`,
  })

  /* Based on your requirements, change the schema here */
  try {
    await client.query(query.CreateCollection({ name: 'students_data' }))

    console.log('Created items class')
    return await client.query(
      query.CreateIndex({
        name: 'all_students',
        source: query.Collection('students_data'),
        active: true,
      }),
    )
  } catch (error) {
    if (error.requestResult.statusCode === 400 && error.message === 'instance not unique') {
      console.log('DB already exists')
    }
    throw error
  }
}

createFaunaDB()
