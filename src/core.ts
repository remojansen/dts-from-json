import JsonToTS from "json-to-ts";
import { readFile } from "node:fs";
import { promisify } from "node:util";
import { basename } from "node:path";
import { cannotGenerateDts, cannotReadFile, cannotWriteFile, invalidJson, invalidJsonExtension } from "./error.js";
import * as changeCase from "change-case";

const readFileAsync = promisify(readFile);

export async function convertJsonToTS(
    jsonFilePath: string,
    rootName?: string,
    useTypeAlias?: boolean
) {

    let fileName: string | null = null;
    let jsonStr: string | null = null;
    let json: string | null = null;
    let dts: string | null = null;
    let dtsFilePath: string | null = null;
    try {
        fileName = basename(jsonFilePath, ".json");
    } catch (error) {
        invalidJsonExtension.throw(`'${jsonFilePath}'`, error as Error);
    }
    try {
        const isRemote = jsonFilePath.startsWith("http://") || jsonFilePath.startsWith("https://");
        if (isRemote) {
            const response = await fetch(jsonFilePath);
            jsonStr = await response.text();
        } else {
            jsonStr = await readFileAsync(jsonFilePath, "utf8");
        }
    } catch (error) {
        cannotReadFile.throw(`'${jsonFilePath}'`, error as Error);
    }
    try {
        json = jsonStr ? JSON.parse(jsonStr) : `Invalid json ${jsonStr}`;
    } catch (error) {
        invalidJson.throw(`'${json}'`, error as Error);
    }
    try {
        const defaultRootName = changeCase.camelCase(fileName!); 
        const options = rootName !== undefined || useTypeAlias !== undefined ? {
            ...(rootName !== undefined ? { rootName } : { rootName: defaultRootName }),
            ...(useTypeAlias !== undefined ? { useTypeAlias } : {}),
        } : undefined;
        dts = JsonToTS.default(json, options).join("\n");
    } catch (error) {
        cannotGenerateDts.throw(`'${dts}'`, error as Error);
    }
    try {
        console.log(dts);
    } catch (error) {
        cannotWriteFile.throw(`'${dtsFilePath}'`, error as Error);
    }
}
