import React, { useEffect, useState } from "react";
import axios from "../../pages/api/students";
import StudentsList from "../StudentsList/StudentsList";
import Pagination from "@mui/material/Pagination";
import classes from "./PaginationPage.module.css";

const PaginationPage = () => {
  const [DATA, setDATA] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get("/students").then((res) => {
      setDATA(res.data);
    });
  }, []);

  if (!DATA) return null;

  const studentsPerPage = 10;
  const pageCount = Math.ceil(DATA.length / studentsPerPage);

  const handleChange = (event, value) => setPage(value);

  const pagesVisited = (page - 1) * studentsPerPage;
  const data = DATA.slice(pagesVisited, pagesVisited + studentsPerPage);

  return (
    <div className={classes.PaginationDiv}>
      <StudentsList data={data} />
      <Pagination
        count={pageCount}
        shape="rounded"
        color="primary"
        page={page}
        onChange={handleChange}
      />
    </div>
  );
};

export default PaginationPage;