export default {
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
    testMatch: ['<rootDir>/**/*.(spec|test).ts?(x)'],
    transform: {
        '^.+\\.(t|j)sx?$': [
            '@swc/jest',
            {
                jsc: {
                    transform: {
                        react: {
                            runtime: 'automatic',
                        },
                    },
                },
            },
        ],
    },
    transformIgnorePatterns: [
        '/node_modules/(?!@acrool/js-logger)', // 這裡加上
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|scss)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
};

