const products = [
  {id:1,name:'Le Rafa Signature',type:'Plats',cat:'Burgers',price:12.90,emoji:'🍔',short:'Le burger emblématique de RAFAFOOD.',desc:'Pain brioché toasté, steak de bœuf haché, cheddar affiné, oignons crispy, salade fraîche et sauce Rafa maison.',ingredients:'Pain brioché • steak de bœuf • cheddar • salade • oignons crispy • sauce Rafa',allergens:'Gluten, lait, œufs',badge:'SIGNATURE'},
  {id:2,name:'Double Rafa',type:'Plats',cat:'Burgers',price:15.90,emoji:'🍔',short:'Deux steaks, double gourmandise.',desc:'Deux steaks de bœuf grillés, double cheddar, oignons confits, cornichons et sauce Rafa maison.',ingredients:'Pain brioché • 2 steaks de bœuf • double cheddar • oignons • cornichons • sauce Rafa',allergens:'Gluten, lait, œufs',badge:'GOURMAND'},
  {id:3,name:'Rafa Pizza',type:'Plats',cat:'Pizzas',price:13.90,emoji:'🍕',short:'La pizza généreuse de la maison.',desc:'Base tomate, mozzarella fondante, jambon, champignons frais, origan et basilic.',ingredients:'Tomate • mozzarella • jambon • champignons • origan • basilic',allergens:'Gluten, lait',badge:'MAISON'},
  {id:4,name:'Chicken Bowl',type:'Plats',cat:'Bowls',price:13.50,emoji:'🥗',short:'Frais, coloré et généreux.',desc:'Poulet grillé mariné, riz parfumé, avocat, concombre, tomates cerises, salade croquante et sauce Rafa.',ingredients:'Poulet • riz • avocat • concombre • tomates • salade • sauce Rafa',allergens:'Selon sauce',badge:'FRAIS'},
  {id:5,name:'Rafa Steak',type:'Plats',cat:'Grill',price:19.90,emoji:'🥩',short:'Une pièce de bœuf grillée à la minute.',desc:'Pièce de bœuf grillée, frites, salade fraîche et sauce au poivre.',ingredients:'Bœuf • frites • salade • sauce au poivre',allergens:'Lait possible',badge:'GRILL'},
  {id:6,name:'Pasta Carbonara',type:'Plats',cat:'Pâtes',price:12.90,emoji:'🍝',short:'Crémeuse, généreuse et réconfortante.',desc:'Pâtes, poitrine fumée, crème, parmesan et poivre noir, préparées à la commande.',ingredients:'Pâtes • poitrine fumée • crème • parmesan • poivre noir',allergens:'Gluten, lait, œufs',badge:'BEST-SELLER'},
  {id:7,name:'Menu Rafa Burger',type:'Menus',cat:'Menus',price:17.90,emoji:'🍔',short:'Le Signature + accompagnement + boisson.',desc:'Le Rafa Signature accompagné de frites classiques ou frites de patate douce et d’une boisson 33 cl au choix.',ingredients:'Le Rafa Signature • frites classiques ou frites de patate douce • boisson 33 cl',allergens:'Gluten, lait, œufs',badge:'MENU'},
  {id:8,name:'Menu Rafa Pizza',type:'Menus',cat:'Menus',price:19.90,emoji:'🍕',short:'Pizza + accompagnement + boisson.',desc:'Une Rafa Pizza, une portion de frites classiques ou frites de patate douce et une boisson 33 cl au choix.',ingredients:'Rafa Pizza • frites classiques ou frites de patate douce • boisson 33 cl',allergens:'Gluten, lait',badge:'MENU'},
  {id:9,name:'Menu Rafa Duo',type:'Menus',cat:'Menus',price:29.90,emoji:'👑',short:'Le format généreux à partager.',desc:'Deux plats au choix parmi la sélection RAFAFOOD, deux accompagnements et deux boissons 33 cl.',ingredients:'2 plats • 2 accompagnements • 2 boissons 33 cl',allergens:'Voir les fiches des plats',badge:'À PARTAGER'},
  {id:10,name:'Coca-Cola',type:'Boissons',cat:'Boissons',price:2.50,emoji:'🥤',short:'Canette 33 cl.',desc:'Coca-Cola classique servi bien frais.',ingredients:'Boisson gazeuse au cola',allergens:'Voir étiquette',badge:'33 CL'},
  {id:11,name:'Ice Tea Pêche',type:'Boissons',cat:'Boissons',price:2.50,emoji:'🧋',short:'Canette 33 cl.',desc:'Thé glacé saveur pêche, servi bien frais.',ingredients:'Thé glacé • arôme pêche',allergens:'Voir étiquette',badge:'33 CL'},
  {id:12,name:'Eau minérale',type:'Boissons',cat:'Boissons',price:2.00,emoji:'💧',short:'Bouteille 50 cl.',desc:'Eau minérale plate, format individuel.',ingredients:'Eau minérale naturelle',allergens:'Aucun',badge:'50 CL'},
  {id:13,name:'Tiramisu Rafa',type:'Desserts',cat:'Desserts',price:4.90,emoji:'🍰',short:'Le dessert signature maison.',desc:'Crème mascarpone onctueuse, café, biscuit et cacao pour terminer le repas sur une note gourmande.',ingredients:'Mascarpone • biscuit • café • cacao',allergens:'Gluten, lait, œufs',badge:'SIGNATURE'},
  {id:14,name:'Cookie Choco',type:'Desserts',cat:'Desserts',price:3.50,emoji:'🍪',short:'Moelleux au cœur chocolaté.',desc:'Grand cookie généreux aux pépites de chocolat, croustillant à l’extérieur et moelleux au centre.',ingredients:'Farine • beurre • sucre • chocolat',allergens:'Gluten, lait, œufs',badge:'GOURMAND'},
  {id:15,name:'Fondant Chocolat',type:'Desserts',cat:'Desserts',price:4.90,emoji:'🍫',short:'Chocolat intense, cœur fondant.',desc:'Fondant au chocolat au cœur coulant, pensé pour les amateurs de chocolat.',ingredients:'Chocolat • beurre • œufs • farine • sucre',allergens:'Gluten, lait, œufs',badge:'CHOCOLAT'},
  {id:16,name:'Rafa Vegan Burger',type:'Vegan',cat:'Vegan',price:13.90,emoji:'🌱',short:'Le burger végétal généreux de RAFAFOOD.',desc:'Pain vegan, steak végétal, cheddar vegan, salade, tomate, oignons crispy et sauce vegan maison.',ingredients:'Pain vegan • steak végétal • cheddar vegan • salade • tomate • oignons • sauce vegan',allergens:'Gluten, soja possible',badge:'VEGAN'},
  {id:17,name:'Rafa Vegan Pizza',type:'Vegan',cat:'Vegan',price:14.90,emoji:'🍕',short:'Une pizza généreuse 100 % végétale.',desc:'Base tomate, mozzarella végétale, champignons, poivrons, oignons rouges, tomates cerises et basilic.',ingredients:'Tomate • mozzarella végétale • champignons • poivrons • oignons rouges • tomates • basilic',allergens:'Gluten, soja possible',badge:'VEGAN'},
  {id:18,name:'Rafa Vegan Bowl',type:'Vegan',cat:'Vegan',price:13.50,emoji:'🥗',short:'Frais, coloré et entièrement végétal.',desc:'Riz parfumé, protéines végétales, avocat, concombre, tomates cerises, maïs, salade et sauce vegan.',ingredients:'Riz • protéines végétales • avocat • concombre • tomates • maïs • salade • sauce vegan',allergens:'Soja possible',badge:'VEGAN'},
  {id:19,name:'Rafa Vegan Grill',type:'Vegan',cat:'Vegan',price:14.90,emoji:'🥦',short:'Un plat chaud et gourmand aux légumes grillés.',desc:'Galette végétale grillée, frites, légumes grillés, salade fraîche et sauce vegan maison.',ingredients:'Galette végétale • frites • légumes grillés • salade • sauce vegan',allergens:'Soja possible',badge:'VEGAN'},
  {id:20,name:'Menu Étudiant',type:'Menu Étudiant',cat:'Étudiant',price:12.90,emoji:'🎓',short:'Le bon plan RAFAFOOD pour les étudiants.',desc:'Un plat au choix parmi la sélection étudiante, accompagné de frites classiques ou frites de patate douce et d’une boisson 33 cl. Offre réservée aux étudiants sur présentation d’un justificatif lors de l’achat.',ingredients:'1 plat • frites classiques ou frites de patate douce • 1 boisson 33 cl',allergens:'Voir les fiches des plats',badge:'ÉTUDIANT'},
  {id:21,name:'Menu Étudiant Vegan',type:'Menu Étudiant',cat:'Étudiant',price:13.90,emoji:'🌱',short:'La formule étudiante en version vegan.',desc:'Un plat vegan au choix parmi Rafa Vegan Burger, Rafa Vegan Pizza, Rafa Vegan Bowl ou Rafa Vegan Grill, avec accompagnement et boisson 33 cl. Sur présentation d’un justificatif étudiant lors de l’achat.',ingredients:'1 plat vegan • frites classiques ou frites de patate douce • 1 boisson 33 cl',allergens:'Voir les fiches des plats',badge:'ÉTUDIANT • VEGAN'}
];


