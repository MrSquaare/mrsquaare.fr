const withMonorepo = require("./scripts/monorepo");

const TYPES_CONFIG = [
  { type: "build", section: "Build", release: "patch" },
  { type: "feat", section: "Features", release: "minor" },
  { type: "fix", section: "Bug Fixes", release: "patch" },
  { type: "impr", section: "Improvements", release: "patch" },
  { type: "perf", section: "Performance Improvements", release: "patch" },
  { type: "revert", section: "Reverts", release: "patch" },
  { type: "chore", section: "Chores" },
  { type: "ci", section: "Continuous Integration" },
  { type: "docs", section: "Documentation" },
  { type: "refactor", section: "Refactoring" },
  { type: "style", section: "Styles" },
];

const PRESET_CONFIG = {
  types: TYPES_CONFIG.map((config) => ({
    type: config.type,
    section: config.section,
    hidden: !config.release,
  })),
};

const RELEASE_RULES = TYPES_CONFIG.filter((config) => !!config.release).map(
  (config) => ({
    type: config.type,
    release: config.release,
  })
);

module.exports = withMonorepo({
  branches: [{ name: "main" }],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        presetConfig: PRESET_CONFIG,
        releaseRules: RELEASE_RULES,
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
        presetConfig: PRESET_CONFIG,
      },
    ],
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    [
      "@semantic-release/github",
      {
        successComment: false,
        failComment: false,
        failTitle: false,
        labels: false,
      },
    ],
  ],
  tagFormat: "${packageName}@${version}",
});
