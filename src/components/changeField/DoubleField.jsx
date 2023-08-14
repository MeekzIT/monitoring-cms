import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useIsMobile } from "../../hooks/useScreenType";

const DoubleField = ({
  nameFirst,
  nameSecond,
  firstValue,
  secondValue,
  handleChangeData,
  title,
}) => {
  const isMobile = useIsMobile();
  const [edit, setEdit] = useState(false);
  const [fieldValueFirst, setFieldValueFirst] = useState(firstValue);
  const [fieldValueSecond, setFieldValueSecond] = useState(secondValue);

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
          <TextField
            variant="outlined"
            name={nameFirst}
            defaultValue={fieldValueFirst}
            value={fieldValueFirst}
            onChange={(e) => setFieldValueFirst(e.target.value)}
          />
          <TextField
            variant="outlined"
            name={nameFirst}
            defaultValue={fieldValueSecond}
            value={fieldValueSecond}
            onChange={(e) => setFieldValueSecond(e.target.value)}
          />
          <div>
            <Button
              variant="outlined"
              onClick={() => {
                handleChangeData(nameFirst, fieldValueFirst);
                handleChangeData(nameSecond, fieldValueSecond);
                changeFieldState();
              }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setFieldValueFirst(fieldValueFirst);
                setFieldValueSecond(fieldValueSecond);
                handleChangeData(nameFirst, fieldValueFirst);
                handleChangeData(nameSecond, fieldValueSecond);
                changeFieldState();
              }}
            >
              <CloseIcon />
            </Button>
          </div>
        </div>
      ) : (
        <div className="change-field-double">
          {isMobile ? (
            <>
              <div>
                <TextField
                  variant="standard"
                  value={fieldValueFirst}
                  disabled
                />
              </div>
              <div>/</div>
              <div>
                <TextField
                  variant="standard"
                  value={fieldValueSecond}
                  disabled
                />
              </div>
              <div>
                <Button variant="outlined" onClick={changeFieldState}>
                  <EditIcon />
                </Button>
              </div>
            </>
          ) : (
            <>
              <div>
                <TextField
                  variant="standard"
                  value={fieldValueFirst}
                  disabled
                />
              </div>
              <div>/</div>
              <div>
                <TextField
                  variant="standard"
                  value={fieldValueSecond}
                  disabled
                />
                <Button variant="outlined" onClick={changeFieldState}>
                  <EditIcon />
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DoubleField;
