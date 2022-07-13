function validateForm(form){
	var atividade = getValue("WKNumState");
	var usuarioId = getValue("WKUser");
	
	// etapas
	var inicio = (atividade == 11 || atividade == 0);
	var ajuste = (atividade == "18" || atividade ==  "212" || atividade == "25" || atividade == "32");
	var envia_contrato = (atividade == "97");
	
	var concorda_gerente = (atividade == "14");
	var autoriza = (atividade == "93" || atividade == "104" || atividade == "120");
	var assinatura = (atividade == "231" || atividade == "79" || atividade == "224" );
	
	var gerencia_tecnica = (atividade == "28");
	
	var controladoria = (atividade == "21");
	var cadastra_contrato = (atividade == "109");
	
	var valida = [];
	var msg = [];
	
	if(controladoria){
		
		valida.push("HomologacaoControladoria");
		msg.push("Conformidade");
	}
	
	if (concorda_gerente){
		
		valida.push("ConcordanciaSuperior");
		msg.push("Concordância");
		
	}
	
	if (autoriza){
		
		valida.push("AutorizacaoContrato");
		msg.push("Autorização");
		
	}
	
	if (gerencia_tecnica){
		
		valida.push("conformidadeParecerTecnico");
		msg.push("Conformidade");
		
	}
	
/*if (assinatura){
		
	valida.push("check_contrato_assinado");
	msg.push("Carta Contrato/Ordem de Serviço Assinado");
		
	}
	
if (cadastra_contrato){
	
	valida.push("check_ext_contrato");
	msg.push("Extrato do Contrato");
	
}
	
*/
	if(inicio){
		/*
		valida.push("numeroContrato");
		msg.push("Número Carta Contrato");
		valida.push("justificativa");
		msg.push("Justificativa da Contratação");
		valida.push("idcredenciado");
		msg.push("Credenciado");
		valida.push("origemrecurso");
		msg.push("Origem Recurso");
		valida.push("check_contrato");
		msg.push("Carta Contrato/Ordem de Serviço");
		valida.push("check_Divida_Ativa_Uniao");
		msg.push("Certidão Negativa de Débitos Relativos aos Tributos Federais e à Dívida Ativa da União");
		valida.push("check_cnd");
		msg.push("Comprovação Autenticidade CND");
		valida.push("check_fgts");
		msg.push("Certificado de Regularidade do FGTS – CRF");
		valida.push("check_crf");
		msg.push("Comprovação autenticidade CRF");
		valida.push("check_simples");
		msg.push("Declaração Opção do SIMPLES Nacional");
		valida.push("check_dec_Incompatibilidade");
		msg.push("Declaração de Incompatibilidade");
		valida.push("check_desc_credenciado");
		msg.push("Declaração do Credenciado");
		*/
		
	/*
	 * falta criar loop para a parte de produtos e rateio
		idproduto___1
		codCusto___1
		valorRatMoeda___1
					for (var i = 1; i <= 50 ; i++) {
				bloqueado.push("servico___"+i);
				bloqueado.push("projeto_zoom___"+i);
				bloqueado.push("acao_zoom___"+i);
				bloqueado.push("centroCusto_zoom___"+i);
				bloqueado.push("valorRatMoeda___"+i);
					
				
			}
		*/
		
		//throw ("O campo precisa "+valida.length+" ser preenchido/selecionado/anexado");
	}
	
	var msgExibir ="";
	for(var i=0; i<valida.length; i++){
		if(form.getValue(valida[i])== null || form.getValue(valida[i])== ""){
			msgExibir += msg[i]+ "\n";
		}
	}
	
	if(msgExibir != ""){
		throw ("O(s) campo(s)  precisa(m) ser(em) preenchido(s)/selecionado(s)/anexado(s):\n"+msgExibir);
	}


}