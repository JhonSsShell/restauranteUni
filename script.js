// ════════════════════════════════════════════════
//  DATA STORE
// ════════════════════════════════════════════════
const store = {
  currentUser: null,
  menuItems: [
    { id:1, cat:'Entradas', name:'Ceviche clásico', price:14.5, avail:true, desc:'Camarón, limón, cebolla morada' },
    { id:2, cat:'Entradas', name:'Bruschetta tricolor', price:9.0, avail:true, desc:'Pan artesanal, tomate, albahaca' },
    { id:3, cat:'Principales', name:'Lomo saltado', price:22.0, avail:true, desc:'Lomo fino, papas fritas, arroz' },
    { id:4, cat:'Principales', name:'Pasta primavera', price:18.5, avail:false, desc:'Penne, verduras de temporada, pesto' },
    { id:5, cat:'Principales', name:'Pollo a la plancha', price:16.0, avail:true, desc:'Pechuga, ensalada, papas al romero' },
    { id:6, cat:'Postres', name:'Tiramisú artesanal', price:8.5, avail:true, desc:'Mascarpone, café, cacao' },
    { id:7, cat:'Postres', name:'Flan de caramelo', price:7.0, avail:true, desc:'Receta de la casa' },
    { id:8, cat:'Bebidas', name:'Limonada de menta', price:5.0, avail:true, desc:'Limón fresco, menta, azúcar' },
    { id:9, cat:'Bebidas', name:'Jugo natural', price:4.5, avail:true, desc:'Naranja, zanahoria o maracuyá' },
  ],
  orders: [
    { id:'#P-001', table:3, items:['Lomo saltado','Limonada de menta'], mesero:'Carlos V.', status:'entregado', time:'12:15', total:27.0 },
    { id:'#P-002', table:7, items:['Ceviche clásico','Tiramisú x2'], mesero:'Ana M.', status:'cocina', time:'12:38', total:31.0 },
    { id:'#P-003', table:1, items:['Pasta primavera','Jugo natural x2'], mesero:'Carlos V.', status:'espera', time:'12:55', total:27.5 },
    { id:'#P-004', table:5, items:['Pollo a la plancha x2','Bruschetta'], mesero:'Luis R.', status:'cocina', time:'13:02', total:41.0 },
    { id:'#P-005', table:9, items:['Flan de caramelo x3'], mesero:'Ana M.', status:'espera', time:'13:18', total:21.0 },
  ],
  reservas: [
    { id:'R-001', cliente:'María Quispe', fecha:'2025-05-08', hora:'13:00', personas:4, mesa:3, status:'confirmada' },
    { id:'R-002', cliente:'Jorge Salinas', fecha:'2025-05-08', hora:'20:00', personas:2, mesa:6, status:'confirmada' },
    { id:'R-003', cliente:'Patricia Luna', fecha:'2025-05-09', hora:'13:30', personas:6, mesa:8, status:'pendiente' },
    { id:'R-004', cliente:'Roberto Vega', fecha:'2025-05-08', hora:'21:00', personas:3, mesa:2, status:'pendiente' },
    { id:'R-005', cliente:'Carmen Díaz', fecha:'2025-05-10', hora:'19:00', personas:5, mesa:5, status:'cancelada' },
  ],
  users: [
    { id:1, name:'Admin Sistema', email:'admin@restaurant.com', role:'admin', active:true, last:'Hoy 08:30' },
    { id:2, name:'Carlos Villanueva', email:'carlos.v@restaurant.com', role:'mesero', active:true, last:'Hoy 11:15' },
    { id:3, name:'Ana Morales', email:'ana.m@restaurant.com', role:'mesero', active:true, last:'Hoy 12:00' },
    { id:4, name:'Luis Ríos', email:'luis.r@restaurant.com', role:'mesero', active:false, last:'Ayer 19:45' },
    { id:5, name:'María Quispe', email:'maria.q@gmail.com', role:'cliente', active:true, last:'Hoy 09:20' },
  ],
  facturas: [
    { id:'F-0023', hora:'12:15', mesero:'Carlos V.', mesa:3, items:2, total:27.0, pago:'Efectivo', status:'pagada' },
    { id:'F-0022', hora:'11:58', mesero:'Ana M.', mesa:7, items:3, total:44.0, pago:'Tarjeta', status:'pagada' },
    { id:'F-0021', hora:'11:30', mesero:'Luis R.', mesa:1, items:4, total:67.5, pago:'Efectivo', status:'pagada' },
    { id:'F-0020', hora:'10:45', mesero:'Carlos V.', mesa:11, items:2, total:31.0, pago:'Tarjeta', status:'pagada' },
    { id:'F-0019', hora:'10:20', mesero:'Ana M.', mesa:5, items:5, total:89.0, pago:'Efectivo', status:'pagada' },
  ],
  menuCatActive: 'Entradas',
};

