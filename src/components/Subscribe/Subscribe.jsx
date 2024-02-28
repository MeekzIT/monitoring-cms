import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registrateOrder } from "../../store/actions/subscribe-action";
import { useNavigate } from "react-router-dom";
import { PAYMENT_PAGE } from "../../routing/pats";

const Subscribe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.auth.admin);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Ваша подписка закончилась</h1>
      <h3>
        Для дальнейшего использования нашего платформы приступайте к оплате.
        Течение подписки 30 дней.
      </h3>
      <Button
        size="large"
        variant="contained"
        onClick={() => {
          dispatch(
            registrateOrder({
              ownerId: data.id,
            })
          );
          // navigate(PAYMENT_PAGE);
        }}
      >
        Приступать к оплате
      </Button>
    </div>
  );
};

export default Subscribe;
