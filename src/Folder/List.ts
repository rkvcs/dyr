import { FolderItem } from "./Item.ts";
import { SummaryFolderItem } from "./Interfaces/Summary.ts";
import { colors } from "https://deno.land/x/cliffy@v1.0.0-rc.4/ansi/colors.ts";

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

    public toArray(filter?: { isDir?: boolean }) {
        let result: Array<string[]> = [];
        let _items: FolderItem[] = [];

        if (filter?.isDir) {
            _items = this.list.filter((item) => item.isDir === filter.isDir);
        } else {
            _items = this.list;
        }

        _items.sort();

        _items.forEach((item) => {
            let _name = item.name;

            if (item.isDir) {
                _name = colors.magenta(_name);
            }

            result.push([_name, item.parseSize()]);
        });

        return result;
    }
}