// 获取光标元素
const cursor = document.getElementById("cursor");

// 目标位置和当前位置
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

// 阻尼系数（值越小，阻尼感越强）
const damping = 0.34;

// 获取所有可悬停元素
const hoverableElements = document.querySelectorAll(".hoverable");

// 监听鼠标移动事件
window.addEventListener("mousemove", (event) => {
  targetX = event.clientX;
  targetY = event.clientY;
});

// 更新光标位置
function updateCursor() {
  // 计算差值
  const dx = targetX - currentX;
  const dy = targetY - currentY;

  // 缓动移动
  currentX += dx * damping;
  currentY += dy * damping;

  // 更新光标位置
  cursor.style.left = `${currentX}px`;
  cursor.style.top = `${currentY}px`;

  // 继续渲染下一帧
  requestAnimationFrame(updateCursor);
}

// 为每个可悬停元素添加事件监听器
hoverableElements.forEach((element) => {
  // 鼠标进入时添加悬停样式
  element.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
  });

  // 鼠标离开时移除悬停样式
  element.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
  });
});

// 监听文本选择事件
document.addEventListener("selectionchange", () => {
  const selection = window.getSelection();
  if (selection.toString().length > 0) {
    // 如果有文本被选中，添加文本选择样式
    cursor.classList.add("text-selection");
  } else {
    // 如果没有文本被选中，移除文本选择样式
    cursor.classList.remove("text-selection");
  }
});

// 启动动画
updateCursor();