// ════════════════════════════════════════════════
//  ROLE CONFIG
// ════════════════════════════════════════════════
const ROLE_NAV = {
  admin: [
    { id:'dashboard', icon:'📊', label:'Dashboard' },
    { id:'menu', icon:'🍽️', label:'Menú digital' },
    { id:'pedidos', icon:'📋', label:'Pedidos' },
    { id:'reservas', icon:'📅', label:'Reservas' },
    { id:'caja', icon:'💰', label:'Caja & Reportes' },
    { id:'usuarios', icon:'👥', label:'Usuarios' },
  ],
  mesero: [
    { id:'pedidos', icon:'📋', label:'Pedidos' },
    { id:'menu', icon:'🍽️', label:'Menú digital' },
    { id:'reservas', icon:'📅', label:'Reservas' },
  ],
  cliente: [
    { id:'menu', icon:'🍽️', label:'Ver menú' },
    { id:'reservas', icon:'📅', label:'Mis reservas' },
  ],
};

// ════════════════════════════════════════════════
//  AUTH
// ════════════════════════════════════════════════
function doLogin() {
  const role = document.getElementById('login-role').value;
  const email = document.getElementById('login-user').value || 'usuario@restaurant.com';
  store.currentUser = { role, email };
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
  buildNav(role);
  updateUserBadge(role, email);
  const first = ROLE_NAV[role][0].id;
  showPanel(first);
  initDashboard();
  initCharts();
  initWeekChart();
  showToast('Bienvenido al sistema — ' + role.charAt(0).toUpperCase() + role.slice(1));
}

function doLogout() {
  document.getElementById('app').style.display = 'none';
  document.getElementById('login-screen').style.display = 'flex';
  showToast('Sesión cerrada correctamente');
}

function updateUserBadge(role, email) {
  const initials = { admin:'AD', mesero:'MS', cliente:'CL' };
  const colors = { admin:'rgba(217,119,6,0.2)', mesero:'rgba(59,130,246,0.15)', cliente:'rgba(16,185,129,0.1)' };
  const txtClr = { admin:'var(--amber-light)', mesero:'#93C5FD', cliente:'#6EE7B7' };
  const names = { admin:'Administrador', mesero:'Mesero', cliente:'Cliente' };
  document.getElementById('user-avatar').textContent = initials[role];
  document.getElementById('user-avatar').style.background = colors[role];
  document.getElementById('user-avatar').style.color = txtClr[role];
  document.getElementById('user-name').textContent = names[role];
  document.getElementById('user-role-label').textContent = email;
}

function buildNav(role) {
  const nav = document.getElementById('nav-links');
  nav.innerHTML = '';
  ROLE_NAV[role].forEach(item => {
    const d = document.createElement('div');
    d.className = 'nav-item';
    d.id = 'nav-' + item.id;
    d.innerHTML = `<span class="nav-icon">${item.icon}</span><span>${item.label}</span>`;
    d.onclick = () => showPanel(item.id);
    nav.appendChild(d);
  });
}

function showPanel(id) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const p = document.getElementById('panel-' + id);
  const n = document.getElementById('nav-' + id);
  if (p) p.classList.add('active');
  if (n) n.classList.add('active');
  if (id === 'menu') renderMenu();
  if (id === 'pedidos') renderPedidos();
  if (id === 'reservas') renderReservas();
  if (id === 'usuarios') renderUsers();
  if (id === 'caja') { renderFacturas(); renderTopDishes(); }
}

