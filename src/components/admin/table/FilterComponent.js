import React from "react";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { IoAddCircle } from "react-icons/io5";
import styles from "./FilterComponent.module.css";
const FilterComponent = ({ filter, setFilter, placeholder,btnContent,link }) => {
  return (
    <Container>
      <div className=" mb-2 mw-100 d-flex justify-content-between">
        <input
          className={styles.filterInput}
          type="search"
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value)}
          placeholder={placeholder}
        />
        <NavLink to={link} className={`${styles.addLink} d-none d-lg-block`}>
        <button 
        className={`d-block ${styles.addBtn}`}
        >
          {btnContent}
        </button>
      </NavLink>
     
      </div>
    </Container>
  );
};

export default FilterComponent;