import {
  auth, db,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile,
  collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, serverTimestamp, query, orderBy, firebaseConfig
} from './firebase-config.js';

window.__RAFAFOOD_FIREBASE_CONFIG__ = firebaseConfig;

let current = 'Tous';
let catalog = [...products];
let currentUserProfile = null;
const formatPrice = n => Number(n).toLocaleString('fr-FR', {style:'currency', currency:'EUR'});

const roleLabel = {client:'Client', employe:'Employé', directeur:'Directeur', admin:'Administrateur'};
const esc = value => String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const discountedPrice = p => currentUserProfile?.role === 'employe' ? Number(p.price) * 0.8 : Number(p.price);

function renderProducts(){
  const grid = document.getElementById('productGrid');
  if(!grid) return;
  const list = current === 'Tous' ? catalog : catalog.filter(p => p.type === current || p.cat === current);
  grid.innerHTML = list.map(p => {
    const finalPrice = discountedPrice(p);
    const employee = currentUserProfile?.role === 'employe';
    return `<article class="product" data-id="${esc(p.id)}">
      <div class="product-img"><span>${p.emoji || '🍽️'}</span><small>${esc(p.badge || '')}</small></div>
      <div class="product-body"><span class="tag">${esc(p.type === 'Plats' ? p.cat : p.type)}</span><h3>${esc(p.name)}</h3><p>${esc(p.short || p.description || '')}</p>
      <div class="product-row"><div><strong>${formatPrice(finalPrice)}</strong>${employee ? `<del>${formatPrice(p.price)}</del><small class="discount-label">-20% employé</small>` : ''}</div><button class="detail" type="button">Voir le détail</button></div></div></article>`;
  }).join('');
  grid.querySelectorAll('.product').forEach(card => card.addEventListener('click', () => showProduct(card.dataset.id)));
}

