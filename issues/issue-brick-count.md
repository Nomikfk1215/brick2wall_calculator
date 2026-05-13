# Issue: 半砖数量为奇数时采购总砖数偏少

## 现象

客户同学反馈：当墙体尺寸导致半砖数量为奇数时，页面显示的采购总砖数会少一块。

示例输入：

- 墙长：2400mm
- 墙高：600mm
- 墙厚：115mm

## 复现

```powershell
npm test
```

当前失败用例：

- `counts odd half bricks as purchased whole bricks`

## 期望

半砖可以由整砖切割得到。采购数量应该是：

```text
整砖数量 + ceil(半砖数量 / 2)
```

## 建议 review 重点

- 先解释 `createWallPlan` 如何统计整砖和半砖。
- 再说明为什么半砖数量为奇数时不能向下取整。
- 最后做最小修复，不要重写渲染模块。
