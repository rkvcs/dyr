import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";
import { colors } from "https://deno.land/x/cliffy@v1.0.0-rc.4/ansi/colors.ts";
import { Row, Table } from "https://deno.land/x/cliffy@v1.0.0-rc.4/table/mod.ts";

import { FolderItem } from "./src/Folder/Item.ts";
import { ListFolderItems } from "./src/Folder/List.ts";


class FolderInOut {
    public table(_items: ListFolderItems, _footer: FolderItem) {

        let tb = new Table()
            .header([colors.bold.blue("Name"), colors.bold.blue("Size")])
            .body(_items.toArray({ isDir: false }))
            .padding(3)
            .indent(2);

        let tb_footer = new Table()
            .body([ new Row(colors.bold.green(_footer.name), _footer.parseSize()) ])
            .padding(3)
            .indent(2);

        console.info(`\n${tb}\n\n${tb_footer}\n`);
    }
}

export async function list() {
    const { options } = await new Command()
        .name("dyr")
        .version("0.1.2")
        .description("Command line to list files on folder.")
        .option("-s, --search <term:string>", "Find files or folders by name")
        .option("-d, --only-dirs", "List only directories")
        .option("-f, --only-files", "List only files")
        .parse(Deno.args);

    let folder: string = Deno.cwd();
    let _items = new ListFolderItems();
    let _total:number = 0;

    try {
        for await (const dirEntry of Deno.readDir(folder)) {
            let _is_dir = true;

            if (dirEntry.isFile) {
                _is_dir = false;
            }

            if(options?.onlyFiles && _is_dir == true){
                continue
            }

            if(options?.onlyDirs && _is_dir == false){
                continue
            }

            if(options?.search && dirEntry.name.search(options.search) == -1){
                continue
            }

            let _size = (await Deno.stat(dirEntry.name)).size;
            _total += _size

            _items.add(
                new FolderItem({
                    name: dirEntry.name,
                    size: _size,
                    isDir: _is_dir,
                }),
            );
        }

        let render = new FolderInOut();
        let _footer = new FolderItem({name: 'Total', size: _total, isDir: false});

        _items.sort();
        render.table(_items, _footer);

    } catch (err) {
        if (err instanceof Deno.errors.NotFound) {
            console.error(
                `\n${colors.bold.red("Error:")} [${
                    colors.yellow(folder)
                }] ${err}.\n`,
            );
        }
    }
}

if (import.meta.main) {
    list();
}
