import Result from "./Result/Result";
import style from "./Results.module.scss";

const Results = () => {
  return (
    <div className={style.results}>
      <Result />
      <Result />
    </div>
  );
}

export default Results