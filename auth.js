/* Autenticación JR DENT con el proyecto Firebase que ya usa la web original.
   Las contraseñas las gestiona Firebase; la persistencia de la sesión también la gestiona su SDK.
   Verificar en Firebase Console dominios autorizados y métodos habilitados. */
import {initializeApp,getApps,getApp} from 'https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js';
import {getAuth,onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile,signOut,GoogleAuthProvider,signInWithPopup,sendPasswordResetEmail} from 'https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js';
const firebaseConfig = {
  apiKey:'AIzaSyDFSDPcgPmtDiNWVHZg46RKxE8ygPV99FM',
  authDomain:'jr-dent.firebaseapp.com',
  projectId:'jr-dent',
  storageBucket:'jr-dent.firebasestorage.app',
  messagingSenderId:'981855232370',
  appId:'1:981855232370:web:9c915085a08563503f7deb'
};
const app=getApps().length?getApp():initializeApp(firebaseConfig);
const auth=getAuth(app);const google=new GoogleAuthProvider();
const errors={
  'auth/invalid-email':'El correo electrónico no es válido.',
  'auth/invalid-credential':'Correo o contraseña incorrectos.',
  'auth/wrong-password':'Correo o contraseña incorrectos.',
  'auth/email-already-in-use':'Ya existe una cuenta con este correo.',
  'auth/weak-password':'Utiliza una contraseña más segura.',
  'auth/popup-closed-by-user':'Cerraste la ventana de Google antes de terminar.',
  'auth/popup-blocked':'Tu navegador bloqueó la ventana de Google. Habilita ventanas emergentes.',
  'auth/operation-not-allowed':'Este método no está habilitado en Firebase. Debe configurarse en el proyecto.',
  'auth/unauthorized-domain':'Este dominio no está autorizado en Firebase. Añádelo a los dominios autorizados.',
  'auth/too-many-requests':'Demasiados intentos. Inténtalo más tarde.',
  'auth/network-request-failed':'No se pudo conectar. Revisa tu conexión a Internet.',
  'auth/user-not-found':'Revisa el correo electrónico indicado.'
};
const show=(msg,bad=false)=>{const x=document.getElementById('authMessage');if(x){x.className='account-message '+(bad?'error':'success');x.textContent=msg}};
const err=e=>{console.warn('Firebase Auth:',e.code||e.message);show(errors[e.code]||'No fue posible completar la operación. Comprueba la configuración de Firebase.',true)};
onAuthStateChanged(auth,u=>{window.__jrAuthState={user:u?{displayName:u.displayName,email:u.email,uid:u.uid}:null};window.dispatchEvent(new Event('jrdent-auth-change'))},err);
window.JRDentAuth={auth};
document.addEventListener('submit',async e=>{
  if(e.target.id!=='authForm')return;e.preventDefault();const form=e.target;if(!form.reportValidity())return;
  const btn=form.querySelector('button[type="submit"]');const old=btn.innerHTML;btn.disabled=true;btn.textContent='Procesando...';
  try{
    const d=new FormData(form),email=String(d.get('email')||'').trim(),pass=String(d.get('password')||'');
    if(form.dataset.mode==='register'){
      const name=String(d.get('name')||'').trim();if(name.length<2){show('Introduce un nombre válido.',true);return}
      if(pass!==String(d.get('confirm')||'')){show('Las contraseñas no coinciden.',true);return}
      const user=await createUserWithEmailAndPassword(auth,email,pass);
      await updateProfile(user.user,{displayName:name});
      window.__jrAuthState={user:{displayName:name,email,uid:user.user.uid}};
      show('Tu cuenta se ha creado. ¡Bienvenido!');
    }else{await signInWithEmailAndPassword(auth,email,pass);show('Sesión iniciada correctamente.');}
    window.dispatchEvent(new Event('jrdent-auth-change'));
  }catch(ex){err(ex)}finally{btn.disabled=false;btn.innerHTML=old}
});
document.addEventListener('click',async e=>{
  if(e.target.closest('#logoutBtn')){try{await signOut(auth);window.JRDent?.flash('Sesión cerrada');window.JRDent?.go('inicio')}catch(ex){err(ex)}return}
  if(e.target.closest('#googleAuthBtn')){const btn=e.target.closest('button');btn.disabled=true;try{await signInWithPopup(auth,google);window.JRDent?.flash('Iniciaste sesión con Google.');window.JRDent?.go('inicio')}catch(ex){err(ex)}finally{btn.disabled=false}return}
  if(e.target.closest('#resetPasswordBtn')){const email=document.querySelector('#authForm input[name="email"]')?.value?.trim();if(!email){show('Escribe primero tu correo en el campo superior.',true);return}try{await sendPasswordResetEmail(auth,email);show('Si el correo está registrado, revisa tu bandeja para restablecer la contraseña.')}catch(ex){err(ex)}}
});
