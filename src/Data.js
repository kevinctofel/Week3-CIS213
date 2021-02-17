import { useState, useEffect } from "react";

function Data() {
  const [myQuestions, setMyQuestions] = useState([]);
  const apiURL =
    "https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple";
  const [gotData, setGotData] = useState(false);

  const saveQuestions = (data) => {
    console.log(data.results);
    for (let i = 0; i < data.results.length; i++) {
      myQuestions.push(
        data.results[i].question,
        data.results[i].correct_answer
      );
      for (let j = 0; j < data.results[i].incorrect_answers.length; j++) {
        myQuestions.push(data.results[i].incorrect_answers[j]);
      }
    }
    setMyQuestions(myQuestions);
    console.log(myQuestions);
  };
  // test
  const getQuestions = async () => {
    return await fetch(apiURL)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        // console.log(response.json);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(gotData);
    getQuestions().then((data) => {
      saveQuestions(data);
      setGotData(true);
    });
    // added next line to remove a warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(gotData);
  return (
    <>
      {myQuestions[0]}
      <ul>
        <li>{myQuestions[1]}</li>
        <li>{myQuestions[2]}</li>
        <li>{myQuestions[3]}</li>
        <li>{myQuestions[4]}</li>
      </ul>
    </>
  );
}

export default Data;
