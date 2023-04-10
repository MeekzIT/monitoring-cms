import { useDispatch, useSelector } from "react-redux";
import Maps from "../../components/map/Map";
import { useEffect } from "react";
import { getHomePageStatistics } from "../../store/actions/statistics-action";
import ResultCard from "../../components/resultCard/ResultCard";
import "./home.css";
import OwnerHome from "../../components/ownerHome/OwnerHome";
import SuperHome from "../../components/superHome/SuperHome";
import UserHome from "../../components/userHome/UserHome";

const HomePage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.statistics.home);
  const isSuper = useSelector((state) => state.auth.isSuper);
  useEffect(() => {
    dispatch(getHomePageStatistics());
  }, []);

  return (
    <div>
      <Maps />
      {isSuper == "admin" && (
        <div className="home-results-card">
          {userData?.map((i) => {
            return <ResultCard result={i?.Users?.length} title={i?.name} />;
          })}
        </div>
      )}
      {isSuper == "admin" && <SuperHome />}
      {isSuper == "owner" && <OwnerHome />}
      {isSuper == "user" && <UserHome />}
    </div>
  );
};

export default HomePage;
