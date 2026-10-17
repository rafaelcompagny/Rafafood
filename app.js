import { auth, db } from "./services/firebase.js";
import { onAuthStateChanged, login as firebaseLogin, register as firebaseRegister, logout as firebaseLogout, authDiagnostics } from "./services/auth.js";
import { getUserProfile, getUserOrders, getAllOrders, createOrder, createPaidCryptexOrder, getProducts, seedProducts, getCategories, seedCategories, collection, doc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, serverTimestamp } from "./services/db.js";
import { createCryptexPaymentRequest, getCryptexPaymentRequest } from "./services/merchant-payment.js";

const products = [
  {id:1,name:'Le Rafa Signature',type:'Plats',cat:'Burgers',price:12.90,emoji:'🍔',short:'Le burger emblématique de RAFAFOOD.',desc:'Pain brioché toasté, steak de bœuf haché, cheddar affiné, oignons crispy, salade fraîche et sauce Rafa maison.',ingredients:'Pain brioché • steak de bœuf • cheddar • salade • oignons crispy • sauce Rafa',allergens:'Gluten, lait, œufs',badge:'SIGNATURE'},
  {id:2,name:'Double Rafa',type:'Plats',cat:'Burgers',price:15.90,emoji:'🍔',short:'Deux steaks, double gourmandise.',desc:'Deux steaks de bœuf grillés, double cheddar, oignons confits, cornichons et sauce Rafa maison.',ingredients:'Pain brioché • 2 steaks de bœuf • double cheddar • oignons • cornichons • sauce Rafa',allergens:'Gluten, lait, œufs',badge:'GOURMAND'},
  {id:3,name:'Rafa Pizza',type:'Plats',cat:'Pizzas',price:13.90,emoji:'🍕',short:'La pizza généreuse de la maison.',desc:'Base tomate, mozzarella fondante, jambon, champignons frais, origan et basilic.',ingredients:'Tomate • mozzarella • jambon • champignons • origan • basilic',allergens:'Gluten, lait',badge:'MAISON'},
  {id:4,name:'Chicken Bowl',type:'Plats',cat:'Bowls',price:13.50,emoji:'🥗',short:'Frais, coloré et généreux.',desc:'Poulet grillé mariné, riz parfumé, avocat, concombre, tomates cerises, salade croquante et sauce Rafa.',ingredients:'Poulet • riz • avocat • concombre • tomates • salade • sauce Rafa',allergens:'Selon sauce',badge:'FRAIS'},
  {id:5,name:'Rafa Steak',type:'Plats',cat:'Grill',price:19.90,emoji:'🥩',short:'Une pièce de bœuf grillée à la minute.',desc:'Pièce de bœuf grillée, frites, salade fraîche et sauce au poivre.',ingredients:'Bœuf • frites • salade • sauce au poivre',allergens:'Lait possible',badge:'GRILL'},
  {id:6,name:'Pasta Carbonara',type:'Plats',cat:'Pâtes',price:12.90,emoji:'🍝',short:'Crémeuse, généreuse et réconfortante.',desc:'Pâtes, poitrine fumée, crème, parmesan et poivre noir, préparées à la commande.',ingredients:'Pâtes • poitrine fumée • crème • parmesan • poivre noir',allergens:'Gluten, lait, œufs',badge:'BEST-SELLER'},
  {id:7,name:'Menu Rafa Burger',type:'Menus',cat:'Menus',price:17.90,emoji:'🍔',short:'Le Signature + accompagnement + boisson.',desc:'Le Rafa Signature accompagné de frites classiques et d’une boisson 33 cl au choix.',ingredients:'Le Rafa Signature • frites classiques • boisson 33 cl',allergens:'Gluten, lait, œufs',badge:'MENU'},
  {id:8,name:'Menu Rafa Pizza',type:'Menus',cat:'Menus',price:19.90,emoji:'🍕',short:'Pizza + accompagnement + boisson.',desc:'Une Rafa Pizza, une portion de frites classiques et une boisson 33 cl au choix.',ingredients:'Rafa Pizza • frites classiques • boisson 33 cl',allergens:'Gluten, lait',badge:'MENU'},
  {id:9,name:'Menu Rafa Duo',type:'Menus',cat:'Menus',price:29.90,emoji:'👑',short:'Le format généreux à partager.',desc:'Deux plats au choix parmi la sélection RAFAFOOD, deux accompagnements et deux boissons 33 cl.',ingredients:'2 plats • 2 accompagnements • 2 boissons 33 cl',allergens:'Voir les fiches des plats',badge:'À PARTAGER'},
  {id:10,name:'Coca-Cola',type:'Boissons',cat:'Boissons',price:2.50,emoji:'🥤',short:'Canette 33 cl.',desc:'Coca-Cola classique servi bien frais.',ingredients:'Boisson gazeuse au cola',allergens:'Voir étiquette',badge:'33 CL'},
  {id:11,name:'Ice Tea Pêche',type:'Boissons',cat:'Boissons',price:2.50,emoji:'🧋',short:'Canette 33 cl.',desc:'Thé glacé saveur pêche, servi bien frais.',ingredients:'Thé glacé • arôme pêche',allergens:'Voir étiquette',badge:'33 CL'},
  {id:12,name:'Eau minérale',type:'Boissons',cat:'Boissons',price:2.00,emoji:'💧',short:'Bouteille 50 cl.',desc:'Eau minérale plate, format individuel.',ingredients:'Eau minérale naturelle',allergens:'Aucun',badge:'50 CL'},
  {id:13,name:'Tiramisu Rafa',type:'Desserts',cat:'Desserts',price:4.90,emoji:'🍰',short:'Le dessert signature maison.',desc:'Crème mascarpone onctueuse, café, biscuit et cacao.',ingredients:'Mascarpone • biscuit • café • cacao',allergens:'Gluten, lait, œufs',badge:'SIGNATURE'},
  {id:14,name:'Cookie Choco',type:'Desserts',cat:'Desserts',price:3.50,emoji:'🍪',short:'Moelleux au cœur chocolaté.',desc:'Grand cookie généreux aux pépites de chocolat.',ingredients:'Farine • beurre • sucre • chocolat',allergens:'Gluten, lait, œufs',badge:'GOURMAND'},
  {id:15,name:'Fondant Chocolat',type:'Desserts',cat:'Desserts',price:4.90,emoji:'🍫',short:'Chocolat intense, cœur fondant.',desc:'Fondant au chocolat au cœur coulant.',ingredients:'Chocolat • beurre • œufs • farine • sucre',allergens:'Gluten, lait, œufs',badge:'CHOCOLAT'},
  {id:16,name:'Rafa Vegan Burger',type:'Vegan',cat:'Vegan',price:13.90,emoji:'🌱',short:'Le burger végétal généreux de RAFAFOOD.',desc:'Pain vegan, steak végétal, cheddar vegan, salade, tomate, oignons crispy et sauce vegan maison.',ingredients:'Pain vegan • steak végétal • cheddar vegan • salade • tomate • oignons • sauce vegan',allergens:'Gluten, soja possible',badge:'VEGAN'},
  {id:17,name:'Rafa Vegan Pizza',type:'Vegan',cat:'Vegan',price:14.90,emoji:'🍕',short:'Une pizza généreuse 100 % végétale.',desc:'Base tomate, mozzarella végétale, champignons, poivrons, oignons rouges, tomates cerises et basilic.',ingredients:'Tomate • mozzarella végétale • champignons • poivrons • oignons rouges • tomates • basilic',allergens:'Gluten, soja possible',badge:'VEGAN'},
  {id:18,name:'Rafa Vegan Bowl',type:'Vegan',cat:'Vegan',price:13.50,emoji:'🥗',short:'Frais, coloré et entièrement végétal.',desc:'Riz parfumé, protéines végétales, avocat, concombre, tomates cerises, maïs, salade et sauce vegan.',ingredients:'Riz • protéines végétales • avocat • concombre • tomates • maïs • salade • sauce vegan',allergens:'Soja possible',badge:'VEGAN'},
  {id:19,name:'Rafa Vegan Grill',type:'Vegan',cat:'Vegan',price:14.90,emoji:'🥦',short:'Un plat chaud et gourmand aux légumes grillés.',desc:'Galette végétale grillée, frites, légumes grillés, salade fraîche et sauce vegan maison.',ingredients:'Galette végétale • frites • légumes grillés • salade • sauce vegan',allergens:'Soja possible',badge:'VEGAN'},
  {id:20,name:'Menu Étudiant',type:'Menu Étudiant',cat:'Étudiant',price:12.90,emoji:'🎓',short:'Le bon plan RAFAFOOD pour les étudiants.',desc:'Un plat au choix accompagné de frites classiques et d’une boisson 33 cl.',ingredients:'1 plat • frites classiques • 1 boisson 33 cl',allergens:'Voir les fiches des plats',badge:'ÉTUDIANT'},
  {id:21,name:'Menu Étudiant Vegan',type:'Menu Étudiant',cat:'Étudiant',price:13.90,emoji:'🌱',short:'La formule étudiante en version vegan.',desc:'Un plat vegan avec accompagnement et boisson 33 cl.',ingredients:'1 plat vegan • frites classiques • 1 boisson 33 cl',allergens:'Voir les fiches des plats',badge:'ÉTUDIANT • VEGAN'}
];

