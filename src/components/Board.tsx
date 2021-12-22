import React from "react";
import { Droppable, DroppableId } from "react-beautiful-dnd";
import styled from "styled-components";
import { IListItem } from "../recoilState";
import BoardItem from "./BoardItem";

const Board: React.FC<{ list: IListItem[], title: DroppableId }> = ({ list, title }) => {

    return (
        <DroppableContainer>
            <DroppableTitle>{title}</DroppableTitle>
            <Droppable droppableId={title}>
                {(DroppableProvided, snapshot) => (
                    <DroppableBody ref={DroppableProvided.innerRef} {...DroppableProvided.droppableProps} {...snapshot}>
                        {
                            list.map((item, idx) => <BoardItem item={item} index={idx} key={item.id + ""} />)
                        }
                        {DroppableProvided.placeholder}
                    </DroppableBody>
                )}
            </Droppable>
        </DroppableContainer>
    );
}

export default Board;

const DroppableContainer = styled.div`
    background-color: skyblue;
    border-radius: 15px;
    width: fit-content;
    height: fit-content;
    min-width: 200px;
    min-height: 400px;
    border: 3px solid wheat;
`;

const DroppableBody = styled.div<{ isDraggingOver: boolean, draggingFromThisWith?: string }>`
    padding: 10px;
    min-height: 80px;
    background-color: ${({ isDraggingOver, draggingFromThisWith }) => isDraggingOver ? (draggingFromThisWith ? "purple" : "pink") : "lightgrey"};
`;

const DroppableTitle = styled.h1`
    font-size: 25px;
    font-weight: bold;
    user-select: none;
    width: 100%;
    text-align: center;
    padding: 10px 0;
`;