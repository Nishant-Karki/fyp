import React, { useState } from "react";
import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
  TextField,
  Typography,
  InputAdornment,
} from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DateTimePicker,
} from "@material-ui/pickers";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import { BsSearch } from "react-icons/bs";
import { Select } from "@material-ui/core";
import { Menu } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  error: {
    color: "#f44336",
  },
}));
const customTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#87CEFA",
    },
    secondary: {
      main: "#fff",
    },
  },
  typography: {
    fontFamily: "Quicksand",
  },
});

export default function useCustomForm() {
  const classes = useStyles();

  const ErrorField = ({ children }) => (
    <Typography className={classes.error}>{children}</Typography>
  );

  const CustomTextField = (props) => {
    const {
      variant = "outlined",
      label,
      name,
      type,
      error,
      onChange,
      errortext,
      ...rest
    } = props;

    return (
      <TextField
        {...rest}
        label={label}
        variant={variant}
        size="small"
        color="secondary"
        fullWidth
        name={name}
        type={type}
        error={error}
        onChange={onChange}
        helperText={error ? <ErrorField>{errortext}</ErrorField> : null}
        {...props}
      />
    );
  };

  // const SearchBox = (props) => {
  //   const { label, type, placeholder, value, onChange } = props;
  //   return (
  //     <TextField
  //       label={label}
  //       type={type}
  //       value={value}
  //       placeholder={placeholder}
  //       onChange={onChange}
  //       {...props}
  //       variant="outlined"
  //       size="small"
  //       color="secondary"
  //       fullWidth
  //       inputProps={{
  //         maxLength: 15,
  //       }}
  //       InputProps={{
  //         startAdornment: (
  //           <InputAdornment position="start">
  //             <BsSearch />
  //           </InputAdornment>
  //         ),
  //       }}
  //     />
  //   );
  // };

  const CustomDatePicker = (props) => {
    const { name, value, label, error, onChange } = props;

    return (
      <MuiThemeProvider theme={customTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            label={label}
            name={name}
            value={value}
            autoOk
            {...props}
            fullWidth
            color="secondary"
            inputVariant="outlined"
            format="MM/dd/yyyy"
            size="small"
            onChange={onChange}
            error={error}
            helperText={
              error ? <ErrorField>Date is required</ErrorField> : null
            }
          />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  };

  const CustomDateTime = (props) => {
    const [selectedDate, handleDateChange] = useState(new Date());
    const { name, label } = props;

    return (
      <MuiThemeProvider theme={customTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            label={label}
            name={name}
            autoOk
            {...props}
            inputVariant="outlined"
            value={selectedDate}
            color="secondary"
            onChange={handleDateChange}
          />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  };

  const ImageInput = (props) => {
    const { children, styling, onChange } = props;

    return (
      <>
        <label htmlFor="add" type="button" style={styling}>
          {children}
        </label>
        <input
          id="add"
          type="file"
          name="profile"
          accept="image/*"
          style={{ display: "none" }}
          onChange={onChange}
        />
      </>
    );
  };

  const DropdownSelect = (props) => {
    const { values, setSpecialist, specialist, ...rest } = props;

    const handleSpecialist = (e) => {
      setSpecialist(e.target.value);
    };
    return (
      <MuiThemeProvider theme={customTheme}>
        <FormControl>
          <InputLabel id="dropdown">Specialist</InputLabel>
          <Select
            labelId="Specialist"
            id="specialist-id"
            value={specialist}
            onChange={handleSpecialist}
            fullWidth
            style={{ marginBottom: "1rem", minWidth: "5rem" }}
            {...rest}
          >
            {values.map((value) => (
              <MenuItem key={value.id} value={value.id}>
                {value.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </MuiThemeProvider>
    );
  };

  return {
    CustomTextField,
    ImageInput,
    // SearchBox,
    CustomDatePicker,
    CustomDateTime,
    DropdownSelect,
  };
}