// ════════════════════════════════════════════════
//  DASHBOARD
// ════════════════════════════════════════════════
function initDashboard() {
  const list = document.getElementById('last-orders-list');
  list.innerHTML = '';
  store.orders.slice(0,4).forEach(o => {
    const clr = { espera:'badge-amber', cocina:'badge-blue', entregado:'badge-green' };
    list.innerHTML += `
      <div style="display:flex; align-items:center; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(217,119,6,0.1);">
        <div>
          <span style="font-size:13px; font-weight:500;">${o.id}</span>
          <span style="font-size:12px; color:var(--text-muted); margin-left:8px;">Mesa ${o.table}</span>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:13px; font-weight:500; color:var(--amber-light);">$${o.total.toFixed(2)}</span>
          <span class="badge ${clr[o.status]}">${o.status}</span>
        </div>
      </div>`;
  });
}

function initCharts() {
  const vals = [12, 45, 89, 134, 210, 180, 155, 98, 76, 43, 28, 15, 8];
  const max = Math.max(...vals);
  const c = document.getElementById('dash-chart');
  c.innerHTML = '';
  vals.forEach(v => {
    const h = Math.round((v / max) * 100);
    c.innerHTML += `<div class="bar-col"><div class="bar" style="height:${h}px;"></div></div>`;
  });
}

function initWeekChart() {
  const vals = [1200, 980, 1450, 1100, 1847, 2300, 1980];
  const max = Math.max(...vals);
  const c = document.getElementById('week-chart');
  if (!c) return;
  c.innerHTML = '';
  vals.forEach((v, i) => {
    const h = Math.round((v / max) * 100);
    const isToday = i === 4;
    c.innerHTML += `
      <div class="bar-col">
        <div class="bar-val" style="${isToday ? 'color:var(--amber-light);font-weight:500;' : ''}">$${(v/1000).toFixed(1)}k</div>
        <div class="bar" style="height:${h}px; ${isToday ? 'background:#FCD34D;' : 'opacity:.6;'}"></div>
      </div>`;
  });
}

function renderTopDishes() {
  const dishes = [
    { name:'Lomo saltado', cnt:12, pct:52 },
    { name:'Ceviche clásico', cnt:9, pct:39 },
    { name:'Pasta primavera', cnt:7, pct:30 },
    { name:'Tiramisú', cnt:6, pct:26 },
  ];
  const el = document.getElementById('top-dishes');
  if (!el) return;
  el.innerHTML = '';
  dishes.forEach(d => {
    el.innerHTML += `
      <div>
        <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
          <span style="font-size:13px;">${d.name}</span>
          <span style="font-size:13px; color:var(--text-muted);">${d.cnt} pedidos</span>
        </div>
        <div class="prog-bar"><div class="prog-fill" style="width:${d.pct}%;"></div></div>
      </div>`;
  });
}

