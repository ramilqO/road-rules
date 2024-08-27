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
/* className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm" */
export default Loader;
