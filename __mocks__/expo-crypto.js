// Mock para expo-crypto nos testes
const crypto = require('crypto');

const digestStringAsync = jest.fn(async (algorithm, data) => {
  // Retorna um hash SHA256 real para testes mais precisos
  if (algorithm === 'SHA256') {
    return crypto.createHash('sha256').update(data.toString()).digest('hex');
  }
  return Promise.resolve(
    Buffer.from(data.toString()).toString('base64').substring(0, 64)
  );
});

const getRandomBytesAsync = jest.fn(async (length) => {
  // Retorna bytes aleatórios reais para testes mais precisos
  // Retorna como Buffer que é compatível com Uint8Array e WordArray
  const bytes = crypto.randomBytes(length);
  // Converter para array de números para compatibilidade
  return Promise.resolve(Array.from(bytes));
});

const CryptoDigestAlgorithm = {
  SHA256: 'SHA256',
};

module.exports = {
  __esModule: true,
  default: {
    digestStringAsync,
    getRandomBytesAsync,
    CryptoDigestAlgorithm,
  },
  digestStringAsync,
  getRandomBytesAsync,
  CryptoDigestAlgorithm,
};

