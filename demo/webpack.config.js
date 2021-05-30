export default {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /node_modules\/burano/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['babel-plugin-add-import-extension'],
          },
        },
      },
    ],
  },
}
