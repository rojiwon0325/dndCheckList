import React, { useCallback } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Board from "./components/Board";
import { checkListState, DOING, DONE, getId, TODO } from "./recoilState";

export default function ToDoScreen() {
    const [id, setId] = useRecoilState(getId);
    const [list, setList] = useRecoilState(checkListState);
    const { register, handleSubmit, setValue } = useForm<{ content: string }>();
    const onDragEnd = useCallback(({ source, destination }: DropResult) => {
        if (destination) {
            if (source.droppableId === destination.droppableId) {
                setList(pre => {
                    const item = pre[source.droppableId][source.index];
                    const newlist = [...pre[source.droppableId]];
                    newlist.splice(source.index, 1);
                    newlist.splice(destination.index, 0, item);
                    return { ...pre, [source.droppableId]: newlist };
                });
            } else {
                const item = list[source.droppableId][source.index];
                const srclist = [...list[source.droppableId]];
                srclist.splice(source.index, 1);
                const destlist = [...list[destination.droppableId]];
                destlist.splice(destination.index, 0, item);
                setList(pre => ({
                    ...pre,
                    [source.droppableId]: srclist,
                    [destination.droppableId]: destlist
                }));
            }
        }
    }, [list, setList]);

    const addToDo = useCallback(({ content }: { content: string }) => {
        setList(pre => ({ ...pre, [TODO]: [{ id, content }, ...pre[TODO]] }));
        setId(pre => pre + 1);
        setValue("content", "");
    }, [id, setId, setList, setValue]);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Form onSubmit={handleSubmit(addToDo)}>
                <Title htmlFor="input">Add To Do</Title>
                <Input id="input" {...register('content', { required: true })} />
            </Form>
            <BoardContainer>
                <Board title={TODO} list={list[TODO]} />
                <Board title={DOING} list={list[DOING]} />
                <Board title={DONE} list={list[DONE]} />
            </BoardContainer>
            <Droppable droppableId="Trash">
                {(DroppableProvided, snapshot) => (
                    <Trash ref={DroppableProvided.innerRef} {...DroppableProvided.droppableProps} {...snapshot}>
                        휴지통
                    </Trash>
                )}
            </Droppable>
        </DragDropContext>
    );
};

const BoardContainer = styled.div`
    display: flex;
    width: 100vw;
    justify-content: space-evenly;
    margin: 0 auto;
`;

const Form = styled.form`
    margin: 10px;
    display: flex;
`;

const Title = styled.label`
    padding: 10px;
    font-size: 16px;
`;

const Input = styled.input`
    background-color: wheat;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
`;

const Trash = styled.div<{ isDraggingOver: boolean, draggingFromThisWith?: string }>`
    width: 200px;
    height: 80px;
    border-radius: 5px;
    margin-top: 10px;
    background-color: ${({ isDraggingOver, draggingFromThisWith }) => isDraggingOver ? (draggingFromThisWith ? "purple" : "pink") : "lightgrey"};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
`;