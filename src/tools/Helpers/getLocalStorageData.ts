const getLocalStorage = <T>(nameStorage: string): T | null => {
  const storedData = localStorage.getItem(nameStorage);
  return storedData ? (JSON.parse(storedData) as T) : null;
};

export default getLocalStorage;
