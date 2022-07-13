function beforeCancelProcess(colleagueId,processId){
	try {
		
	    var ds_chave_rm 	= DatasetFactory.getDataset("ds_chave_rm", null, null, null);
		var chave			= ds_chave_rm.getValue(0, "CHAVE");
		var codColigada				=ds_chave_rm.getValue(0, "CODCOLIGADA");
		
if(hAPI.getCardValue("HabilitaIntegracao")=="S"){
	 var numSolicitacao			= getValue("WKNumProces");
	 // alteração
	
			 	var status		 			= "A";
				var operacao				= "C";
	
		/*VARIAVEIS INT_TMOV_IMP*/
			
		var dataInsercao			= hAPI.getCardValue("DataCriacao");
		var chaveOrigem				= "FLUIG-" + numSolicitacao;
		var dataTransacao			= dataInsercao;
		var codFilial				= "1";
		var codLoc					= "01";
		var codCfo					= hAPI.getCardValue("idcredenciado");
		var serie           		= "CTR";
		var codTMV					= "1.1.80";
		var movImpresso   			= "1";
		var docImpresso   			= "0";
		var fatImpressa   			= "0";
		var dataEmissao				= "10/12/" + dataInsercao.substring(6);
		var dataSaida				= "10/12/" + dataInsercao.substring(6);
		var codMoedaVl    			= "R$";
		var codColCfo				= codColigada;
		var geradoPorLote			= "0";
		var codDepartamento			= hAPI.getCardValue("coddepartamento");
		var gerouConta				= "0";
		var geradoPorContaTrabalho	= "0";
		var gerouContaTrabalho		= "0";
		var codCpg					= "01";
		var campoLivre1  			= chaveOrigem;
		var campoLivre2  			= "";
		var codVend1      			= hAPI.getCardValue("codVen");

		/*VARIAVEIS INT_TMOVCOMPL_IMP*/          
		var origemPagamento	= "010"; //010 => credenciamento

		/*VARIAVEIS INT_TMOVHISTORICO_IMP*/
		var historicoCurtoTmovHis	= chaveOrigem + ": " + hAPI.getCardValue("justificativa");
		var historicoLongoTmovHis	= "1";

		//Construcao da primeira parte do xml INT_TMOV_IMP, INT_TMOVCOMPL_IMP, INT_TMOVHISTORICO_IMP
		var xml	=  "\n" +
		
					"<NewDataSet>"																		+ "\n" +
						"<INT_TMOV_IMP>"																+ "\n" +
						"<STATUS_INT>"+status+"</STATUS_INT>"											+ "\n" +
						"<OPERACAO_INT>"+operacao+"</OPERACAO_INT>"										+ "\n" +
						"<DATAINSERCAO_INT>"+dataInsercao+"</DATAINSERCAO_INT>"							+ "\n" +
						"<CHAVEORIGEM_INT>"+chaveOrigem+"</CHAVEORIGEM_INT>"							+ "\n" +
						"<CODCOLIGADA>"+codColigada+"</CODCOLIGADA>"									+ "\n" +
						"<CODFILIAL>"+codFilial+"</CODFILIAL>"											+ "\n" +
						"<CODLOC>"+codLoc+"</CODLOC>"													+ "\n" +
						"<CODCFO>"+codCfo+"</CODCFO>"													+ "\n" +
						"<SERIE>"+serie+"</SERIE>"														+ "\n" +
						"<CODTMV>"+codTMV+"</CODTMV>"													+ "\n" +
						"<MOVIMPRESSO>"+movImpresso+"</MOVIMPRESSO>"									+ "\n" +
						"<DOCIMPRESSO>"+docImpresso+"</DOCIMPRESSO>"									+ "\n" +
						"<FATIMPRESSA>"+fatImpressa+"</FATIMPRESSA>"									+ "\n" +
						"<DATAEMISSAO>"+dataEmissao+"</DATAEMISSAO>"									+ "\n" +
						"<DATASAIDA>"+dataSaida+"</DATASAIDA>"											+ "\n" +
						"<CODMOEVALORLIQUIDO>"+codMoedaVl+"</CODMOEVALORLIQUIDO>"						+ "\n" +
						"<CODCOLCFO>"+codColCfo+"</CODCOLCFO>"											+ "\n" +
						"<GERADOPORLOTE>"+geradoPorLote+"</GERADOPORLOTE>"								+ "\n" +
//						"<CODDEPARTAMENTO>"+codDepartamento+"</CODDEPARTAMENTO>"						+ "\n" +
						"<GEROUCONTATRABALHO>"+gerouConta+"</GEROUCONTATRABALHO>"						+ "\n" +
						"<GERADOPORCONTATRABALHO>"+geradoPorContaTrabalho+"</GERADOPORCONTATRABALHO>"	+ "\n" +
						"<CODCPG>"+codCpg+"</CODCPG>"													+ "\n" +
						"<CAMPOLIVRE1>"+campoLivre1+"</CAMPOLIVRE1>"									+ "\n" +
						"<CAMPOLIVRE2>"+campoLivre2+"</CAMPOLIVRE2>"									+ "\n" +
						"<CODVEN1>"+codVend1+"</CODVEN1>"												+ "\n" +
					"</INT_TMOV_IMP>"																	+ "\n\n" +
		
					"<INT_TMOVCOMPL_IMP>"																+ "\n" +
						"<STATUS_INT>"+status+"</STATUS_INT>"											+ "\n" +
						"<OPERACAO_INT>"+operacao+"</OPERACAO_INT>"										+ "\n" +
						"<DATAINSERCAO_INT>"+dataInsercao+"</DATAINSERCAO_INT>"							+ "\n" +
						"<CHAVEORIGEM_INT>"+chaveOrigem+"</CHAVEORIGEM_INT>"							+ "\n" +
						"<CODCOLIGADA>"+codColigada+"</CODCOLIGADA>"									+ "\n" +
						"<ORIGEMPAG>"+origemPagamento+"</ORIGEMPAG>"									+ "\n" +
					"</INT_TMOVCOMPL_IMP>"																+ "\n\n" +

					"<INT_TMOVHISTORICO_IMP>"															+ "\n" +
						"<STATUS_INT>"+status+"</STATUS_INT>"											+ "\n" +
						"<OPERACAO_INT>"+operacao+"</OPERACAO_INT>"										+ "\n" +
						"<DATAINSERCAO_INT>"+dataInsercao+"</DATAINSERCAO_INT>"							+ "\n" +
						"<CHAVEORIGEM_INT>"+chaveOrigem+"</CHAVEORIGEM_INT>"							+ "\n" +
						"<CODCOLIGADA>"+codColigada+"</CODCOLIGADA>"									+ "\n" +
						"<HISTORICOCURTO>"+historicoCurtoTmovHis+"</HISTORICOCURTO>"					+ "\n" +
						"<HISTORICOLONGO>"+historicoLongoTmovHis+"</HISTORICOLONGO>"					+ "\n" +
					"</INT_TMOVHISTORICO_IMP>";
		
	
		//RATEIO GLOBAL
		var i 			= 0;
	    var process 	= getValue("WKNumProces");
	    var cardData	= new java.util.HashMap();
		cardData 		= hAPI.getCardData(process);
		var keys 		= cardData.keySet().toArray();
		
		for ( var key in keys) {
			var field = keys[key];
			if (field.indexOf("centroCusto_zoom___") > -1) {
		
				var row 			= field.replace("centroCusto_zoom___", "");
				
				/*VARIAVEIS INT_TMOVRATCCU_IMP*/                      
				var codCentroCusto	= hAPI.getCardValue("codCusto" + "___" + row);
				var valorRateio		= hAPI.getCardValue("valorRatMoeda" + "___" + row);
				var vlRateio		= valorRateio;
				var historicoTmov	= "1";
				
			
				//Construcao da segunda parte do XML INT_TMOVRATCCU_IMP					
				var xml = xml + "\n\n" +
				
								"<INT_TMOVRATCCU_IMP>"											+ "\n" +
									"<STATUS_INT>"+status+"</STATUS_INT>"						+ "\n" +
									"<OPERACAO_INT>"+operacao+"</OPERACAO_INT>"					+ "\n" +
									"<DATAINSERCAO_INT>"+dataInsercao+"</DATAINSERCAO_INT>"		+ "\n" +
									"<DATATRANSACAO_INT>"+dataTransacao+"</DATATRANSACAO_INT>"	+ "\n" +
									"<CHAVEORIGEM_INT>"+chaveOrigem+"</CHAVEORIGEM_INT>"		+ "\n" +
									"<CODCOLIGADA>"+codColigada+"</CODCOLIGADA>"				+ "\n" +
									"<CODCCUSTO>"+codCentroCusto+"</CODCCUSTO>"					+ "\n" +
									"<VALOR>"+vlRateio+"</VALOR>"								+ "\n" +
									"<HISTORICO>"+historicoTmov+"</HISTORICO>"					+ "\n" +
								"</INT_TMOVRATCCU_IMP>";
				i++;
			}
		}
		
		/*Itens do Pedido*/		
	    var i 			= 0;
	    var process 	= getValue("WKNumProces");
	    var cardData	= new java.util.HashMap();
		cardData 		= hAPI.getCardData(process);
		var keys 		= cardData.keySet().toArray();
		var nseqitmmov		= 1;

		for ( var key in keys) {
			var field = keys[key];
			if (field.indexOf("servico___") > -1) {
		
				var row = field.replace("servico___", "");

				/*VARIAVEIS INT_TITMMOV_IMP*/                
				var idPrd					= hAPI.getCardValue("idproduto" 		+ "___" + row);
				var codtb1fat				= hAPI.getCardValue("codtb1fat" 	+ "___" + row);
				var quantidade				= 1;
				var precoUnitario			= hAPI.getCardValue("valorRatMoeda" + "___" + row);
				var valorTotalItem			= precoUnitario;
				vlTotalItemMoeda			= formatMoeda(valorTotalItem);
				var Nnseqitmcnt				= nseqitmmov;
				var dataEmissao				= dataInsercao;
				var codFilial				= "1";
				var historicoCurtoTitmov	= "1";
				var codcoltborcam			= codColigada;
				var codtborcamento			= "001";
				var codTb2Fat				= hAPI.getCardValue("origemrecurso");
				var codTb4Fat				= hAPI.getCardValue("origemrecurso");
				//var codDepartamento			= hAPI.getCardValue("departamento");
				//var codDepartamento			= "1000";
				
		
				
				//Construcao da terceira parte do XML INT_TITMMOV_IMP, INT_TITMMOVHISTORICO_IMP					
				xml = xml+  "\n\n" +
				
							"<INT_TITMMOV_IMP>"+ "\n" +
								"<STATUS_INT>"+status+"</STATUS_INT>"						+ "\n" +
								"<OPERACAO_INT>"+operacao+"</OPERACAO_INT>"					+ "\n" +
								"<DATAINSERCAO_INT>"+dataInsercao+"</DATAINSERCAO_INT>"		+ "\n" +
								"<CHAVEORIGEM_INT>"+chaveOrigem+"</CHAVEORIGEM_INT>"		+ "\n" +
								"<CODCOLIGADA>"+codColigada+"</CODCOLIGADA>"				+ "\n" +
								"<NSEQITMCNT>"+Nnseqitmcnt+"</NSEQITMCNT>"					+ "\n" +
								"<CODTB1FAT>"+codtb1fat+"</CODTB1FAT>"						+ "\n" +
								"<IDPRD>"+idPrd+"</IDPRD>"									+ "\n" +
								"<QUANTIDADE>"+quantidade+"</QUANTIDADE>"					+ "\n" +
								"<PRECOUNITARIO>"+precoUnitario+"</PRECOUNITARIO>"			+ "\n" +
								"<CODCOLTBORCAMENTO>"+codcoltborcam+"</CODCOLTBORCAMENTO>"	+ "\n" +
								"<CODTBORCAMENTO>"+codtborcamento+"</CODTBORCAMENTO>"		+ "\n" +
								"<DATAEMISSAO>"+dataEmissao+"</DATAEMISSAO>"				+ "\n" +
								"<QUANTIDADEARECEBER>"+quantidade+"</QUANTIDADEARECEBER>"	+ "\n" +
								"<VALORTOTALITEM>"+precoUnitario+"</VALORTOTALITEM>"		+ "\n" +
								"<CODFILIAL>"+codFilial+"</CODFILIAL>"						+ "\n" +
								"<NSEQITMMOV>"+Nnseqitmcnt+"</NSEQITMMOV>"					+ "\n" +
								"<CODTB2FAT>"+codTb2Fat+"</CODTB2FAT>"						+ "\n" +
								"<CODTB4FAT>"+codTb4Fat+"</CODTB4FAT>"						+ "\n" +
								"<CODDEPARTAMENTO>"+codDepartamento+"</CODDEPARTAMENTO>"	+ "\n" +
							"</INT_TITMMOV_IMP>"											+ "\n\n" +

							"<INT_TITMMOVHISTORICO_IMP>"									+ "\n" +
								"<STATUS_INT>"+status+"</STATUS_INT>"						+ "\n" +
								"<OPERACAO_INT>"+operacao+"</OPERACAO_INT>"					+ "\n" +
								"<DATAINSERCAO_INT>"+dataInsercao+"</DATAINSERCAO_INT>"		+ "\n" +
								"<CODCOLIGADA>"+codColigada+"</CODCOLIGADA>"				+ "\n" +
								"<NSEQITMMOV>"+nseqitmmov+"</NSEQITMMOV>"					+ "\n" +
								"<HISTORICOCURTO>"+historicoCurtoTitmov+"</HISTORICOCURTO>"	+ "\n" +
								"<CHAVEORIGEM_INT>"+chaveOrigem+"</CHAVEORIGEM_INT>"		+ "\n" +
							"</INT_TITMMOVHISTORICO_IMP>";
				
				/*Rateio por itens do pedido*/     		
			    var i 			= 0;
			    var process 	= getValue("WKNumProces");
			    var cardData	= new java.util.HashMap();
				cardData 		= hAPI.getCardData(process);
				var keys 		= cardData.keySet().toArray();
				
				for ( var key in keys) {
					var field = keys[key];
					if (field.indexOf("centroCusto_zoom___") > -1) {
					
						var row	= field.replace("centroCusto_zoom___", "");
						
						/*VARIAVEIS INT_TMOVRATCCU_IMP*/                      
						var codCentroCustoProd	= hAPI.getCardValue("codCusto" + "___" + row);
						//var percentual			= hAPI.getCardValue("percentual" + "___" + row);
						var historicoRateioProd	= "1";
						//var valorRateioProd		= valorTotalItem;
						//var vlRateioProd = formatMoeda(hAPI.getCardValue("valorRatMoeda" + "___" + row));
						var vlRateioProd = hAPI.getCardValue("valorRatMoeda" + "___" + row);
						
					
						//Construcao da terceira parte do XML INT_TITMMOVRATCCU_IMP						
						var xml = xml +  "\n\n" +
						
										"<INT_TITMMOVRATCCU_IMP>"										+ "\n" +
											"<STATUS_INT>"+status+"</STATUS_INT>"						+ "\n" +
											"<OPERACAO_INT>"+operacao+"</OPERACAO_INT>"					+ "\n" +
											"<DATAINSERCAO_INT>"+dataInsercao+"</DATAINSERCAO_INT>"		+ "\n" +
											"<DATATRANSACAO_INT>"+dataTransacao+"</DATATRANSACAO_INT>"	+ "\n" +
											"<CHAVEORIGEM_INT>"+chaveOrigem+"</CHAVEORIGEM_INT>"		+ "\n" +
											"<CODCOLIGADA>"+codColigada+"</CODCOLIGADA>"				+ "\n" +
											"<CODCCUSTO>"+codCentroCustoProd+"</CODCCUSTO>"				+ "\n" +
											"<NSEQITMMOV>"+nseqitmmov+"</NSEQITMMOV>"					+ "\n" +
											"<VALOR>"+vlRateioProd+"</VALOR>"							+ "\n" +
											"<HISTORICO>"+historicoRateioProd+"</HISTORICO>"			+ "\n" +
										"</INT_TITMMOVRATCCU_IMP>";
						i++;
					}
				}

				i++;
				nseqitmmov = parseInt(nseqitmmov)+1;
			}
		}
		
	xml = xml + "\n\n" + "</NewDataSet>";
	
	
	// Parametros de acesso ao Servico.	
	var serviceName 	= "wsECMhml";										
	var servicePackage	= "org.tempuri.WsECM";		


	var servico = ServiceManager.getService(serviceName);
	var serviceHelper = servico.getBean();
	var instancia = servico.instantiate(servicePackage);
	var ws = instancia.getWsECMSoap();
	var result = ws.insereMovimentoManutencao(codColigada, xml, chave);
	var erroresult	= result.substring(0, 3);
	//hAPI.setCardValue("idmov",erroresult);
	//hAPI.setCardValue("codsuperior2",result);
	
	if(erroresult == "555" || erroresult != "FLU"){
		
		throw "<br/><strong>Ocorreu o Seguinte erro: </strong><br/> valor do rateio: "+vlRateio + result;

	}
}
	
 } catch(error) { 
	log.error(error);
	throw error;
 }
}

