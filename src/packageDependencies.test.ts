import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

describe('套件的相依', () => {
    it('不依賴 react-intl 與 @formatjs（v5 起自己格式化 {name} 參數）', () => {
        const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf8'));
        const names = Object.keys({...pkg.dependencies, ...pkg.peerDependencies});
        expect(names.filter((name) => name === 'react-intl' || name.startsWith('@formatjs/'))).toEqual([]);
    });
});
