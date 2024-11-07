import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";
import { colors } from "https://deno.land/x/cliffy@v1.0.0-rc.4/ansi/colors.ts";
import { Table } from "https://deno.land/x/cliffy@v1.0.0-rc.4/table/mod.ts";

import { FolderItem } from "./src/Folder/Item.ts";
import { ListFolderItems } from "./src/Folder/List.ts";


class FolderInOut {
    public table(_items: ListFolderItems) {
        let tb = new Table()
            .header([colors.bold.blue("Name"), colors.bold.blue("Size")])
            .body(_items.toArray({ isDir: false }))
            .padding(3)
            .indent(2);

        console.info(`\n${tb}\n`);
    }
}

export async function list() {
    const { options } = await new Command()
        .name("dyr")
        .version("0.1.0")
        .description("Command line to list files on folder.")
        .option("-f, --find", "Tool to find files or folders by name")
        .parse(Deno.args);

    let folder: string = Deno.cwd();
    let _items = new ListFolderItems();

    try {
        for await (const dirEntry of Deno.readDir(folder)) {
            let _is_dir = true;

            if (dirEntry.isFile) {
                _is_dir = false;
            }

            _items.add(
                new FolderItem({
                    name: dirEntry.name,
                    size: (await Deno.stat(dirEntry.name)).size,
                    isDir: _is_dir,
                }),
            );
        }

        let render = new FolderInOut();
        
        _items.sort();
        render.table(_items);

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
