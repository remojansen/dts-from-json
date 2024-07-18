# dts-from-json

Command line utility to emit TypeScript type declaration files for JSON files powered by

### Installation and usage

```sh
npm install -g dts-from-json
```

```sh
dts-from-json <json-file>
```

You can pass a local path or URL as `<json-file>`.

### Save to a file

The types are printed in stdout, to save to a file simply pipe to output to a file:

```sh
dts-from-json <json-file> > <dts-dir>
```

### Examples

```sh
dts-from-json demo/json/senators.json
```

```sh
dts-from-json https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json
```

```sh
dts-from-json demo/json/senators.json > demo/types/senators.d.ts 
```

```sh
dts-from-json demo/json/senators.json --root Senators
```

```sh
dts-from-json ./demo/json/senators.json --root Senators --types true
```

### Usage via npx

```sh
npx dts-from-json <json-file>
```

### Customize the root type

The default root type is the CamelCase version of the json file name. For example, if your file is called `nobe-prize.d.ts` the root type will be `NobelPrice` by default.


```sh
$ dts-from-json <json-file> --root Senators
```

### Use `type` instead of `interface`

```sh
 $ dts-from-json <json-file> --types
```

### Known limitations

- Using json properties with names that have collisions with other types will cause issues. For example, if you have json that looks like:

```json
{
    "meta": {
        // ...
    },
    "objects": [
        // ...
    ]
}
```

It will be translated into:

```ts
interface Meta {
    // ...
}

interface Object { // <-- Collision with Object type
    // ...
}

interface RootObject {
  meta: Meta;
  objects: Object[];
}
```

This will lead to problems with the already defined `Object` type.
