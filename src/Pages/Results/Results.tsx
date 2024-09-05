import Result from "./Result/Result";
import style from "./Results.module.scss";

export default function Results() {
  return (
    <div className={style.results}>
      <Result />
      <Result />
    </div>
  );
}
