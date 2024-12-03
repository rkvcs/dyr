import { parseArgs } from "@std/cli/parse-args";
import { Chalk } from "npm:chalk@5.3.0";

let chalk = new Chalk();

export class Command {

    private _data: {
        name: string
        version: string
    }

    private _input: Record<string, string|boolean>

    constructor(){
        this._data = this.getInfoApp()

        const default_values = {
            h: undefined,
            v: undefined,
            s: undefined,
            d: undefined,
            f: undefined,
        }

        const flags: Record<any, any> = {...default_values, ...parseArgs(Deno.args) }
        const input: Record<string, string|boolean> = {}
        
        for (let x in flags){
            if(flags[x] != undefined && x != '_'){
                input[x] = flags[x]
            }
        }
        this._input = input
    }

    get(key:string){
        return this._input[key] ?? undefined
    }

    version(): string {
        
        if(this._data.version){
            return `\ndyr ${this._data.version}\n`
        }

        return ''
    }

    input(){
        return this._input
    }

    getInfoApp(){
        let data = Deno.readFileSync('deno.json')
        return JSON.parse(new TextDecoder().decode(data))
    }

    help(){
        return `
Usage:   ${chalk.magenta('dyr')}
Version: ${chalk.blue(this._data?.version)}

${chalk.green('Description:')}

Command line to list files on folder.

${chalk.green('Options:')}

-h               - Show this help.                            
-v               - Show the version number for this program.  
-s <term>        - Find files or folders by name              
-d               - List only directories                      
-f               - List only files 
        `
    }
}