# BrickWall Planner Demo

这是一个砖墙排布计算器仓库。它保持最小依赖：页面使用原生 HTML/CSS/JavaScript，测试使用 Node.js 内置测试框架。

## 业务背景

输入墙体的长、高、厚，自动输出：

- 推荐灰缝尺寸，范围为 8-12mm 的整数。
- 标准砖排布数据。
- 当前砖头总数。
- 一个可视化排布图。

当前仓库是起始版本：已经能展示 2D 排布图，但 3D 自由视角预览还没有开发，并且砖块采购数量里故意留下了一个半砖统计 bug，方便第三段 debug 演示。

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

