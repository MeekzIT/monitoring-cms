import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { splitNumberIntoDigits } from "../../hooks/helpers";

const DoubleSelect = ({
  name,
  value1,
  value2,
  handleChangeData,
  title,
  options1,
  options2,
  show,
  helper,
}) => {
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);
  const [fieldValue, setFieldValue] = useState(
    splitNumberIntoDigits(value1)[0]
  );
  const [secondValue, setSecondValue] = useState(
    splitNumberIntoDigits(value1)[1]
  );

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
              {options1.map((i) => {
                return <MenuItem value={i.value}>{i.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <Select
              fullWidth
              name={name}
              onChange={(e) => setSecondValue(e.target.value)}
            >
              {options2.map((i) => {
                return <MenuItem value={i.value}>{i.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <div>
            <Button
              variant="outlined"
              onClick={() => {
                handleChangeData(
                  name,
                  String(fieldValue) + String(secondValue)
                );
                changeFieldState();
              }}
            >
              {t("save")}
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setFieldValue(value1);
                setSecondValue(value2);
                handleChangeData(name, String(value1) + String(value2));
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
          <div>
            {fieldValue
              ? helper(String(fieldValue) + String(secondValue))
              : show}
          </div>
          <Button variant="outlined" onClick={changeFieldState}>
            <EditIcon />
          </Button>
        </div>
      )}
    </div>
  );
};

export default DoubleSelect;
