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

export default function EcommerceTable() {
  const [isLoading, setIsLoading] = useState(false);

  const appointments = useSelector((state) => state.booking.appointments);
  //store array from database
  let newAppointment = appointments?.filter((item) => item.payment !== null);
  const [records, setRecords] = useState(newAppointment);
  const dispatch = useDispatch();

  console.log(records);

  console.log(appointments);
  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchAppointment());
    dispatch(fetchProducts());
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [records]);

  return (
    <AdminDashboard>
      <MaterialTable
        title="Appointment Overview"
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
          { field: "serviceName", title: "Service Name" },
          { field: "servicePrice", title: "Price" },
          { field: "staff_name", title: "Staff" },
          { field: "date", title: "Date" },
          { field: "time", title: "Time" },
          { field: "client", title: "Client" },
          { field: "payment", title: "Payment" },
        ]}
        data={records}
      />
    </AdminDashboard>
  );
}
