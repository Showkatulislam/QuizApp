"use client"
import Dropdown from "@/components/DropDown/Dropdown";
import Input from "@/components/Input/Input";
import { useQuizConfig } from "@/store/QuizStore";

export default function Home() {
  const changeStatus = useQuizConfig((state:any) => state.changeStatus);
  const handleStart = () => {
    changeStatus("start")
  }
  return (
    <main className="flex min-h-screen  flex-col items-center p-5 mt-5">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
        Welcome my Quiz app
      </h1>
      <div className="w-1/2 p-8 shadow-xl rounded-2xl bg-gray-200">
        <Input />
        <Dropdown></Dropdown>
        <div className="flex justify-center my-5">
          <button onClick={handleStart} className="bg-orange-500 text-xl text-white px-4 py-1 rounded-lg">
            Start Quiz
          </button>
        </div>
      </div>
    </main>
  );
}
