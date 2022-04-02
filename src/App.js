import React, { useState } from "react";
import styled from "styled-components";

import NewTaskForm from "./NewTaskForm";
import TaskList from "./TastList";

const data = [
  { id: "1", title: "서비스 개발팀 회의 내용 정리", done: false },
  { id: "2", title: "PR 템플릿 만들기", done: false },
  { id: "3", title: "React UI 라이브러리 검토", done: false },
];

const App = React.memo(() => {
  const [tasks, setTasks] = useState(data);

  //카운트 구하기
  let completeCount = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].done === true) {
      completeCount++;
    }
  }

  //******* setTimeout *********
  // function happy(sec, second) {
  //   for (let i = 0; i <= sec; i++) {
  //     setTimeout(() => {
  //       console.log(i);
  //     }, second * i);
  //   }
  // }
  // happy(3, 1000);

  //******* Promise *********
  // function birthday(sec, second) {
  //   for (let i = 0, pending = Promise.resolve(); i <= sec; i++) {
  //     pending = pending
  //       .then(() => {
  //         return new Promise((resolve, reject) => {
  //           setTimeout(() => {
  //             resolve(i);
  //           }, second);
  //         });
  //       })
  //       .then((data) => {
  //         console.log(data);
  //       });
  //   }
  // }
  // birthday(10, 1000);

  //******* async/await *********
  // const timer = (ms) => new Promise((res) => setTimeout(res, ms));
  // async function processArray(sec, second) {
  //   for (let i = 0; i <= sec; i++) {
  //     console.log(i);
  //     await timer(second);
  //   }
  // }
  // processArray(5, 1000);
  return (
    <Body>
      <h1>Hello TODO</h1>
      <NewTaskForm setTasks={setTasks} tasks={tasks} />
      <CountList>
        <span>전체: {tasks.length}</span>
        <span>완료: {completeCount}</span>
        <span>미완료: {tasks.length - completeCount}</span>
      </CountList>
      <TaskList setTasks={setTasks} tasks={tasks} />
    </Body>
  );
});

const Body = styled.div`
  max-width: 300px;
  margin: auto;
`;

const CountList = styled.div`
  display: flex;
  gap: 8px;
`;
export default App;
