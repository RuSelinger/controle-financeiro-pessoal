// Mock para expo-crypto nos testes
const digestStringAsync = jest.fn((algorithm, data) => {
  // Retorna um hash simulado baseado nos dados
  return Promise.resolve(
    Buffer.from(data.toString()).toString('base64').substring(0, 64)
  );
});

const CryptoDigestAlgorithm = {
  SHA256: 'SHA256',
};

module.exports = {
  __esModule: true,
  default: {
    digestStringAsync,
    CryptoDigestAlgorithm,
  },
  digestStringAsync,
  CryptoDigestAlgorithm,
};