let current='Tous', catalog=[...products], categories=[], currentUserProfile=null;
let productQuery='',showFavorites=false;
const favorites=new Set(loadSavedFavorites());
function loadSavedFavorites(){try{const value=JSON.parse(localStorage.getItem('rafafood_favorites')||'[]');return Array.isArray(value)?value.map(String):[]}catch{return []}}
function saveFavorites(){localStorage.setItem('rafafood_favorites',JSON.stringify([...favorites]));updateFavoriteCount()}
function updateFavoriteCount(){const el=document.getElementById('favoriteCount');if(el)el.textContent=String(favorites.size)}
function toggleFavorite(id){const key=String(id);favorites.has(key)?favorites.delete(key):favorites.add(key);saveFavorites();renderProducts()}
let dashboardTab='overview';
const defaultCategories=['Plats','Menus','Accompagnements','Boissons','Desserts','Spéciale','Vegan','Menu Étudiant'];
function loadSavedCart(){
  try{
    const saved=JSON.parse(localStorage.getItem('rafafood_cart')||'[]');
    if(!Array.isArray(saved))return [];
    return saved.filter(item=>item&&item.id!=null&&typeof item.name==='string'
      &&Number.isFinite(Number(item.price))&&Number(item.price)>=0
      &&Number.isInteger(Number(item.quantity))&&Number(item.quantity)>0)
      .map(item=>({...item,price:Number(item.price),quantity:Number(item.quantity)}));
  }catch(error){
    console.warn('Panier enregistré illisible, panier réinitialisé.',error);
    return [];
  }
}
let cart=loadSavedCart();
let orderMode=localStorage.getItem('rafafood_order_mode')==='emporter'?'emporter':'livraison';
let selectedPayment='cryptex', paymentPollTimer=null, activePaymentRequestId=null;
const roleLabel={client:'Client',employe:'Employé',directeur:'Directeur',admin:'Administrateur'};
const statusLabel={reçue:'Reçue',en_preparation:'En préparation',prete:'Prête',en_livraison:'En livraison',terminee:'Terminée',annulée:'Annulée'};
const statusFlow=['reçue','en_preparation','prete','en_livraison','terminee'];
const formatPrice=n=>Number(n||0).toLocaleString('fr-FR',{style:'currency',currency:'EUR'});
const esc=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const discountedPrice=p=>currentUserProfile?.role==='employe'?Number(p.price)*.8:Number(p.price);
const currentRestaurant=()=>currentUserProfile?.restaurantId||'rafafood-bordeaux';
const productTypeNames=()=>categories.length?categories.map(c=>c.name):defaultCategories;

function saveCart(){localStorage.setItem('rafafood_cart',JSON.stringify(cart));updateCartUI();}
function cartCount(){return cart.reduce((n,i)=>n+i.quantity,0)}
function cartTotal(){return cart.reduce((n,i)=>n+i.price*i.quantity,0)}
function addToCart(id){
  if(!currentUserProfile){openAuth('login');return;}
  const p=catalog.find(x=>String(x.id)===String(id)); if(!p)return;
  const existing=cart.find(x=>String(x.id)===String(p.id));
  if(existing)existing.quantity++; else cart.push({id:p.id,name:p.name,emoji:p.emoji||'🍽️',price:discountedPrice(p),basePrice:Number(p.price),quantity:1});
  saveCart(); openCart();
}
function updateCartItem(id,delta){const i=cart.find(x=>String(x.id)===String(id));if(!i)return;i.quantity+=delta;if(i.quantity<=0)cart=cart.filter(x=>String(x.id)!==String(id));saveCart();}
function updateCartUI(){
  document.getElementById('cartCount').textContent=cartCount();
  const box=document.getElementById('cartItems'); if(!box)return;
  if(!cart.length){box.innerHTML='<div class="empty"><div style="font-size:42px">🛒</div><p>Ton panier est vide.</p><small>Ajoute un plat pour commencer.</small></div>';} else box.innerHTML=cart.map(i=>`<div class="cart-item"><span class="emoji">${i.emoji}</span><div style="flex:1"><h4>${esc(i.name)}</h4><small>${formatPrice(i.price)} / unité</small><div class="qty"><button data-q="${i.id}" data-d="-1">−</button><b>${i.quantity}</b><button data-q="${i.id}" data-d="1">+</button><strong style="margin-left:auto;color:var(--gold)">${formatPrice(i.price*i.quantity)}</strong></div></div></div>`).join('');
  box.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>updateCartItem(b.dataset.q,Number(b.dataset.d)));
  document.getElementById('cartTotal').textContent=formatPrice(cartTotal());
}
function openCart(){document.getElementById('cartPanel')?.classList.add('open');document.getElementById('cartOverlay')?.classList.add('show');updateCartUI();}
function closeCart(){document.getElementById('cartPanel')?.classList.remove('open');document.getElementById('cartOverlay')?.classList.remove('show');}
function setMode(mode){orderMode=mode;localStorage.setItem('rafafood_order_mode',mode);document.querySelectorAll('.mode-btn').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));document.getElementById('deliveryFields')?.classList.toggle('hidden',mode!=='livraison');}

