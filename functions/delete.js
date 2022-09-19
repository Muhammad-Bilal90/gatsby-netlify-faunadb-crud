/* Import faunaDB sdk */
// const process = require('process')
const dotenv = require("dotenv");
dotenv.config();
const { Client, query } = require('faunadb')

const client = new Client({
  secret: process.env.FAUNADB_ADMIN_SECRET,
})

const handler = async (event) => {
  const data = JSON.parse(event.body);
  // const { id } = event
  // console.log(`Function 'delete' invoked. delete id: ${id}`)
  try {

    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" }
    }

    const response = await client.query(query.Delete(query.Ref(query.Collection('students_data'), data.id)))
    console.log('success', response)
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  } catch (error) {
    console.log('error', error)
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }
}
// handler()
module.exports = { handler }
