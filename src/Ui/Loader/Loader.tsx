import style from "./Loader.module.scss";

type LoaderStyle = "questionImgLoader" | "huge" | "buttonLoader";

interface LoaderProps {
  loaderStyle?: LoaderStyle;
}

const Loader = ({ loaderStyle = "buttonLoader" }: LoaderProps) => {
  let loaderWrapperStyle = "";
  let selfLoaderStyle = "";

  const loaderStyleClass = (() => {
    switch (loaderStyle) {
      case "questionImgLoader":
        loaderWrapperStyle = style.wrapperQuestionImgLoader;
        selfLoaderStyle = style.loader__questionImgLoader;
        break;
      case "huge":
        loaderWrapperStyle = style.wrapperHuge;
        selfLoaderStyle = style.loader__huge;
        break;
      default:
        style.buttonLoader;
    }
  })();

  if (loaderStyle === "buttonLoader") {
    return <div className={style.loader} />;
  } else {
    return (
      <div className={loaderWrapperStyle}>
        <div className={selfLoaderStyle} />
      </div>
    );
  }
};

export default Loader;
