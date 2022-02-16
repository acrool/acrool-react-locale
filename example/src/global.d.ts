import {TTranslateI18n} from 'bear-locale';

declare global {
    /*~ Here, declare things that go in the global namespace, or augment
     *~ existing declarations in the global namespace
     */
    interface Window {
        translateI18n: TTranslateI18n,
    }
}

// Adding this exports the declaration file which Typescript/CRA can now pickup:
export {};
