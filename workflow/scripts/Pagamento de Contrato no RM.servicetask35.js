function servicetask35(attempt, message) {
	 try {
		 var numSolicitacao			= getValue("WKNumProces");
		 var tipomovimento 			=  hAPI.getCardValue("tipomovimento");
		 var saldoitenspag 			=  parseFloat(hAPI.getCardValue("saldoitenspag"));
		 var chaveOrigem				= hAPI.getCardValue("codigo_fluigOrigem");
		 
		 var constraintDsPaiFilhoItensCredenciado1 = DatasetFactory.createConstraint('CHAVE', hAPI.getCardValue("codigo_fluigOrigem"), hAPI.getCardValue("codigo_fluigOrigem"), ConstraintType.MUST);
		 var datasetDsPaiFilhoItensCredenciado = DatasetFactory.getDataset('dsPaiFilhoItensCredenciado', null, new Array(constraintDsPaiFilhoItensCredenciado1), null);
		 chaveOrigem				= String(chaveOrigem).split(".");
		 chaveOrigem 				= "FLUIG-" +chaveOrigem[3];
		// log.warn("chaveorigem: " + chaveOrigem+"=> chaveorigemM "+chaveOrigemM);
			var atividade = getValue("WKNumState");
		
		    var ds_chave_rm 	= DatasetFactory.getDataset("ds_chave_rm", null, null, null);
			var chave			= ds_chave_rm.getValue(0, "CHAVE");
			var codColigada		= ds_chave_rm.getValue(0, "CODCOLIGADA");

		 // alteração
		 if(saldoitenspag>0){
				 	var status		 			= "A";
					var operacao				= "A";
			 }else{
				 	var status		 			= "A";
					var operacao				= "C";
			 }
			
			/*VARIAVEIS INT_TMOV_IMP*/
				
			var dataInsercao			= hAPI.getCardValue("DataCriacaoOrigem");
			var dataTransacao			= dataInsercao;
			var codDepartamento			= hAPI.getCardValue("coddepartamento");
			
/*			var codFilial				= "1";
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
			if(codTMV=="1.1.87"){
				dsccontrato= "<IDCNT>"+idcontrato+"</IDCNT>";		
				idseqcnt = hAPI.getCardValue("NSEQITMCNT");
				};
				if(codTMV=="1.2.07"){
				
				dscnf="<NUMEROMOV>"+hAPI.getCardValue("nf")+"</NUMEROMOV>"		
				}*/
			/*VARIAVEIS INT_TMOVCOMPL_IMP*/          
			var origemPagamento	= ""; //010 => credenciamento

			/*VARIAVEIS INT_TMOVHISTORICO_IMP*/ 
			var historicoCurtoTmovHis	= hAPI.getCardValue("justificativaOrigem"); 
			var historicoLongoTmovHis	= historicoCurtoTmovHis;

			//Construcao da primeira parte do xml INT_TMOV_IMP, INT_TMOVCOMPL_IMP, INT_TMOVHISTORICO_IMP
			var xml	=  "\n" +
			
						"<NewDataSet>"																		+ "\n" +
							"<INT_TMOV_IMP>"																+ "\n" +
							"<STATUS_INT>"+status+"</STATUS_INT>"											+ "\n" +
							"<OPERACAO_INT>"+operacao+"</OPERACAO_INT>"										+ "\n" +
							"<DATAINSERCAO_INT>"+dataInsercao+"</DATAINSERCAO_INT>"							+ "\n" +
							"<CHAVEORIGEM_INT>"+chaveOrigem+"</CHAVEORIGEM_INT>"							+ "\n" +
							"<CODCOLIGADA>"+codColigada+"</CODCOLIGADA>"									+ "\n" +
							/* "<CODFILIAL>"+codFilial+"</CODFILIAL>"											+ "\n" +
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
							*/	
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
			//log.warn("antes do laço: numero de loops " + datasetDsPaiFilhoItensCredenciado.rowsCount);
			var i =1;
			for (var key = 0; key < datasetDsPaiFilhoItensCredenciado.rowsCount; key++) {
				
				
					/*VARIAVEIS INT_TMOVRATCCU_IMP*/                      
					var codCentroCusto	= datasetDsPaiFilhoItensCredenciado.getValue(key,"CodCusto");
					var valorRateio		=  datasetDsPaiFilhoItensCredenciado.getValue(key,"valorRatMoeda");
					var vlRateioAtual = hAPI.getCardValue("valorRatMoeda" + "___"+ datasetDsPaiFilhoItensCredenciado.getValue(key,"item"));
					if(vlRateioAtual==null){
						vlRateio=parseFloat(valorRateio);
					}else{
						var vlRateio		= parseFloat(valorRateio)-parseFloat(vlRateioAtual);
					}
					
					
					log.warn("dentro do laço: numero de loops, key " + key+"=>  vlRateioAtual "+vlRateioAtual+" => vlRateio "+vlRateio);
				//	var historicoTmov	= "1";

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
										//"<HISTORICO>"+historicoTmov+"</HISTORICO>"					+ "\n" +
									"</INT_TMOVRATCCU_IMP>";
				i++;
				}
			
			
			/*Itens do Pedido*/		
			var nseqitmmov		= 1;
			//var idprodutoanterior=0;

			for (var key = 0; key < datasetDsPaiFilhoItensCredenciado.rowsCount; key++) {

					/*VARIAVEIS INT_TITMMOV_IMP*/                
					var idPrd					= datasetDsPaiFilhoItensCredenciado.getValue(key,"idproduto"); 
					//hAPI.getCardValue("idproduto" 		+ "___" + row);
				//	var codtb1fat				= hAPI.getCardValue("codtb1fat" 	+ "___" + row);
				
					var quantidade				= 1;
					var precoUnitario			= datasetDsPaiFilhoItensCredenciado.getValue(key,"valorRatMoeda");
					var valorRateio		=  datasetDsPaiFilhoItensCredenciado.getValue(key,"valorRatMoeda");
					var vlRateioAtual = hAPI.getCardValue("valorRatMoeda" + "___"+ datasetDsPaiFilhoItensCredenciado.getValue(key,"item"));
					
					if(vlRateioAtual==null){
						vlRateio=parseFloat(valorRateio);
					}else{
						var vlRateio		= parseFloat(valorRateio)-parseFloat(vlRateioAtual);
					}
					
					
					//var vlRateio		= parseFloat(precoUnitario)-parseFloat(vlRateioAtual);
					var valorTotalItem			= parseFloat(precoUnitario)-parseFloat(vlRateioAtual);
					//vlTotalItemMoeda			= formatMoeda(valorTotalItem);
					var Nnseqitmcnt				= nseqitmmov;
					var dataEmissao				= dataInsercao;
				//	var codFilial				= "1";
				//	var historicoCurtoTitmov	= "1";
					//var codcoltborcam			= "1";
				//	var codtborcamento			= "001";
					// var codTb2Fat				= hAPI.getCardValue("origemrecurso");
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
									//"<NSEQITMCNT>"+idseqcnt+"</NSEQITMCNT>"					+ "\n" +
								// <CODTB1FAT>"+codtb1fat+"</CODTB1FAT>"						+ "\n" +
									"<IDPRD>"+idPrd+"</IDPRD>"									+ "\n" +
									"<QUANTIDADE>"+quantidade+"</QUANTIDADE>"					+ "\n" +
									"<PRECOUNITARIO>"+vlRateio+"</PRECOUNITARIO>"			+ "\n" +
								//	"<CODCOLTBORCAMENTO>"+codColigada+"</CODCOLTBORCAMENTO>"	+ "\n" +
								//	"<CODTBORCAMENTO>"+codtborcamento+"</CODTBORCAMENTO>"		+ "\n" +
								//	"<DATAEMISSAO>"+dataEmissao+"</DATAEMISSAO>"				+ "\n" +
									"<QUANTIDADEARECEBER>"+quantidade+"</QUANTIDADEARECEBER>"	+ "\n" +
									"<VALORTOTALITEM>"+vlRateio+"</VALORTOTALITEM>"		+ "\n" +
								//	"<CODFILIAL>"+codFilial+"</CODFILIAL>"						+ "\n" +
									"<NSEQITMMOV>"+nseqitmmov+"</NSEQITMMOV>"					+ "\n" +
							//		"<CODTB2FAT>"+codTb2Fat+"</CODTB2FAT>"						+ "\n" +
								//	"<CODDEPARTAMENTO>"+codDepartamento+"</CODDEPARTAMENTO>"	+ "\n" +
							//		dsccontrato+ "\n" +			
								"</INT_TITMMOV_IMP>"											+ "\n\n" +

								"<INT_TITMMOVHISTORICO_IMP>"									+ "\n" +
									"<STATUS_INT>"+status+"</STATUS_INT>"						+ "\n" +
									"<OPERACAO_INT>"+operacao+"</OPERACAO_INT>"					+ "\n" +
									"<DATAINSERCAO_INT>"+dataInsercao+"</DATAINSERCAO_INT>"		+ "\n" +
									"<CODCOLIGADA>"+codColigada+"</CODCOLIGADA>"				+ "\n" +
									"<NSEQITMMOV>"+nseqitmmov+"</NSEQITMMOV>"					+ "\n" +
									"<HISTORICOCURTO>"+historicoCurtoTmovHis+"</HISTORICOCURTO>"	+ "\n" +
									"<CHAVEORIGEM_INT>"+chaveOrigem+"</CHAVEORIGEM_INT>"		+ "\n" +
								"</INT_TITMMOVHISTORICO_IMP>";
				
							
							/*VARIAVEIS INT_TMOVRATCCU_IMP*/                      
							var codCentroCustoProd	=datasetDsPaiFilhoItensCredenciado.getValue(key,"CodCusto");
							//var percentual			= hAPI.getCardValue("percentual" + "___" + row);
						//	var historicoRateioProd	= "1";
							
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
												"<VALOR>"+vlRateio+"</VALOR>"							+ "\n" +
												"<HISTORICO>"+historicoCurtoTmovHis+"</HISTORICO>"			+ "\n" +
											"</INT_TITMMOVRATCCU_IMP>";
							//i++;
					//	}
					//}

					i++;
					nseqitmmov = parseInt(nseqitmmov)+1;
					idprodutoanterior= idPrd;
				}
			
			
		xml = xml + "\n\n" + "</NewDataSet>";
		log.warn("Montando XML precomprometimento redução de valor: " + xml);
		
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