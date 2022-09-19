import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
const styles = require("./header.module.css");


const Header = () => {
    return(
        <Navbar bg="light" className={styles.header}>
          <Navbar.Brand className={styles.headerText} href="#home">Students Record</Navbar.Brand>
        </Navbar>
    );
}

export default Header;