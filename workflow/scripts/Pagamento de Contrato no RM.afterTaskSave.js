function afterTaskSave(colleagueId,nextSequenceId,userList){
	var numSolicitacao	= getValue("WKNumProces");
	var contrato= hAPI.getCardValue("lbcontrato");
	var credenciado = hAPI.getCardValue("lbFornecedor");
	var justificativa = hAPI.getCardValue("justificativa");
	var unidade = hAPI.getCardValue("Unidade");
	var solicitante = hAPI.getCardValue("Solicitante");

	
	
	
	if(hAPI.getCardValue("DataCriacao") == null || hAPI.getCardValue("DataCriacao") == undefined || hAPI.getCardValue("DataCriacao") == ''){
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
		hAPI.setCardValue('DataCriacao',day+'/'+month+'/'+year);
		hAPI.setCardValue('data1',year+month+day);
		}
	hAPI.setCardValue('codigoFluig',numSolicitacao);
	
	// ETAPA CRIAÇÃO PROCESSO
	if(atividade == 0 || atividade == 4 || atividade == undefined ){
		// titulo= hAPI.getCardValue("numeroContrato")+', resumo: '+hAPI.getCardValue("justificativa");	
		comentario= "Foi criado um pagamento para o credenciado "+credenciado+"(Contrato nº "+contrato+"), resumo do pagamento: "+justificativa+", Solicitante: "+solicitante+"-"+unidade;
		
		}
	
	if(atividade == 46){
		var conformecontroladoria = hAPI.getCardValue("conformecontroladoria");
		var parecercontroladoria = hAPI.getCardValue("parecercontroladoria");
		var Tcontroladoria = hAPI.getCardValue("Tcontroladoria");
		if(conformecontroladoria == "S"){
			comentario= "O pagamento: "+justificativa+" foi validado por "+Tcontroladoria;	
		}else{
			comentario= "O "+Tcontroladoria+" solicitou ajuste "+parecercontroladoria;
		}
	}
		if(atividade == 49){
			var pagamentosFINANCEIRO = hAPI.getCardValue("pagamentosFINANCEIRO");
			var parecerTpagamentosFINANCEIRO = hAPI.getCardValue("parecerTpagamentosFINANCEIRO");
			var TpagamentosFINANCEIRO = hAPI.getCardValue("TpagamentosFINANCEIRO");
			
			if(pagamentosFINANCEIRO == "S"){
				comentario= "O pagamento: "+justificativa+" foi recebido por "+TpagamentosFINANCEIRO;	
			}else{
				comentario= "O "+TpagamentosFINANCEIRO+" solicitou ajuste "+parecerTpagamentosFINANCEIRO;
			}
		
			
		// titulo= hAPI.getCardValue("numeroContrato")+', resumo: '+hAPI.getCardValue("justificativa");	
		
		
		}
			
		
	if(comentario!=""){
		hAPI.setCardValue("titulo",comentario);
		hAPI.setTaskComments(usuario, numSolicitacao, 0, comentario);
	}
}