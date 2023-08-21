import { Box } from "@mui/material";
import ChangeField from "./ChangeField";
import { useTranslation } from "react-i18next";
import ChangeSelectLang from "./ChangeSelectLang";
import {
  getBonusType,
  getColor,
  getLang,
  getMode,
  getRoll,
  getRollColor,
} from "../../hooks/helpers";
import DoubleSelect from "./DoubleSelect";

const ItemField = ({ data, handleChangeData, values }) => {
  const { t } = useTranslation();

  const langOptions = [
    { value: 0, name: t("Russian") },
    { value: 1, name: t("Armenian") },
    { value: 2, name: t("Georgian") },
    { value: 3, name: t("Azerbaijani") },
    { value: 4, name: t("Kazak") },
    { value: 5, name: t("Kirgiz") },
  ];

  const colorOptions = [
    { value: 0, name: t("Red") },
    { value: 1, name: t("Green") },
    { value: 2, name: t("Blue") },
    { value: 3, name: t("Yellow") },
    { value: 4, name: t("Pink") },
    { value: 5, name: t("Cyan") },
    { value: 6, name: t("White") },
  ];

  const modeOptions = [
    { value: 0, name: t("wax") },
    { value: 1, name: t("water") },
    { value: 2, name: t("talinwater") },
    { value: 3, name: t("smoking") },
    { value: 4, name: t("tapwater") },
    { value: 5, name: t("milk") },
    { value: 6, name: t("hoover") },
    { value: 7, name: t("foam") },
    { value: 8, name: t("enginefluid") },
    { value: 9, name: t("blackening") },
    { value: 10, name: t("air") },
    { value: 11, name: t("drycleaning") },
    { value: 12, name: t("osmosis") },
    { value: 13, name: t("hotwater") },
    { value: 14, name: t("payer") },
    { value: 15, name: t("distilledwater") },
    { value: 16, name: t("lowpressurewater") },
    { value: 17, name: t("doublefoam") },
    { value: 18, name: t("hotair") },
    { value: 19, name: t("wheelpump") },
  ];

  const rollOptions = [
    { value: 0, name: t("roll0") },
    { value: 1, name: t("roll1") },
    { value: 2, name: t("roll2") },
    { value: 3, name: t("roll3") },
    { value: 4, name: t("roll4") },
    { value: 5, name: t("roll5") },
    { value: 6, name: t("roll6") },
    { value: 7, name: t("roll7") },
    { value: 8, name: t("roll8") },
    { value: 9, name: t("roll9") },
    { value: 10, name: t("roll10") },
    { value: 11, name: t("roll11") },
  ];

  return (
    <div>
      {data && (
        <>
          <Box m={2}>
            <ChangeSelectLang
              name="p7"
              value={values.p7 || data.p7}
              handleChangeData={handleChangeData}
              show={getLang(data.p7)}
              title={t("p7")}
              helper={getLang}
              options={langOptions}
            />
          </Box>

          <Box m={2}>
            <ChangeField
              value={data.p8}
              name="p8"
              handleChangeData={handleChangeData}
              title={t("p2-8")}
            />
          </Box>

          <Box m={2}>
            <ChangeField
              value={data.p9}
              name="p9"
              handleChangeData={handleChangeData}
              title={t("p2-9")}
            />
          </Box>

          <Box m={2}>
            <ChangeField
              value={data.p10}
              name="p10"
              handleChangeData={handleChangeData}
              title={t("p10")}
            />
          </Box>
          <Box m={2}>
            <ChangeField
              value={data.p11}
              name="p11"
              handleChangeData={handleChangeData}
              title={t("p11")}
            />
          </Box>
          <Box m={2}>
            <ChangeField
              value={data.p12}
              name="p12"
              handleChangeData={handleChangeData}
              title={t("p12")}
            />
          </Box>

          <Box m={2}>
            <ChangeField
              value={data.p19}
              name="p19"
              handleChangeData={handleChangeData}
              title={t("p2-19")}
            />
          </Box>

          <Box m={2}>
            <ChangeField
              value={data.p20}
              name="p20"
              handleChangeData={handleChangeData}
              title={t("p2-20")}
            />
          </Box>

          <Box m={2}>
            <ChangeField
              value={data.p21}
              name="p21"
              handleChangeData={handleChangeData}
              title={t("p2-21")}
            />
          </Box>

          <Box m={2}>
            <ChangeField
              value={data.p22}
              name="p22"
              handleChangeData={handleChangeData}
              title={t("p2-22")}
            />
          </Box>

          <Box m={2}>
            <ChangeSelectLang
              name="p23"
              value={values.p23 || data.p23}
              handleChangeData={handleChangeData}
              show={getRollColor(data.p23)}
              title={t("p2-23")}
              helper={getRollColor}
              options={colorOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p24"
              value={values.p24 || data.p24}
              handleChangeData={handleChangeData}
              show={getRollColor(data.p24)}
              title={t("p2-24")}
              helper={getRollColor}
              options={colorOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p25"
              value={values.p25 || data.p25}
              handleChangeData={handleChangeData}
              show={getRollColor(data.p25)}
              title={t("p2-25")}
              helper={getRollColor}
              options={colorOptions}
            />
          </Box>

          <Box m={2}>
            <ChangeField
              value={data.p26}
              name="p26"
              handleChangeData={handleChangeData}
              title={t("p2-26")}
            />
          </Box>

          <Box m={2}>
            <ChangeField
              value={data.p27}
              name="p27"
              handleChangeData={handleChangeData}
              title={t("p2-27")}
            />
          </Box>

          <Box m={2}>
            <ChangeField
              value={data.p28}
              name="p28"
              handleChangeData={handleChangeData}
              title={t("p2-28")}
            />
          </Box>

          <Box m={2}>
            <ChangeField
              value={data.p29}
              name="p29"
              handleChangeData={handleChangeData}
              title={t("p2-29")}
            />
          </Box>

          <Box m={2}>
            <ChangeSelectLang
              name="p36"
              value={values.p36 || data.p36}
              handleChangeData={handleChangeData}
              show={getRollColor(data.p36)}
              title={t("p2-36")}
              helper={getRollColor}
              options={colorOptions}
            />
          </Box>

          <Box m={2}>
            <ChangeSelectLang
              name="p37"
              value={values.p37 || data.p37}
              handleChangeData={handleChangeData}
              show={getRollColor(data.p37)}
              title={t("p2-37")}
              helper={getRollColor}
              options={colorOptions}
            />
          </Box>

          <Box m={2}>
            <ChangeSelectLang
              name="p38"
              value={values.p38 || data.p38}
              handleChangeData={handleChangeData}
              show={getRollColor(data.p38)}
              title={t("p2-38")}
              helper={getRollColor}
              options={colorOptions}
            />
          </Box>

          <Box m={2}>
            <ChangeSelectLang
              name="p39"
              value={values.p39 || data.p39}
              handleChangeData={handleChangeData}
              show={getRollColor(data.p39)}
              title={t("p2-39")}
              helper={getRollColor}
              options={colorOptions}
            />
          </Box>

          <Box m={2}>
            <ChangeSelectLang
              name="p40"
              value={values.p40 || data.p40}
              handleChangeData={handleChangeData}
              show={getRollColor(data.p40)}
              title={t("p2-40")}
              helper={getRollColor}
              options={colorOptions}
            />
          </Box>

          <Box m={2}>
            <ChangeSelectLang
              name="p41"
              value={values.p41 || data.p41}
              handleChangeData={handleChangeData}
              show={getRollColor(data.p41)}
              title={t("p2-41")}
              helper={getRollColor}
              options={colorOptions}
            />
          </Box>

          <Box m={2}>
            <ChangeField
              value={data.p42}
              name="p42"
              handleChangeData={handleChangeData}
              title={t("p2-42")}
            />
          </Box>

          <Box m={2}>
            <ChangeField
              value={data.p43}
              name="p43"
              handleChangeData={handleChangeData}
              title={t("p2-43")}
            />
          </Box>

          <Box m={2}>
            <ChangeField
              value={data.p52}
              name="p52"
              handleChangeData={handleChangeData}
              title={t("p2-52")}
            />
          </Box>
        </>
      )}
    </div>
  );
};

export default ItemField;
