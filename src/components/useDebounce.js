import {useEffect, useState} from "react";

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
};

// 사용 예시 
// searchTerm이 500ms 동안 변하지 않을때 fetch 할때
// const debouncedSearchTerm = useDebounce(searchTerm, 500);
// useEffect(() => {
//   if (debouncedSearchTerm) {
//     fetchSearchMovie(debouncedSearchTerm);
//   }
// }, [debouncedSearchTerm]);