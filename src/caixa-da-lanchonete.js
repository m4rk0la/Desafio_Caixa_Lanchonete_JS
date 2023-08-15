import Decimal from 'decimal.js';

class CaixaDaLanchonete {
    constructor() {
        this.itens = {
            'cafe': new Decimal('3.00'),
            'chantily': new Decimal('1.50'),
            'sucoNatural': new Decimal('6.20'),
            'sanduiche': new Decimal('6.50'),
            'queijo': new Decimal('2.00'),
            'salgado': new Decimal('7.25'),
            'combo1': new Decimal('9.50'),
            'combo2': new Decimal('7.50'),
        };
    }

    formatarValor(valor) {
        return valor.toFixed(2).replace('.', ',');
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        const formasDePagamentoValidas = ['dinheiro', 'credito', 'debito'];

        if (!formasDePagamentoValidas.includes(formaDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        let valorTotal = new Decimal(0);
        let ajuste = new Decimal(0);

        if (formaDePagamento === 'dinheiro') {
            ajuste = new Decimal('-0.05');  
        } else if (formaDePagamento === 'credito') {
            ajuste = new Decimal('0.03');   
        }

        let cafePresente = false;
        let sanduichePresente = false;
        if (itens.length === 0 && formasDePagamentoValidas.includes(formaDePagamento)) {
            if (formaDePagamento === 'debito', 'credito', 'dinheiro') {
                return 'Não há itens no carrinho de compra!';
            }
        }
        for (const item of itens) {
            const [codigoItem, quantidade] = item.split(',');
            
            if (!this.itens.hasOwnProperty(codigoItem)) {
                return 'Item inválido!';
            }

            const precoItem = this.itens[codigoItem];

            if (codigoItem === 'chantily' && !cafePresente) {
                return 'Item extra não pode ser pedido sem o principal';
            }

            if (codigoItem === 'queijo' && !sanduichePresente) {
                return 'Item extra não pode ser pedido sem o principal';
            }

            if (quantidade <= 0) {
                return 'Quantidade inválida!';
            }

            if (codigoItem === 'cafe') {
                cafePresente = true;
            } else if (codigoItem === 'sanduiche') {
                sanduichePresente = true;
            }

            valorTotal = valorTotal.plus(precoItem.times(quantidade).plus(precoItem.times(quantidade).times(ajuste)));
        }

        const valorFormatado = this.formatarValor(valorTotal);
        return `R$ ${valorFormatado}`;
    }
}

export { CaixaDaLanchonete };
