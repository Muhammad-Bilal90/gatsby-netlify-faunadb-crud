import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "../components/header"
import { Container } from "react-bootstrap"
import Card from 'react-bootstrap/Card';
import { PencilSquare, TrashFill } from "react-bootstrap-icons"
import AddDelete from "../components/add"
import UpdateModal from "../components/updateModal"

export interface studentInfo {
  id: string
  name: string,
  email: string,
  age: number,
}

const IndexPage = () => {

  const [myData, setMyData] = React.useState<null | studentInfo[]>(null); 
  const [fetchData, setFetchData] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [indexData, setIndexData] = useState<studentInfo>();

  React.useEffect(() => {

      (async () => {
        fetch(`/.netlify/functions/read-all`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setMyData(data)
        })
        .catch(e => {
          console.log("NO Data");
        })
      })();  

  }, [fetchData]);


  const onDelete = (stdData: studentInfo) => {
    console.log(stdData?.id)
    fetch(`/.netlify/functions/delete`, {
      method: "post",
      body: JSON.stringify({ id: stdData?.id })
    })
    .then(response => response.json())
    .then(data => {
      setFetchData(val => !val)
      console.log(stdData?.id)
    })
    .catch(e => {
      alert("Could not delete the student's data")
    })
  }
  const onUpdate = (stdData: studentInfo) => {
    console.log(stdData?.id)
    setIndexData(stdData);
    setShowUpdateModal(true);
  }


  console.log("My Data: " + JSON.stringify(myData));
  console.log(myData);

  return (
    <>
      <Header />
      <Container>
        <AddDelete setFetchData={setFetchData} />
        {myData !== null ? ( myData.length === 0 ? (<h1>No Records for Students Found!</h1>) : (myData.map((student: studentInfo) => {
          // console.log({ student !== null ? student.info : "nothing"})
          return (
            <div key={student?.id}>
            <Card bg='light' style={{ width: "100%" }} className="mt-4">
              <Card.Header className="d-flex justify-content-between">
                <span>Student</span> <span><PencilSquare onClick={() => {onUpdate(student)}}/> <TrashFill className="ms-2" onClick={() => onDelete(student)}/> </span>
              </Card.Header><Card.Body>
                <Card.Title>{student?.name}</Card.Title>
                <Card.Text>
                  {Object.keys(student)[2]}: {student?.email}
                </Card.Text>
                <Card.Text>
                  {Object.keys(student)[3]}: {student?.age}
                </Card.Text>
              </Card.Body>
            </Card>
            </div>
          )
        }))) : (<h3>Loading...</h3>)
      }
      <UpdateModal 
        setFetchData={setFetchData} 
        showUpdateModal={showUpdateModal} 
        setShowUpdateModal={setShowUpdateModal}
        indexData={indexData}
      />
      </Container>
    </>
  )
}

export default IndexPage

export const Head = () => <title>Students Record</title>
