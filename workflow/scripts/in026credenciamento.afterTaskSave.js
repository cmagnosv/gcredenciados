function afterTaskSave(colleagueId,nextSequenceId,userList){

	var usuario = getValue('WKUser'); //usuário logado
	var atividade = getValue("WKNumState");
	var numSolicitacao = getValue("WKNumProces");
	var atividadeantes = hAPI.getCardValue("atividadeAtual");
	var codsuperior= hAPI.getCardValue("codsuperior");
	
	var frmCodIGO = hAPI.getCardValue('codigo');

	var pdv = getValue("ProcessDefinitionVersionDto");
	var contrato= hAPI.getCardValue("numeroContrato");
	var credenciado = hAPI.getCardValue("credenciado");
	var justificativa=hAPI.getCardValue("justificativa");
	var JustificativaAutorizacao=  hAPI.getCardValue("JustificativaAutorizacao");
	var solicitante =hAPI.getCardValue("Solicitante");
	var unidade=hAPI.getCardValue("Unidade");
	
	var substituto= hAPI.getCardValue("substituto");
	var nomeLogado= hAPI.getCardValue("nomeLogado");
	var caminho=hAPI.getCardValue("caminho");
	
	var ConcordanciaSuperior=hAPI.getCardValue("ConcordanciaSuperior");
	var HomologacaoControladoria=hAPI.getCardValue("HomologacaoControladoria");
	var conformidadeParecerTecnico = hAPI.getCardValue("conformidadeParecerTecnico");
	var diretoria=hAPI.getCardValue("diretoria");
	var ParecerSuperior= hAPI.getCardValue("ParecerSuperior");
	var nomeSuperior=hAPI.getCardValue("nomeSuperior");
	var nomeTecnico=hAPI.getCardValue("nomeTecnico");
	var nomeControladoria=hAPI.getCardValue("nomeControladoria");
	var dscDiretoria = hAPI.getCardValue("dscdiretoria");
	var dscDiretor = hAPI.getCardValue("superior1");
	var AutorizacaoContrato = hAPI.getCardValue("AutorizacaoContrato")
	var nomeSuperiorValorHoras = hAPI.getCardValue("nomeSuperiorValorHoras");
	var parecer = "";
	var tipomovimento="";
	
	if(nomeLogado!= dscDiretor){
		dscDiretor=" Substituto "+nomeLogado;
	}
	
	var titulo = "Contrato n. "+contrato+", sobre "+justificativa;
	var comentario="";
	
	
	
	var datetime = new Date();
	var arraydata = new Array();
	arraydata  =datetime.toString().split(' '); 
	var hora = arraydata[4];
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
	 var dataf= year+''+month+''+day;


		
	 
	// ETAPA CRIAÇÃO PROCESSO já esta ok e validado
	if(atividadeantes == 0){
		//titulo= hAPI.getCardValue("numeroContrato")+', resumo: '+hAPI.getCardValue("justificativa");	

		comentario= "Foi criado um pedido de contratação do credenciado "+credenciado+"(Contrato nº "+contrato+"), resumo da contratação: "+justificativa+", Solicitante: "+solicitante+"-"+unidade;
		hAPI.setCardValue('codigoFluig',year+'.'+month+'.'+day+'.'+numSolicitacao);
		hAPI.setCardValue('codigo',numSolicitacao);
		hAPI.setCardValue('DataCriacao',day+'/'+month+'/'+year);
		hAPI.setCardValue('data1',year+''+month+''+day);
		hAPI.setCardValue('tipomovimento','I');
		
	}
	
	
	// ETAPA CONCORDANCIA DO SUPERIOR
	if(atividadeantes == 14){
		
		if(nomeSuperior==""){
			parecer =nomeSuperiorValorHoras;
		}else{
			parecer=nomeSuperior;	
		}

		if(ConcordanciaSuperior =="Ajustar"){
			comentario= "Foi Devolvido um contrato nº "+contrato+" por "+parecer+", superior do solicitante "+solicitante+"-"+unidade+", para ajuste com seguinte parecer: "+ParecerSuperior;
		}
		
		if(ConcordanciaSuperior =="S"){
			comentario= "Foi Aprovado um contrato nº "+contrato+" por "+parecer+", superior do solicitante "+solicitante+"-"+unidade+", com o seguinte parecer: "+ParecerSuperior;
		}

	}
		
		if(atividadeantes == 16){
			if(ConcordanciaSuperior =="S" && diretoria =="DITEC"){
				comentario="Como este processo é da área técnica, será encaminhado Para Avaliação de Uma Gerencia Técnica";
			}
			if(ConcordanciaSuperior =="S" && diretoria !="DITEC"){
				comentario="Como este processo é da DAF/DISUP, será encaminhado Para Controladoria";
			}
				
		}
	

		
		
		
			
		// ETAPA analise gerencia tecnica
		if(atividadeantes == 28){
			
		
			if(conformidadeParecerTecnico =="Ajustar"){
				comentario= "Foi Devolvido um contrato nº "+contrato+" por "+nomeLogado+", para ajuste com seguinte parecer: "+hAPI.getCardValue("parecerTecnico")+", ";
			}
			
			if(conformidadeParecerTecnico =="S"){
				if(caminho=="gerente"){
					comentario="Como este processo Possui o valor total inferior a 50% do valor limite de licitação, o mesmo será encaminhado ao seu <strong>Gerente</strong> para autorização de contratação";
				}
				if(caminho=="preposto"){
					comentario="Como este processo Possui o valor total entre 50% à 100% do valor limite de licitação, o mesmo será encaminhado a um <strong>Preposto</strong> para autorização de contratação";
				}
				if(caminho=="direx"){
					comentario="Como este processo Possui o valor total maior que 100% do valor limite de licitação, o mesmo será encaminhado a <strong>Diretoria</strong> para autorização de contratação";
				}
				
				comentario= " Foi Analisado e homologado um contrato nº "+contrato+" por "+nomeLogado+", com o seguinte parecer: "+hAPI.getCardValue("parecerTecnico")+" e "+comentario;
				
				
			}


			
			

			hAPI.setCardValue('dataParecerTecnico',dataf+' '+hora);
			//titulo= hAPI.getCardValue("numeroContrato")+' ultimo parecer: '+hAPI.getCardValue("parecerTecnico")+', resumo: '+hAPI.getCardValue("justificativa");	
		}

		
		
		//ETAPA HOMOLOGAÇÃO CONTROLADORIA
		if(atividadeantes == 21){
			
			//titulo=hAPI.getCardValue("numeroContrato")+'ultimo parecer: '+hAPI.getCardValue("ParecerControladoria")+', resumo: '+hAPI.getCardValue("justificativa");	
			
			if(HomologacaoControladoria=="Ajustar"){
				comentario= "Foi Devolvido pela Controladoria um contrato nº "+contrato+" por "+nomeLogado+", para "+solicitante+"-"+unidade+", solicitando ajuste com seguinte parecer: "+hAPI.getCardValue("ParecerControladoria")+", ";
			}
			
			if(HomologacaoControladoria =="Sim"){
				comentario= "Foi Aprovado pela Controladoria  um contrato nº "+contrato+" por "+nomeLogado+", para "+solicitante+"-"+unidade+", com o seguinte parecer: "+hAPI.getCardValue("ParecerControladoria")+", ";
			}


			hAPI.setCardValue('dataHomologacaoControladoria',dataf+' '+hora);
			
		}
		
		if(atividadeantes == 235){ // após validação controladoria info sobre qual caminho seguir
			if(HomologacaoControladoria =="Sim" && diretoria != "DITEC" && caminho=="gerente"){
				comentario="Como este processo Possui o valor total inferior a 50% do valor limite de licitação, o mesmo será encaminhado ao seu <strong>Gerente</strong> para autorização de contratação";
			}
			if(HomologacaoControladoria =="Sim" && diretoria != "DITEC" && caminho=="preposto"){
				comentario="Como este processo Possui o valor total entre 50% à 100% do valor limite de licitação, o mesmo será encaminhado a um <strong>Preposto</strong> para autorização de contratação";
			}
			if(HomologacaoControladoria =="Sim" && diretoria != "DITEC" && caminho=="direx"){
				comentario="Como este processo Possui o valor total maior que 100% do valor limite de licitação, o mesmo será encaminhado a <strong>Diretoria</strong> para autorização de contratação";
			}
			
			if(HomologacaoControladoria =="Sim" && diretoria != "DITEC" && caminho=="direx"){
				comentario="Como este processo é da área técnica, o mesmo será encaminhado para Analise <strong>Gerência Técnica</strong> para Homologação de contratação";
			}
		}
		
		if(atividadeantes == 23){ //após validação parecer tecnico info sobre qual caminho seguir
			

		}
		
		
		//ETAPA: Ajuste Solicitado 18 => gerencia, 25 => controladoria, 32 => gerencia técnica
		if(atividadeantes == 18){
			
			
			if(hAPI.getCardValue("idDecisaoAjuste")  != "C" ){

				comentario= "Um contrato nº "+contrato+",  Foi Ajustado conforme solicitado por "+nomeLogado+", tendo os seguintes ajustes realizados: "+hAPI.getCardValue("ajustes")+" e encaminhado para nova analise do superior do solicitante "+solicitante+"-"+unidade;
				hAPI.setCardValue('tipomovimento',tipomovimento);
			}else{
				comentario= "Este Processo do contrato nº "+contrato+",  Foi Cancelado conforme solicitado por "+nomeLogado+", tendo como complemento de parecer do solicitante : "+hAPI.getCardValue("ajustes");
			}
		}
		
		
		if(atividadeantes == 25 || atividadeantes == 32 || atividadeantes == 362){
			var tipomovimento='';
			//ConcordanciaValorHoras;
			if(atividadeantes == 362){
				
				if(nomeSuperior==""){
					parecer =nomeSuperiorValorHoras;
				}else{
					parecer=nomeSuperior;	
				}
				
			}
			
			if(atividadeantes == 32){
				parecer=nomeTecnico;
				tipomovimento='A';
			}
			
			if(atividadeantes == 25){
				parecer=nomeControladoria;
				tipomovimento='A';
				}
			
			
			if(parecer !="" && hAPI.getCardValue("idDecisaoAjuste")  != "C" ){

				comentario= "Um contrato nº "+contrato+",  Foi Ajustado conforme solicitado por "+parecer+", tendo os seguintes ajustes realizados: "+hAPI.getCardValue("ajustes")+" e encaminhado para nova analise do superior do solicitante "+solicitante+"-"+unidade;
				hAPI.setCardValue('tipomovimento',tipomovimento);
			}else{
				comentario= "Este Processo do contrato nº "+contrato+",  Foi Cancelado conforme solicitado por "+parecer+", tendo como complemento de parecer do solicitante : "+hAPI.getCardValue("ajustes");
			}

					
		}

		//ETAPA: autorização de contratação 
		if(atividadeantes == 93 || atividadeantes == 104 || atividadeantes == 120){
			if(AutorizacaoContrato =="S"){
				comentario=nomeSuperior+" Autorizou a contratação do contrato nº "+contrato+",resumo do contrato: "+justificativa;
			}
			if(AutorizacaoContrato =="N"){
				comentario=nomeSuperior+" Não autorizou a contratação do contrato nº "+contrato+", "+JustificativaAutorizacao;
				//hAPI.setCardValue('tipomovimento','C');
			}
			
		}
		
	
	// etapa 350 = Valor Hora maior que a tabela ?
	if(atividadeantes==11){
		var valorHora= hAPI.getCardValue("valorHora");

		if(valorHora  == 'S'){
			comentario= "O solicitante definiu que o valor Hora é superior ao definido na tabela da resolução DIREX, processo encaminhado ao diretor da área para aprovação com a seguinte justificativa: "+justificativa;	
		}
		if(valorHora  == 'N'){
			comentario= "O solicitante definiu que o valor hora é compativel com o definido na tabela da resolução DIREX";
		}
	}
	
	// etapa 355 = autorização do diretor Valor Hora maior que a tabela ?
	if(atividadeantes == 353){
		var ConcordanciaValorHoras= hAPI.getCardValue("ConcordanciaValorHoras");
		var ParecerSuperiorValorHoras = hAPI.getCardValue("ParecerSuperiorValorHoras");
		
		if(ConcordanciaValorHoras  == 'S'){
			comentario= "o diretor "+dscDiretor+"("+dscDiretoria+") aprovou este processo de contratação com valor hora superior ao definido na tabela da resolução DIREX";	
		}
		if(ConcordanciaValorHoras  == 'N'){
			comentario= "o diretor "+dscDiretor+"("+dscDiretoria+") Solicitou o cancelamento deste processo de contratação com valor hora superior ao definido na tabela da resolução DIREX com a seguinte justificativa: "+ParecerSuperiorValorHoras;
		}
		if(ConcordanciaValorHoras  == 'A'){
			comentario= "o diretor "+dscDiretor+"("+dscDiretoria+") solicitou ajustar este processo de contratação com valor hora superior ao definido na tabela da resolução DIREX com seguinte justificativa: "+ParecerSuperiorValorHoras;
		}
		hAPI.setCardValue("ConcordanciaValorHoras","");
		hAPI.setCardValue("ParecerSuperiorValorHoras","");

		}
	
	
	if(atividadeantes == 322){
		var parcelas = parseInt(hAPI.getCardValue("parcelas"));
		var parcela =  parseInt(hAPI.getCardValue("parcela"));
		if(parcelas>parcela){
		parcela+=1;	
		}
		
		hAPI.setCardValue('parcela',parcela);
		comentario= "Pagamento de contrato, "+parcela+"parcela";
	}
	
	if(atividadeantes == 246){
		
	}
	
	
	
	if(comentario!=""){
		hAPI.setCardValue("titulo",comentario);
		hAPI.setTaskComments(usuario, numSolicitacao, 0, comentario+", tasksave Etapa atual "+atividade+" etapa anterior "+atividadeantes);
	}
	hAPI.setTaskComments(usuario, numSolicitacao, 0, " tasksave Etapa atual "+atividade+" etapa anterior "+atividadeantes);
	
	hAPI.setCardValue("atividadeAtual","0.1");
	
}