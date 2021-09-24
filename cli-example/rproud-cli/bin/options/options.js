const packageName = () => ({
  type: 'input',
  name: 'packageName',
  message: 'Please input package name...',
  validate(val) {
    if (val) return true;
    return 'Please input package name...';
  },
});

const language = () => ({
  type: 'list',
  name: 'language',
  message: 'Please select language...',
  choices: ['JavaScript', 'TypeScript'],
  filter: function (val) {
    // 使用filter将回答变为大写
    return val.toUpperCase();
  },
});

module.exports = { packageName, language };
