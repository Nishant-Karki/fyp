import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { forwardRef } from "react";
import AddItem from "../common/AddItem";
import useTableActions from "../common/useTableActions";
import moment from "moment";

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
import {
  fetchOrder,
  fetchProducts,
} from "../../redux/Ecommerce/eStore-actions";
import { fetchAppointment } from "../../redux/Booking/booking-actions";

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

export default function UserDataTable() {
  const [isLoading, setIsLoading] = useState(false);

  //store array from database
  // let appointments = appointment.map(
  //   (item) => (item.date = moment(item.date).format("YYYY-MM-DD"))
  // );
  const [records, setRecords] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    axios.get("/userData").then((res) => setRecords(res.data.result));
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <MaterialTable
      title="User Detail"
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
        { field: "fname", title: "First Name" },
        { field: "lname", title: "Last Name" },
        { field: "email", title: "Email", sorting: false },
        { field: "phone", title: "Phone", sorting: false },
        { field: "gender", title: "Gender" },
        { field: "role", title: "Role" },
      ]}
      data={records}
    />
  );
}