/*Função para formatar em moeda*/
function formatMoeda(valor){
	
	var v = valor.toString();	
	
	if (v != ""){
		
		var aValores = v.split('.');
		if (aValores.length <= 1)
			v += '00';
		else{
			if (aValores[1].toString().length <= 1)
				v = aValores[0].toString() + aValores[1].toString() + '0';
			else{
				
				//Formata valor em 2 casas decimais
				var valor = parseFloat(v);
				valor = valor.toFixed(2);
				v = valor.toString();
			}
		}
	}
			
	v=v.replace(/\D/g,""); // permite digitar apenas numero 
	v=v.replace(/(\d{1})(\d{14})$/,"$1.$2"); 	// coloca ponto antes dos ultimos digitos 
	v=v.replace(/(\d{1})(\d{11})$/,"$1.$2"); 	// coloca ponto antes dos ultimos 11 digitos 
	v=v.replace(/(\d{1})(\d{8})$/,"$1.$2");		// coloca ponto antes dos ultimos 8 digitos 
	v=v.replace(/(\d{1})(\d{5})$/,"$1.$2"); 	// coloca ponto antes dos ultimos 5 digitos 
	v=v.replace(/(\d{1})(\d{1,2})$/,"$1,$2");	// coloca virgula antes dos ultimos 2 digitos 
		
	return v;

}