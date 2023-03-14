import React from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useBlockLayout,
  usePagination,
} from "react-table";
import { useSticky } from "react-table-sticky";
import styles from "./Table.module.css";
import { Container } from "react-bootstrap";
import FilterComponent from "./FilterComponent";
import { TiDelete } from "react-icons/ti";
import { FcApproval } from "react-icons/fc";
import { NavLink, useLocation } from "react-router-dom";
import { IoAddCircle } from "react-icons/io5";
const Table = (props) => {
  const columns = props.columns;
  const data = props.data;
  const approveCarHandler = props.approveCarHandler;
  const deleteHandler = props.deleteHandler;
  const updateMyData = props.updateMyData;
  const filterPlaceholder = props.filterPlaceholder;
  const btnContent = props.btnContent;
  const link = props.link;
  
  const location = useLocation();
  // Create an editable cell renderer
  const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
  }) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);
    const onChange = (e) => {
      setValue(e.target.value);
    };
    // We'll only update the external data when the input is blurred
    const onBlur = () => {
      updateMyData(index, id, value);
    };
    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={styles.cellInput}
      />
    );
  };
  // Set our editable cell renderer as the default Cell renderer
  const defaultColumn = {
    Cell: EditableCell,
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      defaultColumn,
      updateMyData,
    },
    useFilters,
    useGlobalFilter,
    useBlockLayout,
    useSticky,
    usePagination
  );
  const { globalFilter } = state;
  //
  const listingsBody = page.map((row, i) => {
    prepareRow(row);
    return (
      <tr {...row.getRowProps()}>
        {row.cells.map((cell) => {
          return (
            <td
              {...cell.getCellProps()}
              className="d-flex justify-content-center align-items-center"
            >
              {cell.render("Cell") === "listingActions" ? (
                <>
                  <button
                    className="btn  py-0 px-1"
                    onClick={() => deleteHandler(row.cells[0].value)}
                    // onClick={() => console.log(row.cells[0].value)}
                  >
                    <TiDelete className="fs-2" fill="red" />
                  </button>
                  {row.cells[18].value !== "approved" && (
                    <button
                      className="btn py-0 px-1"
                      onClick={() => approveCarHandler(row.cells[0].value)}
                    >
                      <FcApproval className="fs-3" />
                    </button>
                  )}
                </>
              ) : (
                cell.render("Cell")
              )}
            </td>
          );
        })}
      </tr>
    );
  });
  const body = page.map((row, i) => {
    prepareRow(row);
    return (
      <tr {...row.getRowProps()}>
        {row.cells.map((cell) => {
          return (
            <td
              {...cell.getCellProps()}
              className="d-flex justify-content-center align-items-center"
            >
              {cell.render("Cell") === "actions" ? (
                <button
                  className="btn  py-0"
                  onClick={() => deleteHandler(row.cells[0].value)}
                  // onClick={() => console.log(row.cells[0].value)}
                >
                  <TiDelete className="fs-2" fill="red" />
                </button>
              ) : (
                cell.render("Cell")
              )}
            </td>
          );
        })}
      </tr>
    );
  });

  //
  return (
    <>
      {filterPlaceholder && (
        <FilterComponent
          filter={globalFilter}
          setFilter={setGlobalFilter}
          placeholder={filterPlaceholder}
          btnContent={btnContent}
          link={link}
        />
      )}
      
      <Container>
        <table {...getTableProps()} className={`${styles.sticky}`}>
          <thead className={styles.header}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className={styles.body}>
            {location.pathname === "/adminDashboard" ||
            location.pathname === "/adminDashboard/listings"
              ? listingsBody
              : body}
          </tbody>
        </table>
      </Container>
      {location.pathname !== "/adminDashboard" && (
        <Container className="my-2">
          <div className="pagination mx-auto d-flex justify-content-center">
            {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>{" "} */}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {"<<"}
            </button>{" "}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {">>"}
            </button>{" "}
            {/* <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>{" "} */}
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <span className="d-none d-md-block">
              | Go to page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: "100px" }}
              />
            </span>{" "}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </Container>
      )}
    </>
  );
};

export default Table;
