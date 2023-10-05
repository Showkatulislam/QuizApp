"use client";
import { useQuizConfig } from "@/store/QuizStore";
import { useEffect, useState } from "react";
const Page = () => {
  const [questions, setQuestions] = useState<any>(null);
  const [answer,setAnswer]=useState<string>("")
  const config = useQuizConfig((state: any) => state.config);
  const setScore=useQuizConfig((state:any)=>state.setScore)
  const score=useQuizConfig((state:any)=>state.config.score)
  
  useEffect(() => {
    async function getQuestions() {
      const { results } = await (
        await fetch(
          `https://opentdb.com/api.php?amount=${config.numberOfQuestion}&category=${config.category.id}&difficulty=${config.level}&type=${config.type}`
        )
      ).json();
      console.log(results);
      let shuffledResults = results.map((e: any) => {
        let value = [...e.incorrect_answers, e.correct_answer]
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);
        e.answers = [...value];
        return e;
      });
      console.log(shuffledResults, "shuffeled");
      setQuestions([...shuffledResults]);
    }
    getQuestions();
  }, []);

  const checkAnswer=(ans:string)=>{
    
    if(ans === questions[0].correct_answer){
        setScore()
    }
    setAnswer(questions[0].correct_answer)
    
  }

  const nextQuestion=()=>{
    let remainingQuestions = [...questions];
    remainingQuestions.shift();
    setQuestions([...remainingQuestions]);
    setAnswer("");
  }
  console.log(questions);

  return (
    <div className=" flex flex-col justify-center items-center mt-10">
      {!questions&&<h1>Restart </h1>}
      {questions?.length && (
        <>
          <h1 className="text-3xl font-bold">##{config.numberOfQuestion - questions.length + 1} {questions[0].question}</h1>

          <p>correct answer {score} </p>

          <div className="flex justify-evenly items-center w-full my-20 flex-wrap">
            {questions[0].answers.map((e: string) => (
              <button
                className={`w-[40%]  my-2 p-2 rounded-lg text-white 
                 ${e===answer?'bg-green-600':'bg-purple-500'}
                 `}
                key={e}
                onClick={()=>checkAnswer(e)}
              >
                {e}
              </button>
            ))}
          </div>

          <div>
            <button onClick={nextQuestion} className="bg-purple-600 px-20 py-2 text-white">
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
