import React, { useEffect, useRef, useState } from "react";

const NewTaskForm = React.memo((props) => {
  const { setTasks, tasks } = props;
  const listInput = useRef();
  const [list, setList] = useState();

  //화면 로드시 input창 focus
  useEffect(() => {
    listInput.current.focus();
  }, []);

  //리스트값 가져오기
  const myList = (e) => {
    setList(e.target.value);
  };
  //엔터키로 리스트 추가
  const enterKey = (e) => {
    if (e.key === "Enter" && list.replace(/\s|/gi, "").length !== 0) {
      addList();
    }
  };
  //리스트에 추가하기
  const addList = () => {
    setTasks(() => [
      ...tasks,
      { id: `${tasks.length + 1}`, title: list, done: false },
    ]);
    setList("");
  };
  return (
    <div>
      <input
        placeholder="새로울 할 일을 입력하세요."
        onChange={myList}
        onKeyPress={enterKey}
        value={list || ""}
        ref={listInput}
      />
      <button onClick={addList}>등록</button>
    </div>
  );
});

export default NewTaskForm;
