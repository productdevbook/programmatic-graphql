// generate.mjs
import * as fs from 'fs/promises';
import * as path from 'path';
import * as url from 'url';
import { codegen } from '@graphql-codegen/core';
import { preset } from '@eddeee888/gcg-typescript-resolver-files';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const typeDefs = mergeTypeDefs(loadFilesSync('./graph-backend/**/*.graphql'));
const schemas = await loadSchema('./graph-backend/**/*.graphql', {
    loaders: [new GraphQLFileLoader()],
    includeSources: true, // Note: This is important as the preset relies on sources to do smart stuff
});

const generateOptions = await preset.buildGeneratesSection({
    baseOutputDir: '/Users/productdevbook/testalani/programmatic-graphql/example2/src',
    presetConfig: {},
    schema: typeDefs,
    schemaAst: schemas,
    config: {},
    documents: [],
    plugins: [],
    pluginMap: {},
});

async function isExists(path:string) {
    try {
        await fs.access(path);
        return true;
    } catch {
        return false;
    }
};

async function writeFile(filePath:string, data:any) {
    try {
        const dirname = path.dirname(filePath);
        const exist = await isExists(dirname);
        if (!exist) {
            await fs.mkdir(dirname, { recursive: true });
        }

        await fs.writeFile(filePath, data, 'utf8');
    } catch (err:any) {
        throw new Error(err);
    }
}

for (const option of generateOptions) {

    console.log(option.filename);
    const output = await codegen(option);
    await writeFile(path.join(__dirname, option.filename), output);
}