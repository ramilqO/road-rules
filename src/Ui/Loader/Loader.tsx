import style from "./Loader.module.scss";

type LoaderStyle = "questionImgLoader" | "huge" | "buttonLoader";

interface LoaderProps {
  loaderStyle?: LoaderStyle;
}

const Loader = ({ loaderStyle = "buttonLoader" }: LoaderProps) => {
  let loaderWrapperStyle = "";
  let selfLoaderStyle = "";

  switch (loaderStyle) {
    case "questionImgLoader":
      loaderWrapperStyle = style.wrapperQuestionImgLoader;
      selfLoaderStyle = style.loader__questionImgLoader;
      break;
    case "huge":
      loaderWrapperStyle = style.wrapperHuge;
      selfLoaderStyle = style.loader__huge;
      break;
    case "buttonLoader":
      selfLoaderStyle = style.loader;
      break;
    default:
      selfLoaderStyle = style.loader;
  }

  if (loaderStyle === "buttonLoader") {
    return <div className={selfLoaderStyle} />;
  } else {
    return (
      <div className={loaderWrapperStyle}>
        <div className={selfLoaderStyle} />
      </div>
    );
  }
};

export default Loader;
