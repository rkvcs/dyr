export class Sizes {
    public list: { [key: string]: number } = {
        Bytes: 1,
        Kb: Math.pow(1024, 1),
        Mb: Math.pow(1024, 2),
        Gb: Math.pow(1024, 3),
    };

    get(key?: string) {
        if (key) {
            return this.list[key];
        }
        return null;
    }
}