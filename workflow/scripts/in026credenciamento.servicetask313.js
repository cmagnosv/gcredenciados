function servicetask313(attempt, message) {
	var ds_chave_rm = DatasetFactory.getDataset("ds_chave_rm", null, null, null);
	var chave = ds_chave_rm.getValue(0, "CHAVE");
	var codColigada = ds_chave_rm.getValue(0, "CODCOLIGADA");
	var numSolicitacao = getValue("WKNumProces");
	var IDCNT= hAPI.getCardValue("IDCNT");	
	var usuario = getValue('WKUser'); //usuário logado
	
	log.info("############################################");
	log.info("Inclusão de Contrato- credenciado - SBC - Contrato Online");
	log.info("############################################");
	
	try
	{  

		

		 // Parametros de acesso ao Servico.	
		var serviceName 	= "wsECMhml";										
		var servicePackage	= "org.tempuri.WsECM";		

		var servico = ServiceManager.getService(serviceName);
		var serviceHelper = servico.getBean();
		var instancia = servico.instantiate(servicePackage);
		var ws = instancia.getWsECMSoap();
	    
		var xml = criarXmlContrato(codColigada);

		
		log.info("############ [integracao Geração de Contrato credenciado] xml = " + xml);
	    
		if(IDCNT=="0"){
			
			var result = ws.insereContratoOnline(codColigada,xml,chave);
		}
		else{
			var result = ws.alterarContratoOnline(codColigada,xml,chave);
		}
		
		var strErro = "Erro interno";
	    
	    
	    if (result.toLowerCase().indexOf(strErro.toLowerCase()) >= 0)
    	{
	    	var mensagemErro = "Retorno de Erro do sistema: " + result;	    	
	    	throw mensagemErro;	    		    	
	    }
	    else
    	{
	    	hAPI.setCardValue("txt_Retorno", result);
			var constcnt = DatasetFactory.createConstraint("CHAVE","FLUIG-" + numSolicitacao, "FLUIG-" + numSolicitacao, ConstraintType.MUST);
			var dscnt = DatasetFactory.getDataset("rm_ds_fluigxidcnt", null, [constcnt], null);
			hAPI.setCardValue('IDCNT',dscnt.getValue(0,"IDCNT"));
			
			var mensagem = "";
			if(IDCNT=="0") {
				mensagem = "Contrato Incluido sob o idenficador RM.: "+dscnt.getValue(0,"IDCNT");
			}
			else {
				mensagem = "Contrato Alterado sob o idenficador RM.: "+dscnt.getValue(0,"IDCNT");
			}
			
			hAPI.setTaskComments(usuario, numSolicitacao, 0, mensagem);
			
						
    	}
        
    }
    catch (e)   
    {  
        if (e == null)
        	e = "Erro desconhecido!";  
    	var mensagemErro = "Ocorreu um erro ao salvar dados no RM: " + e;  
    	hAPI.setCardValue("txt_Retorno", result);
    	log.info("######### erro: "+mensagemErro);
    	throw mensagemErro;
        
    }
}

