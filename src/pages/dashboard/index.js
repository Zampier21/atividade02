import { useEffect, useState } from 'react';
import { db } from '../../services/firebaseConnection';
import {
    addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc
} from 'firebase/firestore';
import '../SignIn/sign.css';
import { Link } from 'react-router-dom';


export default function Dash() {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [idPost, setIdPost] = useState('')
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function loadPosts() {
            const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
                let listaPost = [];

                snapshot.forEach((doc) => {
                    listaPost.push({
                        id: doc.id,
                        titulo: doc.data().titulo,
                        autor: doc.data().autor,
                    })
                })

                setPosts(listaPost);
            })
        }

        loadPosts();

    }, [])


    async function handleAdd() {
        // await setDoc(doc(db, "posts", "12345"), {
        //   titulo: titulo,
        //   autor: autor,
        // })
        // .then(() => {
        //   console.log("DADOS REGISTRADO NO BANCO!")
        // })
        // .catch((error) => {
        //   console.log("GEROU ERRO" + error)
        // }) 


        await addDoc(collection(db, "posts"), {
            titulo: titulo,
            autor: autor,
        })
            .then(() => {
                console.log("CADASTRADO COM SUCESSO")
                setAutor('');
                setTitulo('')
            })
            .catch((error) => {
                console.log("ERRO " + error)
            })


    }


    async function buscarPost() {
        // const postRef = doc(db, "posts", "vFvZAyFqebXFsFv0X89l")
        // await getDoc(postRef)
        // .then((snapshot) => {
        //   setAutor(snapshot.data().autor)
        //   setTitulo(snapshot.data().titulo)

        // })
        // .catch(()=>{
        //   console.log("ERRO AO BUSCAR")
        // })

        const postsRef = collection(db, "posts")
        await getDocs(postsRef)
            .then((snapshot) => {
                let lista = [];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        titulo: doc.data().titulo,
                        autor: doc.data().autor,
                    })
                })

                setPosts(lista);

            })
            .catch((error) => {
                console.log("DEU ALGUM ERRO AO BUSCAR")
            })


    }


    async function editarPost() {
        const docRef = doc(db, "posts", idPost)

        await updateDoc(docRef, {
            titulo: titulo,
            autor: autor
        })
            .then(() => {
                console.log("POST ATUALIZADO!")
                setIdPost('')
                setTitulo('')
                setAutor('')
            })
            .catch((error) => {
                console.log(error)
            })


    }


    async function excluirPost(id) {
        const docRef = doc(db, "posts", id)
        await deleteDoc(docRef)
            .then(() => {
                alert("POST DELETADO COM SUCESSO!")
            })

    }

    return (
        <div className="container">
            <div className='post-cadastro'>
                <h2 className='centro'>NOTAS</h2>

                <div className='centro'>
                    <textarea
                        type="text"
                        placeholder='Titulo da nota'
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Digite o Conteúdo"
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                        className="espaco"
                    />
                </div>
                <div className='centro' style={{ marginTop: "20px" }}>
                    <Link to="/" className='link-button espaco'>Voltar</Link>
                    <button onClick={handleAdd} className="espaco">Cadastrar</button>
                    <button onClick={buscarPost}>Buscar post</button> <br />
                </div>
                <div className='notas'>
                    <ul>
                        {posts.map((post) => {
                            return (
                                <li key={post.id}>
                                    <span>Titulo: {post.titulo} </span> <br />
                                    <span>Conteúdo: {post.autor}</span> <br />
                                    <button onClick={() => excluirPost(post.id)}>Excluir</button> <br /> <br />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>

        </div>
    );
}