// 캔버스 초기화
const canvas = document.getElementById("cursorCanvas");
const ctx = canvas.getContext("2d");

// 캔버스 크기 설정
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 창 크기 변경 시 캔버스 크기 재설정
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// 마우스 위치 및 트레일 저장
const mouse = { x: 0, y: 0 };
const trails = []; // 선형 트레일 저장 배열

// 마우스 움직임 이벤트
window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;

  // 새로운 트레일 추가
  trails.push({ x: mouse.x, y: mouse.y, alpha: 1 });

  // 트레일 수 제한 (성능 최적화)
  if (trails.length > 20) trails.shift();
});

// 애니메이션 루프
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 이전 프레임 지우기

  // 그림자 및 선 스타일 설정
  ctx.shadowBlur = 15; // 블러 강도
  ctx.shadowColor = "rgba(0, 0, 255, 0.5)"; // 그림자 색상
  ctx.strokeStyle = "rgba(0, 0, 255, 0.5)"; // 파란색 선
  ctx.lineWidth = 2; // 선 두께

  // 트레일 그리기
  ctx.beginPath();
  for (let i = 0; i < trails.length - 1; i++) {
    const current = trails[i];
    const next = trails[i + 1];

    // 부드러운 곡선 연결
    const cpX = (current.x + next.x) / 2; // 제어점 X (중간점)
    const cpY = (current.y + next.y) / 2; // 제어점 Y (중간점)

    ctx.quadraticCurveTo(current.x, current.y, cpX, cpY);
    current.alpha -= 0.01; // 투명도 감소
  }
  ctx.stroke(); // 선 그리기

  // 투명도가 0에 가까운 트레일 제거
  trails.forEach((trail, index) => {
    if (trail.alpha <= 0) trails.splice(index, 1);
  });

  requestAnimationFrame(animate); // 애니메이션 반복
}

// 애니메이션 시작
animate();
