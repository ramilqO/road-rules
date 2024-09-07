import { Suspense } from "react";

import Routing from "./Components/Routing/Routing";
import Loader from "./Ui/Loader/Loader";

import "./Styles/Main.module.scss";

const App = () => {
  return (
    <Suspense fallback={<Loader loaderStyle="huge" />}>
      <Routing />
    </Suspense>
  );
};

export default App;
