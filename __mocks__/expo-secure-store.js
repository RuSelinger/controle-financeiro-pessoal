// Mock para expo-secure-store
const store = {};

const SecureStore = {
	async getItemAsync(key) {
		return store[key] || null;
	},
	async setItemAsync(key, value) {
		store[key] = value;
	},
	async deleteItemAsync(key) {
		delete store[key];
	},
};

// Exportar como default e named export
module.exports = SecureStore;
module.exports.default = SecureStore;