function criarXmlContrato (codColigada)
{
	var numSolicitacao = getValue("WKNumProces");
	var IDCNT= hAPI.getCardValue("IDCNT");
	
	var dscidcnt = "";
	var CODSTACNT = hAPI.getCardValue("sta_contrato");// 001 = ativo, 002= cancelado. 007=encerrado
	if(IDCNT=="0"){
		dscidcnt = "";
		 }else{
		dscidcnt = "<IDCNT>"+IDCNT+"</IDCNT> \n";	
		 }
		
	
			

	var dataInsercao = hAPI.getCardValue("DataCriacao");
	var chaveOrigem = "FLUIG-" + numSolicitacao;
	var codigoFluig = hAPI.getCardValue("codigoFluig");
	var CODFILIAL = '1'; // matriz
	var CODDEPARTAMENTO = hAPI.getCardValue("coddepartamento");
	var QTDEFATURAMENTOS = hAPI.getCardValue("parcelas");
	var EMAIL = hAPI.getCardValue("EMAIL");
	var CODMOEVALORCONTRATO = 'R$';
	var CODCPG = '04';
	var IMPRIMEMOV = '1'
	var VALORCONTRATO = hAPI.getCardValue("totalitens") //.replace('.','').replace(',','.');
	var CODTCN = '002';
	var NATUREZA = '1';
	var MEDICAO = 'S';
	var NOME = 'SGF-'+hAPI.getCardValue("departamento")+' '+hAPI.getCardValue("credenciado").replace("&","E");
	var CODIGOCONTRATO = hAPI.getCardValue("codigoContrato");
	var DATACONTRATO = dataInsercao;
	var CODCFO = hAPI.getCardValue("idcredenciado");
	var CODTB4FAT = hAPI.getCardValue("CODTB4FAT");
	var DATAFIM = hAPI.getCardValue("DATAFIM");
	var DATAINICIO = hAPI.getCardValue("DATAINICIO");
	var CODUSUARIORM = hAPI.getCardValue("CODUSUARIORM");
	var ORIGEMPAG ='044';
	var DASSINATURA = hAPI.getCardValue("DATAASSINATURA");
	
	var parcelas = hAPI.getCardValue("parcelas");
	var catobj = hAPI.getCardValue("catobj");
	var DIREX = hAPI.getCardValue("diretoria");
	var valortotal = hAPI.getCardValue("totalitens");
	var TIPOCONSISTENCIA = "6";
	var TIPORATEIO = "2";
	var USAPRECOMP = "1";
	var PRESTCONTAS = "3";
	var MODALIDADE = "010";
	var MODALIDADED = "044";
	var N_LICITACAO = hAPI.getCardValue("edital_gf");
	var numeroContrato = hAPI.getCardValue("numeroContrato");
	var CODVEN = hAPI.getCardValue("codven1"); //  gerente
	var CODVEN2 = hAPI.getCardValue("codven"); // gestor
	var CODVENMAIL = hAPI.getCardValue("CODVEN_EMAIL")+";"+hAPI.getCardValue("CODVEN1_EMAIL"); //  GESTOR gerente
	//var CODVEN1MAIL = hAPI.getCardValue("CODVEN1_EMAIL"); //  gerente
	var HISTORICOCURTO = hAPI.getCardValue("justificativa");
	var OBS = hAPI.getCardValue("obs");
	var EPERIODICO = 2;
	var CONTRCOMPRA = "01";
	var CRITJULGAMENTO = "05";
	var NATOBJ="01";
	var CODTMV ="1.1.86";
	var codTb2Fat				= hAPI.getCardValue("origemrecurso");
	var codTb4Fat				= hAPI.getCardValue("CODTB4FAT");
	
	// log.info("############ [integracao Geração de Contrato credenciado] codTb2Fat = " + codTb2Fat);
	
	var xmlCNT = "\n" +
	 "<NewDataSet>" + "\n" +
	 "  <TCnt>" + "\n" +
	 "    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" + "\n" +
	 	dscidcnt +
	 "    <CODCOLCFO>"+codColigada+"</CODCOLCFO>" + "\n" +
	 "    <NOME>"+NOME.substring(0,39)+"</NOME>" + "\n" +
	 "    <CODCOLIGADA2>"+codColigada+"</CODCOLIGADA2>" + "\n" +
	 "    <COMISSAOVEN2>0.00</COMISSAOVEN2>" + "\n" +
	 "    <CAMPOLIVRE3>0.00</CAMPOLIVRE3>" + "\n" +
	 "    <CODCOLCONTAGER>0</CODCOLCONTAGER>" + "\n" +
	 "    <NATUREZA>"+NATUREZA+"</NATUREZA>" + "\n" +
	 "    <QTDEFATURAMENTOS>"+QTDEFATURAMENTOS+"</QTDEFATURAMENTOS>" + "\n" +
	 "    <CODTCN>"+CODTCN+"</CODTCN>" + "\n" +
	 "    <CODFILIAL>"+CODFILIAL+"</CODFILIAL>" + "\n" +
	 "    <CODIGOCONTRATO>"+CODIGOCONTRATO+"</CODIGOCONTRATO>" + "\n" +
	 "    <CODCFO>"+CODCFO+"</CODCFO>" + "\n" +
	 "    <DATACONTRATO>"+DATACONTRATO+"</DATACONTRATO>" + "\n" +
	 "    <DATAINICIO>"+DATAINICIO+"</DATAINICIO>" + "\n" +
	 "    <CODSTACNT>"+CODSTACNT+"</CODSTACNT>" + "\n" +
	 "    <CODCPG>"+CODCPG+"</CODCPG>" + "\n" +
	 "    <CODMOEVALORCONTRATO>R$</CODMOEVALORCONTRATO>" + "\n" +
	 "    <DIAFATURAMENTO>0</DIAFATURAMENTO>" + "\n" +
	 "    <DIASCARENPARAFAT>0</DIASCARENPARAFAT>" + "\n" +
	 "    <DIASCARENCANCFAT>0</DIASCARENCANCFAT>" + "\n" +
	 "    <IMPRIMEMOV>1</IMPRIMEMOV>" + "\n" +
//	 "    <VALORCONTRATO>"+VALORCONTRATO+"</VALORCONTRATO>" + "\n" +
	 "    <CODVEN>"+CODVEN+"</CODVEN>" + "\n" +
	 "    <CODVEN2>"+CODVEN2+"</CODVEN2>" + "\n" +	 
	 "    <COMISSAOVEN>0.00</COMISSAOVEN>" + "\n" +
	 "    <CODTB2FAT>"+codTb2Fat+"</CODTB2FAT>" + "\n" +
	 "    <CODDEPARTAMENTO>"+CODDEPARTAMENTO+"</CODDEPARTAMENTO>" + "\n" +
	 "    <CODCOLCXA>0</CODCOLCXA>" + "\n" +
	 "    <DATAFIM>"+DATAFIM+"</DATAFIM>" + "\n" +
	 "    <CODRPR>"+CODVEN+"</CODRPR>" + "\n" +
	 "    <CODUSUARIO>"+CODUSUARIORM+"</CODUSUARIO>" + "\n" +
	 "  </TCnt>" + "\n" +
	 "  <TCNTHISTORICO>" + "\n" +
	// 	dscidcnt +
	 "    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" + "\n" +
	 "    <HISTORICOCURTO>"+HISTORICOCURTO+"</HISTORICOCURTO>" + "\n" +
	 "  </TCNTHISTORICO>" + "\n" +
	 "  <TCNTCOMPL>" + "\n" +
//	 	dscidcnt +
	 "    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" + "\n" +
	 "    <EMAIL>"+CODVENMAIL+"</EMAIL>" + "\n" +
	 "    <DIREX>"+DIREX+"</DIREX>" + "\n" +
	 "    <MODALIDADE>"+MODALIDADE+"</MODALIDADE>" + "\n" +
	 "    <VLRORIGINAL>"+VALORCONTRATO+"</VLRORIGINAL>" + "\n" +
	 "    <TIPOCONSISTENCIA>"+TIPOCONSISTENCIA+"</TIPOCONSISTENCIA>" + "\n" +
	 "    <TIPORATEIO>"+TIPORATEIO+"</TIPORATEIO>" + "\n" +
	 "    <USAPRECOMP>"+USAPRECOMP+"</USAPRECOMP>" + "\n" +
	 "    <CHAVEORIGEM>"+numeroContrato+"</CHAVEORIGEM>" + "\n" +
	 "    <OBS>"+OBS+"</OBS>" + "\n" +
	 "    <DASSINATURA>"+DASSINATURA+"</DASSINATURA>" + "\n" +
	 "    <MEDICAO>"+MEDICAO+"</MEDICAO>" + "\n" +
	 "    <MODALIDADED>"+MODALIDADED+"</MODALIDADED>" + "\n" +
	 "    <N_LICITACAO>"+N_LICITACAO+"</N_LICITACAO>" + "\n" +
	 "    <NUMPROCESSO2>"+chaveOrigem+"</NUMPROCESSO2>" + "\n" +
	 "    <PRESTCONTAS>"+PRESTCONTAS+"</PRESTCONTAS>" + "\n" +
	 "    <QTD_PARCELAS>"+QTDEFATURAMENTOS+"</QTD_PARCELAS>" + "\n" +
	 "    <DIRETORIA>"+DIREX+"</DIRETORIA>" + "\n" +
	 "    <NUMPROCESSO>ma</NUMPROCESSO>" + "\n" +
	 "    <STATUSCONT></STATUSCONT>" + "\n" +
	 "  </TCNTCOMPL>" + "\n";


		var nseqitmmov		= 1;
		var i 			= 0;
	    var process 	= getValue("WKNumProces");
	    var cardData	= new java.util.HashMap();
		cardData 		= hAPI.getCardData(process);
		var keys 		= cardData.keySet().toArray();
		
		for ( var key in keys) {
			var field = keys[key];
			
			
			if (field.indexOf("servico___") > -1) {
				log.info("############ [integracao Geração de Contrato credenciado] field = " + field+" chave "+field.indexOf("servico___"));
				
				var row 			= field.replace("servico___", "");
				
				//VARIAVEIS INT_TMOVRATCCU_IMP                    
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

				
				var xmlCNT = xmlCNT + "\n\n" +
	 
	 "  <TITMCNT>" + "\n" +
	 "    <CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" + "\n" +
	 	dscidcnt +
	 "    <NSEQITMCNT>"+nseqitmmov+"</NSEQITMCNT>" + "\n" +
	 "    <IDPRD>"+idPrd+"</IDPRD>" + "\n" +
	 "    <CODFILIALFAT>"+codFilial+"</CODFILIALFAT>" + "\n" +
	 "    <TIPODESTINATARIO>C</TIPODESTINATARIO>" + "\n" +
	 "    <CODTIP>001</CODTIP>" + "\n" +
	 "    <QUANTIDADE>1,00</QUANTIDADE>" + "\n" +
	 "    <PRECOFATURAMENTO>"+precoUnitario+"</PRECOFATURAMENTO>" + "\n" +
	 "    <CODMOEPRECOFATURAMENTO>R$</CODMOEPRECOFATURAMENTO>" + "\n" +
	 "    <CODCPG>"+CODCPG+"</CODCPG>" + "\n" +
	 "    <EPERIODICO>"+EPERIODICO+"</EPERIODICO>" + "\n" +
	 "    <CODMOEREAJUSTE>R$</CODMOEREAJUSTE>" + "\n" +
	 "    <DATAINICIO>"+DATAINICIO+"</DATAINICIO>" + "\n" +
	 "    <DATAFIM>"+DATAFIM+"</DATAFIM>" + "\n" +
	 "    <CODSTACNT>"+CODSTACNT+"</CODSTACNT>" + "\n" +
	 "    <IMPRIMEMOV>1</IMPRIMEMOV>" + "\n" +
	 "    <CODTMV>"+CODTMV+"</CODTMV>" + "\n" +
	 "    <FATURAEMATRASO>0</FATURAEMATRASO>" + "\n" +
	 "    <COBRANCABANCARIA>0</COBRANCABANCARIA>" + "\n" +
	 "    <CODVEN1>"+CODVEN+"</CODVEN1>" + "\n" +
	 "    <CODVEN2>"+CODVEN2+"</CODVEN2>" + "\n" +
	 "    <CODDEPARTAMENTO>"+CODDEPARTAMENTO+"</CODDEPARTAMENTO>" + "\n" +
	 "    <NUMEROSEQUENCIAL>"+nseqitmmov+"</NUMEROSEQUENCIAL>" + "\n" +
	 "    <QTDEFATURAMENTOS>1</QTDEFATURAMENTOS>" + "\n" +
	 "    <STATUSFAT>A</STATUSFAT>" + "\n" +
	 "    <COBRARRESIDUOREAJUSTE>0</COBRARRESIDUOREAJUSTE>" + "\n" +
	 "    <FATURADOPORMEDICAO>0</FATURADOPORMEDICAO>" + "\n" +
	 "    <TIPOMEDICAO>A</TIPOMEDICAO>" + "\n" +
	 "    <NATUREZAIT>1</NATUREZAIT>" + "\n" +
	 "    <CODTB1FAT>"+codtb1fat+"</CODTB1FAT>" + "\n" +
	 "    <CODTB2FAT>"+codTb2Fat+"</CODTB2FAT>" + "\n" +
	 "    <CODTB4FAT>"+codTb4Fat+"</CODTB4FAT>" + "\n" +
	 "    <CODCOLTBORCAMENTO>"+codColigada+"</CODCOLTBORCAMENTO>" + "\n" +
	 "    <CODTBORCAMENTO>"+codtborcamento+"</CODTBORCAMENTO>" + "\n" +
	 "    <CODCOLCFO>"+codColigada+"</CODCOLCFO>" + "\n" +
	 "    <CODCOLCFODEST>"+codColigada+"</CODCOLCFODEST>" + "\n" +
	 "    <CODCFODEST>"+CODCFO+"</CODCFODEST>" + "\n" +
	 "    <CODCFO>"+CODCFO+"</CODCFO>" + "\n" +
	 "    <CODRPR>"+CODVEN+"</CODRPR>" + "\n" +
	 "    <VALORTOTAL>"+precoUnitario+"</VALORTOTAL>"+ "\n"+
	 "  </TITMCNT>" + "\n" +
	 
	 "  <TITMCNTHISTORICO>" + "\n" +
	 "	<CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" + "\n" +
	// 	dscidcnt +
	 "	<NSEQITMCNT>"+Nnseqitmcnt+"</NSEQITMCNT>" + "\n" +
	 "	<HISTORICOCURTO>"+HISTORICOCURTO+"</HISTORICOCURTO>" + "\n" +
	 "	<HISTORICOLONGO>"+HISTORICOCURTO+"</HISTORICOLONGO>" + "\n" +
	 "  </TITMCNTHISTORICO>" + "\n" +

		 
	 "  <TITMCNTCOMPL>" + "\n" +
	 "	<CODCOLIGADA>"+codColigada+"</CODCOLIGADA>" + "\n" +
	// 	dscidcnt +
	 "	<NSEQITMCNT>"+nseqitmmov+"</NSEQITMCNT>" + "\n" +
	 "	<ORIGEMPAG>"+ORIGEMPAG+"</ORIGEMPAG>" + "\n" +
	 "	<CATOBJ>"+catobj+"</CATOBJ>" + "\n" +
	 "	<CONTRCOMPRA>"+CONTRCOMPRA+"</CONTRCOMPRA>" + "\n" +
	 "	<CRITJULGAMENTO>"+CRITJULGAMENTO+"</CRITJULGAMENTO>" + "\n" +
	 "	<QTD_PARCELAS>"+QTDEFATURAMENTOS+"</QTD_PARCELAS>" + "\n" +
	 "	<DASSINATURA>"+DASSINATURA+"</DASSINATURA>" + "\n" +
	 "	<OBJETOCONTRATO>"+HISTORICOCURTO+"</OBJETOCONTRATO>" + "\n" +
	 "	<NATOBJ>"+NATOBJ+"</NATOBJ>" + "\n" +
	 "   </TITMCNTCOMPL>" + "\n" 
		i++;
				nseqitmmov = parseInt(nseqitmmov)+1;
				
					}
				}	 
		xmlCNT = xmlCNT + "\n\n" + "</NewDataSet>";
	return xmlCNT;
}