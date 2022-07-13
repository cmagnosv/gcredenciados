function displayFields(form,customHTML){ 

	var atividade = getValue("WKNumState");
	var usuarioLogado = getValue("WKUser");
	var numSolicitacao	= getValue("WKNumProces");
	form.setValue("atividadeAtual", atividade);
	var const1 = DatasetFactory.createConstraint("colleaguePK.colleagueId",usuarioLogado , usuarioLogado, ConstraintType.MUST);
	var datasetAttachment = DatasetFactory.getDataset("colleague", null, [const1], null);
	var usuario = datasetAttachment.getValue(0,"login");
	var nomeusuario = datasetAttachment.getValue(0,"colleagueName" );
	var codunidadeusuario =  datasetAttachment.getValue(0,"groupId" );
	var visivel= [];
	var oculto = [];
	//console.log("atividade "+atividade);
	//console.log("usuarioLogado "+usuarioLogado);
	//console.log("numSolicitacao "+numSolicitacao);
	//console.log("usuario "+usuario);
	//console.log("nomeusuario "+nomeusuario);
	//console.log("codunidadeusuario "+codunidadeusuario);

	
	//var datasetDs_rm_coligada_ma = DatasetFactory.getDataset('ds_rm_coligada_ma', null, null, null);
	//var codcoligada =  datasetDs_rm_coligada_ma.getValue(0,"CODCOLIGADA" );
	
	//form.setValue("codcoligada", codcoligada);
	form.setValue("codcxa", "002");
	form.setValue("atividadeAtual", atividade);
	form.setValue("userLogado",usuarioLogado );
	


	
		form.setValue("serie", "CTR");
		form.setValue("TipoComprometimento", "1.1.87");
	
		
	if(atividade==0 || atividade==4){
		
		var constraintDs_rm_contrato_valor_pago1 = DatasetFactory.createConstraint('IDCNT', form.getValue("idcontrato"), form.getValue("idcontrato"), ConstraintType.MUST);
		var datasetDs_rm_contrato_valor_pago = DatasetFactory.getDataset('ds_rm_contrato_valor_pago', null, new Array(constraintDs_rm_contrato_valor_pago1), null);
		
		form.setValue("ValorPago", datasetDs_rm_contrato_valor_pago.getValue(0,"VALORPAGO"));
		form.setValue("saldoContrato", parseFloat(form.getValue("ValorContrato"))-parseFloat(datasetDs_rm_contrato_valor_pago.getValue(0,"VALORPAGO")));
		
		//if(form.getValue("DataComprometimento")== null || form.getValue("DataComprometimento") == undefined || form.getValue("DataComprometimento") == ''){
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
			form.setValue("DataComprometimento",day+'/'+month+'/'+year );
			
			//}
		
		form.setValue('data1',year+''+month+''+day);

	
		//form.setVisibleById("divtipomovimento", 		false); 
		var constraintColleagueGroup = DatasetFactory.createConstraint('groupPK.groupId', codunidadeusuario, codunidadeusuario, ConstraintType.MUST);
		var datasetColleagueGroup = DatasetFactory.getDataset('group', null, new Array(constraintColleagueGroup), null);
		var unidade = datasetColleagueGroup.getValue(0,"groupDescription");
		
		var tratado = unidade.replace("(","#").replace(")","#");
		var separado = tratado.split("#");
		var const4 = DatasetFactory.createConstraint("cod",separado[1] , separado[1], ConstraintType.MUST);
		var datasetAttachment4 = DatasetFactory.getDataset("dsUnidadeArquivamento", null, [const4], null);
		var unidadearquivamento =  datasetAttachment4.getValue(0,"chave");
		
		
		var const2 = DatasetFactory.createConstraint("CODUSUARIO",usuario , usuario, ConstraintType.MUST);
		var const3 = DatasetFactory.createConstraint('TIPO', 'T', 'T', ConstraintType.MUST_NOT);

		var DTCODVEN = DatasetFactory.getDataset("rm_ds_codVenSup", null,new Array(const2,const3), null);
		var codven = DTCODVEN.getValue(0,"CODVEN");
		var codven1 = DTCODVEN.getValue(0,"CODVEN1");
		
		console.log("unidade "+unidade);
		console.log("separado[1] "+separado[1]);
		console.log("unidadearquivamento "+unidadearquivamento);
		console.log("codven "+codven);
		console.log("codven1 "+codven1);

		if(codven =="" || codven1 =="" || nomeusuario =="" || unidade =="" || unidadearquivamento =="" ){
			throw("seu cadastro de usuario esta incompleto, entre en contato com a UTIC e envie esta tela: CODVEN="+codven+", CODVEN1="+codven1+", NOME="+nomeusuario+", UNIDADE="+unidade+", UNIDADE ARQUIVAMENTO="+solcitante);
		}else{
		
		form.setValue("codven",codven );
		form.setValue("codven1",codven1 );
		form.setValue("Solicitante",nomeusuario);
		form.setValue("usuario",usuarioLogado );
		form.setValue("codunidadeusuario",codunidadeusuario );
		form.setValue("Unidade",unidade);
		form.setValue("codunidade",separado[1]);
		form.setValue("UnidadeArquivamento",'Pool:Group:'+unidadearquivamento);
		}
		
		if (form.getValue("tipomovimento")== "I" || form.getValue("tipomovimento")== ""){
			oculto.push("btn_adicionarChild_rateio_alerta");
			visivel.push("btn_adicionarChild_rateio");
		}else{
			oculto.push("btn_adicionarChild_rateio");
			visivel.push("btn_adicionarChild_rateio_alerta");
		}
			
		
		
	}	
	


	
	if(form.getValue("idmov")== "" ||  form.getValue("idmov") == null ){
	
//	var numSolicitacao	= getValue("WKNumProces");
	var chaveOrigem		= "FLUIG-" + numSolicitacao;
	
	var constraint		= DatasetFactory.createConstraint("CHAVEORIGEM", chaveOrigem, chaveOrigem, ConstraintType.MUST);
	var constraints		= new Array(constraint);
	var dataset;
	var idMov;
	
	//constraints.push(constraint);
	dataset		= DatasetFactory.getDataset("rm_ds_id_mov",null, constraints, null);
	idMov		= dataset.getValue(0, "IDMOV");

	form.setValue("IDMOV",idMov);
	form.setValue("codigo", idMov);
	
	if(form.getValue("idmov")== "" ||  form.getValue("idmov") == null ){
		form.setValue("tipomovimento",'I');
		form.setVisibleById("idGerarRelatorioRM", 		false);
	}else{
		form.setValue("tipomovimento",'A');
	}
}


/*if(form.getValue("codigo")=="" ||form.getValue("codigo")==null){
	
	form.setValue("codigo", numSolicitacao);

}*/
if(form.getValue("codigoFluig")=="" ||form.getValue("codigoFluig")==null){
	
	form.setValue("codigoFluig","FLUIG-" + numSolicitacao);

}

if(atividade==44){
	visivel.push("divpagamentoscontroladoria");
	
}else{
	oculto.push("divpagamentoscontroladoria");	
}
if(atividade==26){
	visivel.push("divpagamentosFINANCEIRO");
	
}else{
	oculto.push("divpagamentosFINANCEIRO");	
}


for(var i=0; i<oculto.length; i++){
	form.setVisibleById(oculto[i], false);
}

//torna visivel os campos
for(var i=0; i<visivel.length; i++){
	form.setVisibleById(visivel[i], true);
}

}