/* Import faunaDB sdk */
// const process = require('process')
const dotenv = require('dotenv');
dotenv.config();

const { Client, query } = require('faunadb')

// process.env.FAUNADB_ADMIN_SECRET
const handler = async () => {
  console.log('Function `read-all` invoked')
  
  try {
    const client = new Client({
      secret: process.env.FAUNADB_ADMIN_SECRET,
    })
    
    const response = await client.query(query.Paginate(query.Match(query.Index('all_students'))))
    const itemRefs = response.data
    // create new query out of item refs. http://bit.ly/2LG3MLg
    const getAllItemsDataQuery = itemRefs.map((ref) => query.Get(ref))
    // then query the refs
    const ret = await client.query(getAllItemsDataQuery)
    // console.log(ret);

    const wellformedData = ret.map(malformedResponse => {
      return {
        id: malformedResponse.ref.id,
        name: malformedResponse.data.name,
        email: malformedResponse.data.email,
        age: malformedResponse.data.age,
      }
    })

    console.log(wellformedData)

    return {
      statusCode: 200,
      body: JSON.stringify(wellformedData),
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
