//Converte para valor
var ORJR_converte_moeda_numero = function(valorMoeda){
	if (valorMoeda != null) {
		valorMoeda = valorMoeda+' ';
		valorMoeda = valorMoeda.replace('R$&nbsp;','');
		valorMoeda = valorMoeda.replace('.','');
		valorMoeda = valorMoeda.replace(',','.');// //console.log(valorMoeda);                 
		valorMoeda = parseFloat(valorMoeda);// //console.log("Valor Moeda, fica desse jeito com valor numerico = "+valorMoeda);
		valorMoeda = valorMoeda.toFixed(2);// //console.log("Agora com duas casas decimais = "+valorMoeda);
		
		return valorMoeda ;
	}
}

var ORJR_plugin_Desconto_Boleto = function(){
	var precoTexto = jQuery('.FCPriceValue').text();
	var precoLimpo = ORJR_converte_moeda_numero(precoTexto);console.log('Valorconvertido = ' + precoLimpo);
	var precoDescontoBoleto = (precoLimpo * 0.92).toFixed(2);console.log('Valor com Desconto = ' + precoDescontoBoleto);
	var precoDescontoBoletoMoeda  = (precoDescontoBoleto).replace('.',',');
	var mensagem = "";
	mensagem = '<div class="descontoBoleto"><span> ou</span>';
	mensagem = mensagem + '<span class="rsS"> R$';
	mensagem = mensagem + '<span class="valor">'+precoDescontoBoletoMoeda+'</span></span>';
	mensagem = mensagem + '<span class="noBoleto"> no boleto banc&aacute;rio</span></div>';
	jQuery('#idPriceGridFC').append(mensagem);
};

var ORJR_plugin_Botao_Comprar_e_AdicionaraoCarrinho= function(){
	var idproduto = jQuery('#idProduto').text();
	jQuery('#idButtonBuyFC').replaceWith( '<div class="botaoComprar"><a href="addproduto.asp?idloja=32039&amp;IDProduto='+idproduto+'">Comprar</a></div>' );
}

var ORJR_plugin_Desconto_Boleto_Vitrine = function(){
	var i=0;
	jQuery('.DivHomePrice').each(function(){
		var aqui= jQuery('.DivHomePrice:eq('+i+')');
		var precoTexto = aqui.find('.price > strong').text();console.log('Valor do produto da vez  = ' + precoTexto);
		var precoLimpo = ORJR_converte_moeda_numero(precoTexto);console.log('Valorconvertido = ' + precoLimpo);
		var precoDescontoBoleto = (precoLimpo * 0.92).toFixed(2);console.log('Valor com Desconto = ' + precoDescontoBoleto);
		var precoDescontoBoletoMoeda  = (precoDescontoBoleto).replace('.',',');
		var mensagem = "";
		mensagem = '<div class="descontoBoleto"><span> ou</span>';
		mensagem = mensagem + '<span class="rsS"> R$';
		mensagem = mensagem + '<span class="valor">'+precoDescontoBoletoMoeda+'</span></span>';
		mensagem = mensagem + '<span class="noBoleto"> no boleto banc&aacute;rio</span></div>';
		aqui.find('.DivHomePriceProd').append(mensagem);
		i=i+1;
	})
};


jQuery(window).load(function() {
	if (jQuery('body.FCProduct.ProductDet').length) {
		ORJR_plugin_Botao_Comprar_e_AdicionaraoCarrinho();
		ORJR_plugin_Desconto_Boleto();
	}
	if (jQuery('body.FCProduct.ProductList').length) {
		ORJR_plugin_Desconto_Boleto_Vitrine();
	}
	if (jQuery('body.FCHome').length) {
		ORJR_plugin_Desconto_Boleto_Vitrine();
	}
})