// ════════════════════════════════════════════════
//  MENU MODULE
// ════════════════════════════════════════════════
function renderMenu() {
  const cats = [...new Set(store.menuItems.map(m => m.cat))];
  const tabsEl = document.getElementById('menu-cats');
  tabsEl.innerHTML = '';
  cats.forEach(c => {
    const d = document.createElement('div');
    d.className = 'tab' + (c === store.menuCatActive ? ' active' : '');
    d.textContent = c;
    d.onclick = () => { store.menuCatActive = c; renderMenu(); };
    tabsEl.appendChild(d);
  });
  const list = document.getElementById('menu-list');
  list.innerHTML = '';
  store.menuItems.filter(m => m.cat === store.menuCatActive).forEach(item => {
    const isAdmin = store.currentUser.role === 'admin';
    list.innerHTML += `
      <div class="menu-item">
        <div style="flex:1;">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:4px;">
            <span style="font-size:14px; font-weight:500;">${item.name}</span>
            <span class="badge ${item.avail ? 'badge-green' : 'badge-red'}">${item.avail ? 'disponible' : 'agotado'}</span>
          </div>
          <span style="font-size:12px; color:var(--text-muted);">${item.desc}</span>
        </div>
        <div style="display:flex; align-items:center; gap:12px; margin-left:20px;">
          <span style="font-size:16px; font-weight:600; color:var(--amber-light); font-family:'DM Serif Display',serif;">$${item.price.toFixed(2)}</span>
          ${isAdmin ? `
          <button class="btn btn-ghost btn-sm" onclick="editMenuItem(${item.id})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="deleteMenuItem(${item.id})">✕</button>` : ''}
        </div>
      </div>`;
  });
}

function openMenuModal(edit) {
  const item = edit ? store.menuItems.find(m => m.id === edit) : null;
  const cats = [...new Set(store.menuItems.map(m => m.cat))];
  showModal(`
    <h3 style="font-size:17px; font-weight:500; margin:0 0 20px;">${item ? 'Editar plato' : 'Nuevo plato'}</h3>
    <div style="display:flex; flex-direction:column; gap:12px;">
      <div><label class="lbl">Nombre del plato</label><input class="inp" id="m-name" value="${item ? item.name : ''}"></div>
      <div><label class="lbl">Descripción</label><input class="inp" id="m-desc" value="${item ? item.desc : ''}"></div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div><label class="lbl">Precio ($)</label><input class="inp" id="m-price" type="number" value="${item ? item.price : ''}"></div>
        <div><label class="lbl">Categoría</label>
          <select class="inp" id="m-cat">
            ${cats.map(c => `<option ${item && item.cat===c?'selected':''}>${c}</option>`).join('')}
            <option value="__new__">+ Nueva categoría</option>
          </select>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:10px;">
        <input type="checkbox" id="m-avail" ${!item || item.avail ? 'checked' : ''}>
        <label style="font-size:13px; color:var(--text-muted);">Disponible</label>
      </div>
    </div>
    <div style="display:flex; gap:10px; margin-top:24px; justify-content:flex-end;">
      <button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-amber" onclick="saveMenuItem(${item ? item.id : 'null'})">${item ? 'Guardar cambios' : 'Agregar plato'}</button>
    </div>
  `);
}

function editMenuItem(id) { openMenuModal(id); }

function saveMenuItem(id) {
  const name = document.getElementById('m-name').value.trim();
  const desc = document.getElementById('m-desc').value.trim();
  const price = parseFloat(document.getElementById('m-price').value) || 0;
  const cat = document.getElementById('m-cat').value;
  const avail = document.getElementById('m-avail').checked;
  if (!name) { showToast('El nombre es requerido'); return; }
  if (id) {
    const item = store.menuItems.find(m => m.id === id);
    Object.assign(item, { name, desc, price, cat, avail });
    showToast('Plato actualizado correctamente');
  } else {
    store.menuItems.push({ id: Date.now(), cat, name, price, avail, desc });
    showToast('Plato agregado al menú');
  }
  closeModal(); renderMenu();
}

function deleteMenuItem(id) {
  store.menuItems = store.menuItems.filter(m => m.id !== id);
  showToast('Plato eliminado del menú');
  renderMenu();
}

// ════════════════════════════════════════════════
//  PEDIDOS MODULE
// ════════════════════════════════════════════════
function renderPedidos() {
  const cols = {
    espera: { label:'En espera', badge:'badge-amber', items:[] },
    cocina: { label:'En cocina', badge:'badge-blue', items:[] },
    entregado: { label:'Entregado', badge:'badge-green', items:[] },
  };
  store.orders.forEach(o => { if (cols[o.status]) cols[o.status].items.push(o); });
  document.getElementById('cnt-espera').textContent = cols.espera.items.length;
  document.getElementById('cnt-cocina').textContent = cols.cocina.items.length;
  document.getElementById('cnt-entregado').textContent = cols.entregado.items.length;
  const board = document.getElementById('orders-board');
  board.innerHTML = '';
  Object.entries(cols).forEach(([key, col]) => {
    let cards = col.items.map(o => `
      <div class="order-card" style="margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:13px; font-weight:500;">${o.id}</span>
          <span style="font-size:12px; color:var(--text-muted);">${o.time}</span>
        </div>
        <div style="font-size:12px; color:var(--text-muted); margin-bottom:8px;">Mesa ${o.table} · ${o.mesero}</div>
        <div style="font-size:12px; margin-bottom:10px;">${o.items.map(i => `<span style="display:inline-block; background:rgba(217,119,6,0.1); border:1px solid var(--border); border-radius:4px; padding:2px 7px; margin:2px; font-size:11px;">${i}</span>`).join('')}</div>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:14px; font-weight:600; color:var(--amber-light); font-family:'DM Serif Display',serif;">$${o.total.toFixed(2)}</span>
          ${key !== 'entregado' ? `
            <button class="btn btn-amber btn-sm" onclick="advanceOrder('${o.id}')">
              ${key === 'espera' ? '→ Cocina' : '→ Entregado'}
            </button>` : '<span class="badge badge-green">✓ Listo</span>'}
        </div>
      </div>`).join('');
    board.innerHTML += `
      <div style="flex:1; min-width:220px;">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px; padding:10px 14px; background:var(--bg-surface); border-radius:8px; border:1px solid var(--border);">
          <span class="badge ${col.badge}">${col.items.length}</span>
          <span style="font-size:13px; font-weight:500;">${col.label}</span>
        </div>
        ${cards || '<div style="font-size:13px; color:var(--text-muted); text-align:center; padding:20px;">Sin pedidos</div>'}
      </div>`;
  });
}

function advanceOrder(id) {
  const o = store.orders.find(x => x.id === id);
  if (!o) return;
  if (o.status === 'espera') o.status = 'cocina';
  else if (o.status === 'cocina') o.status = 'entregado';
  showToast(`Pedido ${id} actualizado`);
  renderPedidos();
}

function openPedidoModal() {
  const menuOpts = store.menuItems.filter(m => m.avail).map(m =>
    `<option value="${m.name}">${m.name} ($${m.price.toFixed(2)})</option>`).join('');
  showModal(`
    <h3 style="font-size:17px; font-weight:500; margin:0 0 20px;">Nuevo pedido</h3>
    <div style="display:flex; flex-direction:column; gap:12px;">
      <div><label class="lbl">Número de mesa</label>
        <input class="inp" id="p-table" type="number" min="1" max="12" placeholder="1–12">
      </div>
      <div><label class="lbl">Mesero</label>
        <select class="inp" id="p-mesero">
          <option>Carlos V.</option><option>Ana M.</option><option>Luis R.</option>
        </select>
      </div>
      <div><label class="lbl">Platos (selecciona uno o más)</label>
        <select class="inp" id="p-items" multiple size="4" style="height:auto;">${menuOpts}</select>
        <span style="font-size:11px; color:var(--text-muted);">Ctrl+clic para seleccionar varios</span>
      </div>
    </div>
    <div style="display:flex; gap:10px; margin-top:24px; justify-content:flex-end;">
      <button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-amber" onclick="savePedido()">Registrar pedido</button>
    </div>
  `);
}

function savePedido() {
  const table = document.getElementById('p-table').value;
  const mesero = document.getElementById('p-mesero').value;
  const sel = [...document.getElementById('p-items').selectedOptions].map(o => o.value);
  if (!table || sel.length === 0) { showToast('Completa todos los campos'); return; }
  const total = sel.reduce((a,name) => {
    const it = store.menuItems.find(m => m.name === name);
    return a + (it ? it.price : 0);
  }, 0);
  const newId = '#P-0' + String(store.orders.length + 1).padStart(2,'0');
  const now = new Date();
  store.orders.unshift({ id:newId, table:+table, items:sel, mesero, status:'espera', time:`${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`, total });
  showToast(`Pedido ${newId} registrado`);
  closeModal(); renderPedidos();
}

// ════════════════════════════════════════════════
//  RESERVAS MODULE
// ════════════════════════════════════════════════
function renderReservas() {
  const dateFilter = document.getElementById('filter-date')?.value || '';
  const statusFilter = document.getElementById('filter-status')?.value || '';
  const clr = { confirmada:'badge-green', pendiente:'badge-amber', cancelada:'badge-red' };
  let rows = store.reservas.filter(r => {
    if (dateFilter && r.fecha !== dateFilter) return false;
    if (statusFilter && r.status !== statusFilter) return false;
    return true;
  });
  const tbody = document.getElementById('reservas-table');
  tbody.innerHTML = '';
  rows.forEach(r => {
    tbody.innerHTML += `
      <tr>
        <td><span style="font-weight:500; color:var(--amber-light);">${r.id}</span></td>
        <td>${r.cliente}</td>
        <td>${r.fecha}</td>
        <td style="font-weight:500;">${r.hora}</td>
        <td style="text-align:center;">${r.personas}</td>
        <td style="text-align:center;">Mesa ${r.mesa}</td>
        <td><span class="badge ${clr[r.status]}">${r.status}</span></td>
        <td>
          <div style="display:flex; gap:6px;">
            ${r.status === 'pendiente' ? `<button class="btn btn-ghost btn-sm" onclick="confirmReserva('${r.id}')">Confirmar</button>` : ''}
            ${r.status !== 'cancelada' ? `<button class="btn btn-danger btn-sm" onclick="cancelReserva('${r.id}')">Cancelar</button>` : ''}
          </div>
        </td>
      </tr>`;
  });
  if (rows.length === 0) tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; color:var(--text-muted); padding:24px;">Sin reservas para los filtros aplicados</td></tr>';
}

function confirmReserva(id) {
  const r = store.reservas.find(x => x.id === id);
  if (r) { r.status = 'confirmada'; showToast(`Reserva ${id} confirmada`); renderReservas(); }
}
function cancelReserva(id) {
  const r = store.reservas.find(x => x.id === id);
  if (r) { r.status = 'cancelada'; showToast(`Reserva ${id} cancelada`); renderReservas(); }
}

function openReservaModal() {
  showModal(`
    <h3 style="font-size:17px; font-weight:500; margin:0 0 20px;">Nueva reserva</h3>
    <div style="display:flex; flex-direction:column; gap:12px;">
      <div><label class="lbl">Nombre del cliente</label><input class="inp" id="r-name" placeholder="Nombre completo"></div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div><label class="lbl">Fecha</label><input class="inp" id="r-date" type="date"></div>
        <div><label class="lbl">Hora</label><input class="inp" id="r-time" type="time"></div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
        <div><label class="lbl">Personas</label><input class="inp" id="r-personas" type="number" min="1" max="20" placeholder="1–20"></div>
        <div><label class="lbl">Mesa</label>
          <select class="inp" id="r-mesa">
            ${Array.from({length:12},(_,i)=>`<option value="${i+1}">Mesa ${i+1}</option>`).join('')}
          </select>
        </div>
      </div>
    </div>
    <div style="display:flex; gap:10px; margin-top:24px; justify-content:flex-end;">
      <button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-amber" onclick="saveReserva()">Registrar reserva</button>
    </div>
  `);
}

function saveReserva() {
  const name = document.getElementById('r-name').value.trim();
  const date = document.getElementById('r-date').value;
  const time = document.getElementById('r-time').value;
  const personas = document.getElementById('r-personas').value;
  const mesa = document.getElementById('r-mesa').value;
  if (!name || !date || !time || !personas) { showToast('Completa todos los campos'); return; }
  const newId = 'R-00' + (store.reservas.length + 1);
  store.reservas.push({ id:newId, cliente:name, fecha:date, hora:time, personas:+personas, mesa:+mesa, status:'pendiente' });
  showToast(`Reserva ${newId} registrada`);
  closeModal(); renderReservas();
}

// ════════════════════════════════════════════════
//  CAJA / REPORTES
// ════════════════════════════════════════════════
function renderFacturas() {
  const tbody = document.getElementById('facturas-table');
  if (!tbody) return;
  tbody.innerHTML = '';
  store.facturas.forEach(f => {
    tbody.innerHTML += `
      <tr>
        <td><span style="font-weight:500; color:var(--amber-light);">${f.id}</span></td>
        <td>${f.hora}</td>
        <td>${f.mesero}</td>
        <td style="text-align:center;">Mesa ${f.mesa}</td>
        <td style="text-align:center;">${f.items}</td>
        <td style="font-weight:600; color:#F5EDD9; font-family:'DM Serif Display',serif;">$${f.total.toFixed(2)}</td>
        <td><span class="badge ${f.pago==='Efectivo' ? 'badge-green' : 'badge-blue'}">${f.pago}</span></td>
        <td><span class="badge badge-green">✓ ${f.status}</span></td>
      </tr>`;
  });
}

function generarCierre() {
  showToast('Cierre del día generado — Reporte guardado');
  setTimeout(() => showToast('PDF de cierre listo para descargar'), 1800);
}

// ════════════════════════════════════════════════
//  USUARIOS MODULE
// ════════════════════════════════════════════════
function renderUsers() {
  const roleClr = { admin:'badge-amber', mesero:'badge-blue', cliente:'badge-gray' };
  const tbody = document.getElementById('users-table');
  tbody.innerHTML = '';
  store.users.forEach(u => {
    const initials = u.name.split(' ').map(n => n[0]).slice(0,2).join('');
    tbody.innerHTML += `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:10px;">
            <div class="avatar" style="background:rgba(217,119,6,0.15); color:var(--amber-light); font-size:11px;">${initials}</div>
            <span style="font-weight:500;">${u.name}</span>
          </div>
        </td>
        <td style="color:var(--text-muted);">${u.email}</td>
        <td><span class="badge ${roleClr[u.role]}">${u.role}</span></td>
        <td><span class="badge ${u.active ? 'badge-green' : 'badge-red'}">${u.active ? 'activo' : 'inactivo'}</span></td>
        <td style="color:var(--text-muted); font-size:12px;">${u.last}</td>
        <td>
          <div style="display:flex; gap:6px;">
            <button class="btn btn-ghost btn-sm" onclick="toggleUser(${u.id})">${u.active ? 'Desactivar' : 'Activar'}</button>
            <button class="btn btn-danger btn-sm" onclick="deleteUser(${u.id})">✕</button>
          </div>
        </td>
      </tr>`;
  });
}

function toggleUser(id) {
  const u = store.users.find(x => x.id === id);
  if (u) { u.active = !u.active; showToast(`Usuario ${u.active ? 'activado' : 'desactivado'}`); renderUsers(); }
}
function deleteUser(id) {
  store.users = store.users.filter(u => u.id !== id);
  showToast('Usuario eliminado del sistema');
  renderUsers();
}

function openUserModal() {
  showModal(`
    <h3 style="font-size:17px; font-weight:500; margin:0 0 20px;">Nuevo usuario</h3>
    <div style="display:flex; flex-direction:column; gap:12px;">
      <div><label class="lbl">Nombre completo</label><input class="inp" id="u-name" placeholder="Nombre y apellido"></div>
      <div><label class="lbl">Correo electrónico</label><input class="inp" id="u-email" type="email" placeholder="correo@restaurant.com"></div>
      <div><label class="lbl">Rol</label>
        <select class="inp" id="u-role">
          <option value="mesero">Mesero</option>
          <option value="admin">Administrador</option>
          <option value="cliente">Cliente</option>
        </select>
      </div>
      <div><label class="lbl">Contraseña temporal</label><input class="inp" id="u-pass" type="password" placeholder="Mín. 8 caracteres"></div>
    </div>
    <div style="display:flex; gap:10px; margin-top:24px; justify-content:flex-end;">
      <button class="btn btn-ghost" onclick="closeModal()">Cancelar</button>
      <button class="btn btn-amber" onclick="saveUser()">Crear usuario</button>
    </div>
  `);
}

function saveUser() {
  const name = document.getElementById('u-name').value.trim();
  const email = document.getElementById('u-email').value.trim();
  const role = document.getElementById('u-role').value;
  const pass = document.getElementById('u-pass').value;
  if (!name || !email || !pass) { showToast('Completa todos los campos'); return; }
  store.users.push({ id: Date.now(), name, email, role, active:true, last:'Ahora' });
  showToast(`Usuario ${name} creado`);
  closeModal(); renderUsers();
}

// ════════════════════════════════════════════════
//  MODAL UTILS
// ════════════════════════════════════════════════
function showModal(html) {
  document.getElementById('modal-container').innerHTML = `
    <div class="modal-bg" onclick="closeModalBg(event)">
      <div class="modal-box">${html}</div>
    </div>`;
}
function closeModal() { document.getElementById('modal-container').innerHTML = ''; }
function closeModalBg(e) { if (e.target.classList.contains('modal-bg')) closeModal(); }

// ════════════════════════════════════════════════
//  TOAST
// ════════════════════════════════════════════════
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = '✓ ' + msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}
