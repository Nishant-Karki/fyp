import {
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  Paper,
  Button,
  Typography,
  Box,
  Grid,
  TextField,
  InputAdornment,
  Dialog,
  Container,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useCustomForm from "../common/useCustomForm";
import useTable from "../common/useTable";

import axios from "axios";

import { BsSearch } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import useTableActions from "../common/useTableActions";

import PopUp from "../common/PopUp";
import useAddItem from "../common/useAddItem";

// import photo from "../images/image-1612169725407.jpg";

const headCells = [
  { id: "service_id", label: "ID" },
  { id: "name", label: " Service Name" },
  { id: "price", label: "Price" },
  { id: "image", label: "Image", disableSorting: true },
  { id: "description", label: "Description", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function AddService() {
  //state for delete and edit popup for selected row
  const [DeletePopUp, setDeletePopUp] = useState(false);
  const [editPopUp, setEditPopUp] = useState(false);

  //to send the item to edit or delete
  const [actionItem, setActionItem] = useState({});

  //store array from database
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const response = async () => {
      console.log(records);
      await axios.get("/addServices").then((res) => {
        setRecords(res.data.result);
      });
    };
    response();
  }, []);

  const [value, setValue] = useState("");
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const handleSearch = (e) => {
    let target = e.target.value;

    //to show value in the text field
    setValue(target);

    //filtering value
    setFilterFn({
      fn: (items) => {
        if (target === "") return items;
        // else return items.filter((x) => x.name.includes(target));
        else
          return items.filter((item) => {
            console.log(item);
            return item.price.toString().includes(target);
          });
      },
    });
  };

  //custom hooks
  const { ItemSalon } = useAddItem();
  const { DeleteItem, EditItem } = useTableActions();
  const { SearchBox } = useCustomForm();
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);

  return (
    <Container maxWidth="lg">
      <Paper style={{ padding: "0.6rem", margin: "1rem" }}>
        <Toolbar>
          <Grid container component="span">
            <Grid item xs={9}>
              <TextField
                variant="outlined"
                value={value}
                type="text"
                label="Search Services"
                placeholder="Haircut"
                onChange={(e) => handleSearch(e)}
                size="small"
                color="secondary"
                fullWidth
                inputProps={{
                  maxLength: 15,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BsSearch />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <ItemSalon title="Add Service" postRoute="addServices" />
            </Grid>
          </Grid>
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {records.length > 0 ? (
              recordsAfterPagingAndSorting().map((item, index) => (
                <TableRow key={item.service_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>
                    <Box width="5.5rem">
                      <img
                        width="100%"
                        height="50px"
                        src={
                          require(`../../images/services/${item.image}`).default
                        }
                        alt="service"
                      />
                    </Box>
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    <Box display="flex">
                      <Typography
                        type="button"
                        onClick={() => {
                          setActionItem(item);
                          setEditPopUp(true);
                        }}
                      >
                        <MdEdit size={18} />
                      </Typography>

                      <EditItem
                        editPopUp={editPopUp}
                        setEditPopUp={setEditPopUp}
                        item={actionItem}
                        imagePath="services"
                      />
                      <Typography
                        type="button"
                        onClick={() => {
                          setActionItem(item);
                          setDeletePopUp(true);
                        }}
                        style={{ marginLeft: "0.9rem" }}
                      >
                        <AiFillDelete size={18} />
                      </Typography>
                      <DeleteItem
                        DeletePopUp={DeletePopUp}
                        setDeletePopUp={setDeletePopUp}
                        item={actionItem}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <TableCell key={item}></TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </TblContainer>
        {records && <TblPagination />}
      </Paper>
    </Container>
  );
}
