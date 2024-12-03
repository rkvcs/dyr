import { assertEquals } from "@std/assert";
import { list } from "./main.ts";

Deno.test(function addTest() {
    const _result = list("deno")
    
    let expected_result = "\n";
    expected_result = expected_result.concat(" Name                       Size                      ", "\n");
    expected_result = expected_result.concat(" ------------------------------------------------------- ", "\n");
    expected_result = expected_result.concat(" deno.json                  467.00 Bytes              ", "\n");
    expected_result = expected_result.concat(" deno.lock                  10.13 Kb                  ", "\n");
    expected_result = expected_result.concat(" ------------------------------------------------------- ", "\n");
    expected_result = expected_result.concat(" Total                      10.58 Kb                  \n", "\n");

    assertEquals(_result, expected_result);
});
