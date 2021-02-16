import React, { useState } from "react";
import {
  TableHead,
  TableCell,
  TableRow,
  makeStyles,
  TableSortLabel,
  TablePagination,
  Table,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(2),
    "& thead th": {
      fontWeight: "600",
      backgroundColor: theme.palette.grey[700],
      letterSpacing: "2px",
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "grey",
      cursor: "pointer",
    },
  },
}));

export default function useTable(records, headCells, filterFn) {
  const classes = useStyles();

  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const TblContainer = ({ children }) => (
    <Table className={classes.table}>{children}</Table>
  );

  const TblHead = (props) => {
    const handleSortRequest = (cellId) => {
      //to check if the column is in asc or desc order
      const isAsc = orderBy === cellId && order === "desc";

      setOrder(isAsc ? "asc" : "desc");
      setOrderBy(cellId);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {/* to disable sorting in unwanted column */}
              {headCell.disableSorting ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={() => {
                    handleSortRequest(headCell.id);
                  }}
                >
                  {headCell.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
  };

  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
  const stableSort = (array, comparator) => {
    if (array.length > 0) {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        //comparator takes el/element of each array to compare
        const order = comparator(a[0], b[0]);

        //comparator returns 1, 0 or -1
        //0 = same value ,1 = in proper order ,-1 = switch
        if (order !== 0) return order;

        //if comparator = 0 then sorting will take place by comparing index
        return a[1] - b[1];
      });
      //returns only the element of the sorted array
      return stabilizedThis.map((el) => el[0]);
    }
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? //a and b comes from comparator(a[0],b[0])
        (a, b) => descendingComparator(a, b, orderBy)
      : //incase of asc minus will be added to returned value
        (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const recordsAfterPagingAndSorting = () => {
    return (
      records.length > 0 &&
      stableSort(filterFn.fn(records), getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        (page + 1) * rowsPerPage
      )
    );
    //slice(0*5=0,1*5=5) => displays 5 rows only in 0 index/ 1st page
    //slice(1*5=5,2*5=10) => displays 5 rows only in 1 index or 2nd page
  };

  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  };
}
