# BrickWall Planner Demo

这是一个砖墙排布计算器仓库。它保持最小依赖：页面使用原生 HTML/CSS/JavaScript，测试使用 Node.js 内置测试框架。

## 业务背景

输入墙体的长、高、厚，自动输出：

- 推荐灰缝尺寸，范围为 8-12mm 的整数。
- 标准砖排布数据。
- 当前砖头总数。
- 一个可视化2d排布图。

## 运行

```powershell
npm run serve
```

然后打开：

```text
http://localhost:5173
```

## 测试

```powershell
npm test
```

