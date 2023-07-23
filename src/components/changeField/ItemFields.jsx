import { Box } from "@mui/material";
import ChangeField from "./ChangeField";
import { useTranslation } from "react-i18next";

const ItemField = ({ data, handleChangeData }) => {
  const { t } = useTranslation();
  var allFields = Object.keys(data).map((key) => [key, data[key]]);
  return (
    <div>
      {allFields
        ?.filter((i) => {
          let filed = i.slice(",")[0];
          return filed !== "DeviceType" || filed !== "P0";
        })
        .map((d) => {
          return (
            <Box m={2}>
              <ChangeField
                value={d.slice(",")[1]}
                name={d.slice(",")[0]}
                handleChangeData={handleChangeData}
                title={t(d.slice(",")[0])}
              />
            </Box>
          );
        })}
    </div>
  );
};

export default ItemField;
