import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { forwardRef } from "react";
import AddItem from "../common/AddItem";
import useTableActions from "../common/useTableActions";

import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import AdminDashboard from "./AdminDashboard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/Ecommerce/eStore-actions";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  DeleteIcon: forwardRef((props, ref) => (
    <DeleteOutline {...props} ref={ref} />
  )),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function ProductsTable() {
  //state for delete and edit popup for selected row
  const [DeletePopUp, setDeletePopUp] = useState(false);
  const [editPopUp, setEditPopUp] = useState(false);

  //to send the item to edit or delete
  const [actionItem, setActionItem] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const products = useSelector((state) => state.store.products);

  //store array from database
  const [records, setRecords] = useState(products);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchProducts());
    setIsLoading(false);
    // setTimeout(() => {
    // }, 1500);
  }, [records]);

  const { DeleteItem, EditItem } = useTableActions();
  return (
    <AdminDashboard>
      <AddItem
        title="Add Product"
        postRoute="addProducts"
        setIsLoading={setIsLoading}
        setRecords={setRecords}
      />
      <MaterialTable
        title="Product Table"
        icons={tableIcons}
        isLoading={isLoading}
        columns={[
          {
            field: "tableData.id + 1",
            title: "Id",
            render: (rowData) => {
              return <p>{rowData.tableData.id + 1}</p>;
            },
          },
          { field: "name", title: " Product Name" },
          { field: "price", title: "Price" },
          {
            field: "image",
            title: "Image",
            sorting: false,
            render: (rowData) => (
              <img
                src={require(`../../images/products/${rowData.image}`).default}
                style={{ width: 50, height: 60, borderRadius: "0.3rem" }}
                alt="product"
              />
            ),
          },
          { field: "description", title: "Description", sorting: false },
        ]}
        data={records}
        actions={[
          {
            icon: Edit,
            tooltip: "Edit Product",
            onClick: (event, rowData) => {
              setActionItem(rowData);
              setEditPopUp(true);
            },
          },
          {
            icon: DeleteOutline,
            tooltip: "Delete Product",
            onClick: (event, rowData) => {
              setActionItem(rowData);
              setDeletePopUp(true);
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
      />
      <EditItem
        editPopUp={editPopUp}
        setEditPopUp={setEditPopUp}
        item={actionItem}
        imagePath="products"
        route="updateProduct"
        setIsLoading={setIsLoading}
        setRecords={setRecords}
      />
      <DeleteItem
        DeletePopUp={DeletePopUp}
        setDeletePopUp={setDeletePopUp}
        item={actionItem}
        route={"deleteProduct"}
        setIsLoading={setIsLoading}
        setRecords={setRecords}
      />
    </AdminDashboard>
  );
}
