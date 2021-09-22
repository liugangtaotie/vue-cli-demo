module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      {
        libraryName: "vant",
        style: (name) => {
          return `${name}/style/less.js`;
        },
      },
      "vant",
    ],
  ],
};
