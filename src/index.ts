#!/usr/bin/env node
import meow from 'meow';
import { convertJsonToTS } from './core.js';
import { unexpectedError } from "./error.js";

try {
	const cli = meow(`
		Usage
		  $ jsondts <json-file>
	
		Options
		   Path to the JSON file
		  --root Name of the root type
		  --types Use type instead of interface
	
		Examples
		  $ jsondts ./demo/json/senators.json
		  $ jsondts ./demo/json/senators.json --root Senators --types true
	`, {
		importMeta: import.meta,
		flags: {
			root: {
				type: 'string',
			},
			types: {
				type: 'boolean',
			}
		}
	});
	const path = cli.input[0];
	const { root, types } = cli.flags;
	convertJsonToTS(path, root, types);

} catch (error) {
	unexpectedError.throw("", error as Error);
}