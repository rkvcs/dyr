import { FolderItem } from "./Item.ts";
import { SummaryFolderItem, ArrayItems } from "./Interfaces/Summary.ts";

export class ListFolderItems {
    private list: FolderItem[] = [];

    public sort() {
        this.list.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }

            if (a.name < b.name) {
                return -1;
            }

            return 0;
        });
    }

    public summary() {
        let files: SummaryFolderItem = {
            list: [],
            size: 0,
        };

        let folders: SummaryFolderItem = {
            list: [],
            size: 0,
        };

        files.list = this.list.filter((item) => item.isDir === false);
        files.size = files.list.reduce((total, item) => {
            return total + item.size;
        }, 0);

        folders.list = this.list.filter((item) => item.isDir === true);
        folders.size = folders.list.reduce((total, item) => {
            return total + item.size;
        }, 0);

        return {
            files,
            folders,
        };
    }

    public add(item: FolderItem) {
        this.list.push(item);
    }

    public get(index: number) {
        return this.list[index] ?? null;
    }

    public toSimpleArray() {
        let _items: FolderItem[] = [];
        let result: string[] = [];

        _items.sort();
        _items = this.list;

        _items.forEach((item) => {
            result.push(item.name);
        });

        return result;
    }

    public toArray(filter?: { isDir?: boolean }): Array<ArrayItems> {
        let result: Array<ArrayItems> = [];
        let _items: FolderItem[] = [];

        if (filter?.isDir) {
            _items = this.list.filter((item) => item.isDir === filter.isDir);
        } else {
            _items = this.list;
        }

        _items.sort();

        _items.forEach((item) => {
            result.push({ 
                name: item.name, 
                size: item.parseSize(), 
                is_dir: item.isDir
            });
        });

        return result;
    }
}