"use client";
import { useQuizConfig } from "@/store/QuizStore";
import { useEffect, useState } from "react";
type CategoryType = {
  id: number;
  name: string;
};
const Dropdown = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const addCategory = useQuizConfig((state: any) => state.addCategory);
  const addLevel = useQuizConfig((state: any) => state.addLevel);
  const addType = useQuizConfig((state: any) => state.addType);
  const config = useQuizConfig((state: any) => state.config);
  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.trivia_categories));
  }, []);
  console.log(config);

  return (
    <div className="flex justify-between my-4">
      <div>
        <select
          onClick={(e: any) => addCategory(e.target.value, e.target.innerText)}
          className="outline-none w-48 rounded-lg py-2"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          onClick={(e: any) => addLevel(e.target.value)}
          className="outline-none px-6 rounded-lg py-2"
        >
          {["easy", "medium", "hard"].map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          onClick={(e: any) => addType(e.target.value)}
          className="outline-none px-6 rounded-lg py-2"
        >
          {["boolean", "multiple"].map((e) => (
            <option key={e}>{e}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
