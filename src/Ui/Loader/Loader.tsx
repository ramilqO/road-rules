import style from "./Loader.module.scss";

type LoaderStyle = "basic" | "huge";

function Loader({ loaderStyle = "basic" }: { loaderStyle?: LoaderStyle }) {
  if (loaderStyle === "basic") return <div className={style.loader} />;
  if (loaderStyle === "huge")
    return (
      <div className={style.wrapper}>
        <div className={style.loaderHuge}></div>
      </div>
    );
}
export default Loader;
