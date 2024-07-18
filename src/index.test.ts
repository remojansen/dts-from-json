import { exec } from 'node:child_process';
import {describe, expect, test} from '@jest/globals';

interface TestCaseResult {
    stdout: string;
    stderr: string;
}

function testCase(cmd: string) {
    return new Promise<TestCaseResult>((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            }
            resolve({ stdout, stderr });
        });
    });
}

describe('jsondts', () => {

  test('JSON path to dts (A)', async () => {
    const { stderr, stdout } = await testCase('node ./dist/index.js ./demo/json/senators.json');
    expect(stderr).toMatchSnapshot();
    expect(stdout).toMatchSnapshot();
  });

  test('JSON path to dts (B)', async () => {
    const { stderr, stdout } = await testCase('node ./dist/index.js ./demo/json/pokedex.json');
    expect(stderr).toMatchSnapshot();
    expect(stdout).toMatchSnapshot();
  });

  test('JSON path to dts (C)', async () => {
    const { stderr, stdout } = await testCase('node ./dist/index.js ./demo/json/nobel-prize.json');
    expect(stderr).toMatchSnapshot();
    expect(stdout).toMatchSnapshot();
  });

  test('JSON URL to dts', async () => {
    const { stderr, stdout } = await testCase('node ./dist/index.js https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json');
    expect(stderr).toMatchSnapshot();
    expect(stdout).toMatchSnapshot();
  });

  test('Custom root', async () => {
    const { stderr, stdout } = await testCase('node ./dist/index.js ./demo/json/senators.json --root USSenators');
    expect(stderr).toMatchSnapshot();
    expect(stdout).toMatchSnapshot();
  });

  test('Use type keyword', async () => {
    const { stderr, stdout } = await testCase('node ./dist/index.js ./demo/json/senators.json --types');
    expect(stderr).toMatchSnapshot();
    expect(stdout).toMatchSnapshot();
  });

});
