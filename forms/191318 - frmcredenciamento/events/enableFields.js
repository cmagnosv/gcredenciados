function enableFields(form){
try{
		var atividade = getValue("WKNumState");

		//var atividadeInicio				 = (atividade != 0 || atividade != 11 || atividade != 18 || atividade != 25 || atividade != 32 );
		var atividadeInicio				 = (atividade == 0 || atividade == 18 || atividade == 25 || atividade == 32 || atividade == 212 || atividade == 248 || atividade == 362 );
		 
		var liberado= [];
		var bloqueado = [];
		
		// 
		bloqueado.push("codigoFluig");
		bloqueado.push("DataCriacao");
		bloqueado.push("idmov");
		bloqueado.push("IDCNT");
		bloqueado.push("codigoContrato");
		bloqueado.push("nomeSuperior");
		bloqueado.push("nomeControladoria");
		bloqueado.push("nomeTecnico");
		bloqueado.push("nomeAutorizante");
		bloqueado.push("nomeAssinanteSuperior");
		bloqueado.push("nomeAssinanteSuperior2");
		bloqueado.push("totalitens");
		bloqueado.push("totalitenspag");
		bloqueado.push("saldoitenspag");
		bloqueado.push("codigoFluig");
		bloqueado.push("DataCriacao");
		bloqueado.push("idmov");
		bloqueado.push("IDCNT");
		
		var indexDocs = form.getChildrenIndexes("tb_docs");
		 for (var i=0; i < indexDocs.length; i++) {
				
				bloqueado.push("ORDEMDOCS___"+indexDocs[i]);
				bloqueado.push("DOCS___"+indexDocs[i]);
				bloqueado.push("CODIGODOCS_filho___"+indexDocs[i]);
			
			}
		
		 if(atividadeInicio){

			 liberado.push("codigoContrato");
			 liberado.push("nomeSuperior");
			 liberado.push("nomeControladoria");
			 liberado.push("nomeTecnico");
			 liberado.push("nomeAutorizante");
			 liberado.push("nomeAssinanteSuperior");
			 liberado.push("nomeAssinanteSuperior2");
			 
			 liberado.push("origemrecurso");
			 liberado.push("numeroContrato");
			 liberado.push("credenciado");
			 liberado.push("prodsebrae");
			 liberado.push("evento");
			 liberado.push("departamento");
			 liberado.push("DATAINICIO");
			 liberado.push("DATAFIM");
			 liberado.push("DATAASSINATURA");
			 liberado.push("parcelas");
			 liberado.push("catobj");
			 liberado.push("DATAVIGENCIA");
			 liberado.push("valorHora");
			 liberado.push("justificativa");
			 liberado.push("obs");
	
			 
		var indexRateio = form.getChildrenIndexes("tb_rateio");
		for (var i=0; i < indexRateio.length; i++) {
				liberado.push("item___"+indexRateio[i]);
				liberado.push("servico___"+indexRateio[i]);
				liberado.push("projeto_zoom___"+indexRateio[i]);
				liberado.push("acao_zoom___"+indexRateio[i]);
				liberado.push("centroCusto_zoom___"+indexRateio[i]);
				liberado.push("valorRatMoeda___"+indexRateio[i]);
			}
		
	/*	var indexDocs = form.getChildrenIndexes("tb_docs");
		 for (var i=0; i < indexDocs.length; i++) {
				
			 liberado.push("ORDEMDOCS___"+indexDocs[i]);
			 liberado.push("DOCS___"+indexDocs[i]);
			 liberado.push("CODIGODOCS_filho___"+indexDocs[i]);
			
			}*/
		 }else{
			 bloqueado.push("codigoContrato");
			 bloqueado.push("nomeSuperior");
			 bloqueado.push("nomeControladoria");
			 bloqueado.push("nomeTecnico");
			 bloqueado.push("nomeAutorizante");
			 bloqueado.push("nomeAssinanteSuperior");
			 bloqueado.push("nomeAssinanteSuperior2");
			 
			 bloqueado.push("origemrecurso");
			 bloqueado.push("numeroContrato");
			 bloqueado.push("credenciado");
			 bloqueado.push("prodsebrae");
			 bloqueado.push("evento");
			 bloqueado.push("departamento");
			 bloqueado.push("DATAINICIO");
			 bloqueado.push("DATAFIM");
			 bloqueado.push("DATAASSINATURA");
			 bloqueado.push("parcelas");
			 bloqueado.push("catobj");
			 bloqueado.push("DATAVIGENCIA");
			 bloqueado.push("valorHora");
			 bloqueado.push("justificativa");
			 bloqueado.push("obs");
			 
			 var indexRateio = form.getChildrenIndexes("tb_rateio");
				for (var i=0; i < indexRateio.length; i++) {
					bloqueado.push("item___"+indexRateio[i]);
					bloqueado.push("servico___"+indexRateio[i]);
					bloqueado.push("projeto_zoom___"+indexRateio[i]);
					bloqueado.push("acao_zoom___"+indexRateio[i]);
					bloqueado.push("centroCusto_zoom___"+indexRateio[i]);
					bloqueado.push("valorRatMoeda___"+indexRateio[i]);
					}

			 
		 }

//bloquea os campos
			for(var i=0; i<bloqueado.length; i++){
					form.setEnabled(bloqueado[i], false);
			}

			//desbloqueia os campos
			for(var i=0; i<liberado.length; i++){
					form.setEnabled(liberado[i], true);
			}

			
} catch (e){
		log.error("ERROR ACOMPANHAMENTOEXTENSAO_ENABLEDFIELDS: " + e);
	}	
		

	
}