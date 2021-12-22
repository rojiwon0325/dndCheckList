import { atom, selector } from "recoil";

export const TODO = "To Do";
export const DOING = "Doing";
export const DONE = "Done";

export interface IListItem {
    id: number,
    content: string,
}

export interface ICheckList {
    [TODO]: IListItem[];
    [DOING]: IListItem[];
    [DONE]: IListItem[];
    "Trash": [];
}

export interface ICheckList_num {
    [TODO]: number;
    [DOING]: number;
    [DONE]: number;
};

const itemId = atom({
    key: "ItemId",
    default: 0
})

export const getId = selector<number>({
    key: "ItemId/selector",
    get: ({ get }) => get(itemId),
    set: ({ set }, newValue) => set(itemId, newValue)
});

export const checkListState = atom<ICheckList>({
    key: "CheckList",
    default: {
        [TODO]: [],
        [DOING]: [],
        [DONE]: [],
        "Trash": []
    }
});

export const totalOfCheckList = selector<ICheckList_num>({
    key: "CheckList/Total",
    get: ({ get }) => {
        const state = get(checkListState);
        return {
            [TODO]: state[TODO].length,
            [DOING]: state[DOING].length,
            [DONE]: state[DONE].length
        };
    }
});

export const ratioOfCheckList = selector<ICheckList_num>({
    key: "CheckList/Total",
    get: ({ get }) => {
        const state = get(checkListState);
        const total = state[TODO].length + state[DOING].length + state[DONE].length;
        if (total === 0) {
            return {
                [TODO]: 0,
                [DOING]: 0,
                [DONE]: 0
            }
        }
        return {
            [TODO]: state[TODO].length / total,
            [DOING]: state[DOING].length / total,
            [DONE]: state[DONE].length / total
        };
    }
});