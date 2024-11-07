import { Sizes } from "../Size.ts";

export class FolderItem {
    public name: string;
    public size: number;
    public isDir: boolean;

    constructor({ name, size, isDir }: {
        name: string;
        size: number;
        isDir: boolean;
    }) {
        this.name = name;
        this.size = size;
        this.isDir = isDir;
    }

    public parseSize() {
        let target = null;
        let _sizes = new Sizes();
        let result = `${this.size.toFixed(2)} Bytes`;

        for (let key in _sizes.list) {
            let _target = _sizes.get(key);

            if (_target != null && (this.size >= _target)) {
                target = key;
            }
        }

        if (target) {
            let _numb = (this.size / _sizes.list[target]).toFixed(2);
            result = `${_numb} ${target}`;
        }

        return result;
    }
}