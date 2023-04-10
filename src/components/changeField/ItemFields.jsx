import { Box } from "@mui/material";
import ChangeField from "./ChangeField";
import { useTranslation } from "react-i18next";

const ItemField = ({ data, handleChangeData }) => {
  const { t } = useTranslation();
  return (
    <div>
      <Box m={2}>
        <ChangeField
          value={data.DeviceType}
          name="DeviceType"
          handleChangeData={handleChangeData}
          title="Device Type"
        />
      </Box>
      <Box m={2}>
        <ChangeField
          value={data.name}
          name="name"
          handleChangeData={handleChangeData}
          title={t("name")}
        />
      </Box>
      <Box m={2}>
        <ChangeField
          value={data.FreeCard}
          name="FreeCard"
          handleChangeData={handleChangeData}
          title="Free Card"
        />
      </Box>
      <Box m={2}>
        <ChangeField
          value={data.CoinNominal}
          name="CoinNominal"
          handleChangeData={handleChangeData}
          title="Coin Nominal"
        />
      </Box>
      <Box m={2}>
        <ChangeField
          value={data.BillNominal}
          name="BillNominal"
          handleChangeData={handleChangeData}
          title="Bill Nominal"
        />
      </Box>
      <Box m={2}>
        <ChangeField
          value={data.CashLessNominal}
          name="CashLessNominal"
          handleChangeData={handleChangeData}
          title="CashLess Nominal"
        />
      </Box>
      <Box m={2}>
        <ChangeField
          value={data.CoinCount}
          name="CoinCount"
          handleChangeData={handleChangeData}
          title="Coin Count"
        />
      </Box>
      <Box m={2}>
        <ChangeField
          value={data.BillCount}
          name="BillCount"
          handleChangeData={handleChangeData}
          title="Bill Count"
        />
      </Box>
      <Box m={2}>
        <ChangeField
          value={data.CashLessCount}
          name="CashLessCount"
          handleChangeData={handleChangeData}
          title="CashLess Count"
        />
      </Box>
      <Box m={2}>
        <ChangeField
          value={data.CoinCountTotal}
          name="CoinCountTotal"
          handleChangeData={handleChangeData}
          title="CoinCount Total"
        />
      </Box>
      <Box m={2}>
        <ChangeField
          value={data.BillCountTotal}
          name="BillCountTotal"
          handleChangeData={handleChangeData}
          title="BillCount Total"
        />
      </Box>
      <Box m={2}>
        <ChangeField
          value={data.CashLessCountTotal}
          name="CashLessCountTotal"
          handleChangeData={handleChangeData}
          title="CashLess Count Total"
        />
      </Box>
      <Box m={2}>
        <ChangeField
          value={data.RelayOffTime}
          name="RelayOffTime"
          handleChangeData={handleChangeData}
          title="Relay Off Time"
        />
      </Box>
    </div>
  );
};

export default ItemField;
