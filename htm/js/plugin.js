/* Alterado 03-10-2016- Osvaldo Rizzi Junior - Fix do desconto boleto em prodDet */
//Converte para valor
var ORJR_codifica_caractere = function(obj){
      return obj.replace(/&amp;/g, '&#38;').replace(/&lt;/g, '&#60;').replace(/&gt;/g, '&#62;').replace(/&#(\d+);/g, function (m, n) { return String.fromCharCode(n); })
}

var ORJR_codifica_URL = function(obj){
      //#$&+-_'.=?@"
      var objReplace = obj.replace(/\&quot;/g,"\"");
      return escape(objReplace).replace(/\"/g,"%22").replace(/\#/g,"%23").replace(/\$/g,"%24").replace(/\&/g,"%26").replace(/\'/g,"%27").replace(/\+/g,"%2B").replace(/\-/g,"%2D").replace(/\./g,"%2E").replace(/\=/g,"%3D").replace(/\?/g,"%3F").replace(/\@/g,"%40").replace(/\_/g,"%5F");
    }
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
	var precoTexto = jQuery('#idPriceGridFC > b > span > span.FCPriceValue').text();console.log('Valorcapturado = ' + precoTexto);
	var precoLimpo = ORJR_converte_moeda_numero(precoTexto);console.log('Valorconvertido = ' + precoLimpo);
	var precoDescontoBoleto = (precoLimpo * 0.92).toFixed(2);console.log('Valor com Desconto = ' + precoDescontoBoleto);
	var precoDescontoBoletoMoeda  = (precoDescontoBoleto).replace('.',',');
	var mensagem = "";
	mensagem = '<div class="descontoBoleto"><span> ou</span>';
	mensagem = mensagem + '<span class="rsS"> R$';
	mensagem = mensagem + '<span class="valor">'+precoDescontoBoletoMoeda+'</span></span>';
	mensagem = mensagem + '<span class="noBoleto"> via transferência</span></div>';
	jQuery('#idPriceGridFC').append(mensagem);
};

var ORJR_plugin_Botao_Comprar_e_AdicionaraoCarrinho= function(){
	jQuery('.FCGridMain').append('<div class="botaoComprar"><span>Comprar</span></div>');
	jQuery('.botaoComprar').click(function(){
		if (jQuery('.FCDescritorGridActivated').length){
			if (jQuery('.FCSelectedGrid span').length){
				var sNameColor="";
				var adicional1= jQuery('.FCSelectedGrid span').attr('data-attr');
				console.log("Adicional1 capturado = "+adicional1);
				console.log("Adicional1 com caractere codificado = "+ORJR_codifica_caractere(adicional1));
				console.log("Adicional1 codificado para url = "+ORJR_codifica_URL(ORJR_codifica_caractere(adicional1)));	
				var adicional2="";
				var adicional3="";
				var adicionalD1="";
				var adicionalD2="";
				var adicionalD3="";
				var idproduto = jQuery('.FCSelectedGrid span').attr('data-id');console.log('id = '+idproduto );
				var sURLBuy='addproduto.asp?idloja=32039&IDProduto='+idproduto;
				if(sNameColor!=='')sURLBuy+='&Cor='+ sNameColor.replace(/\+/g,'%2B');
        		if(adicional1!=='')sURLBuy+='&Adicional1='+ ORJR_codifica_URL( ORJR_codifica_caractere(adicional1) );
        		if(adicional2!=='')sURLBuy+='&Adicional2='+ ORJR_codifica_URL( ORJR_codifica_caractere(adicional2) );
		        if(adicional3!=='')sURLBuy+='&Adicional3='+ ORJR_codifica_URL( ORJR_codifica_caractere(adicional3) );
		        if(adicionalD1!=='')sURLBuy+='&AdicionalD1='+ ORJR_codifica_URL( ORJR_codifica_caractere(adicionalD1) );
		        if(adicionalD2!=='')sURLBuy+='&AdicionalD2='+ ORJR_codifica_URL( ORJR_codifica_caractere(adicionalD2) );
		        if(adicionalD3!=='')sURLBuy+='&AdicionalD3='+ ORJR_codifica_URL( ORJR_codifica_caractere(adicionalD3) );
		        console.log("URL CAPTURADA  = "+sURLBuy)
				top.location.href=sURLBuy;
			} else {
				alert('Por favor selecione uma das opcoes acima primeiro');
			}
		} else {
			var idproduto = jQuery('#idProduto').text();
			window.location.href='addproduto.asp?idloja=32039&IDProduto='+idproduto;
		}

	})
};

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
		mensagem = mensagem + '<span class="noBoleto"> via transferência</span></div>';
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