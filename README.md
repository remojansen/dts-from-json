# jsondts

Command line utility to emit TypeScript type declaration files for JSON files powered by

### Installation and usage

```sh
npm install -g jsondts
```

```sh
jsondts <json-file>
```

You can pass a local path or URL as `<json-file>`.

### Save to a file

The types are printed in stdout, to save to a file simply pipe to output to a file:

```sh
jsondts <json-file> > <dts-dir>
```

### Examples

```sh
jsondts demo/json/senators.json
```

```sh
jsondts https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json
```

```sh
jsondts demo/json/senators.json > demo/types/senators.d.ts 
```

```sh
jsondts demo/json/senators.json --root Senators
```

```sh
jsondts ./demo/json/senators.json --root Senators --types true
```

### Usage via npx

```sh
npx jsondts <json-file>
```

### Customize the root type

The default root type is the CamelCase version of the json file name. For example, if your file is called `nobe-prize.d.ts` the root type will be `NobelPrice` by default.


```sh
$ jsondts <json-file> --root Senators
```

### Use `type` instead of `interface`

```sh
 $ jsondts <json-file> --types
```

### Known limmitations

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
