import style from "./Loader.module.scss";

type LoaderStyle = "questionImgLoader" | "huge" | "buttonLoader";

function Loader({
  loaderStyle = "buttonLoader",
}: {
  loaderStyle?: LoaderStyle;
}) {
  if (loaderStyle === "buttonLoader") return <div className={style.loader} />;
  if (loaderStyle === "questionImgLoader")
    return (
      <div className={style.questionImgLoader}>
        <div className={style.loader__questionImgLoader} />;
      </div>
    );
  if (loaderStyle === "huge")
    return (
      <div className={style.wrapper}>
        <div className={style.loader__huge}></div>
      </div>
    );
}
export default Loader;
