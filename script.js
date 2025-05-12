const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('loginPage').classList.add('d-none');
  document.getElementById('documentPage').classList.remove('d-none');

  setTimeout(() => {
    document.getElementById('documentContainer').classList.add('show');
  }, 100);
});

window.addEventListener('load', () => {
  document.getElementById('loginContainer').classList.add('show');
});

function loadImage(event, canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  const reader = new FileReader();
  
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

function typeName(input, canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "28px 'Pacifico', cursive";
  ctx.fillStyle = "#333";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(input.value, canvas.width/2, canvas.height/2);
}

['signature1', 'signature2'].forEach(id => {
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext('2d');
  let drawing = false;

  canvas.addEventListener('mousedown', e => { drawing = true; ctx.beginPath(); });
  canvas.addEventListener('mouseup', e => { drawing = false; });
  canvas.addEventListener('mouseout', e => { drawing = false; });
  canvas.addEventListener('mousemove', e => {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  });

  function resizeCanvas() {
    const containerWidth = canvas.parentElement.clientWidth;
    canvas.width = containerWidth - 20;
    canvas.height = 150;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
});

// Evento do botão Avançar
document.getElementById('btnAvancar').addEventListener('click', function() {
  // Redireciona para a página qrcode.html
  window.location.href = 'photo-capture/index.html';
});



function removeSignature(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const inputText = document.querySelector(`#${canvasId}`).parentElement.querySelector('input[type="text"]');
    
    // Limpar o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Limpar o campo de texto
    inputText.value = '';
  }
  