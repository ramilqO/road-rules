const helpers = {
  capitalizeFirstLetter: (text: string) => {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  },
  getLocalStorage: <T>(nameStorage: string): T | null => {
    const storedData = localStorage.getItem(nameStorage);
    return storedData ? (JSON.parse(storedData) as T) : null;
  },
};

export default helpers;