function renderFilters(){
  const box=document.getElementById('filters'); if(!box)return;
  const iconMap={
    'Tous':'✨','Plats':'🍽️','Menus':'👑','Accompagnements':'🍟','Boissons':'🥤','Desserts':'🍰',
    'Spéciale':'⭐','Vegan':'🌱','Menu Étudiant':'🎓','Étudiant':'🎓',
    'Burgers':'🍔','Pizzas':'🍕','Bowls':'🥗','Grill':'🔥','Pâtes':'🍝'
  };
  const primaryOrder=['Plats','Menus','Accompagnements','Boissons','Desserts','Spéciale','Vegan','Menu Étudiant'];
  const availableTypes=productTypeNames();
  const primary=[...primaryOrder.filter(x=>availableTypes.includes(x))];
  availableTypes.forEach(x=>{if(!primary.includes(x) && !['Burgers','Pizzas','Bowls','Grill','Pâtes','Étudiant'].includes(x))primary.push(x)});
  const primarySet=new Set(primary);
  const secondary=[...new Set(catalog.map(p=>p.cat).filter(Boolean))].filter(x=>!primarySet.has(x) && x!=='Étudiant');
  const chip=(value,extra='')=>`<button type="button" class="filter-chip ${extra}" data-filter="${esc(value)}"><span>${iconMap[value]||'•'}</span><b>${esc(value)}</b></button>`;
  box.innerHTML=`<div class="filter-row filter-primary"><span class="filter-label">Explorer</span><div class="filter-chips">${chip('Tous','active')}${primary.map(x=>chip(x)).join('')}</div></div>${secondary.length?`<div class="filter-row filter-secondary"><span class="filter-label">Univers</span><div class="filter-chips">${secondary.map(x=>chip(x)).join('')}</div></div>`:''}`;
  box.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{
    current=b.dataset.filter;
    box.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));
    renderProducts();
  }));
}

function renderProducts(){
  const grid=document.getElementById('productGrid');if(!grid)return;
  const query=productQuery.trim().toLocaleLowerCase('fr');
  const list=catalog.filter(p=>(current==='Tous'||p.type===current||p.cat===current)&&(!showFavorites||favorites.has(String(p.id)))&&(!query||[p.name,p.type,p.cat,p.short,p.ingredients].some(v=>String(v||'').toLocaleLowerCase('fr').includes(query))));
  grid.innerHTML=list.length?list.map(p=>{const final=discountedPrice(p),emp=currentUserProfile?.role==='employe',fav=favorites.has(String(p.id));return `<article class="product" data-id="${esc(p.id)}"><div class="product-img"><span>${p.emoji||'🍽️'}</span><small>${esc(p.badge||'')}</small><button class="favorite-toggle ${fav?'is-favorite':''}" type="button" data-favorite="${esc(p.id)}" aria-label="${fav?'Retirer des':'Ajouter aux'} favoris" aria-pressed="${fav}">${fav?'♥':'♡'}</button></div><div class="product-body"><span class="tag">${esc(p.type==='Plats'?p.cat:p.type)}</span><h3>${esc(p.name)}</h3><p>${esc(p.short||'')}</p><div class="product-row"><div><strong>${formatPrice(final)}</strong>${emp?`<del>${formatPrice(p.price)}</del><small class="discount-label">-20% employé</small>`:''}</div><button class="add" type="button" data-add="${esc(p.id)}">+</button></div></div></article>`}).join(''):'<div class="empty-order menu-empty"><b>Aucun plat trouvé</b><small>Essaie un autre mot-clé ou enlève un filtre.</small></div>';
  grid.querySelectorAll('.product').forEach(card=>card.addEventListener('click',e=>{if(e.target.closest('[data-add],[data-favorite]'))return;showProduct(card.dataset.id)}));
  grid.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',()=>addToCart(b.dataset.add)));
  grid.querySelectorAll('[data-favorite]').forEach(b=>b.addEventListener('click',()=>toggleFavorite(b.dataset.favorite)));
  updateFavoriteCount();
}
function showProduct(id){const p=catalog.find(x=>String(x.id)===String(id));const m=document.getElementById('modal'),c=document.getElementById('modalContent');if(!p||!m||!c)return;const price=discountedPrice(p);c.innerHTML=`<span class="eyebrow">${esc(p.type)} • ${esc(p.cat)}</span><div class="detail-hero"><span>${p.emoji||'🍽️'}</span><div><small>${esc(p.badge||'')}</small><h2>${esc(p.name)}</h2><strong>${formatPrice(price)}</strong></div></div><p class="detail-desc">${esc(p.desc||'')}</p><div class="detail-box"><b>Composition</b><p>${esc(p.ingredients||'')}</p><b>Allergènes</b><p>${esc(p.allergens||'')}</p></div><button class="btn primary full" data-modal-add="${esc(p.id)}">Ajouter au panier</button>`;c.querySelector('[data-modal-add]').onclick=()=>{addToCart(id);closeProduct()};m.classList.add('show');}
function closeProduct(){document.getElementById('modal')?.classList.remove('show')}

