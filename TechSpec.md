# MetaSounds 技术规范文档

## 1. 组件清单

### shadcn/ui 组件
- `Button` - CTA按钮、导航按钮
- `Card` - 产品卡片、功能卡片
- `Badge` - 产品标签、状态标识
- `Separator` - 分隔线

### 自定义组件
| 组件名 | 用途 | 复杂度 |
|--------|------|--------|
| `MagneticButton` | 磁性吸引效果的按钮 | 中 |
| `ParallaxContainer` | 视差滚动容器 | 中 |
| `LiquidText` | 液态扭曲文字效果 | 高 |
| `ProductCard3D` | 3D产品卡片 | 高 |
| `HorizontalScroll` | 水平滚动产品流 | 高 |
| `WaveformVisualizer` | 波形可视化 | 中 |
| `ParticleBackground` | 粒子背景效果 | 高 |
| `GlassContainer` | 玻璃拟态容器 | 中 |
| `TiltCard` | 3D倾斜卡片 | 中 |
| `ScrollProgress` | 滚动进度指示器 | 低 |

## 2. 动画实现规划

| 动画效果 | 库 | 实现方式 | 复杂度 |
|----------|-----|----------|--------|
| 页面平滑滚动 | Lenis | 全局滚动实例 | 低 |
| 字符分割显现 | GSAP + SplitType | SplitText插件 | 中 |
| 3D产品悬浮 | GSAP | CSS 3D transforms | 中 |
| 鼠标视差倾斜 | GSAP | 鼠标位置监听 | 中 |
| 液态文字扭曲 | Three.js + GLSL | 片段着色器 | 高 |
| 水平滚动流 | GSAP ScrollTrigger | pin + horizontal scroll | 高 |
| 卡片悬停展开 | GSAP Flip | layout animations | 中 |
| 波形可视化 | Canvas API | 实时绘制 | 中 |
| 磁性按钮效果 | GSAP | 鼠标位置计算 | 中 |
| 背景粒子效果 | Three.js | Points + ShaderMaterial | 高 |
| 滚动速度倾斜 | GSAP ScrollTrigger | velocity tracking | 中 |
| 径向渐变旋转 | CSS + GSAP | conic-gradient animation | 低 |

## 3. 项目文件结构

```
app/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui 组件
│   │   ├── MagneticButton.tsx
│   │   ├── ParallaxContainer.tsx
│   │   ├── LiquidText.tsx
│   │   ├── ProductCard3D.tsx
│   │   ├── HorizontalScroll.tsx
│   │   ├── WaveformVisualizer.tsx
│   │   ├── ParticleBackground.tsx
│   │   ├── GlassContainer.tsx
│   │   ├── TiltCard.tsx
│   │   └── ScrollProgress.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Products.tsx
│   │   ├── Video.tsx
│   │   ├── Features.tsx
│   │   ├── Testimonials.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   ├── hooks/
│   │   ├── useMousePosition.ts
│   │   ├── useScrollVelocity.ts
│   │   ├── useSmoothScroll.ts
│   │   └── useWindowSize.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── animations.ts
│   ├── shaders/
│   │   ├── liquid.frag
│   │   └── particles.vert
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
│   └── images/              # 产品图片
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 4. 依赖项

### 核心依赖
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.92.0",
    "gsap": "^3.12.5",
    "@studio-freight/lenis": "^1.0.42",
    "split-type": "^0.3.4",
    "lucide-react": "^0.294.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.2.0"
  }
}
```

### 开发依赖
```json
{
  "devDependencies": {
    "@types/three": "^0.160.0",
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "typescript": "^5.2.2",
    "vite": "^5.0.8",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

## 5. 性能优化策略

### 渲染优化
- 使用 `React.memo` 包装纯展示组件
- 使用 `useCallback` 缓存事件处理函数
- 使用 `useRef` 存储 Three.js 实例避免重复创建
- 实现 `requestAnimationFrame` 节流

### 加载优化
- 图片使用 WebP 格式
- 实现懒加载 (react-lazyload)
- 使用 Intersection Observer 触发动画
- 代码分割 (React.lazy + Suspense)

### 动画优化
- 仅使用 `transform` 和 `opacity`
- 使用 `will-change` 提示浏览器
- 避免布局抖动 (Layout Thrashing)
- 使用 CSS 硬件加速

## 6. 响应式断点

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
}
```

## 7. 颜色配置

```javascript
// tailwind.config.js 扩展
colors: {
  brand: {
    black: '#1c1c1c',
    white: '#ffffff',
    gray: {
      1: '#797774',
      2: '#f1f1f1',
      3: '#c2c2c2',
    },
    accent: {
      purple: '#925bff',
      blue: '#0082f3',
      cyan: '#3aa3ff',
    },
    state: {
      error: '#fa242a',
      success: '#009c22',
    },
  },
}
```

## 8. 字体配置

```javascript
// tailwind.config.js
fontFamily: {
  sans: ['Inter Tight', 'system-ui', 'sans-serif'],
}
```

在 index.html 中引入:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

## 9. 缓动函数

```javascript
// lib/animations.ts
export const easings = {
  customExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  fluidBounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

export const gsapEasings = {
  customExpo: 'power4.out',
  fluidBounce: 'back.out(1.7)',
};
```

## 10. 减少动效支持

```javascript
// hooks/useReducedMotion.ts
import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}
```