function showProduct(id){
  const p = catalog.find(x => String(x.id) === String(id));
  const modal = document.getElementById('modal');
  const content = document.getElementById('modalContent');
  if(!p || !modal || !content) return;
  const price = discountedPrice(p);
  content.innerHTML = `<span class="eyebrow">${esc(p.type)} • ${esc(p.cat)}</span><div class="detail-hero"><span>${p.emoji || '🍽️'}</span><div><small>${esc(p.badge || '')}</small><h2>${esc(p.name)}</h2><strong>${formatPrice(price)}</strong>${currentUserProfile?.role === 'employe' ? `<del>${formatPrice(p.price)}</del><small class="discount-label">-20% employé</small>` : ''}</div></div><p class="detail-desc">${esc(p.desc || p.description || '')}</p><div class="detail-box"><b>Composition</b><p>${esc(p.ingredients || 'Voir la fiche produit')}</p><b>Allergènes</b><p>${esc(p.allergens || 'À vérifier auprès de RAFAFOOD')}</p></div>`;
  modal.classList.add('show');
}
function closeProduct(){ document.getElementById('modal')?.classList.remove('show'); }

async function seedProductsIfNeeded(){
  const snap = await getDocs(collection(db,'products'));
  if(!snap.empty) return;
  await Promise.all(products.map(({id,...p}) => setDoc(doc(db,'products',String(id)), {...p, available:true, createdAt:serverTimestamp(), updatedAt:serverTimestamp()})));
}
async function loadCatalog(){
  try {
    const q = query(collection(db,'products'), orderBy('name'));
    const snap = await getDocs(q);
    if(snap.empty){
      if(currentUserProfile?.role === 'admin'){ await seedProductsIfNeeded(); return loadCatalog(); }
      catalog = [...products]; renderProducts(); return;
    }
    catalog = snap.docs.map(d => ({id:d.id,...d.data()})).filter(p => p.available !== false);
  } catch(e) {
    console.warn('Firestore catalogue indisponible, catalogue local utilisé.', e);
    catalog = [...products];
  }
  renderProducts();
}

