# 邵书屿(团团)的个人网站

> 知名人类幼崽的官方网站 —— 2023 年 1 月出生于地球,清华大学(2041 届)预科生,碳水化合物研究领域领军人物,汪汪队主义学派创始人。
> 口头禅:「我最烦的就是XXX了。」

## 📖 这是什么

这是团团(邵书屿)的个人网站。做这个网站的初衷很简单:**他的舅舅心血来潮**,想着给这小家伙留点东西 —— 照片、图书、教学(其实是早教)、奖项(其实是小红花),以后等他长大了,回头能看到自己小时候的"光辉事迹"。

目前这网站**只是自家人看着玩**,图一乐,没什么正经用途,也欢迎各位家人有空来逛逛。

## 🧒 网站内容

- **首页**:团团的照片、最近动态
- **图书**:他的绘本藏书
- **奖项**:奖状(小红花)与荣誉
- **服务**:汪汪队出警记录(大概)
- **简历**:一份充满想象力的个人简历

所有内容都在 [`content/`](content/) 目录下,用 TOML 和 Markdown 文件管理,改内容不需要动代码。

## 🛠️ 技术栈

基于 [PRISM](https://github.com/xyjoey/PRISM) 模板改造 —— Next.js + Tailwind CSS + TypeScript,静态导出,部署哪都行。

## 🚀 本地运行

需要 Node.js 22 及以上版本。

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 即可预览。

构建静态站点:

```bash
npm run build
```

生成的 `out/` 目录可以部署到 GitHub Pages、Cloudflare Pages 等任意静态托管平台(详见 [`docs/deployment.md`](docs/deployment.md))。

## ✍️ 想改内容?

- 网站全局配置(标题、导航、联系方式):[`content/config.toml`](content/config.toml)
- 首页简介、动态:[`content/about.toml`](content/about.toml)
- 图书 / 教学 / 奖项等页面:`content/` 下对应的 `.toml` 文件
- 照片和文件放 [`public/`](public/) 目录

## 📄 License

本项目基于 [MIT License](LICENSE) 许可。
