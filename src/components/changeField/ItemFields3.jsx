import { Box } from "@mui/material";
import ChangeField from "./ChangeField";
import { useTranslation } from "react-i18next";
import ChangeSelectLang from "./ChangeSelectLang";
import { getLang, getRoll, getRollColor } from "../../hooks/helpers";

const ItemField3 = ({ data, handleChangeData, values }) => {
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
            {/* Hopper_Nomimnal */}
            <ChangeField
              value={data.p8}
              name="p8"
              handleChangeData={handleChangeData}
              title={t("p3-8")}
            />
          </Box>
          <Box m={2}>
            {/* timeout */}
            <ChangeField
              value={data.p9}
              name="p9"
              handleChangeData={handleChangeData}
              title={t("p3-9")}
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
            {/* sleep manu count */}
            <ChangeField
              value={data.p23}
              name="p23"
              handleChangeData={handleChangeData}
              title={t("p23")}
            />
          </Box>
          <Box m={2}>
            {/* roll time */}
            <ChangeField
              value={data.p24}
              name="p24"
              handleChangeData={handleChangeData}
              title={t("p24")}
            />
          </Box>
          <Box m={2}>
            <ChangeField
              value={data.p37}
              name="p37"
              handleChangeData={handleChangeData}
              title={t("p70")}
            />
          </Box>
          <Box m={2}>
            <ChangeField
              value={data.p38}
              name="p38"
              handleChangeData={handleChangeData}
              title={t("p71")}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p25"
              value={values.p25 || data.p25}
              helper={getRoll}
              show={getLang(data.p25)}
              handleChangeData={handleChangeData}
              title={t("p58")}
              options={rollOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p26"
              value={values.p26 || data.p26}
              helper={getRoll}
              show={getLang(data.p26)}
              handleChangeData={handleChangeData}
              title={t("p59")}
              options={rollOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p27"
              value={values.p27 || data.p27}
              helper={getRoll}
              show={getLang(data.p27)}
              handleChangeData={handleChangeData}
              title={t("p60")}
              options={rollOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p28"
              value={values.p28 || data.p28}
              helper={getRoll}
              show={getLang(data.p28)}
              handleChangeData={handleChangeData}
              title={t("p61")}
              options={rollOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p29"
              value={values.p29 || data.p29}
              helper={getRoll}
              show={getLang(data.p29)}
              handleChangeData={handleChangeData}
              title={t("p62")}
              options={rollOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p30"
              value={values.p30 || data.p30}
              helper={getRoll}
              show={getLang(data.p30)}
              handleChangeData={handleChangeData}
              title={t("p63")}
              options={rollOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p31"
              value={values.p31 || data.p31}
              handleChangeData={handleChangeData}
              show={getRollColor(data.p31)}
              title={t("p64")}
              helper={getRollColor}
              options={colorOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p32"
              value={values.p32 || data.p32}
              handleChangeData={handleChangeData}
              show={getRollColor(data.p32)}
              title={t("p65")}
              helper={getRollColor}
              options={colorOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p33"
              value={values.p33 || data.p33}
              handleChangeData={handleChangeData}
              show={getRollColor(data.p33)}
              title={t("p66")}
              helper={getRollColor}
              options={colorOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p34"
              value={values.p34 || data.p34}
              handleChangeData={handleChangeData}
              show={getRollColor(data.p34)}
              title={t("p67")}
              helper={getRollColor}
              options={colorOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p35"
              value={values.p35 || data.p35}
              handleChangeData={handleChangeData}
              show={getRollColor(data.p35)}
              title={t("p68")}
              helper={getRollColor}
              options={colorOptions}
            />
          </Box>
          <Box m={2}>
            <ChangeSelectLang
              name="p36"
              value={values.p36 || data.p36}
              handleChangeData={handleChangeData}
              show={getRollColor(data.p36)}
              title={t("p69")}
              helper={getRollColor}
              options={colorOptions}
            />
          </Box>
        </>
      )}
    </div>
  );
};

export default ItemField3;
