export const funcs = {
  func: (lol) => {
    return lol + 'lol' + 101;
  },
  async: async () => {
    const res = await Promise.resolve('');
    return res.split('');
  },
  gen: function* a() {
    yield 'foo';
  },
  asyncgen: async function* b() {
    const b = await Promise.resolve('');
    yield b;
  },
};
