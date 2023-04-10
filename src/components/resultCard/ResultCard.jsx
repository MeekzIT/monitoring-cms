import "./resultCard.css";

const ResultCard = ({ result, title }) => {
  return (
    <div className="resultCard">
      <div className="resultCard-result">
        <h3>{result}</h3>
      </div>
      <div>
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default ResultCard;