async function loadCatalog(){
  try{
    const cats=await getCategories();
    if(!cats.length && currentUserProfile?.role==='admin'){await seedCategories(defaultCategories);categories=await getCategories()}
    else categories=cats.length?cats:defaultCategories.map((name,i)=>({id:String(i+1),name}));
    const items=await getProducts();
    if(!items.length){if(currentUserProfile?.role==='admin'){await seedProducts(products);return loadCatalog()}catalog=[...products]}else catalog=items;
  }catch(e){console.warn('Catalogue Firestore indisponible',e);catalog=[...products];categories=defaultCategories.map((name,i)=>({id:String(i+1),name}))}
  renderFilters();renderProducts()
}
async function loadUserProfile(user){
  if(!user){
    currentUserProfile = null;
    updateAccountUI();
    return null;
  }
  try{
    currentUserProfile = await getUserProfile(user);
    updateAccountUI();
    renderProducts();
    return currentUserProfile;
  }catch(error){
    console.error("Erreur chargement profil :", error);
    currentUserProfile = null;
    updateAccountUI();
    renderProducts();
    throw error;
  }
}

function updateAccountUI(){const b=document.getElementById('accountBtn'),l=document.getElementById('accountLabel'),r=document.getElementById('accountRole');if(!b)return;if(currentUserProfile){l.textContent=currentUserProfile.firstName?`Bonjour ${currentUserProfile.firstName}`:'Mon compte';r.textContent=roleLabel[currentUserProfile.role]||'Client';b.classList.add('connected');document.getElementById('adminNav')?.classList.toggle('show',currentUserProfile.role==='admin')}else{l.textContent='Connexion';r.textContent='';b.classList.remove('connected');document.getElementById('adminNav')?.classList.remove('show')}}

function openAuth(mode='login'){const m=document.getElementById('authModal');if(!m)return;m.classList.add('show');switchAuth(mode)}
function switchAuth(mode){document.getElementById('loginForm')?.classList.toggle('hidden',mode!=='login');document.getElementById('registerForm')?.classList.toggle('hidden',mode!=='register');document.getElementById('authTitle').textContent=mode==='login'?'Connexion':'Créer mon compte';document.getElementById('authError').textContent=''}
function closeAuth(){document.getElementById('authModal')?.classList.remove('show')}
function friendlyError(e){const map={'auth/invalid-credential':'Email ou mot de passe incorrect.','auth/email-already-in-use':'Cette adresse e-mail est déjà utilisée.','auth/weak-password':'Le mot de passe doit contenir au moins 6 caractères.','auth/invalid-email':'Adresse e-mail invalide.','auth/network-request-failed':'Connexion réseau impossible.','auth/too-many-requests':'Trop de tentatives. Réessaie plus tard.','auth/operation-not-allowed':'La connexion par e-mail / mot de passe n’est pas activée dans Firebase.','auth/unauthorized-domain':'Le domaine du site n’est pas autorisé dans Firebase Authentication.'};return map[e?.code]||e?.message||'Une erreur est survenue.'}
async function login(e){e.preventDefault();const f=new FormData(e.currentTarget),err=document.getElementById('authError');try{await firebaseLogin(f.get('email'),f.get('password'));closeAuth()}catch(ex){err.textContent=friendlyError(ex)}}
async function register(e){e.preventDefault();const f=new FormData(e.currentTarget),err=document.getElementById('authError');try{await firebaseRegister({firstName:f.get('firstName'),lastName:f.get('lastName'),email:f.get('email'),password:f.get('password')});closeAuth()}catch(ex){console.error(ex,authDiagnostics());err.textContent=friendlyError(ex)}}
async function logout(){await firebaseLogout();closeAccount();closeDashboard();closeCart();}

async function openAccount(){
  if(!currentUserProfile){openAuth('login');return}
  const m=document.getElementById('accountModal');if(!m)return;
  document.getElementById('accountName').textContent=`${currentUserProfile.firstName||''} ${currentUserProfile.lastName||''}`.trim()||'Mon compte';
  document.getElementById('accountEmail').textContent=currentUserProfile.email||auth.currentUser?.email||'';
  document.getElementById('profileFirstName').textContent=currentUserProfile.firstName||'—';
  document.getElementById('profileLastName').textContent=currentUserProfile.lastName||'—';
  document.getElementById('profileEmail').textContent=currentUserProfile.email||auth.currentUser?.email||'—';
  document.getElementById('accountRoleText').textContent=roleLabel[currentUserProfile.role]||'Client';
  document.getElementById('employeeDiscount').classList.toggle('hidden',currentUserProfile.role!=='employe');
  document.getElementById('openAdminBtn').classList.toggle('hidden',currentUserProfile.role==='client');
  const ordersBox=document.getElementById('ordersList');ordersBox.innerHTML='<div class="empty-order">Chargement…</div>';
  try{const orders=await getUserOrders(auth.currentUser);ordersBox.innerHTML=orders.length?orders.map(orderCard).join(''):'<div class="empty-order"><span>🍽️</span><b>Aucune commande pour le moment</b><small>Ajoute tes plats au panier puis passe ta première commande.</small></div>'}catch(e){ordersBox.innerHTML='<div class="empty-order">Impossible de charger les commandes.</div>'}
  m.classList.add('show')
}
function closeAccount(){document.getElementById('accountModal')?.classList.remove('show')}
function orderCard(o,manager=false){const date=o.createdAt?.toDate?o.createdAt.toDate().toLocaleString('fr-FR',{dateStyle:'medium',timeStyle:'short'}):'Date indisponible';const items=(o.items||[]).map(i=>`${i.quantity}× ${esc(i.name)}`).join(' • ');return `<div class="order-card ${manager?'manager-order':''}"><div><b>${esc(o.orderNumber||('Commande #'+o.id.slice(0,6).toUpperCase()))}</b><small>${esc(date)}${manager&&o.customerName?' • '+esc(o.customerName):''}</small></div><span>${esc(statusLabel[o.status]||o.status||'Reçue')}</span><p>${items}</p><strong>${formatPrice(o.total)}</strong>${manager?`<div class="order-actions">${managerStatusButtons(o)}</div>`:''}</div>`}
function managerStatusButtons(o){const idx=statusFlow.indexOf(o.status);const next=statusFlow[idx+1];return next?`<button class="mini-action" data-status="${next}" data-order="${o.id}">${next==='en_preparation'?'👨‍🍳 Préparer':next==='prete'?'✅ Marquer prête':next==='en_livraison'?'🛵 En livraison':'✓ Terminée'}</button>`:`<small class="status-done">Commande terminée</small>`}

