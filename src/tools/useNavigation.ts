import { useNavigate } from "react-router-dom";

interface UseNavigation {
  goToPath: (path: string) => void;
}

// TODO: в чем смысл этой обертки? ты же можешь там где это надо сразу писать navigate('/path') и все, зачем она нужна?
const useNavigation = (): UseNavigation => {
  const navigate = useNavigate();

  const goToPath = (path: string) => {
    navigate(path);
  };

  return { goToPath };
};

export default useNavigation;
