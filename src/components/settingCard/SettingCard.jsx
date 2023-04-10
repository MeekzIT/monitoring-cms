import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import settingsIll from "../../utils/assets/settings.png";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMe } from "../../store/actions/auth-action";
import { useNavigate } from "react-router-dom";
import { SETTIGS_PAGE } from "../../routing/pats";
const SettingCard = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const data = useSelector((state) => state.auth.admin);

  useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <Card sx={{ maxWidth: 345, minWidth: 345, minHeight: 350 }}>
      <CardMedia
        sx={{ height: 150 }}
        image={settingsIll}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {t("settings")}
        </Typography>
        <Typography color="text.secondary" variant="h4" component="div">
          {data?.firstName} {data?.lastName}
        </Typography>
        <Typography color="text.secondary" variant="h5" component="div">
          {data?.email}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          fullWidth
          onClick={() => navigate(SETTIGS_PAGE)}
        >
          {t("settings")}
        </Button>
      </CardActions>
    </Card>
  );
};

export default SettingCard;
