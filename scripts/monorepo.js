const cp = require("child_process");
const path = require("path");

const CWD = process.cwd();
const packageJson = require(path.join(CWD, "package.json"));

const defaultConfig = {
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    "@semantic-release/github",
  ],
  tagFormat: "v${version}",
};

const exec = async (command, args) => {
  return new Promise((resolve, reject) => {
    cp.exec(`${command} ${args.join(" ")}`, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }

      return resolve({ stdout, stderr });
    });
  });
};

const getGitRootPath = async () => {
  const { stdout } = await exec("git", ["rev-parse", "--show-toplevel"]);

  return stdout.trim();
};

const getGitCommitFilePaths = async (commit) => {
  const { stdout } = await exec("git", [
    "diff-tree",
    "-r",
    "--name-only",
    "--no-commit-id",
    commit.hash,
  ]);

  return stdout.trim().split("\n");
};

const filterCommits = async (commits, options) => {
  const filteredCommits = [];

  for (const commit of commits) {
    const root = await getGitRootPath();
    const filePaths = await getGitCommitFilePaths(commit);
    const fileFullPaths = filePaths.map((filePath) =>
      path.resolve(root, filePath)
    );
    const includeFileFullPaths = options.includeFilePaths.map((filePath) =>
      path.resolve(root, filePath)
    );
    let isIncluded = false;

    if (fileFullPaths.some((filePath) => filePath.startsWith(CWD))) {
      isIncluded = true;
    }

    if (
      !isIncluded &&
      fileFullPaths.some((filePath) => includeFileFullPaths.includes(filePath))
    ) {
      isIncluded = true;
    }

    if (isIncluded) {
      filteredCommits.push(commit);
    }
  }

  return filteredCommits;
};

const analyzeCommits = (plugin, options) => {
  const stepName = "analyzeCommits";

  return async (globalPluginConfig, context) => {
    if (typeof plugin.module[stepName] !== "function") return;

    context.logger.info(`Start step "${stepName}" of plugin "${plugin.name}"`);

    const filteredCommits = await filterCommits(context.commits, options);
    const result = await plugin.module[stepName](
      { ...globalPluginConfig, ...plugin.config },
      { ...context, commits: filteredCommits }
    );

    context.logger.success(
      `Completed step "${stepName}" of plugin "${plugin.name}"`
    );

    return result;
  };
};

const generateNotes = (plugin, options) => {
  const stepName = "generateNotes";

  return async (globalPluginConfig, context) => {
    if (typeof plugin.module[stepName] !== "function") return;

    context.logger.info(`Start step "${stepName}" of plugin "${plugin.name}"`);

    const filteredCommits = await filterCommits(context.commits, options);
    const result = await plugin.module[stepName](
      { ...globalPluginConfig, ...plugin.config },
      { ...context, commits: filteredCommits }
    );

    context.logger.success(
      `Completed step "${stepName}" of plugin "${plugin.name}"`
    );

    return result;
  };
};

const getPlugin = (pluginInfo) => {
  const name = typeof pluginInfo === "string" ? pluginInfo : pluginInfo[0];
  const config = typeof pluginInfo === "string" ? {} : pluginInfo[1];
  const module = require(name);

  return {
    name,
    config,
    module,
  };
};

const filterPluginsByStep = (plugins, stepName) => {
  return plugins.filter((plugin) => {
    return typeof plugin.module[stepName] === "function";
  });
};

const getAnalyzeCommits = (config, options) => {
  const pluginsInfo = config.plugins;
  const plugins = pluginsInfo.map((info) => getPlugin(info));

  return filterPluginsByStep(plugins, "analyzeCommits").map((plugin) =>
    analyzeCommits(plugin, options)
  );
};

const getGenerateNotes = (config, options) => {
  const pluginsInfo = config.plugins;
  const plugins = pluginsInfo.map((info) => getPlugin(info));

  return filterPluginsByStep(plugins, "generateNotes").map((plugin) =>
    generateNotes(plugin, options)
  );
};

const getTagFormat = (config) => {
  const tagFormatConfig = config.tagFormat;

  return tagFormatConfig.replace(/\${packageName}/g, packageJson.name);
};

const getMonorepoConfig = (config, options) => {
  config = {
    ...defaultConfig,
    ...config,
  };

  return {
    analyzeCommits: getAnalyzeCommits(config, options),
    generateNotes: getGenerateNotes(config, options),
    tagFormat: getTagFormat(config),
  };
};

const withMonorepo = (
  config,
  options = {
    includeFilePaths: [],
  }
) => {
  return {
    ...config,
    ...getMonorepoConfig(config, options),
  };
};

module.exports = withMonorepo;