async function loadUserProfile(user){
  if(!user){ currentUserProfile=null; updateAccountUI(); renderProducts(); return; }
  const ref=doc(db,'users',user.uid); const snap=await getDoc(ref);
  if(!snap.exists()){
    await setDoc(ref,{firstName:user.displayName?.split(' ')[0] || '',lastName:user.displayName?.split(' ').slice(1).join(' ') || '',email:user.email,role:'client',employeeId:'',restaurantId:'',createdAt:serverTimestamp()});
    currentUserProfile={role:'client',email:user.email};
  } else currentUserProfile={id:snap.id,...snap.data()};
  updateAccountUI(); renderProducts();
  if(currentUserProfile.role === 'admin') await loadCatalog();
  if(['admin','directeur'].includes(currentUserProfile.role)) renderStaff();
}

function updateAccountUI(){
  const btn=document.getElementById('accountBtn');
  const label=document.getElementById('accountLabel');
  const role=document.getElementById('accountRole');
  if(!btn) return;
  if(currentUserProfile){
    label.textContent=currentUserProfile.firstName ? `Bonjour ${currentUserProfile.firstName}` : 'Mon compte';
    role.textContent=roleLabel[currentUserProfile.role] || 'Client';
    btn.classList.add('connected');
    document.getElementById('adminNav')?.classList.toggle('show',currentUserProfile.role==='admin');
  } else {
    label.textContent='Connexion'; role.textContent=''; btn.classList.remove('connected'); document.getElementById('adminNav')?.classList.remove('show');
  }
}

