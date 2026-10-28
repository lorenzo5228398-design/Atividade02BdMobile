import { Filme } from "@/types/Filme";
import { collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from "../../firebaseConfig";
import { filmes as FilmeCard } from "../components/filmes";

export default function TelaFilmes() {
    const [filmesLista, setFilmesLista] = useState<any[]>([]);

    useEffect(() => {
        return onSnapshot(collection(db, 'filmes'), (snapshot) => {
            setFilmesLista(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
    }, []);

    function deletarFilme(id: string) {
        Alert.alert("Excluir Filme", "Deseja mesmo excluir?", [
            { text: "Não", style: "cancel" },
            { text: "Sim", style: "destructive", onPress: () => deleteDoc(doc(db, "filmes", id)) }
        ]);
    }

    async function ordernarPorNome() {
        setFilmesLista([])

        try {
            const filmeRef = collection(db, 'filmes');
            const q = query(filmeRef, orderBy('nome', 'asc'));
            const querySnapshot = await getDocs(q);

            const novaLista: Filme[] = []

            querySnapshot.docs.forEach((doc) => {
                const filme = {
                    ...doc.data()
                } as Filme
                novaLista.push(filme)

            })
            setFilmesLista(novaLista)

        }
        catch (e) {
            console.error("Erro ao filtrar por nome.", e)
        }
    }

    async function ordernarPorAno() {
        setFilmesLista([])

        try {
            const filmeRef = collection(db, 'filmes');
            const q = query(filmeRef, orderBy('anoLancamento', 'desc'));
            const querySnapshot = await getDocs(q);

            const novaLista: Filme[] = []

            querySnapshot.docs.forEach((doc) => {
                const filme = {
                    ...doc.data()
                } as Filme
                novaLista.push(filme)

            })
            setFilmesLista(novaLista)

        }
        catch (e) {
            console.error("Erro ao filtrar por nome.", e)
        }
    }

    return (
        <View style={estilos.container}>
            <View>
                <Text style={estilos.titulo}>Catálogo de Filmes</Text>
                <View style={estilos.containerOrdernar}>

                    <Pressable

                        onPress={ordernarPorNome}
                    >
                        <Text style={estilos.textoOrdenar}>Ordenar por nome</Text>
                    </Pressable>

                    <Pressable

                        onPress={ordernarPorAno}
                    >
                        <Text style={estilos.textoOrdenar}>Ordenar por ano</Text>
                    </Pressable>
                </View>
            </View>


            <FlatList
                data={filmesLista}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={estilos.itemContainer}>
                        <FilmeCard
                            nome={item.nome}
                            anoLancamento={item.anoLancamento}
                            idadeIndicativa={item.idadeIndicativa}
                            genero={item.genero}
                            diretor={item.diretor}
                        />
                        <TouchableOpacity
                            style={estilos.botaoExcluir}
                            onPress={() => deletarFilme(item.id)}
                        >
                            <Text style={estilos.textoBotaoExcluir}>Excluir Filme</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={<Text style={estilos.vazio}>Nenhum filme cadastrado.</Text>}
            />
        </View>
    );
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5'
    },
    containerOrdernar: {
        flexDirection: 'row',
        justifyContent: 'space-between'


    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center'
    },
    itemContainer: {
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        elevation: 2,
    },
    botaoExcluir: {
        backgroundColor: '#ff4444',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center'
    },
    textoBotaoExcluir: {
        color: 'white',
        fontWeight: 'bold'
    },
    vazio: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666'
    },
    textoOrdenar: {
        fontSize: 15,
        marginBottom: 10,



    }
});