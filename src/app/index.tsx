import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
    const router = useRouter();

    return (
        <View style={estilos.container}>
            <Text style={estilos.titulo}>App CineCatálogo</Text>
            
            <TouchableOpacity 
                style={estilos.botao} 
                onPress={() => router.push("/telaCadastrarFilmes")}
            >
                <Text style={estilos.textoBotao}>Cadastrar Novo Filme</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[estilos.botao, estilos.botaoSecundario]} 
                onPress={() => router.push("/telaFilmes")}
            >
                <Text style={estilos.textoBotao}>Consultar e Excluir Filmes</Text>
            </TouchableOpacity>
        </View>
    );
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5'
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#333'
    },
    botao: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 2
    },
    botaoSecundario: {
        backgroundColor: '#333', 
    },
    textoBotao: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
});