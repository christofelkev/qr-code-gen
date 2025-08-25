const $ = (sel) => document.querySelector(sel);
const textEl = $('#text');
const sizeEl = $('#size');
const eccEl = $('#ecc');
const marginEl = $('#margin');
const imgEl = $('#qrImg');
const statusEl = $('#status');
const sizeOut = $('#sizeOut');
const charInfo = $('#charInfo');

const API_BASE = 'https://api.qrserver.com/v1/create-qr-code/';

function updateCharInfo() {
  const enc = new TextEncoder();
  const bytes = enc.encode(textEl.value);
  charInfo.textContent = `${textEl.value.length} karakter, ${bytes.length} byte`;
}

function updateSizeOut() {
  sizeOut.textContent = `${sizeEl.value} × ${sizeEl.value}`;
}

function setStatus(text, kind = 'ok') {
  statusEl.textContent = text;
  statusEl.classList.remove('ok', 'danger');
  statusEl.classList.add(kind === 'ok' ? 'ok' : 'danger');
}

function buildUrl({ data, size, ecc, margin }) {
  const params = new URLSearchParams();
  params.set('data', data);
  params.set('size', `${size}x${size}`);
  if (margin && Number(margin) > 0) params.set('margin', String(margin));
  if (ecc) params.set('ecc', ecc);
  return `${API_BASE}?${params.toString()}`;
}

async function generate() {
  const data = textEl.value.trim();
  if (!data) {
    setStatus('Isi teks/URL dulu', 'danger');
    imgEl.removeAttribute('src');
    return;
  }
  const size = Number(sizeEl.value);
  const ecc = eccEl.value;
  const margin = Number(marginEl.value || 0);

  const url = buildUrl({ data, size, ecc, margin });
  setStatus('Menghasilkan…');
  imgEl.src = '';
  requestAnimationFrame(() => {
    imgEl.onload = () => setStatus('Berhasil!');
    imgEl.onerror = () => setStatus('Gagal memuat gambar', 'danger');
    imgEl.src = url;
  });
}

function downloadPng() {
  if (!imgEl || !imgEl.src) {
    setStatus('Generate dulu ya', 'danger');
    return;
  }
  const canvas = document.createElement('canvas');
  const w = imgEl.naturalWidth || Number(sizeEl.value);
  const h = imgEl.naturalHeight || Number(sizeEl.value);
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(imgEl, 0, 0, w, h);
  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = 'qrcode.png';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

async function copyUrl() {
  if (!imgEl || !imgEl.src) {
    setStatus('Generate dulu ya', 'danger');
    return;
  }
  try {
    await navigator.clipboard.writeText(imgEl.src);
    setStatus('URL gambar disalin ✓');
  } catch (err) {
    setStatus('Tidak bisa copy (izin clipboard?)', 'danger');
  }
}

function clearAll() {
  textEl.value = '';
  imgEl.removeAttribute('src');
  setStatus('Siap');
  updateCharInfo();
}

$('#btnGen').addEventListener('click', generate);
$('#btnDownload').addEventListener('click', downloadPng);
$('#btnCopyUrl').addEventListener('click', copyUrl);
$('#btnClear').addEventListener('click', clearAll);

textEl.addEventListener('input', updateCharInfo);
sizeEl.addEventListener('input', updateSizeOut);

updateCharInfo();
updateSizeOut();

textEl.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'enter') {
    generate();
  }
});