async function openCheckout(){
  if(!cart.length){alert('Ton panier est vide.');return}
  if(!currentUserProfile){openAuth('login');return}
  if(orderMode==='livraison'&&!document.getElementById('deliveryAddress').value.trim()){alert('Ajoute une adresse de livraison.');return}
  document.getElementById('checkoutFirstName').value=currentUserProfile.firstName||'';
  document.getElementById('checkoutLastName').value=currentUserProfile.lastName||'';
  document.getElementById('checkoutSummary').innerHTML='<div class="checkout-summary">'+cart.map(i=>'<div><span>'+i.quantity+'× '+esc(i.name)+'</span><b>'+formatPrice(i.quantity*i.price)+'</b></div>').join('')+'<hr><div><strong>Total</strong><strong>'+formatPrice(cartTotal())+'</strong></div></div>';
  document.getElementById('checkoutError').textContent='';
  const pending=loadPendingCryptexPayment();
  selectedPayment='cryptex';
  document.querySelectorAll('[name="paymentChoice"]').forEach(r=>{r.checked=r.value===selectedPayment;r.disabled=Boolean(pending)});
  document.getElementById('cryptexPaymentFields')?.classList.remove('hidden');
  document.getElementById('cryptexWaiting')?.classList.add('hidden');
  document.getElementById('cryptexPayerEmail').value=pending?.payerEmail||'';
  if(pending){activePaymentRequestId=pending.requestId;showCryptexWaiting(pending.requestId);startCryptexPolling();}
  document.getElementById('orderPaymentInfo').textContent=orderMode==='livraison'?'Paiement sécurisé par Cryptex Bank ou règlement à la livraison.':'Paiement sécurisé par Cryptex Bank ou règlement au retrait.';
  const button=document.getElementById('confirmOrderBtn');
  if(button)button.textContent='Payer et confirmer — '+formatPrice(cartTotal());
  closeCart();
  document.getElementById('checkoutModal').classList.add('show');
}

function loadPendingCryptexPayment(){try{const p=JSON.parse(localStorage.getItem('rafafood_pending_cryptex_payment')||'null');return p?.requestId&&p?.orderDraft?.items?.length?p:null}catch{return null}}
function showCryptexWaiting(id){const box=document.getElementById('cryptexWaiting');if(!box)return;box.classList.remove('hidden');document.getElementById('cryptexRequestRef').textContent=id;document.getElementById('confirmOrderBtn').classList.add('hidden');document.querySelectorAll('[name="paymentChoice"]').forEach(r=>r.disabled=true);}
function stopCryptexPolling(){if(paymentPollTimer){clearInterval(paymentPollTimer);paymentPollTimer=null}}
function startCryptexPolling(){stopCryptexPolling();checkCryptexPaymentStatus();paymentPollTimer=setInterval(checkCryptexPaymentStatus,3000)}
async function checkCryptexPaymentStatus(){
  const pending=loadPendingCryptexPayment();if(!pending?.requestId)return;
  try{const request=await getCryptexPaymentRequest(pending.requestId);if(!request)return;
    if(request.status==='approved'){
      stopCryptexPolling();
      const draft=pending.orderDraft;
      await createPaidCryptexOrder(request.id,{...draft,payment:{status:'paid',method:'cryptex_bank',provider:'Cryptex Bank',label:'Payée via Cryptex Bank',requestId:request.id,transactionId:request.transactionId||request.id,payerEmail:pending.payerEmail,paidAtLocal:request.approvedAtLocal||new Date().toISOString()},status:'reçue'});
      localStorage.removeItem('rafafood_pending_cryptex_payment');activePaymentRequestId=null;cart=[];saveCart();
      document.getElementById('checkoutModal').classList.remove('show');alert('Paiement accepté et commande confirmée. Référence : '+draft.orderNumber+'.');openAccount();return;
    }
    if(['declined','insufficient_funds','expired','cancelled'].includes(request.status)){
      stopCryptexPolling();document.getElementById('checkoutError').textContent=request.declineReason||({declined:'Paiement refusé dans Cryptex Bank.',insufficient_funds:'Solde Cryptex insuffisant.',expired:'La demande de paiement a expiré.',cancelled:'La demande a été annulée.'}[request.status]);
      localStorage.removeItem('rafafood_pending_cryptex_payment');activePaymentRequestId=null;document.getElementById('cryptexWaiting').classList.add('hidden');document.getElementById('confirmOrderBtn').classList.remove('hidden');document.querySelectorAll('[name="paymentChoice"]').forEach(r=>r.disabled=false);
    }
  }catch(error){console.warn('Vérification Cryptex momentanément indisponible.',error)}
}

function makeOrderNumber(){
  return 'RF-'+new Date().toISOString().slice(0,10).replaceAll('-','')+'-'+Math.random().toString(36).slice(2,7).toUpperCase();
}

