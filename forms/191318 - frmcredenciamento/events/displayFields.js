function displayFields(form,customHTML){
	
	var atividade = getValue("WKNumState");
	var usuarioId = getValue("WKUser");
	var idsubstituto = getValue("WKReplacement");
	//var idsubstituto = usuarioId;
	
	var visivel= [];
	var oculto = [];
	
	//pega os dados do usuario 
	var const1 = DatasetFactory.createConstraint("colleaguePK.colleagueId",usuarioId , usuarioId, ConstraintType.MUST);
	var dsusuario = DatasetFactory.getDataset("colleague", null, [const1], null);
	var usuario = dsusuario.getValue(0,"colleagueName"); // Carlos Vieira , Barbara Nicolau
	var login = dsusuario.getValue(0,"login"); // carlos pega o login do usuario, barbara
	var unidade = dsusuario.getValue(0,"groupId"); // sao_luis pega o grupo principal, UGE
	
	// pega a descrição da unidade do usuario solicitante no FLUIG
	var const3 = DatasetFactory.createConstraint("groupId",unidade , unidade, ConstraintType.MUST);
	var dsunidade = DatasetFactory.getDataset("group", null, [const3], null); // - ugoc, 
	var dscunidade =  dsunidade.getValue(0,"groupDescription"); //Unidade de são luis(016) - ugoc(024), UGE(010)

	//form.getValue("IDCNT")=="0"
	
	
	if(idsubstituto=="" || idsubstituto== null){
		var substituto = usuario; // Carlos Vieira
		}else{
		
		//pega o substituto se houver
		var constsubstituto = DatasetFactory.createConstraint("colleaguePK.colleagueId",idsubstituto , idsubstituto, ConstraintType.MUST);
		var dssubstituto = DatasetFactory.getDataset("colleague", null, [constsubstituto], null);
		var substituto = dssubstituto.getValue(0,"colleagueName"); // Carlos Vieira
	}
	
	
	form.setValue("userLogado",usuarioId ); 
	form.setValue("nomeLogado",usuario );
	form.setValue("substituto",substituto );
	form.setValue("codunidadelogado",unidade ); 
	form.setValue("nomeunidadelogado",dscunidade );
	
	if(atividade==""){
		form.setValue("atividadeAtual","0" );
	}else{
		form.setValue("atividadeAtual",atividade );
	}
	
	if(form.getValue("CodEvento") ==""){
		form.setValue("CodEvento","0" );
		form.setValue("Sistema","0" );
	}
	
	
	
	oculto.push("divCaminho");
	oculto.push("concordanciaSuperior");
	oculto.push("controladoria");
	oculto.push("UnidadesTecnicas");
	oculto.push("autorizacao");
	oculto.push("divassinatura0");
	oculto.push("divassinatura1");
	oculto.push("divassinatura2");
	oculto.push("idJustificativaAutorizacao");
	oculto.push("idAssinouFornecedor");
	oculto.push("gcontratos");
	oculto.push("idajustes");
	oculto.push("check_contrato_assinado");
	oculto.push("divcontratos");
	oculto.push("divpagamentos");
	oculto.push("divpagamentosFINANCEIRO");
	oculto.push("divarquivo");
	oculto.push("btcnt");
	oculto.push("idconcordanciaSuperiorValorHoras");
	

	form.setValue("HabilitaIntegracao", 'S');
	form.setValue("HabilitaIntegracaocnt", 'S');
	
	if(form.getValue("IDCNT")=="0"){
		form.setValue("sta_contrato","001" ); // 001 = ativo, 002= cancelado. 007=encerrado
		 }
	
if(atividade>11){
	visivel.push("div_id");
	// form.setVisibleById("div_id",true);
}else{
	oculto.push("div_id");
	/*form.setVisibleById("div_id",false);*/
}
	

	if (atividade == 0 || atividade == 11){
		
		// pega o valor cadastrado no configurador do limite de licitação
		var constraintCredenciado_configurador1 = DatasetFactory.createConstraint('documentid', '191389', '191389', ConstraintType.MUST);
		var constraintCredenciado_configurador2 = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST);
		var datasetCredenciado_configurador = DatasetFactory.getDataset('credenciado_configurador', null, new Array(constraintCredenciado_configurador1, constraintCredenciado_configurador2), new Array('titulo', 'valor'));
		var valor_limite_licitacao = datasetCredenciado_configurador.getValue(0,"valor"); // 44000
		var idultimaassinatura= datasetCredenciado_configurador.getValue(0,"idultimaassinatura"); // identificando qual o codigo da unidade DISUP
		
		
		// pega a unidade superior da unidade do solicitante no RM		
		var constraintDsUnidadesRMSUP1 = DatasetFactory.createConstraint('UNIDADEFLUIG', unidade, unidade, ConstraintType.MUST);
		var datasetDsUnidadesRMSUP = DatasetFactory.getDataset('dsUnidadesRMSUP', null, new Array(constraintDsUnidadesRMSUP1), new Array('UNIDADEFLUIG', 'UNIDADEFLUIGDESCRICAO'));
		var dscunidadesup =  datasetDsUnidadesRMSUP.getValue(0,"UNIDADEFLUIGSUP"); // DITEC - DISUP, DISUP
		var dscunidadesupdsc =  datasetDsUnidadesRMSUP.getValue(0,"UNIDADEFLUIGSUPDESCRICAO"); // Diretoria Tecnica(4) -  Diretoria Superentendencia(2), Diretoria Superentendencia(2)
		
		var constraintDsUnidadesRMSUP2 = DatasetFactory.createConstraint('UNIDADEFLUIG', dscunidadesup, dscunidadesup, ConstraintType.MUST);
		var datasetDsUnidadesRMSUP1 = DatasetFactory.getDataset('dsUnidadesRMSUP', null, new Array(constraintDsUnidadesRMSUP2), new Array('UNIDADEFLUIG', 'UNIDADEFLUIGDESCRICAO'));
		var dscunidadesup1 =  datasetDsUnidadesRMSUP1.getValue(0,"UNIDADEFLUIGSUP"); // DITEC - DISUP, DISUP			

		
		//pega o superior do solicitante no RM
		var constraintDsSUP = DatasetFactory.createConstraint('CODUSUARIO', login, login, ConstraintType.MUST); // barbara 
		var datasetDsSUP = DatasetFactory.getDataset('ds_usuarioSuperior', null, new Array(constraintDsSUP),null);
		var codsuperior =  datasetDsSUP.getValue(0,"CODSUPERIOR"); // mauroformiga - roseana, glima
		var superior =  datasetDsSUP.getValue(0,"NOMESUPERIOR"); // MAURO BORGES RIBEIRO FORMIGA - ROSEANA TEREZA PACHECO RODRIGUES, GLENA CARDOSO LIMA
		var codven = datasetDsSUP.getValue(0,"CODVEN");  //- 0309, 0078 , solicitante
		var codven1 = datasetDsSUP.getValue(0,"CODVEN1");  //- 0309, 0078, gerente
		var codvenEmail = datasetDsSUP.getValue(0,"CODUSUARIO");  //- 0309, 0078
		var codven1Email = datasetDsSUP.getValue(0,"codsuperior");  //- 0309, 0078
		var CODUSUARIORM = datasetDsSUP.getValue(0,"CODUSUARIORM");  //- 0309, 0078
		
		var tipoS = datasetDsSUP.getValue(0,"TIPO");
		
		if(tipoS == "U"){
			visivel.push("div_principal");
			//oculto.push("div_mensagem");
		}else{
			visivel.push("div_mensagem");
			//oculto.push("div_principal");
			
		}
		
		//pega os dados do superior no FLUIG
		var constsup1 = DatasetFactory.createConstraint("login",codsuperior , codsuperior, ConstraintType.MUST); // glima
		var dssup1 = DatasetFactory.getDataset("colleague", null, [constsup1], null); 
		
		var matriculasup1 = dssup1.getValue(0,"colleaguePK.colleagueId");  //24567 - roseana, glima
		var unidadesup1 = dssup1.getValue(0,"groupId"); // sao_luis - UGOC, UGE
		
		// pega o usuario acima do superior no RM
		var constraintDsSUP1 = DatasetFactory.createConstraint('CODUSUARIO', codsuperior, codsuperior, ConstraintType.MUST);
		var datasetDsSUP1 = DatasetFactory.getDataset('ds_usuarioSuperior', null, new Array(constraintDsSUP1), null);
		var codsuperior1 =  datasetDsSUP1.getValue(0,"CODSUPERIOR");  //mauro - albertinoleal 
		var superior1 =  datasetDsSUP1.getValue(0,"NOMESUPERIOR"); // MAURO BORRALHO DE ANDRADE - ALBERTINO LEAL DE BARROS FILHO
		
		//pega o usuario acima do superior no FLUIG
		var constsup2 = DatasetFactory.createConstraint("login",codsuperior1 , codsuperior1, ConstraintType.MUST);
		var dssup2 = DatasetFactory.getDataset("colleague", null, [constsup2], null);
		var matriculasup2 = dssup2.getValue(0,"colleaguePK.colleagueId"); // - albertinoleal

	
		form.setValue("usuario",login );
		form.setValue("codunidadeusuario",unidade );
		form.setValue("Solicitante", usuario);
		form.setValue("Unidade", dscunidade);
		
		form.setValue("diretoria", dscunidadesup);
		form.setValue("diretoria1", dscunidadesup1);
		form.setValue("idultimaassinatura", idultimaassinatura);
		form.setValue("dscdiretoria", dscunidadesupdsc);
		form.setValue("codven", codven); //  SOLICITANTE
		form.setValue("codven1", codven1); // GERENTE
		form.setValue("CODVEN_EMAIL", codvenEmail+"@ma.sebrae.com.br"); //SOLICITANTE
		form.setValue("CODVEN1_EMAIL", codven1Email+"@ma.sebrae.com.br"); //gerente
		form.setValue("CODUSUARIORM", CODUSUARIORM); //gerente
		
		//form.setValue("codsuperior", dssup1.getValue(0,"colleaguePK.colleagueId"));
		form.setValue("EMAIL", codsuperior+"@ma.sebrae.com.br");
		form.setValue("codsuperior", matriculasup1);
		form.setValue("superior", superior);
		form.setValue("codsuperior1", matriculasup2);
		//form.setValue("codsuperior1", dssup2.getValue(0,"colleaguePK.colleagueId"));
		form.setValue("superior1", superior1);

		
		form.setValue("limitelicitacao", valor_limite_licitacao);
		form.setValue("edital_gf", "002/2018");
		form.setValue("IDCNT", "0");
		form.setValue("idmov", "0");
		form.setValue("sta_contrato","001" );
		form.setValue("tipomovimento","1.1.86" ); 
	}
		
	try{

		if((atividade==21) && form.getValue("tipomovimento")=="A" ){
		
		oculto.push("div_mensagem");
		/*
		var numSolicitacao	= getValue("WKNumProces");
		var chaveOrigem		= "FLUIG-" + numSolicitacao;
		
		var constraint		= DatasetFactory.createConstraint("CHAVEORIGEM", chaveOrigem, chaveOrigem, ConstraintType.MUST);
		var constraints		= new Array(constraint);
		var idMov="";
		
		var dtidmov		= DatasetFactory.getDataset("ds_id_mov",null, constraints, null);
		
			
			idMov		= dtidmov.getValue(0, "IDMOV");
			
		//	form.setValue("idmov",idMov);
*/
		
	}
	}catch(error) { 
		log.error(error);
		throw error;
	 }
	
	
	// Concordância Gerência
	if (atividade == 14){
		visivel.push("concordanciaSuperior");
		// form.setVisibleById("concordanciaSuperior",true);		
		
		form.setValue("nomeSuperior", usuario);
		form.setValue("dataSuperiorAprovacao", '');
		form.setValue("ConcordanciaSuperior", '');
		form.setValue("ParecerSuperior", '');	
		oculto.push("div_mensagem");
		

	}
	
	
	// Analise Controladoria
	if (atividade == 21){
		visivel.push("controladoria");
		
		// form.setVisibleById("controladoria",true);		
		form.setValue("nomeControladoria", usuario);
		form.setValue("dataHomologacaoControladoria", '');
		form.setValue("HomologacaoControladoria", '');
		form.setValue("ParecerControladoria", '');	
		oculto.push("div_mensagem");
		
	}
	
	// Analise Gerência Técnica
	if (atividade == 28){
		visivel.push("UnidadesTecnicas");
		
		// form.setVisibleById("UnidadesTecnicas",true);	
		form.setValue("conformidadeParecerTecnico", '');
		form.setValue("nomeTecnico", usuario);
		form.setValue("dataParecerTecnico", '');
		form.setValue("parecerTecnico", '');
		oculto.push("div_mensagem");
//		if(form.getValue("conformidadeParecerTecnico") != ''){
//			form.setValue("conformidadeParecerTecnico", 'Último Parecer: '+form.getValue("conformidadeParecerTecnico"));	
//		}
	}
	
	// Gerente ou Preposto ou Diretor da area autoriza contratação
	if (atividade == 93 || atividade == 104 || atividade == 120){
		visivel.push("autorizacao");
		
		// form.setVisibleById("autorizacao",true);	
		form.setValue("nomeAutorizante", usuario);
		form.setValue("dataAutorizante", '');
		form.setValue("AutorizacaoContrato", '');
		oculto.push("div_mensagem");
	}
	
	
	
	/* em desuso
	// fornecedor assina contrato
	if (atividade == 97){
		visivel.push("divassinatura0");
		
	//	form.setVisibleById("divassinatura0",true);	
		form.setValue("dataAssinouContratoFornecedor", '');
		form.setValue("AssinouContratoFornecedor", '');
		oculto.push("div_mensagem");
	}
	*/
	// 1 preposto ou diretor da area assina contrato
	if (atividade ==  79 || atividade ==  149){ 
		visivel.push("divassinatura1");
		
		//form.setVisibleById("divassinatura1",true);	
		form.setValue("nomeAssinanteSuperior", usuario);
		form.setValue("dataAssinanteSuperior", '');
		oculto.push("div_mensagem");
	}
	
