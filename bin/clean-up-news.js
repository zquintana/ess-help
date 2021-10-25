const path = require('path');
const fs = require('fs/promises');
const fm = require('front-matter');
const { getYear, getMonth } = require('date-fns');
const contentDir = path.resolve(__dirname, '../content/preventable-tragedies');

const readFrontMatter = async (file) => {
    try {
        const fullPath = path.resolve(contentDir, file);
        const content = await fs.readFile(fullPath);

        return fm(content.toString());
    } catch (e) {
        console.error(e);

        return null;
    }
}

const mdRegex = /^.*\.md$/.compile();
const main = async () => {
    try {
        const files = (await fs.readdir(contentDir)).map((file) => {
            if (!mdRegex.test(file)) {
                console.error(`File not MD ${file}`);
                return null;
            }

            return file;
        }).filter(file => file !== null);

        for (const k in files) {
            const file = files[k];
            try {
                const data = await readFrontMatter(file)
                if (!data.attributes.date) {
                    continue;
                }

                const date = new Date(data.attributes.date);
                const targetDir = path.resolve(contentDir, getYear(date).toString(), (getMonth(date) + 1).toString());
                try {
                    const pathStat = await fs.stat(targetDir);
                } catch (e) {
                    await fs.mkdir(targetDir, { recursive: true });
                }

                await fs.rename(path.resolve(contentDir, file), path.resolve(targetDir, file));
            } catch (e) {
                console.error(e);
            }
        }
    } catch (e) {
        console.error(e);
    }
}

if (require.main === module) {
    main().then(console.log).catch(console.error);
}
