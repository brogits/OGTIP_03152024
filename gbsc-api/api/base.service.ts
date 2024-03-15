import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, getDocs, orderBy, addDoc, where, doc, getDoc, setDoc,arrayUnion, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const fbConf = require('./firebaseConf.json');
const app = initializeApp(fbConf);
const db = getFirestore(app);
const fs = require('fs');
const UUID = require('uuid-v4');
const busboy = require('busboy');
const path = require('path');
const os = require('os');
const storage = getStorage();
const createUserCN = (email: string) => { return email.replace('@', '.'); }

export {
    UUID,
    busboy,
    path,
    os,
    fs,
    db,
    storage,
    addDoc,
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    ref,
    uploadBytes,
    where,
    createUserCN,
    getDoc, 
    setDoc,
    arrayUnion, 
    updateDoc
};

