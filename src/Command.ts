import { parseArgs } from "@std/cli/parse-args";
import { Chalk } from "npm:chalk@5.3.0";

let chalk = new Chalk();

export class Command {

    private _input: Record<string, string|boolean>

    constructor(){

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

    input(){
        return this._input
    }

    getInfoApp(){
      try {
        let data = Deno.readFileSync('xdeno.json')
        return JSON.parse(new TextDecoder().decode(data))
      } catch(err) {
        return {}
      }
    }

    help(){
        return `
Usage:   ${chalk.magenta('dyr')}

${chalk.green('Description:')}

Command line to list files on folder.

${chalk.green('Options:')}

-h               - Show this help.
-s <term>        - Find files or folders by name
-d               - List only directories
-f               - List only files
        `
    }
}
