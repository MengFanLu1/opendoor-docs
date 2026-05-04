# Gemini 安装教程

本页介绍如何安装 Gemini CLI。

开始前建议先完成 [快速开始](./setup)，注册 OpenDoor 账号并创建 API Key。

## 推荐方式：使用 OpenDoor 一键安装和配置

最推荐的方式是直接使用 OpenDoor 控制台提供的一键安装和一键配置命令。

登录 OpenDoor 控制台，进入「一键接入」页面：

1. 选择你的 API Key。
2. 选择合适的节点。
3. 客户端选择 `Gemini CLI`。
4. 复制页面生成的命令，在终端中执行。

一键脚本会自动安装 Gemini CLI，并写入 OpenDoor 的 API 地址和 API Key。对大多数用户来说，这比手动安装和手动修改配置文件更稳，也更不容易填错地址。

如果你已经安装好 Gemini CLI，也可以继续使用控制台生成的一键配置命令。

## 手动安装前准备

手动安装前，建议先确认已经安装 Node.js 和 npm。

查看版本：

```bash
node -v
npm -v
```

建议使用 Node.js 20 或更新版本。

## 使用 npm 安装

Gemini CLI 使用 npm 安装。

```bash
npm install -g @google/gemini-cli
```

如果你不想全局安装，也可以临时运行：

```bash
npx @google/gemini-cli
```

安装完成后检查：

```bash
gemini --version
```

## 下一步

安装完成后，继续查看 [Gemini CLI 配置](./gemini)，把 Gemini CLI 接入 OpenDoor。