function openAuth(mode='login'){
  const m=document.getElementById('authModal'); if(!m) return; m.classList.add('show'); switchAuth(mode);
}
function switchAuth(mode){
  document.getElementById('loginForm')?.classList.toggle('hidden',mode!=='login');
  document.getElementById('registerForm')?.classList.toggle('hidden',mode!=='register');
  document.getElementById('authTitle').textContent=mode==='login'?'Connexion':'Créer mon compte';
  document.getElementById('authError').textContent='';
}
function closeAuth(){document.getElementById('authModal')?.classList.remove('show');}
function friendlyError(e){
  const map={
    'auth/invalid-credential':'Email ou mot de passe incorrect.',
    'auth/email-already-in-use':'Cette adresse e-mail est déjà utilisée.',
    'auth/weak-password':'Le mot de passe doit contenir au moins 6 caractères.',
    'auth/invalid-email':'Adresse e-mail invalide.',
    'auth/network-request-failed':'Connexion réseau impossible.',
    'auth/too-many-requests':'Trop de tentatives. Réessaie plus tard.',
    'auth/operation-not-allowed':'La connexion par e-mail/mot de passe n’est pas activée dans Firebase.',
    'auth/invalid-api-key':'La clé API Firebase est invalide.',
    'auth/api-key-not-valid.-please-pass-a-valid-api-key.':'Firebase refuse la clé API utilisée par le SDK. Vérifie la clé Browser auto-created dans Google Cloud.',
    'auth/invalid-api-key':'Firebase refuse la clé API utilisée par le SDK.',
    'auth/project-not-found':'Le projet Firebase est introuvable.',
    'auth/configuration-not-found':'La configuration Firebase Authentication est introuvable.',
    'auth/internal-error':'Firebase a rencontré une erreur interne.',
    'auth/unauthorized-domain':'Le domaine utilisé pour le site n’est pas autorisé dans Firebase Authentication.',
    'auth/recaptcha-not-enabled':'reCAPTCHA n’est pas correctement configuré.',
    'auth/missing-recaptcha-token':'Le contrôle reCAPTCHA n’a pas fourni de jeton.',
    'auth/invalid-app-credential':'Les informations de vérification de l’application sont invalides.'
  };
  const code=e?.code || 'erreur-inconnue';
  const base=map[code] || e?.message || 'Une erreur est survenue.';
  return `${base}\n\n🔎 Diagnostic : ${code}`;
}

function authDiagnostics(){
  const cfg=window.__RAFAFOOD_FIREBASE_CONFIG__ || null;
  const runtimeConfig = auth?.app?.options || {};
  const maskKey = key => key ? `${key.slice(0,6)}…${key.slice(-6)}` : '(absente)';
  return {
    projectId: cfg?.projectId || '(absent)',
    authDomain: cfg?.authDomain || '(absent)',
    appId: cfg?.appId || '(absent)',
    configuredApiKey: maskKey(cfg?.apiKey),
    runtimeApiKey: maskKey(runtimeConfig.apiKey),
    sameApiKey: cfg?.apiKey === runtimeConfig.apiKey,
    sdk: 'Firebase JS SDK 12.19.0',
    origin: window.location.origin,
    protocol: window.location.protocol
  };
}

async function login(e){
 e.preventDefault(); const error=document.getElementById('authError'); error.textContent='';
 try{await signInWithEmailAndPassword(auth,e.target.email.value.trim(),e.target.password.value);closeAuth();}
 catch(err){console.error('RAFAFOOD connexion Firebase:', err, authDiagnostics());error.textContent=friendlyError(err);}
}
async function register(e){
 e.preventDefault(); const error=document.getElementById('authError'); error.textContent='';
 try{
  const firstName=e.target.firstName.value.trim(), lastName=e.target.lastName.value.trim(), email=e.target.email.value.trim(), password=e.target.password.value;
  const cred=await createUserWithEmailAndPassword(auth,email,password);
  await updateProfile(cred.user,{displayName:`${firstName} ${lastName}`.trim()});
  await setDoc(doc(db,'users',cred.user.uid),{firstName,lastName,email,role:'client',employeeId:'',restaurantId:'',createdAt:serverTimestamp()});
  closeAuth(); await loadUserProfile(cred.user);
 }catch(err){
  console.error('RAFAFOOD inscription Firebase:', err, authDiagnostics());
  error.textContent=friendlyError(err);
}
}

async function logout(){await signOut(auth); closeAccount();}
function openAccount(){
 if(!currentUserProfile){openAuth('login');return;}
 const m=document.getElementById('accountModal'); if(!m)return;
 document.getElementById('accountName').textContent=`${currentUserProfile.firstName||''} ${currentUserProfile.lastName||''}`.trim() || 'Mon compte';
 document.getElementById('accountEmail').textContent=currentUserProfile.email||auth.currentUser?.email||'';
 document.getElementById('accountRoleText').textContent=roleLabel[currentUserProfile.role]||'Client';
 document.getElementById('employeeDiscount').classList.toggle('hidden',currentUserProfile.role!=='employe');
 document.getElementById('openAdminBtn')?.classList.toggle('hidden', currentUserProfile.role !== 'admin');
 m.classList.add('show');
}
function closeAccount(){document.getElementById('accountModal')?.classList.remove('show');}

