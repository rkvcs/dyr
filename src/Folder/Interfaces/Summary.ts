import { FolderItem } from "../Item.ts";

export interface SummaryFolderItem {
    list: FolderItem[];
    size: number;
}

export interface ArrayItems {
    name: string;
    size: string;
    is_dir: boolean
}