const mapearTextoParaConsultas = (texto) => {
    const textoProcessado = texto.replace(/\[|\]|\uD800-\uDBFF|\uDC00-\uDFFF|✔|✅|-/g, '')
                                 .split(/\n+/);

    const regexData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

    return textoProcessado.reduce((consultas, linha) => {
        const palavraLinha = linha.substr(2).split(/\s+/);
        const data = palavraLinha[0];
        if (regexData.test(data)) {
            const hora = palavraLinha[1];
            const descricao = palavraLinha.slice(3).join(' ');
            consultas.push({
                data,
                hora,
                descricao
            });
        }
        return consultas;
    }, []);
};

module.exports = { mapearTextoParaConsultas };