function openAdmin(){
 if(currentUserProfile?.role!=='admin') return;
 document.getElementById('adminModal')?.classList.add('show'); renderAdminProducts();
}
function closeAdmin(){document.getElementById('adminModal')?.classList.remove('show');}
function adminProductForm(p=null){
 const x=p||{};
 return `<form id="productForm" class="admin-form"><input type="hidden" name="id" value="${esc(x.id||'')}"><div class="form-grid"><label>Nom<input required name="name" value="${esc(x.name||'')}"></label><label>Prix (€)<input required type="number" step="0.01" min="0" name="price" value="${x.price??''}"></label><label>Type<select name="type"><option ${x.type==='Plats'?'selected':''}>Plats</option><option ${x.type==='Menus'?'selected':''}>Menus</option><option ${x.type==='Boissons'?'selected':''}>Boissons</option><option ${x.type==='Desserts'?'selected':''}>Desserts</option><option ${x.type==='Vegan'?'selected':''}>Vegan</option><option ${x.type==='Menu Étudiant'?'selected':''}>Menu Étudiant</option></select></label><label>Catégorie<input name="cat" value="${esc(x.cat||'')}"></label><label>Emoji<input name="emoji" value="${esc(x.emoji||'🍽️')}"></label><label>Badge<input name="badge" value="${esc(x.badge||'')}"></label></div><label>Description courte<textarea name="short">${esc(x.short||'')}</textarea></label><label>Description complète<textarea name="desc">${esc(x.desc||'')}</textarea></label><label>Composition<textarea name="ingredients">${esc(x.ingredients||'')}</textarea></label><label>Allergènes<textarea name="allergens">${esc(x.allergens||'')}</textarea></label><label class="checkline"><input type="checkbox" name="available" ${x.available!==false?'checked':''}> Produit disponible</label><div class="admin-actions"><button type="submit" class="btn primary">${p?'Enregistrer':'Ajouter le produit'}</button>${p?'<button type="button" class="btn ghost" id="cancelEdit">Annuler</button>':''}</div></form>`;
}
async function renderAdminProducts(){
 const box=document.getElementById('adminProducts'); if(!box)return;
 box.innerHTML=catalog.map(p=>`<div class="admin-product"><span>${p.emoji||'🍽️'}</span><div><b>${esc(p.name)}</b><small>${formatPrice(p.price)} • ${esc(p.type)}</small></div><div class="admin-product-actions"><button data-edit="${esc(p.id)}">Modifier</button><button data-delete="${esc(p.id)}">Supprimer</button></div></div>`).join('');
 box.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>{document.getElementById('adminEditor').innerHTML=adminProductForm(catalog.find(p=>String(p.id)===String(b.dataset.edit))); bindAdminForm();});
 box.querySelectorAll('[data-delete]').forEach(b=>b.onclick=async()=>{if(!confirm('Supprimer ce produit ?'))return; await deleteDoc(doc(db,'products',String(b.dataset.delete))); await loadCatalog(); renderAdminProducts();});
}
function bindAdminForm(){
 const form=document.getElementById('productForm'); if(!form)return;
 document.getElementById('cancelEdit')?.addEventListener('click',()=>document.getElementById('adminEditor').innerHTML=adminProductForm());
 form.addEventListener('submit',async e=>{e.preventDefault();const fd=new FormData(form);const id=fd.get('id');const data={name:fd.get('name').trim(),price:Number(fd.get('price')),type:fd.get('type'),cat:fd.get('cat').trim(),emoji:fd.get('emoji').trim(),badge:fd.get('badge').trim(),short:fd.get('short').trim(),desc:fd.get('desc').trim(),ingredients:fd.get('ingredients').trim(),allergens:fd.get('allergens').trim(),available:fd.get('available')==='on',updatedAt:serverTimestamp()}; if(id) await updateDoc(doc(db,'products',String(id)),data); else await addDoc(collection(db,'products'),{...data,createdAt:serverTimestamp()}); await loadCatalog(); document.getElementById('adminEditor').innerHTML=adminProductForm(); bindAdminForm(); renderAdminProducts();});
}

