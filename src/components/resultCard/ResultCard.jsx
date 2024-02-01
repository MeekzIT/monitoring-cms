import { themePallete } from "../..";
import "./resultCard.css";

const ResultCard = ({ result, title }) => {
  return (
    <div
      className="resultCard"
      style={{
        border: `2px solid ${themePallete}`,
        color: themePallete,
      }}
    >
      <div
        className="resultCard-result"
        style={{
          border: `1px solid ${themePallete}`,
        }}
      >
        <h3>{result}</h3>
      </div>
      <div>
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default ResultCard;
