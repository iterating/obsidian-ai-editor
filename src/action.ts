import { Model } from "./llm/models";
import { OpenAIModel } from "./llm/openai_llm";

export enum Selection {
    ALL = "ALL",
    CURSOR = "CURSOR",
}

export enum Location {
    INSERT_HEAD = "INSERT_HEAD",
    APPEND_BOTTOM = "APPEND_BOTTOM",
    APPEND_CURRENT = "APPEND_CURRENT",
    APPEND_TO_FILE = "APPEND_TO_FILE",
    REPLACE_CURRENT = "REPLACE_CURRENT",
}

export interface UserAction {
    name: string;
    prompt: string;
    sel: Selection;
    loc: Location;
    locationExtra?: { fileName: string };
    format: string;
    modalTitle: string;
    model: Model;
}

const SELECTION_SETTING: { [key: string]: string } = {
    [Selection.ALL.toString()]: "Select the whole document",
    [Selection.CURSOR.toString()]: "Input selected text by cursor",
};

const LOCATION_SETTING: { [key: string]: string } = {
    [Location.INSERT_HEAD.toString()]:
        "Insert at the beginning of the document",
    [Location.APPEND_BOTTOM.toString()]: "Append to the end of the document",
    [Location.APPEND_CURRENT.toString()]:
        "Append to the end of current selection",
    [Location.REPLACE_CURRENT.toString()]: "Replace the current selection",
    [Location.APPEND_TO_FILE.toString()]: "Append to a file specified below",
};

const MODEL_NAMES: { [key: string]: string } = {
    // Most Used Model
    [OpenAIModel.GPT_3_5_TURBO]: "GPT-3.5 Turbo (Default)",

    // Other GPT-3.5 Models
    [OpenAIModel.GPT_3_5_TURBO_0125]: "GPT-3.5 Turbo 0125",

    // GPT-4 Models
    [OpenAIModel.GPT_4]: "GPT-4",
    [OpenAIModel.GPT_4_TURBO]: "GPT-4 Turbo",
    [OpenAIModel.GPT_4_1106_PREVIEW]: "GPT-4 Turbo 1106 (Cost-effective)",
};

export function locationDictionary(): { [key: string]: string } {
    return Object.values(Location).reduce((obj, value) => {
        obj[value] = LOCATION_SETTING[value];
        return obj;
    }, {} as { [key: string]: string });
}

export function selectionDictionary(): { [key: string]: string } {
    return Object.values(Selection).reduce((obj, value) => {
        obj[value] = SELECTION_SETTING[value];
        return obj;
    }, {} as { [key: string]: string });
}

export function modelDictionary(): { [key: string]: string } {
    return Object.values(OpenAIModel).reduce((obj, value) => {
        obj[value] = MODEL_NAMES[value];
        return obj;
    }, {} as { [key: string]: string });
}
