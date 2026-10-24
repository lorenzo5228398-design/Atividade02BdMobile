import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { db } from "../../firebaseConfig";

export default function telaFilme() {
    const [nome, setNome] = useState("");
    const [anoLancamento, setAnoLancamento] = useState("");
    const [idadeIndicativa, setIdadeIndicativa] = useState("");
    const [genero, setGenero] = useState("");
    const [diretor, setDiretor] = useState("");

    async function inserir() {
        if (!nome || !anoLancamento || !idadeIndicativa || !genero || !diretor) {
            Alert.alert('Atenção', 'Preencha todos os campos!');
            return false;
        }

        const filme = {
            nome: nome,
            anoLancamento: Number(anoLancamento),
            idadeIndicativa: Number(idadeIndicativa),
            genero: genero,
            diretor: diretor
        };

        try {

            await addDoc(collection(db, 'filmes'), filme);
            Alert.alert('Sucesso', 'Filme inserido com sucesso!');
            setNome("");
            setAnoLancamento("");
            setIdadeIndicativa("");
            setGenero("");
            setDiretor("");
        } catch (e) {
            Alert.alert('Erro', String(e));
        }
        return true;
    }
    return (
        <View style={estilos.container}>
            <Text style={estilos.label}>Nome do filme: </Text>
            <TextInput
                style={estilos.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Ex: Matrix"
            />

            <Text style={estilos.label}>Ano de lançamento: </Text>
            <TextInput
                style={estilos.input}
                value={anoLancamento}
                onChangeText={setAnoLancamento}
                placeholder="Ex: 1999"
                keyboardType="numeric"
            />

            <Text style={estilos.label}>Idade indicativa: </Text>
            <TextInput
                style={estilos.input}
                value={idadeIndicativa}
                onChangeText={setIdadeIndicativa}
                placeholder="Ex: 14"
                keyboardType="numeric"
            />

            <Text style={estilos.label}>Gênero: </Text>
            <TextInput
                style={estilos.input}
                value={genero}
                onChangeText={setGenero}
                placeholder="Ex: Ficção Científica"
            />

            <Text style={estilos.label}>Diretor: </Text>
            <TextInput
                style={estilos.input}
                value={diretor}
                onChangeText={setDiretor}
                placeholder="Ex: Lana Wachowski"
            />

            <TouchableOpacity style={estilos.botao} onPress={inserir}>
                <Text style={estilos.textoBotao}>Adicionar Filme</Text>
            </TouchableOpacity>
        </View>
    );
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
    },
    botao: {
        backgroundColor: 'blue',
        padding: 15,
        marginTop: 20,
        borderRadius: 5,
        alignItems: 'center'
    },
    textoBotao: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
});