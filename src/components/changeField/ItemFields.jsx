import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
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

  console.log(
    data.p64,
    data.p65,
    data.p66,
    data.p67,
    data.p68,
    data.p69,
    "00000000000"
  );
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
            <ChangeSelectLang
              name="p72"
              value={values.p72 || data.p72}
              helper={getBonusType}
              show={getLang(data.p72)}
              handleChangeData={handleChangeData}
              title={t("p72")}
              options={[
                { value: 0, name: t("bonus-for-loyal-cards") },
                { value: 1, name: t("bonus-for-all") },
              ]}
            />
          </Box>
          <Box m={2}>
            <ChangeField
              value={data.p70}
              name="p70"
              handleChangeData={handleChangeData}
              title={t("p70")}
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
            <ChangeSelectLang
              name="p26"
              value={values.p26 || data.p26}
              helper={getMode}
              show={getLang(data.p26)}
              handleChangeData={handleChangeData}
              title={t("p26")}
              options={modeOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p27"
              value={values.p27 || data.p27}
              helper={getMode}
              show={getLang(data.p27)}
              handleChangeData={handleChangeData}
              title={t("p27")}
              options={modeOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p28"
              value={values.p28 || data.p28}
              helper={getMode}
              show={getLang(data.p28)}
              handleChangeData={handleChangeData}
              title={t("p28")}
              options={modeOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p29"
              value={values.p29 || data.p29}
              helper={getMode}
              show={getLang(data.p29)}
              handleChangeData={handleChangeData}
              title={t("p29")}
              options={modeOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p30"
              value={values.p30 || data.p30}
              helper={getMode}
              show={getLang(data.p30)}
              handleChangeData={handleChangeData}
              title={t("p30")}
              options={modeOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p31"
              value={values.p31 || data.p31}
              helper={getMode}
              show={getLang(data.p31)}
              handleChangeData={handleChangeData}
              title={t("p31")}
              options={modeOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeField
              value={data.p20}
              name="p20"
              handleChangeData={handleChangeData}
              title={t("p20")}
            />
          </Box>
          <Box m={2}>
            <ChangeField
              value={data.p21}
              name="p21"
              handleChangeData={handleChangeData}
              title={t("p21")}
            />
          </Box>
          <Box m={2}>
            <ChangeField
              value={data.p22}
              name="p22"
              handleChangeData={handleChangeData}
              title={t("p22")}
            />
          </Box>
          <Box m={2}>
            <ChangeField
              value={data.p23}
              name="p23"
              handleChangeData={handleChangeData}
              title={t("p23")}
            />
          </Box>
          <Box m={2}>
            <ChangeField
              value={data.p24}
              name="p24"
              handleChangeData={handleChangeData}
              title={t("p24")}
            />
          </Box>
          <Box m={2}>
            <ChangeField
              value={data.p25}
              name="p25"
              handleChangeData={handleChangeData}
              title={t("p25")}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p58"
              value={values.p58 || data.p58}
              helper={getRoll}
              show={getLang(data.p58)}
              handleChangeData={handleChangeData}
              title={t("p58")}
              options={rollOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p59"
              value={values.p59 || data.p59}
              helper={getRoll}
              show={getLang(data.p59)}
              handleChangeData={handleChangeData}
              title={t("p59")}
              options={rollOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p60"
              value={values.p60 || data.p60}
              helper={getRoll}
              show={getLang(data.p60)}
              handleChangeData={handleChangeData}
              title={t("p60")}
              options={rollOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p61"
              value={values.p61 || data.p61}
              helper={getRoll}
              show={getLang(data.p61)}
              handleChangeData={handleChangeData}
              title={t("p61")}
              options={rollOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p62"
              value={values.p62 || data.p62}
              helper={getRoll}
              show={getLang(data.p62)}
              handleChangeData={handleChangeData}
              title={t("p62")}
              options={rollOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p63"
              value={values.p63 || data.p63}
              helper={getRoll}
              show={getLang(data.p63)}
              handleChangeData={handleChangeData}
              title={t("p63")}
              options={rollOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p64"
              value={values.p64 || data.p64}
              handleChangeData={handleChangeData}
              show={getRollColor(data.p64)}
              title={t("p64")}
              helper={getRollColor}
              options={colorOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p65"
              value={values.p65 || data.p65}
              handleChangeData={handleChangeData}
              show={getRollColor(data.p65)}
              title={t("p65")}
              helper={getRollColor}
              options={colorOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p66"
              value={values.p66 || data.p66}
              handleChangeData={handleChangeData}
              show={getRollColor(data.p66)}
              title={t("p66")}
              helper={getRollColor}
              options={colorOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p67"
              value={values.p67 || data.p67}
              handleChangeData={handleChangeData}
              show={getRollColor(data.p67)}
              title={t("p67")}
              helper={getRollColor}
              options={colorOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p68"
              value={values.p68 || data.p68}
              handleChangeData={handleChangeData}
              show={getRollColor(data.p68)}
              title={t("p68")}
              helper={getRollColor}
              options={colorOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p69"
              value={values.p69 || data.p69}
              handleChangeData={handleChangeData}
              show={getRollColor(data.p69)}
              title={t("p69")}
              helper={getRollColor}
              options={colorOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeField
              value={data.p56}
              name="p56"
              handleChangeData={handleChangeData}
              title={t("p56")}
            />
          </Box>
          <Box m={2}>
            <ChangeField
              value={data.p57}
              name="p57"
              handleChangeData={handleChangeData}
              title={t("p57")}
            />
          </Box>
          <Box m={2}>
            <DoubleSelect
              name="p32"
              value1={values.p32 || data.p32}
              value2={values.p32 || data.p32}
              helper={getColor}
              show={getColor(data.p32)}
              handleChangeData={handleChangeData}
              title={t("p32")}
              options1={colorOptions}
              options2={colorOptions}
            />
          </Box>
          <Box m={2}>
            <DoubleSelect
              name="p33"
              value1={values.p33 || data.p33}
              value2={values.p33 || data.p33}
              helper={getColor}
              show={getColor(data.p33)}
              handleChangeData={handleChangeData}
              title={t("p33")}
              options1={colorOptions}
              options2={colorOptions}
            />
          </Box>
          <Box m={2}>
            <DoubleSelect
              name="p34"
              value1={values.p34 || data.p34}
              value2={values.p34 || data.p34}
              helper={getColor}
              show={getColor(data.p34)}
              handleChangeData={handleChangeData}
              title={t("p34")}
              options1={colorOptions}
              options2={colorOptions}
            />
          </Box>
          <Box m={2}>
            <DoubleSelect
              name="p35"
              value1={values.p35 || data.p35}
              value2={values.p35 || data.p35}
              helper={getColor}
              show={getColor(data.p35)}
              handleChangeData={handleChangeData}
              title={t("p35")}
              options1={colorOptions}
              options2={colorOptions}
            />
          </Box>
          <Box m={2}>
            <DoubleSelect
              name="p36"
              value1={values.p36 || data.p36}
              value2={values.p36 || data.p36}
              helper={getColor}
              show={getColor(data.p36)}
              handleChangeData={handleChangeData}
              title={t("p36")}
              options1={colorOptions}
              options2={colorOptions}
            />
          </Box>
          <Box m={2}>
            <DoubleSelect
              name="p37"
              value1={values.p37 || data.p37}
              value2={values.p37 || data.p37}
              helper={getColor}
              show={getColor(data.p37)}
              handleChangeData={handleChangeData}
              title={t("p37")}
              options1={colorOptions}
              options2={colorOptions}
            />
          </Box>

          <Box m={2}>
            <ChangeField
              value={data.p50}
              name="p50"
              handleChangeData={handleChangeData}
              title={t("p50")}
            />
          </Box>
          <Box m={2}>
            <ChangeField
              value={data.p51}
              name="p51"
              handleChangeData={handleChangeData}
              title={t("p51")}
            />
          </Box>
          <Box m={2}>
            <ChangeField
              value={data.p52}
              name="p52"
              handleChangeData={handleChangeData}
              title={t("p52")}
            />
          </Box>
          <Box m={2}>
            <ChangeField
              value={data.p53}
              name="p53"
              handleChangeData={handleChangeData}
              title={t("p53")}
            />
          </Box>
          <Box m={2}>
            <ChangeField
              value={data.p54}
              name="p54"
              handleChangeData={handleChangeData}
              title={t("p54")}
            />
          </Box>
          <Box m={2}>
            <ChangeField
              value={data.p55}
              name="p55"
              handleChangeData={handleChangeData}
              title={t("p55")}
            />
          </Box>
        </>
      )}
    </div>
  );
};

export default ItemField;
