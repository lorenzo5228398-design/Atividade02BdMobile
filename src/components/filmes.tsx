import { StyleSheet, Text, View } from 'react-native';

type FilmeProps = {
    nome: string;
    anoLancamento: number;
    idadeIndicativa: number;
    genero: string;
    diretor: string
}

export function filmes(props: FilmeProps) {
    return (
        <View style={estilos.cartao}>
            <Text style={estilos.textoPrincipal}>{props.nome}</Text>
            
            <View style={estilos.linha}>
                <Text style={estilos.textoDetalhe}>Ano: {props.anoLancamento}</Text>
                <Text style={estilos.textoDetalhe}>Idade: {props.idadeIndicativa}+</Text>
            </View>
            
            <Text style={estilos.textoDetalhe}>Gênero: {props.genero}</Text>
            <Text style={estilos.textoDetalhe}>Diretor: {props.diretor}</Text>
        </View>
    );
}

const estilos = StyleSheet.create({
    cartao: {
        padding: 15,
        marginBottom: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        borderLeftWidth: 5,
        borderLeftColor: '#005b96',
    },
    linha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    textoPrincipal: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    textoDetalhe: {
        fontSize: 14,
        color: '#666',
    },
    textoPreco: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#005b96',
    }
});