var colunasDs_apoio_tecnico = new Array('roleDescription', 'workflowRolePK.roleId');
var datasetDs_apoio_tecnico = DatasetFactory.getDataset('ds_apoio_tecnico', colunasDs_apoio_tecnico, null, null);

	
	if(atividade == 231 || atividade == 79 || atividade == 224 ){
		visivel.push("check_contrato_assinado");
	}
	// 2 superior ou diretor assina contrato 
	if (atividade == 35 || atividade == 102){
		visivel.push("divassinatura2");
		
		// form.setVisibleById("divassinatura2",true);	
		form.setValue("nomeAssinanteSuperior2", usuario);
		form.setValue("dataAssinanteSuperior2", '');
		oculto.push("div_mensagem");
	}
	// anexo do extrato do contrato
	if (atividade == 109){
		visivel.push("divcontratos");
		oculto.push("div_mensagem");
		
		// form.setVisibleById("gcontratos",true);	
	}
	
	if (atividade == 246){
		
		
		visivel.push("divpagamentos");
		oculto.push("div_mensagem");
		
		// form.setVisibleById("gcontratos",true);	
	}

	if (atividade == 254){
		visivel.push("divpagamentosFINANCEIRO");
		oculto.push("div_mensagem");
		

		// form.setVisibleById("gcontratos",true);	
	}
	
	if (atividade > 245){
		visivel.push("btcnt");
		oculto.push("div_mensagem");

		// form.setVisibleById("gcontratos",true);	
	}

	
	if (atividade == 266){
		visivel.push("divarquivo");
		oculto.push("div_mensagem");

		// form.setVisibleById("gcontratos",true);	
	}
	
	if(atividade == 18 || atividade == 25 || atividade == 32 || atividade == 212 || atividade == 259 || atividade == 248 || atividade == 272 || atividade == 362 ){
		form.setValue("ajustes", '');
		visivel.push("idajustes");
		oculto.push("div_mensagem");
		
		// form.setVisibleById("idajustes",true);	
			
	}
	
	if(atividade == 322){
		visivel.push("divpagamentos");	
		
		form.setValue("nomeSuperiorValorHoras", usuario);
		form.setValue("pag_nf_f", '');
		form.setValue("pag_data_f", '');	
		form.setValue("pag_parcela_f", '');
		form.setValue("pag_pago_atual_f", '');
		form.setValue("parecerTenviaParaPagamentos_f", '');
		
		oculto.push("div_mensagem");
		
	}
	
	if(atividade == 353){
		visivel.push("idconcordanciaSuperiorValorHoras");	
		
		//visivel.push("concordanciaSuperior");
		// form.setVisibleById("concordanciaSuperior",true);		
		
		form.setValue("nomeSuperiorValorHoras", usuario);
		form.setValue("ConcordanciaValorHoras", '');
		form.setValue("ParecerSuperiorValorHoras", '');	
		oculto.push("div_mensagem");
		
	}
	
	if(form.getValue("IDCNT")=="0"){
		oculto.push("divContrato");
		oculto.push("divContrato1");
		}else{
			visivel.push("divContrato");
			visivel.push("divContrato1");
		}
	if(form.getValue("idmov")=="0"){
		oculto.push("divComprometimento");
		}else{
			visivel.push("divComprometimento");
		}
	
	//oculto.push("_div_totalitens_");

	//oculta os campos
	for(var i=0; i<oculto.length; i++){
		form.setVisibleById(oculto[i], false);
	}

	//torna visivel os campos
	for(var i=0; i<visivel.length; i++){
		form.setVisibleById(visivel[i], true);
	}
	
}