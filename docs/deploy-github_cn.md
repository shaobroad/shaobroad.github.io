# 发布到 GitHub Pages(免费自动发布)

网站是纯静态站点,已配置 GitHub Actions 自动发布:**每次 `git push` 到 `main` 分支,网站自动重新构建并上线**,不需要手动传文件。

## 网址

<https://shaobroad.github.io>

## 日常更新内容(改完通知 Claude 即可)

1. 修改 `content_zh/` 里的内容文件(如 `news.toml`、`books.toml`)
2. 运行 `npm run build` 验证
3. 提交并推送:`git add -A && git commit -m "更新内容" && git push origin main`
4. 等 2~3 分钟,网站自动更新

## 首次配置(已完成,存档备查)

1. 注册 GitHub 账号:<https://github.com>
2. 创建仓库,名字必须叫 `用户名.github.io`(如 `shaobroad.github.io`),选 **Public**,不要勾选任何初始化选项
3. 本机 Git 需配置代理才能连 GitHub(家庭网络直连被限制):
   ```bash
   git config --global http.https://github.com.proxy http://127.0.0.1:7890
   git config --global https.https://github.com.proxy http://127.0.0.1:7890
   ```
4. 仓库 Settings → Pages → Build and deployment → Source 选 **GitHub Actions** → Save
5. 推送代码后自动构建发布

## 家人访问注意

GitHub 网站在中国大陆**直连不稳定**(时快时慢、偶尔打不开)。家人能打开就正常用;如果打不开或太慢,可以再同步一份到 **Gitee(码云)Pages**(国内直连,同样免费),内容完全一样,两个网址都能用。

## 故障排查

- 推送失败 `Failed to connect to github.com port 443`:检查代理软件是否在运行,或重新配置上面的代理命令
- 打开是 404:检查仓库 Settings → Pages 是否选了 GitHub Actions,并确认 Actions 工作流跑成功了(仓库 Actions 页面应显示绿色 ✓)
- 网站更新了但看不到:等 2~3 分钟,或强制刷新浏览器(Ctrl+F5)
