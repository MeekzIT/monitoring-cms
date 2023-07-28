import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

const ChangeSelect = ({ name, value, handleChangeData, title, options }) => {
  const [edit, setEdit] = useState(false);
  const [fieldValue, setFieldValue] = useState(value);

  const changeFieldState = () => {
    setEdit(!edit);
  };

  return (
    <div>
      <Typography id="modal-modal-title" variant="h6" component="h3">
        {title}
      </Typography>
      {edit ? (
        <div className="change-field">
          <FormControl>
            <InputLabel id="select-label">Select a number (couple)</InputLabel>
            <Select
              name={name}
              value={value}
              onChange={setFieldValue(e.target.value)}
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div>
            <Button
              variant="outlined"
              onClick={() => {
                handleChangeData(name, fieldValue);
                changeFieldState();
              }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setFieldValue(value);
                handleChangeData(name, value);
                changeFieldState();
              }}
            >
              <CloseIcon />
            </Button>
          </div>
        </div>
      ) : (
        <div className="change-field">
          <TextField variant="standard" value={fieldValue} disabled />
          <Button variant="outlined" onClick={changeFieldState}>
            <EditIcon />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChangeSelect;
