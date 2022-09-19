/* Import faunaDB sdk */
const process = require('process')
const dotenv = require("dotenv");
dotenv.config();
const { Client, query } = require('faunadb')

const client = new Client({
  secret: process.env.FFAUNADB_ADMIN_SECRET,
})

const handler = async (event) => {
  const { id } = event
  console.log(`Function 'read' invoked. Read id: ${id}`)

  try {
    const response = await client.query(query.Get(query.Ref(query.Collection('items'), id)))
    console.log('success', response)
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  } catch (error) {
    console.log('error', error)
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    }
  }
}

module.exports = { handler }
