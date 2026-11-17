import{a as e,i as t,n,r,t as i}from"./index-B8oRdoVH.js";var a=.058,o=28*Math.PI/180,s=e/Math.tan(o/2),c=1.9,l={tiltX:-.2,tiltY:.3,a:.3,b:-1,c:1.15},u=[.3,.32,.36],d=[.8,.82,.86],f=[.9,.92,.95],p=[.42,.45,.5];function m(e,t){let n=new Float32Array(16);for(let r=0;r<4;r++)for(let i=0;i<4;i++){let a=0;for(let n=0;n<4;n++)a+=e[n*4+i]*t[r*4+n];n[r*4+i]=a}return n}function h(e){let t=Math.cos(e),n=Math.sin(e);return new Float32Array([1,0,0,0,0,t,n,0,0,-n,t,0,0,0,0,1])}function g(e){let t=Math.cos(e),n=Math.sin(e);return new Float32Array([t,0,-n,0,0,1,0,0,n,0,t,0,0,0,0,1])}function _(e){let t=Math.cos(e),n=Math.sin(e);return new Float32Array([t,n,0,0,-n,t,0,0,0,0,1,0,0,0,0,1])}function v(e,t,n){return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,e,t,n,1])}function y(e,t,n,r){let i=1/Math.tan(e/2),a=1/(n-r);return new Float32Array([i/t,0,0,0,0,i,0,0,0,0,(r+n)*a,-1,0,0,2*r*n*a,0])}var b=12;function x(e,t,r,i,a,o,s){let c=e.v.length/b;for(let c=0;c<=t;c++){let l=c/t,u=Math.cos(l*n),d=Math.sin(l*n),f=a(u,d),p=o(u,d);e.v.push(...r(u,d),...f,...p,l,0,s,...i(u,d),...f,...p,l,1,s)}for(let n=0;n<t;n++){let t=c+n*2;e.i.push(t,t+1,t+2,t+1,t+3,t+2)}}function S({r0:e,r1:t},n=160){let r={v:[],i:[]},i=-.058/2,o=a/2,s=(e,t)=>[-t,e,0];return x(r,n,(t,n)=>[e*t,e*n,o],(e,n)=>[t*e,t*n,o],()=>[0,0,1],s,0),x(r,n,(t,n)=>[e*t,e*n,i],(e,n)=>[t*e,t*n,i],()=>[0,0,-1],s,0),x(r,n,(e,n)=>[t*e,t*n,i],(e,n)=>[t*e,t*n,o],(e,t)=>[e,t,0],s,1),x(r,n,(t,n)=>[e*t,e*n,i],(t,n)=>[e*t,e*n,o],(e,t)=>[-e,-t,0],s,1),r}function C(e,t,n,r=20){let i={v:[],i:[]};return x(i,r,(t,r)=>[e,n*t,n*r],(e,r)=>[t,n*e,n*r],(e,t)=>[0,e,t],()=>[1,0,0],1),i}function w(e,t=28){let r={v:[],i:[]};for(let i=0;i<=t;i++){let a=i/t*Math.PI,o=Math.sin(a),s=Math.cos(a);for(let a=0;a<=t;a++){let c=a/t*n,l=[o*Math.cos(c),s,o*Math.sin(c)];r.v.push(l[0]*e,l[1]*e,l[2]*e,...l,1,0,0,a/t,i/t,2)}}let i=t+1;for(let e=0;e<t;e++)for(let n=0;n<t;n++){let t=e*i+n;r.i.push(t,t+i,t+1,t+1,t+i,t+i+1)}return r}var T=`#version 300 es
precision highp float;
layout(location=0) in vec3 aPos;
layout(location=1) in vec3 aNormal;
layout(location=2) in vec3 aTangent;
layout(location=3) in vec2 aUv;
layout(location=4) in float aFace;
uniform mat4 uViewProj, uModel;
out vec3 vN; out vec3 vT; out vec3 vW; out vec2 vUv; out float vFace;
void main(){
  vec4 w = uModel * vec4(aPos, 1.0);
  vW = w.xyz;
  mat3 m = mat3(uModel);
  vN = m * aNormal; vT = m * aTangent; vUv = aUv; vFace = aFace;
  gl_Position = uViewProj * w;
}`,E=e=>e.toFixed(4),D=`#version 300 es
precision highp float;
in vec3 vN; in vec3 vT; in vec3 vW; in vec2 vUv; in float vFace;
uniform vec3 uEye, uBase, uWall, uInk, uAccent, uLine;
uniform vec3 uTick;
uniform float uBuild;
out vec4 o;
float tick(float u, float count, float halfW){
  float x = u * count;
  float d = abs(fract(x + 0.5) - 0.5);
  float aa = fwidth(x);
  float w = max(halfW * count, aa * 0.55);
  return 1.0 - smoothstep(w - aa, w + aa, d);
}
float band(float v, float a, float b, float fv){
  return smoothstep(a - fv, a + fv, v) * (1.0 - smoothstep(b - fv, b + fv, v));
}
void main(){
  vec3 N = normalize(vN), V = normalize(uEye - vW), T = normalize(vT);
  vec3 L1 = normalize(vec3(-0.45, 0.80, 0.55));
  vec3 L2 = normalize(vec3(0.75, -0.25, 0.45));
  float nl1 = max(dot(N, L1), 0.0), nl2 = max(dot(N, L2), 0.0);
  vec3 R = reflect(-V, N);
  float sky = smoothstep(-0.7, 0.8, R.y);
  vec3 H1 = normalize(L1 + V), H2 = normalize(L2 + V);
  float t1 = dot(T, H1), t2 = dot(T, H2);
  float sA = pow(sqrt(max(1.0 - t1 * t1, 0.0)), 42.0) * nl1 + 0.35 * pow(sqrt(max(1.0 - t2 * t2, 0.0)), 20.0) * nl2;
  float sI = pow(max(dot(N, H1), 0.0), 60.0) + 0.3 * pow(max(dot(N, H2), 0.0), 24.0);
  float spec = mix(sA, sI, step(1.5, vFace));
  float fres = pow(1.0 - max(dot(N, V), 0.0), 4.0);
  vec3 albedo = vFace < 0.5 ? uBase : uWall;
  vec3 col = albedo * (0.10 + 0.52 * nl1 + 0.16 * nl2 + 0.34 * sky) + vec3(0.95, 0.97, 1.0) * spec * 0.85 + fres * 0.14;
  float la = 0.0;
  if (vFace < 0.5) {
    float u = vUv.x, v = vUv.y, fv = fwidth(v);
    float rim = min(v, 1.0 - v);
    float edge = 1.0 - smoothstep(0.0, fv * 1.5, rim);
    col += (1.0 - smoothstep(0.0, 0.06, rim)) * 0.22;
    float minorT = tick(u, uTick.x, uTick.z * ${E(r.minor.width)}) * band(v, ${E(r.minor.from)}, ${E(r.minor.to)}, fv);
    float majorT = tick(u, uTick.y, uTick.z * ${E(r.major.width)}) * band(v, ${E(r.major.from)}, ${E(r.major.to)}, fv);
    float d0 = min(u, 1.0 - u), fu = fwidth(u);
    float idx = (1.0 - smoothstep(uTick.z * 2.4 - fu, uTick.z * 2.4 + fu, d0)) * band(v, 0.14, 0.92, fv);
    float tk = max(minorT, majorT) * (1.0 - idx);
    col = mix(col, uInk, tk * 0.92);
    col = mix(col, uAccent, idx);
    la = max(edge, max(tk * 0.85, idx));
  }
  vec4 solid = vec4(col, 1.0);
  vec4 line = vec4(uLine * la, la);
  o = mix(line, solid, uBuild);
}`;function O(e,t){let n=/^#([0-9a-f]{6})$/i.exec(getComputedStyle(document.documentElement).getPropertyValue(e).trim());if(!n)return t;let r=parseInt(n[1],16);return[(r>>16)/255,(r>>8&255)/255,(r&255)/255]}var k=e=>1-(1-Math.min(Math.max(e,0),1))**3;function A(e,{onReady:n,onLost:r}){let a=e.getContext(`webgl2`,{alpha:!0,antialias:!0,premultipliedAlpha:!0,powerPreference:`low-power`});if(!a)return null;let b=a.createProgram();if(!b)return null;for(let[e,t]of[[a.VERTEX_SHADER,T],[a.FRAGMENT_SHADER,D]]){let n=a.createShader(e);a.shaderSource(n,t),a.compileShader(n),a.attachShader(b,n)}a.linkProgram(b);let x=a.getExtension(`KHR_parallel_shader_compile`),E=()=>{let e=e=>a.getUniformLocation(b,e);return{viewProj:e(`uViewProj`),model:e(`uModel`),eye:e(`uEye`),base:e(`uBase`),wall:e(`uWall`),ink:e(`uInk`),accent:e(`uAccent`),line:e(`uLine`),tick:e(`uTick`),build:e(`uBuild`)}},A=null,j=e=>{let t=a.createVertexArray();a.bindVertexArray(t),a.bindBuffer(a.ARRAY_BUFFER,a.createBuffer()),a.bufferData(a.ARRAY_BUFFER,new Float32Array(e.v),a.STATIC_DRAW),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,a.createBuffer()),a.bufferData(a.ELEMENT_ARRAY_BUFFER,new Uint16Array(e.i),a.STATIC_DRAW);for(let[e,t,n]of[[0,3,0],[1,3,3],[2,3,6],[3,2,9],[4,1,11]])a.enableVertexAttribArray(e),a.vertexAttribPointer(e,t,a.FLOAT,!1,48,n*4);return{vao:t,count:e.i.length}},M={rings:i.map(e=>j(S(e))),pinOuter:j(C(i[1].r1,i[0].r0,.02)),pinInner:j(C(i[2].r1,i[1].r0,.02)),stub:j(C(i[0].r1,i[0].r1+.13,.024)),hub:j(w(.075)),axle:j(C(-i[2].r0,i[2].r0,.014))},N=O(`--color-accent`,[.56,.64,1]),P=O(`--color-text-subtle`,[.54,.57,.61]),F=window.matchMedia(`(prefers-reduced-motion: reduce)`),I=()=>{let t=e.getBoundingClientRect();return t.bottom>0&&t.top<window.innerHeight},L=()=>Math.min(window.scrollY/Math.max(window.innerHeight,1),1.5),R={build:0,open:0,tx:0,ty:0,gx:0,gy:0,scroll:L()},z=I(),B=z&&!F.matches,V=0,H=0,U=0,W=!1,G=!1;function K(){return A||(x&&!a.getProgramParameter(b,x.COMPLETION_STATUS_KHR)?null:(a.getProgramParameter(b,a.LINK_STATUS)?A=E():Q(),A))}function ee(r){let c=Math.min(window.devicePixelRatio||1,2),x=Math.round(e.clientWidth*c),S=Math.round(e.clientHeight*c);if(x===0||S===0)return;(e.width!==x||e.height!==S)&&(e.width=x,e.height=S),a.viewport(0,0,x,S),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),a.enable(a.DEPTH_TEST),a.enable(a.BLEND),a.blendFunc(a.ONE,a.ONE_MINUS_SRC_ALPHA),a.useProgram(b),a.uniformMatrix4fv(r.viewProj,!1,m(y(o,x/S,.1,50),v(0,0,-s))),a.uniform3f(r.eye,0,0,s),a.uniform3fv(r.accent,N),a.uniform3fv(r.line,P),a.uniform3fv(r.ink,f),a.uniform1f(r.build,R.build);let{open:C,scroll:w}=R,T=m(h((l.tiltX+R.ty*.14)*C),g((l.tiltY+R.tx*.2)*C)),E=m(T,h((l.a+w*1.4)*C)),D=m(E,g((l.b-w*1.1)*C)),O=m(D,h((l.c+w*1.9)*C)),k=(e,n,i,o=i,s)=>{a.uniformMatrix4fv(r.model,!1,n),a.uniform3fv(r.base,i),a.uniform3fv(r.wall,o),a.uniform3f(r.tick,(s==null?void 0:s.minor)??1,(s==null?void 0:s.major)??1,s?t:0),a.bindVertexArray(e.vao),a.drawElements(a.TRIANGLES,e.count,a.UNSIGNED_SHORT,0)};if([E,D,O].forEach((e,t)=>k(M.rings[t],e,u,d,i[t])),R.build>.01){let e=_(Math.PI/2),t=_(Math.PI);k(M.stub,T,p),k(M.stub,m(T,t),p),k(M.pinOuter,m(E,e),p),k(M.pinOuter,m(E,m(e,t)),p),k(M.pinInner,D,p),k(M.pinInner,m(D,t),p),k(M.axle,m(O,e),p),k(M.hub,O,N)}W||(W=!0,n())}function q(e){if(U=0,G)return;let t=K();if(!t){G||(U=requestAnimationFrame(q));return}let n=F.matches;if(B&&!n){V||(V=e);let t=(e-V)/1e3;R.build=k((t-.15)/.7),R.open=k((t-.35)/1.5),t>=c&&(B=!1)}else B=!1,R.build=1,R.open=1;if(n)R.tx=R.ty=R.gx=R.gy=R.scroll=0;else{let t=Math.min((e-(H||e))/1e3,.05)*6;R.tx+=(R.gx-R.tx)*t,R.ty+=(R.gy-R.ty)*t}H=e,ee(t);let r=Math.abs(R.gx-R.tx)+Math.abs(R.gy-R.ty)>.002;B||r?J():H=0}function J(){!U&&!G&&z&&(U=requestAnimationFrame(q))}let Y=e=>{e.pointerType!==`touch`&&!F.matches&&z&&(R.gx=e.clientX/window.innerWidth*2-1,R.gy=e.clientY/window.innerHeight*2-1,J())},X=()=>{let e=L();e===R.scroll||F.matches||(R.scroll=e,J())},Z=new IntersectionObserver(([e])=>{z=e.isIntersecting,J()}),Q=()=>{G=!0,cancelAnimationFrame(U),Z.disconnect(),window.removeEventListener(`pointermove`,Y),window.removeEventListener(`scroll`,X),window.removeEventListener(`resize`,J),F.removeEventListener(`change`,J),e.removeEventListener(`webglcontextlost`,$)};function $(){Q(),r()}return Z.observe(e),window.addEventListener(`pointermove`,Y,{passive:!0}),window.addEventListener(`scroll`,X,{passive:!0}),window.addEventListener(`resize`,J),F.addEventListener(`change`,J),e.addEventListener(`webglcontextlost`,$),U=requestAnimationFrame(q),Q}export{A as start};