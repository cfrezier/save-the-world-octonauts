import fs from "fs";

export const COMMANDS_DIRECTORY = '/tmp/commands'
export const saveCommand = (toWrite: any) => {
    if (!fs.existsSync(COMMANDS_DIRECTORY)) {
        fs.mkdirSync(COMMANDS_DIRECTORY, undefined);
    }
    const filenames = fs.readdirSync(COMMANDS_DIRECTORY);

    try {
        let nextId = 0;
        filenames.forEach((filename) => {
            const match = filename.replace('command-', '').replace('.txt', '');
            if (match) {
                const commandId = parseInt(match);
                if (nextId < commandId) {
                    nextId = commandId;
                }
            }
        });
        fs.writeFile(`${COMMANDS_DIRECTORY}/command-${nextId + 1}.txt`, JSON.stringify(toWrite, undefined, 4) + '\n', (err) => {
            if (err)
                console.log(err);
            else {
                console.log(`Commande ${nextId + 1} enregistrée`);
            }
        });
        return nextId + 1;
    } catch (err) {
        console.error(err);
        return -1;
    }
}