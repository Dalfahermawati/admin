import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyAjxjGgc1_HHBUGoXM1kFq4aXiV--plwZE",
  authDomain: "pasarcemerlang-11fa3.firebaseapp.com",
  projectId: "pasarcemerlang-11fa3",
  storageBucket: "pasarcemerlang-11fa3.appspot.com",
  messagingSenderId: "390685080124",
  appId: "1:390685080124:web:6a69ed5fd39c3fc21da139",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export async function ambilDataStok() {
  const refDokumen = collection(db, "data-stok");
  const kueri = query(refDokumen, orderBy("namaBarang"));
  const cuplikanKueri = await getDocs(kueri);
  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      namaBarang: dok.data().namaBarang,
      masuk: dok.data().masuk,
      keluar: dok.data().keluar,
      sisaStok: dok.data().sisaStok,
    });
  });
  return hasil;
}
export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export async function tambahDataStok(namaBarang, masuk, keluar, sisaStok) {
  try {
    const dokRef = await addDoc(collection(db, 'data-stok'), {
      namaBarang: namaBarang,
      masuk: masuk,
      keluar: keluar,
      sisaStok: sisaStok
    });
    console.log('berhasil menambah data-stok ' + dokRef.id);
  }
  catch (e) {
    console.log('gagal menambah data-stok ' + e);
  }
}
export async function hapusDataStok(docId) {
  await deleteDoc(doc(db, "data-stok", docId));
}

export async function ubahDataStok(docId, namaBarang, masuk, keluar, sisaStok) {
  await updateDoc(doc(db, "data-stok", docId), {
    namaBarang: namaBarang,
    masuk: masuk,
    keluar: keluar,
    sisaStok: sisaStok
  });
}

export async function ambilStok(docId) {
  const docRef = await doc(db, "data-stok", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}