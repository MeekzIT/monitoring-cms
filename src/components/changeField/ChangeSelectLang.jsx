import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

const ChangeSelectLang = ({
  name,
  value,
  handleChangeData,
  title,
  options,
  show,
  helper,
}) => {
  const { t } = useTranslation();
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
          <FormControl fullWidth>
            <Select
              fullWidth
              name={name}
              onChange={(e) => setFieldValue(e.target.value)}
            >
              {options.map((i) => {
                return <MenuItem value={i.value}>{i.name}</MenuItem>;
              })}
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
              {t("save")}
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
          {/* <TextField variant="standard" value={show} disabled /> */}
          <div>{fieldValue ? t(helper(fieldValue)) : show}</div>
          <Button variant="outlined" onClick={changeFieldState}>
            <EditIcon />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChangeSelectLang;
