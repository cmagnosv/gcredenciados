function servicetask5(attempt, message) {
 try {
		 var numSolicitacao			= getValue("WKNumProces");
		 var tipomovimento 			=  hAPI.getCardValue("tipomovimento");
		 
			var atividade = getValue("WKNumState");
		
		    var ds_chave_rm 	= DatasetFactory.getDataset("ds_chave_rm", null, null, null);
			var chave			= ds_chave_rm.getValue(0, "CHAVE");
			var codColigada				=ds_chave_rm.getValue(0, "CODCOLIGADA");

		 // alteração
		 if(tipomovimento=="A"){
				 	var status		 			= "A";
					var operacao				= "A";
			 }
		 if(tipomovimento=="C"){
				 	var status		 			= "A";
					var operacao				= "C";
			 }
		 if(tipomovimento=="I"){
				 // inclusão
				 var status		 			= "I";
				 var operacao				= "I";
			 }
		 


			
			/*VARIAVEIS INT_TMOV_IMP*/

			
			
			var dataInsercao			= data();
			var chaveOrigem				= "FLUIG-" + numSolicitacao;
			var dataTransacao			= dataInsercao;
			//var codColigada				= hAPI.getCardValue("codcoligada");
			var codFilial				= "1";
			var codLoc					= "01";
			var codCfo					= hAPI.getCardValue("idFornecedor");
			var serie           		= hAPI.getCardValue("serie");
			var codTMV					= hAPI.getCardValue("TipoComprometimento"); 
			var movImpresso   			= "1";
			var docImpresso   			= "0";
			var fatImpressa   			= "0";
			var dataEmissao				= hAPI.getCardValue("DataComprometimento");
			var dataSaida				= hAPI.getCardValue("DataComprometimento");
			var codMoedaVl    			= "R$";
			var codColCfo				= codColigada;
			var geradoPorLote			= "0";
			var gerouConta				= "0";
			var geradoPorContaTrabalho	= "0";
			var gerouContaTrabalho		= "0";
			var codCpg					= "01";
			var campoLivre1  			= chaveOrigem;
			var campoLivre2  			= hAPI.getCardValue("tituloComprometimento");
			var codVend1      			= hAPI.getCardValue("codVen");
			var idcontrato      			= hAPI.getCardValue("idcontrato");
			var idseqcnt	= 0;
			var dsccontrato = "";
			var dscnf ="";
			var codcxa =  hAPI.getCardValue("codcxa"); 
			
				dsccontrato= "<IDCNT>"+idcontrato+"</IDCNT>";		
				
				//idseqcnt = hAPI.getCardValue("item");
						
				dscnf="<NUMEROMOV>"+hAPI.getCardValue("nf")+"</NUMEROMOV>"		
			/*VARIAVEIS INT_TMOVCOMPL_IMP*/          
			var origemPagamento	= ""; //010 => credenciamento

			/*VARIAVEIS INT_TMOVHISTORICO_IMP*/
			var historicoCurtoTmovHis	= hAPI.getCardValue("justificativa");
			var historicoLongoTmovHis	= hAPI.getCardValue("justificativa");

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
							"<DATAENTREGA>"+dataSaida+"</DATAENTREGA>"											+ "\n" +
							"<PRAZOENTREGA>0</PRAZOENTREGA>"											+ "\n" +
							"<CODMOEVALORLIQUIDO>"+codMoedaVl+"</CODMOEVALORLIQUIDO>"						+ "\n" +
							"<CODCOLCFO>"+codColCfo+"</CODCOLCFO>"											+ "\n" +
							"<GERADOPORLOTE>"+geradoPorLote+"</GERADOPORLOTE>"								+ "\n" +
							//"<CODDEPARTAMENTO>"+codDepartamento+"</CODDEPARTAMENTO>"						+ "\n" +
							"<GEROUCONTATRABALHO>"+gerouConta+"</GEROUCONTATRABALHO>"						+ "\n" +
							"<GERADOPORCONTATRABALHO>"+geradoPorContaTrabalho+"</GERADOPORCONTATRABALHO>"	+ "\n" +
							"<CODCPG>"+codCpg+"</CODCPG>"													+ "\n" +
							"<CAMPOLIVRE1>"+campoLivre1+"</CAMPOLIVRE1>"									+ "\n" +
							// "<CAMPOLIVRE2>"+campoLivre2+"</CAMPOLIVRE2>"									+ "\n" +
							"<CODVEN1>"+codVend1+"</CODVEN1>"												+ "\n" +
							"<CODCXA>"+codcxa+"</CODCXA>"												+ "\n" +
							dscnf + "\n" +	
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
			var idprodutoanterior=0;

			for ( var key in keys) {
				var field = keys[key];
				if (field.indexOf("idproduto___") > -1) {
			
					var row = field.replace("idproduto___", "");

					/*VARIAVEIS INT_TITMMOV_IMP*/                
					var idPrd					= hAPI.getCardValue("idproduto" 		+ "___" + row);
					var codtb1fat				= hAPI.getCardValue("codtb1fat" 	+ "___" + row);
					var codDepartamento			= hAPI.getCardValue("coddepartamento");
					var quantidade				= 1;
					var precoUnitario			= hAPI.getCardValue("valorRatMoeda" + "___" + row);
					idseqcnt					= hAPI.getCardValue("item" + "___" + row);
					var valorTotalItem			= precoUnitario;
					//vlTotalItemMoeda			= formatMoeda(valorTotalItem);
					var Nnseqitmcnt				= nseqitmmov;
					var dataEmissao				= dataInsercao;
					var codFilial				= "1";
					var historicoCurtoTitmov	= "1";
					//var codcoltborcam			= "1";
					var codtborcamento			= "001";
					var codTb2Fat				= hAPI.getCardValue("origemrecurso");
					//if(idprodutoanterior != idPrd){
					
				//	vlTotalItemMoeda
//					var codDepartamento			= "01";
					//var codDepartamento			= "1000";
					
					//Construcao da terceira parte do XML INT_TITMMOV_IMP, INT_TITMMOVHISTORICO_IMP					
					xml = xml+  "\n\n" +
					
								"<INT_TITMMOV_IMP>"+ "\n" +
									"<STATUS_INT>"+status+"</STATUS_INT>"						+ "\n" +
									"<OPERACAO_INT>"+operacao+"</OPERACAO_INT>"					+ "\n" +
									"<DATAINSERCAO_INT>"+dataInsercao+"</DATAINSERCAO_INT>"		+ "\n" +
									"<CHAVEORIGEM_INT>"+chaveOrigem+"</CHAVEORIGEM_INT>"		+ "\n" +
									"<CODCOLIGADA>"+codColigada+"</CODCOLIGADA>"				+ "\n" +
									"<NSEQITMCNT>"+idseqcnt+"</NSEQITMCNT>"					+ "\n" +
									"<CODTB1FAT>"+codtb1fat+"</CODTB1FAT>"						+ "\n" +
									"<IDPRD>"+idPrd+"</IDPRD>"									+ "\n" +
									"<QUANTIDADE>"+quantidade+"</QUANTIDADE>"					+ "\n" +
									"<PRECOUNITARIO>"+precoUnitario+"</PRECOUNITARIO>"			+ "\n" +
									"<CODCOLTBORCAMENTO>"+codColigada+"</CODCOLTBORCAMENTO>"	+ "\n" +
									"<CODTBORCAMENTO>"+codtborcamento+"</CODTBORCAMENTO>"		+ "\n" +
									"<DATAEMISSAO>"+dataEmissao+"</DATAEMISSAO>"				+ "\n" +
									"<QUANTIDADEARECEBER>"+quantidade+"</QUANTIDADEARECEBER>"	+ "\n" +
									"<VALORTOTALITEM>"+precoUnitario+"</VALORTOTALITEM>"		+ "\n" +
									"<CODFILIAL>"+codFilial+"</CODFILIAL>"						+ "\n" +
									"<NSEQITMMOV>"+nseqitmmov+"</NSEQITMMOV>"					+ "\n" +
									"<CODTB2FAT>"+codTb2Fat+"</CODTB2FAT>"						+ "\n" +
									"<CODDEPARTAMENTO>"+codDepartamento+"</CODDEPARTAMENTO>"	+ "\n" +
									dsccontrato+ "\n" +			
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
					//}
					/*Rateio por itens do pedido*/     		
				    //var i 			= 0;
				    //var process 	= getValue("WKNumProces");
				    //var cardData	= new java.util.HashMap();
					//cardData 		= hAPI.getCardData(process);
					//var keys 		= cardData.keySet().toArray();
					
					//for ( var key in keys) {
						//var field = keys[key];
			//			if (field.indexOf("centroCusto_zoom___") > -1) {
						
							//var row	= field.replace("centroCusto_zoom___", "");
							
							/*VARIAVEIS INT_TMOVRATCCU_IMP*/                      
							var codCentroCustoProd	= hAPI.getCardValue("codCusto" + "___" + row);
							//var percentual			= hAPI.getCardValue("percentual" + "___" + row);
							var historicoRateioProd	= "1";
							
							//var vlRateioProd = formatMoeda(valorTotalItem);
						//	var vlRateioProd = hAPI.getCardValue("valorRatMoeda" + "___" + row);
							
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
												"<VALOR>"+precoUnitario+"</VALOR>"							+ "\n" +
												"<HISTORICO>"+historicoRateioProd+"</HISTORICO>"			+ "\n" +
											"</INT_TITMMOVRATCCU_IMP>";
							//i++;
					//	}
					//}

					i++;
					nseqitmmov = parseInt(nseqitmmov)+1;
					idprodutoanterior= idPrd;
				}
			}
			
		xml = xml + "\n\n" + "</NewDataSet>";
		log.warn("Montando XML precomprometimento oagamento de parcela: " + xml);
		
		// Parametros de acesso ao Servico.	
		var serviceName 	= "wsECMhml";										
		var servicePackage	= "org.tempuri.WsECM";		
	//	var ds_chave_rm 	= DatasetFactory.getDataset("ds_chave_rm", null, null, null);
		//var ds_chave_rm 	= DatasetFactory.getDataset("rm_ds_chave", null, null, null);
		
		//var chave			= ds_chave_rm.getValue(0, "CHAVE");

		var servico = ServiceManager.getService(serviceName);
		var serviceHelper = servico.getBean();
		var instancia = servico.instantiate(servicePackage);
		var ws = instancia.getWsECMSoap();
		var result = ws.insereMovimentoManutencao(codColigada, xml, chave);

		
		var erroresult	= result.substring(0, 3);
		//hAPI.setCardValue("idmov",erroresult);
		//hAPI.setCardValue("codsuperior2",result);

		
		if(erroresult == "555" || erroresult != "FLU"){
			
			hAPI.setCardValue('tipomovimento','I');	
			
			throw "<br/><strong>Ocorreu o Seguinte erro: </strong><br/>" + result;
			
			}
			
		if( erroresult == "FLU"){
			
			hAPI.setCardValue('tipomovimento','A');	
			var constraintRm_ds_id_movxfluig_hml1 = DatasetFactory.createConstraint('CHAVEORIGEM', result, result, ConstraintType.MUST);
			var datasetRm_ds_id_movxfluig_hml = DatasetFactory.getDataset('rm_ds_id_movxfluig_hml', null, new Array(constraintRm_ds_id_movxfluig_hml1), null);
			
			hAPI.setCardValue('idmov',datasetRm_ds_id_movxfluig_hml.getValue(0,"IDMOV"));
				
		}
		
	 
	 
 } catch(error) { 
	log.error(error);
	throw error;
 }
 
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
		v=v.replace(/(\d{1})(\d{8})$/,"$1.$2"); 	// coloca ponto antes dos ultimos 8 digitos 
		v=v.replace(/(\d{1})(\d{5})$/,"$1.$2"); 	// coloca ponto antes dos ultimos 5 digitos 
		v=v.replace(/(\d{1})(\d{1,2})$/,"$1,$2"); 	// coloca virgula antes dos ultimos 2 digitos 
			
		return v;
	}

}

function data(){
	var datetime = new Date();
	// format the output
	var month = datetime.getMonth()+1;
	if (month.toString().length ==1){
		month='0'+month;
	}
	
	var day = datetime.getDate();
	if (day.toString().length ==1){
		day='0'+day;
		
	}
	
	var year = datetime.getFullYear();
	return day+'/'+month+'/'+year;
	
}