import { useNavigate } from "react-router-dom";

interface UseNavigation {
  goToPath: (path: string) => void;
}

const useNavigation = (): UseNavigation => {
  const navigate = useNavigate();

  const goToPath = (path: string) => {
    navigate(path);
  };

  return { goToPath };
};

export default useNavigation;
