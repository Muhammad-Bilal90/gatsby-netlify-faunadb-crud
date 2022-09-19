/* Import faunaDB sdk */
// const process = require('process')
const dotenv = require("dotenv");
dotenv.config();
const { Client, query } = require('faunadb')

const client = new Client({
  secret: `fnAEwY1_TCACTJkmXAX2R61NaaL-s3gS0vNu36xF`,
})

const handler = async (event) => {
  const data = JSON.parse(event.body)
  // const { id } = event
  // console.log(`Function 'update' invoked. update id: ${id}`)
  try {

    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const response = await client.query(query.Update(query.Ref(query.Collection('students_data'), data.id), 
    { data: { name: data.name, email: data.email, age: data.age,}}))
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

// handler();
module.exports = { handler }