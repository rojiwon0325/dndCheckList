import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IListItem } from "../recoilState";

const BoardItem: React.FC<{ item: IListItem, index: number }> = ({ item, index }) => {
    return (
        <Draggable draggableId={item.id + ""} index={index}>
            {(DraggableProvided, snapshot) => (
                <DraggableItem
                    {...DraggableProvided.draggableProps}
                    {...DraggableProvided.dragHandleProps}
                    ref={DraggableProvided.innerRef}
                    {...snapshot}
                >
                    {item.content}
                </DraggableItem>
            )}
        </Draggable>
    );
}

export default React.memo(BoardItem);

const DraggableItem = styled.div<{ isDragging: boolean }>`
    background-color: yellow;
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px;
    user-select: none;
    width: 200px;
    min-height: 50px;
    display: flex;
    align-items: center;
    white-space: pre-line;
    word-break: keep-all;
    box-shadow: ${({ isDragging }) => isDragging ? "3px 3px 10px black" : "none"};
`;
