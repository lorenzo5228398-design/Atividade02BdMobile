import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
    return (
        <View style={estilos.container}>
            <Text style={estilos.titulo}>Catálogo de Filmes</Text>
            
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
    }
});