async function renderStaff(){
 const box=document.getElementById('staffList'); if(!box || !currentUserProfile || !['admin','directeur'].includes(currentUserProfile.role))return;
 try{const snap=await getDocs(collection(db,'users')); box.innerHTML=snap.docs.map(d=>{const u=d.data(); const canEdit=currentUserProfile.role==='admin'; return `<div class="staff-row"><div><b>${esc((u.firstName||'')+' '+(u.lastName||''))}</b><small>${esc(u.email||'')}</small></div><span>${esc(roleLabel[u.role]||u.role||'client')}</span>${canEdit?`<select data-role="${d.id}"><option value="client" ${u.role==='client'?'selected':''}>Client</option><option value="employe" ${u.role==='employe'?'selected':''}>Employé</option><option value="directeur" ${u.role==='directeur'?'selected':''}>Directeur</option><option value="admin" ${u.role==='admin'?'selected':''}>Admin</option></select>`:''}</div>`}).join(''); box.querySelectorAll('[data-role]').forEach(s=>s.onchange=async()=>{await updateDoc(doc(db,'users',s.dataset.role),{role:s.value,updatedAt:serverTimestamp()});await renderStaff();});}catch(e){box.textContent='Impossible de charger les comptes.';}
}

function setupUI(){
 document.getElementById('accountBtn')?.addEventListener('click',openAccount);
 document.getElementById('authClose')?.addEventListener('click',closeAuth); document.getElementById('accountClose')?.addEventListener('click',closeAccount); document.getElementById('adminClose')?.addEventListener('click',closeAdmin);
 document.getElementById('switchRegister')?.addEventListener('click',()=>switchAuth('register')); document.getElementById('switchLogin')?.addEventListener('click',()=>switchAuth('login'));
 document.getElementById('loginForm')?.addEventListener('submit',login); document.getElementById('registerForm')?.addEventListener('submit',register); document.getElementById('logoutBtn')?.addEventListener('click',logout); document.getElementById('openAdminBtn')?.addEventListener('click',()=>{closeAccount();openAdmin();});
 document.getElementById('adminNav')?.addEventListener('click',e=>{e.preventDefault();openAdmin();});
 document.getElementById('addProductBtn')?.addEventListener('click',()=>{document.getElementById('adminEditor').innerHTML=adminProductForm();bindAdminForm();});
 document.querySelectorAll('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('show')}));
 document.getElementById('closeModal')?.addEventListener('click',closeProduct);
 document.querySelectorAll('#filters button').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('#filters button').forEach(x=>x.classList.remove('active'));button.classList.add('active');current=button.dataset.filter||'Tous';renderProducts();}));
 document.querySelectorAll('.brand-card').forEach(card=>card.addEventListener('click',()=>{current=card.dataset.category||'Tous';document.querySelectorAll('#filters button').forEach(x=>x.classList.toggle('active',x.dataset.filter===current));renderProducts();document.getElementById('menu')?.scrollIntoView({behavior:'smooth'});}));
 document.getElementById('adminEditor').innerHTML=adminProductForm(); bindAdminForm();
}

document.addEventListener('DOMContentLoaded',async()=>{
 setupUI();
 renderProducts();
 onAuthStateChanged(auth,async user=>{try{await loadUserProfile(user);}catch(e){console.error(e);currentUserProfile=null;updateAccountUI();} });
 await loadCatalog();
});
