/**
 * 从形如 --key=value 或 key=value 这样的表达式中，解析出 key value 键值对( 不区分大小写 )
 * @param {*} str
 */
function parseKeyValues(str) {
  if (!str) return null;

  const arr = str.toLowerCase().split('=');
  const value = arr[1] || '';
  const key = arr[0].indexOf('--') > -1 ? arr[0].slice(2) : arr[0];

  return [key, value];
}

function parseProgressArgv(argv) {
  const parmaGroups = argv.slice(2);

  const result = {};
  parmaGroups.map((item) => {
    const keyValue = parseKeyValues(item);
    if (keyValue) {
      result[keyValue[0]] = keyValue[1];
    }
    return true;
  });

  return result;
};


module.exports = parseProgressArgv;