async function confirmOrder(){
  const err=document.getElementById('checkoutError');
  err.textContent='';
  if(!currentUserProfile||!auth.currentUser)return;
  if(activePaymentRequestId){startCryptexPolling();return}
  if(!cart.length){err.textContent='Ton panier est vide.';return}
  const address=orderMode==='livraison'?document.getElementById('deliveryAddress').value.trim():'';
  if(orderMode==='livraison'&&!address){err.textContent='Adresse de livraison obligatoire.';return}
  const button=document.getElementById('confirmOrderBtn');
  button.disabled=true;
  try{
    const orderNumber=makeOrderNumber();
    const draft={
      userId:auth.currentUser.uid,
      customerName:(document.getElementById('checkoutFirstName').value.trim()+' '+document.getElementById('checkoutLastName').value.trim()).trim(),
      restaurantId:currentRestaurant(),
      orderNumber,
      items:cart.map(i=>({id:i.id,name:i.name,quantity:i.quantity,price:i.price})),
      total:cartTotal(),
      orderMode,
      address,
      note:document.getElementById('checkoutNote').value.trim()
    };
    if(selectedPayment==='cryptex'){
      const payerEmail=document.getElementById('cryptexPayerEmail').value.trim().toLowerCase();
      if(!payerEmail){document.getElementById('checkoutError').textContent='Saisis l’adresse e-mail de ton compte Cryptex Bank.';return}
      const requestId=await createCryptexPaymentRequest({payerEmail,amount:draft.total,orderNumber:draft.orderNumber,restaurantId:draft.restaurantId,orderDraft:draft});
      const pending={requestId,payerEmail,orderDraft:draft};localStorage.setItem('rafafood_pending_cryptex_payment',JSON.stringify(pending));activePaymentRequestId=requestId;
      showCryptexWaiting(requestId);startCryptexPolling();return;
    }
    const paymentMethod=orderMode==='livraison'?'pay_on_delivery':'pay_on_pickup';
    const paymentLabel=orderMode==='livraison'?'À régler à la livraison':'À régler au retrait';
    const orderId=await createOrder({
      ...draft,
      payment:{status:'pending',method:paymentMethod,provider:'RAFAFOOD',label:paymentLabel},
      status:'reçue'
    });
    cart=[];
    saveCart();
    document.getElementById('checkoutModal').classList.remove('show');
    alert('Commande enregistrée. '+paymentLabel+'. Référence : '+orderNumber+'.');
    openAccount();
    return orderId;
  }catch(error){
    console.error('Impossible d’enregistrer la commande RafaFood.',error);
    err.textContent=error?.message||'Impossible d’enregistrer la commande.';
  }finally{
    button.disabled=false;
  }
}function openDashboard(){if(!currentUserProfile)return openAuth('login');dashboardTab=currentUserProfile.role==='employe'?'orders':'overview';renderDashboard();document.getElementById('dashboardModal').classList.add('show')}
function closeDashboard(){document.getElementById('dashboardModal')?.classList.remove('show')}
function dashboardTabsForRole(){const r=currentUserProfile.role;if(r==='employe')return [['orders','Commandes']];if(r==='directeur')return [['overview','Vue d’ensemble'],['orders','Commandes'],['reports','Rapports'],['staff','Équipe']];if(r==='admin')return [['overview','Vue globale'],['orders','Toutes les commandes'],['reports','Rapports'],['staff','Utilisateurs'],['products','Produits']];return []}async function renderDashboard(){const r=currentUserProfile.role;document.getElementById('dashboardTitle').textContent=r==='admin'?'Administration RAFAFOOD':r==='directeur'?'Espace directeur':'Espace employé';document.getElementById('dashboardSubtitle').textContent=r==='admin'?'Pilotage du réseau, des équipes et du catalogue.':r==='directeur'?`Restaurant : ${currentUserProfile.restaurantId||'Non affecté'}`:'Prépare et suis les commandes de ton restaurant.';document.getElementById('dashboardRole').textContent=roleLabel[r];document.getElementById('dashboardLogout').onclick=logout;document.getElementById('dashboardTabs').innerHTML=dashboardTabsForRole().map(([id,label])=>`<button class="dash-tab ${dashboardTab===id?'active':''}" data-tab="${id}">${label}</button>`).join('');document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{dashboardTab=b.dataset.tab;renderDashboard()});const c=document.getElementById('dashboardContent');c.innerHTML='<div class="empty-order">Chargement du tableau de bord…</div>';try{if(dashboardTab==='overview')await renderOverview(c);else if(dashboardTab==='orders')await renderManagerOrders(c);else if(dashboardTab==='reports')await renderReports(c);else if(dashboardTab==='staff')await renderStaffDashboard(c);else if(dashboardTab==='products')await renderProductsDashboard(c)}catch(e){console.error(e);c.innerHTML='<div class="empty-order">Erreur de chargement. Vérifie les règles Firestore.</div>'}}async function renderOverview(c){const orders=await getAllOrders();const revenue=orders.filter(o=>o.status!=='annulée').reduce((n,o)=>n+Number(o.total||0),0);const users=await getDocs(collection(db,'users'));const active=orders.filter(o=>o.status!=='terminee'&&o.status!=='annulée').length;c.innerHTML=`<div class="stats-grid"><div><small>Commandes</small><b>${orders.length}</b></div><div><small>En cours</small><b>${active}</b></div><div><small>Valeur des commandes</small><b>${formatPrice(revenue)}</b></div><div><small>Utilisateurs</small><b>${users.size}</b></div></div><div class="dashboard-panel"><h3>Dernières commandes</h3>${orders.slice(0,5).map(o=>orderCard(o,true)).join('')||'<p class="muted">Aucune commande.</p>'}</div>`;bindOrderActions()}
async function renderManagerOrders(c){let orders=await getAllOrders();if(currentUserProfile.role==='employe'||currentUserProfile.role==='directeur')orders=orders.filter(o=>o.restaurantId===currentRestaurant());c.innerHTML=`<div class="dashboard-panel"><div class="panel-head"><div><h3>${currentUserProfile.role==='admin'?'Toutes les commandes':'Commandes du restaurant'}</h3><p class="muted">Recherche par référence, client ou plat, puis filtre par état.</p></div><button class="btn ghost" id="refreshDash">↻ Actualiser</button></div><div class="order-tools"><input id="orderSearch" type="search" placeholder="Référence, client, plat…" aria-label="Rechercher des commandes"><select id="orderStatusFilter" aria-label="Filtrer par statut"><option value="all">Tous les statuts</option>${Object.entries(statusLabel).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select></div><div id="managerOrderList">${orders.map(o=>orderCard(o,true)).join('')||'<div class="empty-order">Aucune commande.</div>'}</div></div>`;const apply=()=>{const q=document.getElementById('orderSearch').value.trim().toLocaleLowerCase('fr'),status=document.getElementById('orderStatusFilter').value;const filtered=orders.filter(o=>(status==='all'||o.status===status)&&(!q||[o.orderNumber,o.customerName,...(o.items||[]).map(i=>i.name)].some(x=>String(x||'').toLocaleLowerCase('fr').includes(q))));document.getElementById('managerOrderList').innerHTML=filtered.map(o=>orderCard(o,true)).join('')||'<div class="empty-order">Aucun résultat pour ces filtres.</div>';bindOrderActions()};document.getElementById('orderSearch').addEventListener('input',apply);document.getElementById('orderStatusFilter').addEventListener('change',apply);document.getElementById('refreshDash')?.addEventListener('click',renderDashboard);bindOrderActions()}
async function renderReports(c){let orders=await getAllOrders();if(currentUserProfile.role!=='admin')orders=orders.filter(o=>o.restaurantId===currentRestaurant());const now=new Date(),todayStart=new Date(now.getFullYear(),now.getMonth(),now.getDate()),weekStart=new Date(todayStart);weekStart.setDate(weekStart.getDate()-6);const dateOf=o=>o.createdAt?.toDate?o.createdAt.toDate():o.createdAt instanceof Date?o.createdAt:null;const recent=orders.filter(o=>{const d=dateOf(o);return d&&d>=weekStart&&d<=now});const active=orders.filter(o=>!['terminee','annulée'].includes(o.status)).length,done=orders.filter(o=>o.status==='terminee'),today=orders.filter(o=>{const d=dateOf(o);return d&&d>=todayStart&&d<=now}).length;const max=Math.max(1,...Array.from({length:7},(_,i)=>{const d=new Date(weekStart);d.setDate(d.getDate()+i);return recent.filter(o=>{const od=dateOf(o);return od&&od.toDateString()===d.toDateString()}).length}));const days=Array.from({length:7},(_,i)=>{const d=new Date(weekStart);d.setDate(d.getDate()+i);const count=recent.filter(o=>{const od=dateOf(o);return od&&od.toDateString()===d.toDateString()}).length;return `<div class="report-day"><div class="report-bar-wrap"><span class="report-bar" style="height:${Math.max(6,count/max*100)}%" title="${count} commande(s)"></span></div><small>${d.toLocaleDateString('fr-FR',{weekday:'short'})}</small><b>${count}</b></div>`}).join('');c.innerHTML=`<div class="report-heading"><span class="eyebrow">ACTIVITÉ • 7 JOURS</span><h3>Les chiffres clés</h3><p class="muted">Les montants restent à encaisser au comptoir ou à la livraison. Aucun chiffre d’affaires encaissé n’est estimé ici.</p></div><div class="stats-grid report-stats"><div><small>Commandes aujourd’hui</small><b>${today}</b></div><div><small>Sur les 7 derniers jours</small><b>${recent.length}</b></div><div><small>À traiter</small><b>${active}</b></div><div><small>Terminées</small><b>${done.length}</b></div></div><div class="dashboard-panel"><div class="panel-head"><div><h3>Volume quotidien</h3><p class="muted">Nombre de commandes enregistrées</p></div></div><div class="report-chart">${days}</div></div><div class="dashboard-panel"><h3>États des commandes</h3><div class="status-summary">${Object.entries(statusLabel).map(([key,label])=>{const n=orders.filter(o=>o.status===key).length;return `<div><span>${label}</span><b>${n}</b></div>`}).join('')}</div></div>`}function bindOrderActions(){document.querySelectorAll('[data-status]').forEach(b=>b.onclick=async()=>{b.disabled=true;try{await updateDoc(doc(db,'orders',b.dataset.order),{status:b.dataset.status,updatedAt:serverTimestamp()});renderDashboard()}catch(e){alert('Action refusée par Firestore. Vérifie le restaurant affecté au compte.');b.disabled=false}})}
async function renderStaffDashboard(c){const snap=await getDocs(collection(db,'users'));let users=snap.docs.map(d=>({id:d.id,...d.data()}));if(currentUserProfile.role==='directeur')users=users.filter(u=>u.restaurantId===currentRestaurant());c.innerHTML=`<div class="dashboard-panel"><div class="panel-head"><div><h3>${currentUserProfile.role==='admin'?'Tous les utilisateurs':'Équipe du restaurant'}</h3><p class="muted">Les rôles sensibles sont modifiables uniquement par un administrateur.</p></div></div>${users.map(u=>staffRow(u)).join('')||'<div class="empty-order">Aucun utilisateur affecté.</div>'}</div>`;bindStaffActions()}
function staffRow(u){const can=currentUserProfile.role==='admin'&&u.id!==auth.currentUser.uid;return `<div class="staff-row"><div><b>${esc(`${u.firstName||''} ${u.lastName||''}`.trim()||'Sans nom')}</b><small>${esc(u.email||'')}</small></div><span>${esc(roleLabel[u.role]||u.role||'Client')}<br><small>${esc(u.restaurantId||'Sans restaurant')}</small></span>${can?`<select data-user-role="${u.id}"><option value="client" ${u.role==='client'?'selected':''}>Client</option><option value="employe" ${u.role==='employe'?'selected':''}>Employé</option><option value="directeur" ${u.role==='directeur'?'selected':''}>Directeur</option><option value="admin" ${u.role==='admin'?'selected':''}>Admin</option></select><input class="staff-restaurant" data-user-restaurant="${u.id}" value="${esc(u.restaurantId||'')}" placeholder="restaurantId">`:''}</div>`}
function bindStaffActions(){document.querySelectorAll('[data-user-role]').forEach(s=>s.onchange=async()=>{await updateDoc(doc(db,'users',s.dataset.userRole),{role:s.value,updatedAt:serverTimestamp()});renderDashboard()});document.querySelectorAll('[data-user-restaurant]').forEach(i=>i.onchange=async()=>{await updateDoc(doc(db,'users',i.dataset.userRestaurant),{restaurantId:i.value.trim(),updatedAt:serverTimestamp()});renderDashboard()})}
async function renderProductsDashboard(c){c.innerHTML=`<div class="dashboard-panel"><div class="panel-head"><div><h3>Catalogue</h3><p class="muted">Ajoute, modifie ou retire les produits.</p></div><button class="btn primary" id="addProductBtnDash">+ Ajouter</button></div><div id="dashProductEditor"></div><div id="dashProducts">${catalog.map(p=>`<div class="admin-product"><span>${p.emoji||'🍽️'}</span><div><b>${esc(p.name)}</b><small>${formatPrice(p.price)} • ${esc(p.type)}</small></div><div class="admin-product-actions"><button data-edit-product="${p.id}">Modifier</button><button data-delete-product="${p.id}">Supprimer</button></div></div>`).join('')}</div><div class="dashboard-panel category-panel"><div class="panel-head"><div><h3>Types / catégories</h3><p class="muted">Crée les types disponibles pour classer les produits.</p></div></div><div id="categoryManager">${categories.map(c=>`<div class="staff-row"><div><b>${esc(c.name)}</b><small>Type disponible dans la carte</small></div><button class="mini-action" data-delete-category="${esc(c.id)}">Supprimer</button></div>`).join('')}</div><form id="categoryForm" class="admin-form inline-form"><label>Nouveau type<input name="name" required placeholder="Ex. Accompagnements, Spéciale…"></label><button class="btn primary" type="submit">+ Ajouter le type</button></form></div></div>`;document.getElementById('addProductBtnDash').onclick=()=>{document.getElementById('dashProductEditor').innerHTML=adminProductForm();bindProductForm()};document.querySelectorAll('[data-edit-product]').forEach(b=>b.onclick=()=>{document.getElementById('dashProductEditor').innerHTML=adminProductForm(catalog.find(p=>String(p.id)===String(b.dataset.editProduct)));bindProductForm()});document.querySelectorAll('[data-delete-product]').forEach(b=>b.onclick=async()=>{if(!confirm('Supprimer ce produit ?'))return;await deleteDoc(doc(db,'products',String(b.dataset.deleteProduct)));await loadCatalog();renderDashboard()});document.getElementById('categoryForm')?.addEventListener('submit',async e=>{e.preventDefault();const name=new FormData(e.currentTarget).get('name').trim();if(!name)return;if(productTypeNames().some(x=>x.toLowerCase()===name.toLowerCase())){alert('Ce type existe déjà.');return}await addDoc(collection(db,'categories'),{name,active:true,createdAt:serverTimestamp()});await loadCatalog();renderDashboard()});document.querySelectorAll('[data-delete-category]').forEach(b=>b.onclick=async()=>{const c=categories.find(x=>String(x.id)===String(b.dataset.deleteCategory));if(!c)return;if(c.name==='Plats'){alert('Le type Plats est protégé.');return}if(catalog.some(p=>p.type===c.name)){alert('Ce type est encore utilisé par un produit.');return}if(!confirm(`Supprimer le type « ${c.name} » ?`))return;await deleteDoc(doc(db,'categories',String(c.id)));await loadCatalog();renderDashboard()})}
function adminProductForm(p=null){const x=p||{};return `<form id="dashProductForm" class="admin-form"><input type="hidden" name="id" value="${esc(x.id||'')}"><div class="form-grid"><label>Nom<input required name="name" value="${esc(x.name||'')}"></label><label>Prix (€)<input required type="number" step="0.01" min="0" name="price" value="${x.price??''}"></label><label>Type<select name="type">${productTypeNames().map(n=>`<option ${x.type===n?'selected':''}>${esc(n)}</option>`).join('')}</select></label><label>Catégorie<input name="cat" value="${esc(x.cat||'')}"></label><label>Emoji<input name="emoji" value="${esc(x.emoji||'🍽️')}"></label><label>Badge<input name="badge" value="${esc(x.badge||'')}"></label></div><label>Description<textarea name="short">${esc(x.short||'')}</textarea><label>Composition<textarea name="ingredients">${esc(x.ingredients||'')}</textarea><label>Allergènes<textarea name="allergens">${esc(x.allergens||'')}</textarea><label class="checkline"><input type="checkbox" name="available" ${x.available!==false?'checked':''}> Disponible</label><div class="admin-actions"><button class="btn primary" type="submit">${p?'Enregistrer':'Ajouter'}</button><button class="btn ghost" type="button" id="cancelProduct">Annuler</button></div></form>`}
function bindProductForm(){const f=document.getElementById('dashProductForm');if(!f)return;const existing=catalog.find(x=>String(x.id)===String(f.querySelector('[name=id]').value)); if(existing) f.querySelector('[name=type]').value=existing.type;document.getElementById('cancelProduct').onclick=()=>document.getElementById('dashProductEditor').innerHTML='';f.onsubmit=async e=>{e.preventDefault();const fd=new FormData(f),id=fd.get('id');const data={name:fd.get('name').trim(),price:Number(fd.get('price')),type:fd.get('type'),cat:fd.get('cat').trim(),emoji:fd.get('emoji').trim(),badge:fd.get('badge').trim(),short:fd.get('short').trim(),desc:fd.get('short').trim(),ingredients:fd.get('ingredients').trim(),allergens:fd.get('allergens').trim(),available:fd.get('available')==='on',updatedAt:serverTimestamp()};if(id)await updateDoc(doc(db,'products',String(id)),data);else await addDoc(collection(db,'products'),{...data,createdAt:serverTimestamp()});await loadCatalog();renderDashboard()}}

