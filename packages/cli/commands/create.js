const prompts = require("prompts");
const fs = require("fs-extra");
const path = require("path");
const cliProgress = require("cli-progress");
const chalk = require("chalk");
const figlet = require("figlet");
const handlebars = require("handlebars");

/**
 * 获取所有文件
 * @param {string} dir 文件夹
 * @returns {Promise<string[]>} 文件列表
 */
const getAllFiles = async (dir) => {
  let files = [];
  const items = await fs.readdir(dir);
  for (const item of items) {
    if (item === "node_modules") continue; // 跳过 node_modules
    const fullPath = path.join(dir, item);
    const stat = await fs.stat(fullPath);
    if (stat.isDirectory()) {
      files = files.concat(await getAllFiles(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
};

/**
 * 计算文件体积
 * @param {string[]} files 文件列表
 * @returns {Promise<number>} 文件体积
 */
const calculateFileSize = async (files) => {
  let totalSize = 0;
  for (const file of files) {
    const stat = await fs.stat(file);
    totalSize += stat.size;
  }
  return totalSize;
};

/**
 * 渲染 .hbs 文件，其他文件直接复制
 * @param {string[]} files 文件列表
 * @param {string} src 源目录
 * @param {string} dist 目标目录
 * @param {Object} data 渲染所需的数据（例如：{ name: "my-project" }）
 * @param {number} totalSize 文件体积
 */
const renderTemplateFiles = async (src, dist, files, data, totalSize) => {
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.rect);
  let copied = 0;

  bar.start(totalSize, 0);

  for (const file of files) {
    const relPath = path.relative(src, file);
    const isHbs = file.endsWith(".hbs");
    const targetPath = isHbs
      ? path.join(dist, relPath.replace(/\.hbs$/, ""))
      : path.join(dist, relPath);

    await fs.ensureDir(path.dirname(targetPath));

    const stat = await fs.stat(file);
    const size = stat.size;

    if (isHbs) {
      const content = await fs.readFile(file, "utf8");
      const template = handlebars.compile(content);
      const result = template(data);
      await fs.writeFile(targetPath, result, "utf8");
    } else {
      await fs.copy(file, targetPath);
    }

    copied += size;
    bar.update(copied);
  }

  bar.stop();
};

const create = async () => {
  const { name, type } = await prompts([
    {
      type: "text",
      name: "name",
      message: "What's the name of your project?",
      initial: __dirname.split("/").pop(),
    },
    {
      type: "select",
      name: "type",
      message: "What is the type of your project?",
      choices: [
        { title: "Umi", value: "umi" },
        { title: "Next", value: "next" },
      ],
    },
  ]);
  let src;

  switch (type) {
    case "umi": {
      src = path.resolve(__dirname, "../../templates/umi-template");
      break;
    }
    case "next":
      src = path.resolve(__dirname, "../../templates/next-template");
      break;
    case "fastify":
      src = path.resolve(__dirname, "../../templates/fastify-template");
      break;
    default:
      throw new Error("错误的项目类型");
  }
  const dist = path.resolve(process.cwd(), name);
  console.log("正在读取文件...");
  const files = await getAllFiles(src);
  console.log("正在计算模版体积...");
  const totalSize = await calculateFileSize(files);
  console.log("正在下载模版...");
  await renderTemplateFiles(src, dist, files, { name }, totalSize);
  console.log(
    chalk.cyan(
      figlet.textSync("kc-cli", {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default",
      }),
    ),
  );
};

module.exports = exports = create;
