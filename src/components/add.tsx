import React, { useState } from 'react';
import CreateModal from './createModal';
import Button from 'react-bootstrap/Button';
const styles = require('./add-delete.module.css');


const Add = ({setFetchData}) => {
    const [showCreateModal, setShowCreateModal] = useState(false);

    return (
        <>
            <div className="d-flex justify-content-between mt-3 px-2">
                <h3>Students</h3>
                <Button className={styles.bgRebeccapurple} onClick={() => setShowCreateModal(true)}>Add Student</Button>
            </div>
                <CreateModal 
                    showModal={showCreateModal}
                    setShowCreateModal={setShowCreateModal}
                    setFetchData={setFetchData}
                />
            <hr />
        </>
    )
}

export default Add;