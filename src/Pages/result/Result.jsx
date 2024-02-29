import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderStatus } from "../../store/actions/subscribe-action";
import { getMe } from "../../store/actions/auth-action";
import { HOME_PAGE } from "../../routing/pats";

const Result = () => {
  // const { orderId } = useParams();
  const dispatch = useDispatch();
  console.log(window.location.search);
  let orderId = new URLSearchParams(window.location.search).get("orderId");
  const data = useSelector((state) => state.subscribe.status);
  useEffect(() => {
    dispatch(
      getOrderStatus({
        orderId: orderId,
      })
    );
  }, [orderId]);

  useEffect(() => {
    if (data && data.status == "success") {
      dispatch(getMe());
      window.location.href = HOME_PAGE;
    }
  }, [data]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <CircularProgress />
      </div>
    </div>
  );
};

export default Result;
