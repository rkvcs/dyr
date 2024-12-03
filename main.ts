import { FolderItem } from "./src/Folder/Item.ts";
import { ListFolderItems } from "./src/Folder/List.ts";
import { FolderInOut } from "./src/FolderInOut.ts";
import { Command as TCommand } from "./src/Command.ts";

/** List all files/directories and render a table with all. */
export function list(search:string|undefined = undefined, only_dir = false, only_files = false): string {

    let command = new TCommand()
    let _result = ''

    if(command.get('h')){
        return command.help()
    }

    if(command.get('v')){
        return command.version()
    }

    let folder: string = Deno.cwd();
    let _items = new ListFolderItems();
    let _total:number = 0;

    try {
        for (const dirEntry of Deno.readDirSync(folder)) {
            let _is_dir = true;

            if (dirEntry.isFile) {
                _is_dir = false;
            }

            // List only files
            if((command.get('f') ?? only_files) && _is_dir == true){
                continue
            }

            // List only directories
            if((command.get('d') ?? only_dir) && _is_dir == false){
                continue
            }

            // find the term
            let _term = command.get('s') ?? search;
            if(_term && dirEntry.name.search(_term.toString()) == -1){
                continue
            }

            let _size = (Deno.statSync(dirEntry.name)).size;
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

        let tb_str = render.table(_items, _footer);
        
        _result = `\n${tb_str}\n`

    } catch (err) {
        if (err instanceof Deno.errors.NotFound) {
            console.error(
                `\n${"Error:"} [${folder}] ${err}.\n`,
            );
        } else {
            console.error(err)
        }
    }

    return _result
}

if (import.meta.main) {
    console.info(list())
}
