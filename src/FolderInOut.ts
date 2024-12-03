import { 
    Table as Tyble, 
    Row as TRow, 
    Column as TColumn, 
    TableStyle, 
    TextAlign, 
    TextStyle 
} from "@rkvcs/tyble";

import { FolderItem } from "./Folder/Item.ts";
import { ListFolderItems } from "./Folder/List.ts";
import { Chalk } from "npm:chalk@5.3.0";

export class FolderInOut {
    public table(_items: ListFolderItems, _footer: FolderItem): string {

        let chalk = new Chalk();
        let table = new Tyble({
            columns: 2,
            width: 25,
            tableStyle: TableStyle.SIMPLE
        })

        let header = new TRow(
            new TColumn("Name", new TextStyle(chalk.blue).add(chalk.bold)), 
            new TColumn("Size", new TextStyle(chalk.blue).add(chalk.bold))
        )

        let footer = new TRow(
            new TColumn(_footer.name, new TextStyle(chalk.green).add(chalk.italic)),
            new TColumn(_footer.parseSize(), new TextStyle(chalk.green).add(chalk.italic)),
        )

        table.addHeader(header)
        table.addFooter(footer)

        _items.toArray({ isDir: false }).forEach( (item) => {
            let _name = new TColumn(item.name);

            if(item.is_dir) {
                _name = new TColumn(item.name, new TextStyle(chalk.magenta));
            }

            let _row = new TRow(_name, new TColumn(item.size))
            table.add(_row)
        })

        return table.render()
    }
}