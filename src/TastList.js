import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FcCheckmark } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import styled from "styled-components";

const TaskList = React.memo((props) => {
  const { tasks, setTasks } = props;

  //완료 체크
  const changeColor = (task, index) => {
    let todoArray = tasks.filter((list) => list.id !== task.id);
    let completeItem = { id: task.id, title: task.title, done: true };
    todoArray.splice(index, 0, completeItem);
    setTasks(todoArray);
  };
  //완료 취소
  const cancelColor = (task, index) => {
    let todoArray = tasks.filter((list) => list.id !== task.id);
    let completeItem = { id: task.id, title: task.title, done: false };
    todoArray.splice(index, 0, completeItem);
    setTasks(todoArray);
  };
  //순서 변경
  const handleOnDragEnd = (result) => {
    const [reorderedList] = tasks.splice(result.source.index, 1);
    tasks.splice(result.destination.index, 0, reorderedList);
    setTasks(tasks);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <ul
            className="tasks"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks &&
              tasks.map((task, index) => {
                return (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <Li
                        done={task.done}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Span>{task.title}</Span>
                        {!task.done ? (
                          <Click>
                            <FcCheckmark
                              onClick={() => changeColor(task, index)}
                            />
                          </Click>
                        ) : (
                          <Click>
                            <FcCancel
                              onClick={() => cancelColor(task, index)}
                            />
                          </Click>
                        )}
                      </Li>
                    )}
                  </Draggable>
                );
              })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
});

const Li = styled.li`
  margin-bottom: 0.8em;
  background: ${(props) => (props.done ? "pink" : "white")};
`;
const Span = styled.span`
  margin: 0 1em 0 0;
`;
const Click = styled.span`
  cursor: pointer;
`;
export default TaskList;
