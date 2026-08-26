const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform vec2  u_res;
uniform vec2  u_mouse;
uniform float u_time;
uniform float u_dpr;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  vec2 px = gl_FragCoord.xy;
  float spacing = 26.0 * u_dpr;

  // grid cell
  vec2 id = floor(px / spacing);
  vec2 gv = mod(px, spacing) - 0.5 * spacing;
  float d = length(gv);

  // dot with antialiased edge
  float r = 1.15 * u_dpr;
  float aa = 0.9 * u_dpr;
  float dotMask = smoothstep(r + aa, r - aa, d);

  // per-dot slow shimmer
  float n = hash(id + floor(u_time * 0.25));
  float tw = 0.7 + 0.3 * sin(u_time * (0.5 + n * 0.8) + n * 6.2831853);

  // mouse illumination — gaussian falloff
  float md = length(px - u_mouse);
  float sigma = 140.0 * u_dpr;
  float glow = exp(-(md * md) / (2.0 * sigma * sigma));

  // faint secondary halo, wider and softer
  float sigma2 = 300.0 * u_dpr;
  float halo = exp(-(md * md) / (2.0 * sigma2 * sigma2));

  float base = 0.05;
  float bright = base * tw + glow * 0.5 + halo * 0.05;

  vec3 col = vec3(0.0);
  col += vec3(1.0) * dotMask * bright;
  // very subtle ambient wash around cursor so the area feels lit
  col += vec3(1.0) * halo * 0.010;

  gl_FragColor = vec4(col, 1.0);
}
`;

export function initBackground() {
  const canvas = document.getElementById('bg-shader');
  if (!canvas) return () => {};

  const gl =
    canvas.getContext('webgl', { antialias: false, alpha: false, depth: false }) ||
    canvas.getContext('experimental-webgl');
  if (!gl) {
    canvas.style.display = 'none';
    return () => {};
  }

  const compile = (type, src) => {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(sh));
      return null;
    }
    return sh;
  };

  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) { canvas.style.display = 'none'; return () => {}; }

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(prog));
    canvas.style.display = 'none';
    return () => {};
  }
  gl.useProgram(prog);

  // fullscreen triangle
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

  const locPos = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(locPos);
  gl.vertexAttribPointer(locPos, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, 'u_res');
  const uMouse = gl.getUniformLocation(prog, 'u_mouse');
  const uTime = gl.getUniformLocation(prog, 'u_time');
  const uDpr = gl.getUniformLocation(prog, 'u_dpr');

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0;
  let h = 0;
  let mx = -9999;
  let my = -9999;          // physical px target
  let sx = -9999;
  let sy = -9999;          // smoothed
  let hasMouse = false;
  let rafId = null;
  let running = true;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = Math.floor(window.innerWidth * dpr);
    h = Math.floor(window.innerHeight * dpr);
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    gl.viewport(0, 0, w, h);
  };

  const draw = (t) => {
    gl.uniform2f(uRes, w, h);
    gl.uniform2f(uMouse, sx, sy);
    gl.uniform1f(uTime, t * 0.001);
    gl.uniform1f(uDpr, dpr);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const loop = (t) => {
    rafId = requestAnimationFrame(loop);
    if (!running) return;
    if (!hasMouse && t < 2000) {
      // idle drift before first pointer interaction
      const nx = w * 0.5 + Math.cos(t * 0.0004) * w * 0.18;
      const ny = h * 0.55 + Math.sin(t * 0.0006) * h * 0.14;
      sx += (nx - sx) * 0.03;
      sy += (ny - sy) * 0.03;
    } else {
      sx += (mx - sx) * 0.12;
      sy += (my - sy) * 0.12;
    }
    draw(t);
  };

  const onPointer = (e) => {
    hasMouse = true;
    mx = e.clientX * dpr;
    my = (window.innerHeight - e.clientY) * dpr;
    if (reduced) {
      sx = mx;
      sy = my;
      draw(performance.now());
    }
  };

  const onLeave = () => {
    hasMouse = false;
    mx = -9999;
    my = -9999;
  };

  resize();
  sx = w * 0.5;
  sy = h * 0.5;
  draw(0);

  window.addEventListener('resize', () => {
    resize();
    if (reduced) draw(performance.now());
  });
  window.addEventListener('pointermove', onPointer, { passive: true });
  window.addEventListener('pointerdown', onPointer, { passive: true });
  document.addEventListener('mouseleave', onLeave);

  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
  });

  if (!reduced) {
    rafId = requestAnimationFrame(loop);
  }

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('pointermove', onPointer);
    window.removeEventListener('resize', resize);
    document.removeEventListener('mouseleave', onLeave);
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  };
}
