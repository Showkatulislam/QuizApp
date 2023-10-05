"use client";
import { useQuizConfig } from "@/store/QuizStore";

const Input = () => {
  const addQuestionNumber = useQuizConfig(
    (state: any) => state.addQuestionNumber
  );
  return (
    <div className="flex flex-col px-4 py-2 rounded-lg bg-gray-50">
      <label className="text-xs" htmlFor="num">
        Number of Question
      </label>
      <input
        onChange={(e:React.FormEvent<HTMLInputElement>)=>addQuestionNumber(e.currentTarget.value)}
        className="outline-none bg-inherit"
        defaultValue={10}
        max={50}
        min={5}
        type="number"
        name=""
        id="num"
      />
    </div>
  );
};

export default Input;
