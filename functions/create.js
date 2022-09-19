// const process = require('process')
const { Client, query } = require('faunadb')
require("dotenv").config();

/* configure faunaDB Client with our secret */
const client = new Client({
  secret: process.env.FAUNADB_ADMIN_SECRET,
})
console.log("Process" ,process.env)
/* export our lambda function as named "handler" export */

const handler = async (event) => {
  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body)
  console.log('Function `create` invoked', data)
  // const item = {
  //   data,
  // }
  /* construct the fauna query */
  try {

    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" }
    }

    const response = await client.query(query.Create(query.Collection('students_data'),
    { data: { id:data.id, name: data.name, email: data.email, age: data.age}}))
    console.log('success', response)
    /* Success! return the response with statusCode 200 */
    return {
      statusCode: 200,
      body: JSON.stringify({id: `${response.ref.id}`}),
    }
  } catch (error) {
    console.log('error', error)
    /* Error! return the error with statusCode 400 */
    return {
      statusCode: 500,
      body: error.toString(),
    }
  }
}

// handler();

module.exports = { handler }
