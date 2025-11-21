module.exports = {
	preset: 'jest-expo',
	transformIgnorePatterns: [
		'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|date-fns)'
	],
	setupFilesAfterEnv: [
		'@testing-library/react-native/extend-expect',
		'<rootDir>/jest.setup.js'
	],
	collectCoverageFrom: [
		'src/**/*.{js,jsx}',
		'!src/**/*.test.{js,jsx}',
	],
	testEnvironment: 'node',
	moduleNameMapper: {
		'^expo-sqlite$': '<rootDir>/__mocks__/expo-sqlite.js',
		'^expo-crypto$': '<rootDir>/__mocks__/expo-crypto.js',
		'^expo-secure-store$': '<rootDir>/__mocks__/expo-secure-store.js',
	},
};
