/* eslint-disable func-names */
const fs = require('fs');
const path = require('path');
const requireUncached = require('require-uncached');

function HtmlWebpackDynamicTemplateParametersPlugin(options) {
  this.options = options;
  this.baseName = path.basename(this.options.path);
  this.fileExist = fs.existsSync(this.options.path);
}

HtmlWebpackDynamicTemplateParametersPlugin.prototype.apply = function (compiler) {
  if (!this.fileExist) return;

  compiler.hooks.compilation.tap('dev-runner', (compilation) => {
    compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tapAsync('dev-runner', (data, cb) => {
      compilation.fileDependencies.add(this.options.path);
      const { template } = data.plugin.options;
      const templateBaseName = path.basename(template);
      if (templateBaseName.replace('.hbs', '.json') === this.baseName) {
        // eslint-disable-next-line
        data.plugin.options.templateParameters = requireUncached(this.options.path);
      }
      cb();
    });
  });
};

module.exports = HtmlWebpackDynamicTemplateParametersPlugin;
