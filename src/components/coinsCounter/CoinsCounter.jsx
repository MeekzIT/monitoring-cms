import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import settingsIll from "../../utils/assets/money.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { BOXES_PAGE } from "../../routing/pats";
import { Box } from "@mui/material";
import coin from "../../utils/assets/time-is-money.png";
import bill from "../../utils/assets/dollar-bill.png";
import { useSelector } from "react-redux";

const CoinsCounter = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const data = useSelector((state) => state.auth.admin);
  return (
    <div>
      <Card sx={{ maxWidth: 345, minWidth: 345, minHeight: 350 }}>
        <CardMedia
          sx={{ height: 150 }}
          image={settingsIll}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {t("indications")}
          </Typography>
          <Box>
            <div className="indications-box">
              <img src={coin} alt="coin" width={35} />
              <div>
                5600{" "}
                {data.countryId == 1
                  ? "֏"
                  : data.countryId == 2
                  ? "₽"
                  : data.countryId == 3
                  ? "₸"
                  : data.countryId == 4
                  ? "	₾ Tetri"
                  : data.countryId == 5
                  ? "byn ₽"
                  : data.countryId == 6
                  ? "₺"
                  : "₼"}
              </div>
            </div>
          </Box>
          <Box>
            <div className="indications-box">
              <img src={bill} alt="bill" width={35} />
              <div>
                8000{" "}
                {data.countryId == 1
                  ? "֏"
                  : data.countryId == 2
                  ? "₽"
                  : data.countryId == 3
                  ? "₸"
                  : data.countryId == 4
                  ? "	₾ Tetri"
                  : data.countryId == 5
                  ? "byn ₽"
                  : data.countryId == 6
                  ? "₺"
                  : "₼"}
              </div>
            </div>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            fullWidth
            onClick={() => navigate(BOXES_PAGE)}
          >
            {t("indications")}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default CoinsCounter;