function setupUI(){
  document.getElementById('accountBtn')?.addEventListener('click',()=>currentUserProfile&&currentUserProfile.role!=='client'?openDashboard():openAccount());
  document.getElementById('authClose')?.addEventListener('click',closeAuth);document.getElementById('accountClose')?.addEventListener('click',closeAccount);document.getElementById('dashboardClose')?.addEventListener('click',closeDashboard);document.getElementById('closeModal')?.addEventListener('click',closeProduct);document.getElementById('checkoutClose')?.addEventListener('click',()=>document.getElementById('checkoutModal').classList.remove('show'));
  document.getElementById('switchRegister')?.addEventListener('click',()=>switchAuth('register'));document.getElementById('switchLogin')?.addEventListener('click',()=>switchAuth('login'));document.getElementById('loginForm')?.addEventListener('submit',login);document.getElementById('registerForm')?.addEventListener('submit',register);document.getElementById('logoutBtn')?.addEventListener('click',logout);document.getElementById('openAdminBtn')?.addEventListener('click',()=>{closeAccount();openDashboard()});
  document.getElementById('adminNav')?.addEventListener('click',e=>{e.preventDefault();openDashboard()});document.getElementById('cartBtn')?.addEventListener('click',openCart);document.getElementById('cartClose')?.addEventListener('click',closeCart);document.getElementById('cartOverlay')?.addEventListener('click',closeCart);document.getElementById('checkoutBtn')?.addEventListener('click',openCheckout);document.getElementById('confirmOrderBtn')?.addEventListener('click',confirmOrder);
  document.querySelectorAll('[name="paymentChoice"]').forEach(r=>r.addEventListener('change',()=>{selectedPayment=r.value;document.getElementById('cryptexPaymentFields')?.classList.toggle('hidden',selectedPayment!=='cryptex');const button=document.getElementById('confirmOrderBtn');if(button)button.textContent=selectedPayment==='cryptex'?'Payer et confirmer':'Confirmer la commande';}));
  document.getElementById('checkCryptexNowBtn')?.addEventListener('click',checkCryptexPaymentStatus);
  document.querySelectorAll('.mode-btn').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));
  document.querySelectorAll('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('show')}));
  document.querySelectorAll('#filters button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('#filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');current=b.dataset.filter||'Tous';renderProducts()}));
  document.querySelectorAll('.brand-card').forEach(card=>card.addEventListener('click',()=>{current=card.dataset.category||'Tous';document.querySelectorAll('#filters button').forEach(x=>x.classList.toggle('active',x.dataset.filter===current));renderProducts();document.getElementById('menu')?.scrollIntoView({behavior:'smooth'})}));
  document.getElementById('productSearch')?.addEventListener('input',e=>{productQuery=e.target.value;renderProducts()});
  document.getElementById('favoritesFilter')?.addEventListener('click',e=>{showFavorites=!showFavorites;e.currentTarget.classList.toggle('active',showFavorites);e.currentTarget.setAttribute('aria-pressed',String(showFavorites));renderProducts()});
  updateCartUI();updateFavoriteCount();setMode(orderMode);
}


document.addEventListener('DOMContentLoaded',async()=>{
  setupUI();
  renderProducts();
  onAuthStateChanged(auth,async user=>{
    try{
      await loadUserProfile(user);
      if(user&&loadPendingCryptexPayment())startCryptexPolling();
    }catch(error){
      console.error('Impossible de lire ou créer le profil RAFAFOOD dans Firestore.',{
        ...authDiagnostics(),uid:user?.uid,code:error?.code,message:error?.message
      });
      currentUserProfile=null;
      updateAccountUI();
      renderProducts();
    }
  });
  await loadCatalog();
});
