/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 * 13/12/2016       Mohit Sharma            Bug 66247 - Validation on submit button in ibps mobile form required
 * 07/05/2018       Gaurav Sharma           Bug 77543 - Events and webservice functionality not working in iform not getting output.
 * 06/11/2018       Gaurav                  Bug 81232 - Digit Grouping not working in setValues() API
 * 12/12/2018       Aman Khan               Bug 81913 - In style3 TextBox,Label name not aligned properly.
 */


function customValidation(op){
	console.log('Inside customValidation');
	console.log('Case -->' + op);
     switch (op) {
        case 'S':
            console.log('Inside Case S');
            break;
        case 'I':
            console.log('Inside Case I');
            break;
        case 'D':
           console.log('Inside Case D');
            break;
        default:
            break;
    }
    
    return true;
}

function hideTabsOnFormLoad(){
	console.log("Inside hideTabsOnFormLoad");
	// setTabStyle("tab2", 10, "visible", "false");
	// setTabStyle("tab2", 11, "visible", "false");
	// setTabStyle("tab2", 12, "visible", "false");
	// setTabStyle("tab2", 13, "visible", "false");
	// setTabStyle("tab2", 14, "visible", "false");
	// setTabStyle("tab2", 15, "visible", "false");
	// setTabStyle("tab2", 16, "visible", "false");
	// setTabStyle("tab2", 17, "visible", "false");
	// setTabStyle("tab2", 18, "visible", "false");
	// setTabStyle("tab2", 19, "visible", "false");
	// setTabStyle("tab2", 20, "visible", "false");
	// setTabStyle("tab2", 21, "visible", "false");
	// setTabStyle("tab2", 22, "visible", "false");
	// setTabStyle("tab2", 23, "visible", "false");
	// setTabStyle("tab2", 24, "visible", "false");
	// setTabStyle("tab2", 25, "visible", "false");
	// setTabStyle("tab2", 26, "visible", "false");
	// setTabStyle("tab2", 27, "visible", "false");
	// setTabStyle("tab2", 28, "visible", "false");	
}

function customFormLoad(){
	console.log("---------------Inside customFormLoad---------------"); 
	$(".table > thead > tr > th").css("font-size","13px");
	setStyle('frame288','visible','false')
	setTabStyle("tab2", 4, "visible", "true");
	selectSheet("tab2",4);
	setTabStyle("tab2", 19, "visible", "true"); //Document Section	
	setTabStyle("tab2", 8, "visible", "true");	//Action History
	hideFields('frame165');
	clearFields('DecisionAction');
	//Setting Branch Value
	//To be changed once data arrives
	setValues({"qBranch":"IN0011000"},true);
	setStyle('ContactNoUpdationLabel','visible','false');
	setStyle('frame282','visible','false');
	
 //This function is called whenever the form is loaded.
	window.count=0;
	var sActivityName = getWorkItemData("activityname");	
	var sProcessInstanceID = getWorkItemData("processInstanceId");
	console.log(sActivityName);
	console.log(sProcessInstanceID);
	setValues({"WorkstepName":sActivityName},true);
	var loan_no = getValue("Loan_Account_No");	
	
	if(sActivityName!='Collection_Escalation'){ 
		actionCodeOnChange();
	}
	

	//Enabling ActionCode Combo Box on designated worksteps
	if(sActivityName != 'Initiator' && sActivityName != 'PTP' &&sActivityName != 'Collection_PickUp' &&sActivityName != 'Skip_Cases' &&sActivityName != 'Repo_Marking' &&sActivityName != 'Repo_Marked'){
		disableFields('qContactRecording_Action_Code');
		selectSheet("tab2",8);
		setMandatory('DecisionAction');
	}else{
		populateActionCode();
		disableFields('DecisionAction');
		setStyle('qContactRecording_Action_Code','mandatory','true');
		//clearFields('qContactRecording_Action_Code');
	}
	
/*	if(sActivityName != 'Initiator'){
		fetchTopSection();
	}*/
	
	switch(sActivityName){
		case 'Initiator':
			setValues({'pInstanceID':getWorkItemData('processInstanceId')},true);
			console.log("Before Adding data to grid");
			/*var JSONarrayObject1 = [{"Document Name":"Authorization Letter","Generate":"Generate","View":"View"},{"Document Name":"Demand Letter 1 English","Generate":"Generate","View":"View"},{"Document Name":"Intimation Letter English","Generate":"Generate","View":"View"}];
			addDataToGrid("Outward_Document_ListView",JSONarrayObject1)
			console.log("After adding data to grid");*/
			executeServerEvent("DocumentGeneration","FormLoad","",true);
			//setValues({'Tele_Calling_Executive':getWorkItemData('username')},true);
			break;
		case 'PTP':
			executeServerEvent("DocumentGeneration","FormLoad","",true);
			break;
		case 'Collection_PickUp':
			executeServerEvent("Collection_PickUpFormSubmit","submit","",true);
			executeServerEvent("DocumentGeneration","FormLoad","",true);
			selectSheet("tab2",6);
			break;
		case 'Collection_Escalation':
			selectSheet("tab2",8);
			executeServerEvent("DocumentGeneration","FormLoad","",true);
			break;
	
		case 'Address_Update_Branch':
				setValues({'PreviousWS':'AUB'},true);
				executeServerEvent("DocumentGeneration","FormLoad","",true);
			break;
			
		case 'Document_Generation' :
			console.log("Inside Document Generation");
			//console.log("After function call addtogrid");
			setValues({'pInstanceID':getWorkItemData('processInstanceId')},true);
			executeServerEvent("DocumentGeneration","FormLoad","",true);
			console.log("After executeserver Event");
			break;	
		case 'Payment_Posting':
			console.log("Payment_Posting Form Load");
			selectSheet("tab2",8);
			executeServerEvent("DocumentGeneration","FormLoad","",true);
			break;	
		case 'Pre_Part_Closure_Request':
			console.log("Pre_Part_Closure_Request Form Load");
			clearFields('q_pre_part_closure_WaiveOff');
			setMandatory('q_pre_part_closure_WaiveOff');
			selectSheet("tab2",6);
			executeServerEvent("DocumentGeneration","FormLoad","",true);
			break;		
		case 'Expense_Approval':
			console.log("Expense_Approval Form Load");
			if(getValue('PreviousWS') == 'Legal_Update'){
				selectSheet("tab2",13);
			}else{
				selectSheet("tab2",11);
			}
			executeServerEvent("DocumentGeneration","FormLoad","",true);
			break;	

		case 'Skip_Cases':
				executeServerEvent("DocumentGeneration","FormLoad","",true);
			break;
		case 'Skip_Cases_Escalation':
				executeServerEvent("DocumentGeneration","FormLoad","",true);
			break;
		case 'Charge_Waiver':
				executeServerEvent("DocumentGeneration","FormLoad","",true);
			break;
		case 'Payment_Correction':
				executeServerEvent("DocumentGeneration","FormLoad","",true);
			break;
		case 'Manager_Action':
				executeServerEvent("DocumentGeneration","FormLoad","",true);
			break;
		case 'Repayment_Swap_Branch':
				executeServerEvent("DocumentGeneration","FormLoad","",true);
			break;
		case 'Address_Update_Central':
				executeServerEvent("DocumentGeneration","FormLoad","",true);
			break;
		case 'Repayment_Swap_Central':
				executeServerEvent("DocumentGeneration","FormLoad","",true);
			break;
		case 'Action_From_Manager':
				executeServerEvent("DocumentGeneration","FormLoad","",true);
			break;
		case 'Legal':
				executeServerEvent("DocumentGeneration","FormLoad","",true);
				visitReportGridPopulate();
			break;
		case 'Repo_and_Sale':
				executeServerEvent("DocumentGeneration","FormLoad","",true);
			break;
			
	}
	
	
	if(sActivityName == 'Repo_and_Sale' || sActivityName == 'Repo_Marking' || sActivityName == 'Repo_Marked' ||sActivityName == 'Repo_Release_Approval' ||sActivityName == 'Initiate_Sale_Approval' ||sActivityName == 'Sale_and_Valuation' ||sActivityName == 'Auction'||sActivityName == 'Quote_Approval' ||sActivityName == 'Ready_For_Release'){
		selectSheet("tab2",11);
		disableRepoFields();
		executeServerEvent("DocumentGeneration","FormLoad","",true);
		repoFlowHideShow(sActivityName);
	}
	
	if(sActivityName == 'Initiate_Legal_Action' || sActivityName == 'Leagl_Action_Approval' ||sActivityName == 'Legal_Update'){
		selectSheet("tab2",13);
		onChangeLegalActionCode();
		hideShowHearingVisitReport();
		executeServerEvent("DocumentGeneration","FormLoad","",true);
	}
	
	if(sActivityName == 'Expense_Approval' && getValue('PreviousWS') == 'Legal_Update'){
		selectSheet("tab2",13);
		onChangeLegalActionCode();
		hideShowHearingVisitReport();
	}else{
		repoFlowHideShow(sActivityName);
	}
	
	//Populating Applicant Type Manually on form load
	populateApplicantTypeManually();
	
	triggerEventsOnLoad();
	console.log("formload finished...");
}
/*$(document).on('click',"#Outward_Document_ListView tbody tr td",function(){
console.log("Inside function");
var col = $(this).index();
var row = $(this).parent().index();
console.log('COL -->' + col);
console.log('Row -->' + row);
console.log('Cell Value -->' + getValueFromTableCell("Outward_Document_ListView",row, (parseInt(col)-2)).trim())
var doctype=getValueFromTableCell("Outward_Document_ListView",row, (parseInt(col)-2)).trim();
executeServerEvent("getWIInitiatorRole",doctype,"",true);
});*/

function onClickGenerate(tableId, rowIndex, ref)
{
	console.log("Inside onclickGenerate method");

	//if (ref.innerHTML == "Generate") 
		var Document_Name = getValueFromTableCell(tableId, rowIndex, 0);
		console.log("Document Name --> "+Document_Name)
		executeServerEvent("DocumentGeneration",Document_Name ,"",true);
		
	//}
}

 function onClickView(tableId, rowIndex, ref)
{​
    console.log("Inside onclickView method");
    var Document_Name = getValueFromTableCell(tableId, rowIndex, 0);
    console.log("Document Name --> "+Document_Name)
    //on click view btn,display the document
       var Doc_index = executeServerEvent("Document_ID_CHECK", "click", Document_Name, true);
        if(Doc_index=="")
        {​
            //alert("Document not available to show");
            showMessage("", "Document not available to show", "error", true);
        }​
        else
        {​      
      
        var objCombo = window.parent.document.getElementById('wdesk:docCombo');
        objCombo.value = Doc_index;
        window.parent.reloadapplet(Doc_index);
        }​
       
}​
 

function onRowClick(tableId,rowIndex){
    return true;
}

function customListViewValidation(controlId,flag){
    return true;
}   

function listViewLoad(controlId){
    
}

// function skipValidation() { //Automatically Called by product on WFDone
	 // console.log('Inside skipValidation');
	 // submitFormStarted();

// }

function submitFormStarted(){
	console.log("Inside submitFormStarted");
	var sActivityName = getWorkItemData("activityname");
	var actionCode = getValue("qContactRecording_Action_Code");

	switch(sActivityName){
		case 'Initiator': 
			console.log("Initiator Form Submit");
			setValues({'PreviousWS':'Initiator'},true);
			executeServerEvent("InitiatorFormSubmit","submit","",true);
			break;
		case 'Skip_Cases':
			console.log("Skip_Cases Form Submit");
			executeServerEvent("SkipCasesFormSubmit","submit","",true);
			break;
		case 'Skip_Cases_Escalation':
			console.log("Skip_Cases_Escalation Form Submit");
			customApproveRejectLogicOnFormSubmit(sActivityName);
			executeServerEvent("SkipCasesEscalationFormSubmit","submit","",true);
			break;	
		case 'Payment_Posting':
			console.log("Payment_Posting Form Submit");
			customApproveRejectLogicOnFormSubmit(sActivityName);
			executeServerEvent("PaymentPostingFormSubmit","submit","",true);
			
			//updating the status of collection
			if(getValue('DecisionAction') == 'Approve'){ 
				setValues({'qCollectionEntry_Collection_Entry_Status':'Authorized'},true);
			}else if(getValue('DecisionAction') == 'Reject'){ 
				setValues({'qCollectionEntry_Collection_Entry_Status':'Requires Correction'},true);
			}
			
			break;
		case 'Collection_Escalation':
			console.log("Collection_Escalation Form Submit");
			customApproveRejectLogicOnFormSubmit(sActivityName);
			executeServerEvent("getNextApprover","submit","",true); 
			break;
		case 'Pre_Part_Closure_Request':
			console.log("Pre_Part_Closure_Request Form Submit");
			customApproveRejectLogicOnFormSubmit(sActivityName);
			executeServerEvent("PrePartClosureRequestFormSubmit","submit","",true);
			break;
		case 'Charge_Waiver':
			console.log("Charge_Waiver Form Submit");
			customApproveRejectLogicOnFormSubmit(sActivityName);
			executeServerEvent("ChargeWaiverFormSubmit","submit","",true);
			break;
		case 'PTP':
			console.log("PTP Form Submit");
			executeServerEvent("PTPFormSubmit","submit","",true);
			break;	
		case 'Payment_Correction':
			console.log("Payment_Correction Form Submit");
			customApproveRejectLogicOnFormSubmit(sActivityName);
			executeServerEvent("PaymentCorrectionFormSubmit","submit","",true);
			
			//updating the status of collection
			if(getValue('DecisionAction') == 'Reject'){ 
				setValues({'qCollectionEntry_Collection_Entry_Status':'Discarded'},true);
			}
			
			break;
		case 'Address_Update_Branch':
			console.log("Address_Update_Branch Form Submit");
			customApproveRejectLogicOnFormSubmit(sActivityName);
			break;
		case 'Repayment_Swap_Branch':
			console.log("Repayment_Swap_Branch Form Submit");
			customApproveRejectLogicOnFormSubmit(sActivityName);
			break;
		case 'Manager_Action':
			console.log("Manager_Action Form Submit");
			customApproveRejectLogicOnFormSubmit(sActivityName);
			break;
		case 'Action_From_Manager':
			console.log("Action_From_Manager Form Submit");
			customApproveRejectLogicOnFormSubmit(sActivityName);
			break;
		case 'Document_Generation':
			console.log("Document_Generation Form Submit");
			customApproveRejectLogicOnFormSubmit(sActivityName);
			break;
		case 'Address_Update_Central':
			console.log("Address_Update_Central Form Submit");
			customApproveRejectLogicOnFormSubmit(sActivityName);
			break;
		case 'Repayment_Swap_Central':
			console.log("Repayment_Swap_Central Form Submit");
			customApproveRejectLogicOnFormSubmit(sActivityName);
			break;
		case 'Closed_Accounts':
			console.log("Closed_Accounts Form Submit");
			customApproveRejectLogicOnFormSubmit(sActivityName);
			break;
		case 'Legal':
			console.log("Legal Form Submit");
			customApproveRejectLogicOnFormSubmit(sActivityName);
			executeServerEvent("LegalFormSubmit","submit","",true);
			break;
		case 'Initiate_Legal_Action':
			console.log("Initiate_Legal_Action Form Submit");
			customApproveRejectLogicOnFormSubmit(sActivityName);
			break;	
		case 'Leagl_Action_Approval':
			console.log("Leagl_Action_Approval Form Submit");
			customApproveRejectLogicOnFormSubmit(sActivityName);
			break;
		case 'Legal_Update':
			console.log("Legal_Update Form Submit");
			setValues({'PreviousWS':'Legal_Update'},true);
			customApproveRejectLogicOnFormSubmit(sActivityName);
			executeServerEvent("LegalUpdateFormSubmit","submit","",true);
			break;
		case 'Expense_Approval':
			console.log("Expense_Approval Form Submit");
			customApproveRejectLogicOnFormSubmit(sActivityName);
			executeServerEvent("ExpenseApprovalFormSubmit","submit","",true);
			break;	
		case 'Repo_and_Sale':
			console.log("Repo_and_Sale Form Submit");
			customApproveRejectLogicOnFormSubmit(sActivityName);
			executeServerEvent("RepoandSaleFormSubmit","submit","",true);
			
			break;	
		case 'Repo_Marking':
			console.log("Repo_Marking Form Submit");
			setValues({'PreviousWS':'Repo_Marking'},true);
			executeServerEvent("RepoMarkingFormSubmit","submit","",true);
			break;
		case 'Repo_Marked':
			console.log("Repo_Marked Form Submit");
			setValues({'PreviousWS':'Repo_Marked'},true);
			executeServerEvent("RepoMarkedFormSubmit","submit","",true);
			break;
		case 'Repo_Release_Approval':
			console.log("Repo_Release_Approval Form Submit");
			executeServerEvent("RepoReleaseApprovalFormSubmit","submit","",true);
			customApproveRejectLogicOnFormSubmit(sActivityName);
			if(getValue('DecisionAction') == 'Approve'){
				setValues({'qRepoRelease_Vehicle_Release_to_Customer_Approved_by':getWorkItemData('UserName')},true);
			}
			break;	
		case 'Initiate_Sale_Approval':
			console.log("Initiate_Sale_Approval Form Submit");
			executeServerEvent("InitiateSaleApprovalFormSubmit","submit","",true);
			customApproveRejectLogicOnFormSubmit(sActivityName);
			if(getValue('DecisionAction') == 'Approve'){
				setValues({'q_Repo_QD_Quotation_Details_Sale_Approved_By':getWorkItemData('UserName')},true);
			}
			break;	
		case 'Sale_and_Valuation':
			console.log("Sale_and_Valuation Form Submit");
			setValues({'PreviousWS':'Sale_and_Valuation'},true);
			customApproveRejectLogicOnFormSubmit(sActivityName);
			executeServerEvent("SaleandValuationFormSubmit","submit","",true);
			var counter = quotationGridrecommendedCount();
			if(counter!=1){
				alert('There can be exactly one Recommended records in Quotation Details');
				return;
			}
			break;		
		case 'Quote_Approval':
			console.log("Quote_Approval Form Submit");
			customApproveRejectLogicOnFormSubmit(sActivityName);
			executeServerEvent("QuoteApprovalFormSubmit","submit","",true);
			break;
		case 'Auction':
			console.log("Auction Form Submit");
			customApproveRejectLogicOnFormSubmit(sActivityName);
			break;	
		case 'Ready_For_Release':
			console.log('Ready_For_Release Form Submit');
			customApproveRejectLogicOnFormSubmit(sActivityName);
			
			
		
	}
	PopulatingHistoryTables();
	
	//Population Legal History
	if(sActivityName == 'Legal' ||sActivityName == 'Initiate_Legal_Action' || sActivityName == 'Leagl_Action_Approval' ||sActivityName == 'Legal_Update'){
		LegalHistoryUpdation();
	}
	//Population Repo History
	if(sActivityName == 'Repo_and_Sale' ||sActivityName == 'Repo_Marking' || sActivityName == 'Repo_Marked' ||sActivityName == 'Repo_Release_Approval' ||sActivityName == 'Initiate_Sale_Approval' ||sActivityName == 'Sale_and_Valuation' ||sActivityName == 'Auction'||sActivityName == 'Quote_Approval' ||sActivityName == 'Ready_For_Release'){
		RepoHistoryUpdation();
	}
	//Populating Legal/Repo History for Expense Approval WS
	if(sActivityName == 'Expense_Approval' && getValue('PreviousWS') == 'Legal_Update'){
		LegalHistoryUpdation();
	}else{
		RepoHistoryUpdation();
	}
	
	var actvtyJson={};
	actvtyJson['PreviousWS']=sActivityName;
	setValues(actvtyJson,true);
	
	window.parent.WFSave();
	var sProcessInstanceID = getWorkItemData("processInstanceId");
	console.log(sProcessInstanceID);
	window.parent.WFDone();
	console.log("WFDone");
}

function populateActionCode(){
	console.log('Inside populateActionCode');
	var sActivityName = getWorkItemData("activityname");
	var ActionCodes = "";
	if(sActivityName!='Initiator'){
		$("#qContactRecording_Action_Code option").remove();
		ActionCodes+=" ,";
	}
	
	ActionCodes += executeServerEvent("GetActionCodeValue","onLoad","",true);
	if(ActionCodes!=undefined && ActionCodes != ''){
		var splitActionCodes = ActionCodes.split(',');
		var actionCodeElement = document.getElementById("qContactRecording_Action_Code");
		for(var i=0;i<splitActionCodes.length;i++){
			var option = document.createElement("option");
			option.text = splitActionCodes[i];
			actionCodeElement.add(option);
		}
	}
}

function actionCodeOnChange(){
	console.log('Inside actionCodeOnChange');
	var ActionCodeValue = getValue('qContactRecording_Action_Code');
	setValues({'Action':ActionCodeValue},true);
	if(ActionCodeValue == "" || ActionCodeValue == undefined){
		clearValue('Action');
	}else{
		setValues({'Action':ActionCodeValue},true);
		
	if (ActionCodeValue == 'Future PTP' || ActionCodeValue=='PTP') {

	var ptpMode=getValue("qContactRecording_PTP_Mode") ;
    var ptpBrnch=getValue("qContactRecording_Branch") ;
	if (ptpMode == '' || ptpMode== undefined || ptpMode.toLocaleLowerCase()=='select') {
        setValues({
            'qContactRecording_PTP_Mode': 'Cash'
        }, true);
    }
    if (ptpBrnch== '' || ptpBrnch== undefined || ptpBrnch.toLocaleLowerCase()=='select') {
        setHomeBranch("qContactRecording_Branch");
		
    }

}else if(ActionCodeValue == 'Death Intimation'){ 
    var d=new Date();
    setValues({
            'qContactRecording_dateofintimation': d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()
        }, true);
}else if(ActionCodeValue=='Meeting Request'){ 

    populateAddress('qContactRecording_address');
}

		if(ActionCodeValue == 'Initiate Repo' && getWorkItemData("activityname") == 'Initiator'){
			repoFlowHideShow('Initiator');
			disableRepoFields();
			executeServerEvent("populateInitiateRepoDetails","onChange","",true);
		}
		
	}
	
	var result = executeServerEvent("OnChangeActionCode","onChange","",true);
	setValues({'OldActionCode':ActionCodeValue},true);//setting the old actioncode as the selected one, will be used for further onchange event.
	
}


function ValidatePTP_FPTPdays()
{
	var ACValue = getValue('qContactRecording_Action_Code');
	var ptpDt=getValue('qContactRecording_promisetopaydate');
	
	if(ptpDt!=''){ 
		var result = '';
		if(ACValue!=null && ACValue!='' && ACValue!=undefined){ 
			if(ACValue=='PTP'){ 
					 result = executeServerEvent("OnchangePTPdays","onChange","",true);
			}else if(ACValue=='Future PTP'){
					result = executeServerEvent("OnchangeFPTPdays","onChange","",true);
			}
			var resObj = result.split('~');
			if(resObj[0].toLocaleLowerCase() == 'false')
			{
				setValues({'qContactRecording_promisetopaydate':''},true);
				alert(resObj[1]);
			}
		}
	}

}

function AddressUpdationOnButtonClick(){
	console.log('Inside AddressUpdationOnButtonClick');
	var tablecolumnNames = "Transaction ID,Applicant Type,Address Type,Line 1,Line 2,Line 3,Pincode,Area,City / Town,State,Country,Location CoOrdinates,District,Landmark,Updated By,Date&Time";
	var fields = "processInstanceId,AddressUpdateApplicantType,AddressUpdateAddressType,AddressUpdateLine1,AddressUpdateLine2,AddressUpdateLine3,AddressUpdatePincode,AddressUpdatearea,AddressUpdatecity,AddressUpdatestate,AddressUpdatecountry,AddressUpdatelocationcoordinates,AddressUpdatedistrict,AddressUpdatelandmark,UserName,CurrentDate";
	var tableName = "AddressUpdateTable";
	var value = "";
	var JSONarrayObject = [];
	var StringValue = "{"
	
	var columnNamesSplit = tablecolumnNames.split(',');
	var fieldNamesSplit = fields.split(',');
	
	for(var i=0;i<columnNamesSplit.length;i++){
		var value = "";
		if(fieldNamesSplit[i].startsWith('processInstanceId')||fieldNamesSplit[i].startsWith('UserName') || fieldNamesSplit[i].startsWith('activityName')){
			value = getWorkItemData(fieldNamesSplit[i]);
		}else if(fieldNamesSplit[i].startsWith('CurrentDate')){
			value = new Date().toLocaleString();
		}else if(fieldNamesSplit[i].startsWith('--')){
			value = "";
		}else{
			value = getValue(fieldNamesSplit[i]);
			if(value == undefined){
				value = "";
			}
		}
		StringValue += "\"" + columnNamesSplit[i] + "\":\"" + value +"\",";
	}
	StringValue = StringValue.substring(0,StringValue.length-1);
	StringValue += "}";
	JSONarrayObject.push(JSON.parse(StringValue));
	addDataToGrid(tableName,JSONarrayObject);
}

function phoneNumberValidation(phoneNumber){
	console.log('Inside phoneNumberValidation');
	var a = /^\d{10}$/;  
	if (a.test(phoneNumber)){  
		return true;
	}else{  
		return false;  
	}  
}

function onClickGenerateOTPButton(){
	console.log('Inside onClickGenerateOTPButton');
	var phoneNumber = getValue('qContactnumberupdationdetails_primarymobileno');
	if(phoneNumberValidation(phoneNumber)){
		var timeout = executeServerEvent("generateContactUpdationOTP","Click",getWorkItemData('processInstanceId'),true);
		var intTimeout = parseInt(timeout);
		showFields('VerifyOTPBtn');
		disableFields('generateOTPBtn')
        setTimeout(function(){enableFields('generateOTPBtn')},intTimeout);
	}else{
		hideFields('VerifyOTPBtn');
		alert('Please Enter a Vaild mobile number');
	}
}

function onClickVerifyOTPButton(){
	console.log('Inside onClickVerifyOTPButton');
	
}

function ContactUpdationOnButtonClick(){
	console.log('Inside ContactUpdationOnButtonClick');
	var tablecolumnNames = "Transaction ID,Applicant Type,Primary Mobile Number,Secondary Mobile Number,Email,Updated On Stage,Date & Time,Updated By";
	var fields = "processInstanceId,qContactnumberupdationdetails_Applicanttype,qContactnumberupdationdetails_primarymobileno,qContactnumberupdationdetails_secondarymobileno,qContactnumberupdationdetails_email,activityName,CurrentDate,UserName";
	var tableName = "ContactUpdateTable";
	var value = "";
	var JSONarrayObject = [];
	var StringValue = "{"
	
	var columnNamesSplit = tablecolumnNames.split(',');
	var fieldNamesSplit = fields.split(',');
	
	for(var i=0;i<columnNamesSplit.length;i++){
		var value = "";
		if(fieldNamesSplit[i].startsWith('processInstanceId')||fieldNamesSplit[i].startsWith('UserName') || fieldNamesSplit[i].startsWith('activityName')){
			value = getWorkItemData(fieldNamesSplit[i]);
		}else if(fieldNamesSplit[i].startsWith('CurrentDate')){
			value = new Date().toLocaleString();
		}else if(fieldNamesSplit[i].startsWith('--')){
			value = "";
		}else{
			value = getValue(fieldNamesSplit[i]);
			if(value == undefined){
				value = "";
			}
		}
		StringValue += "\"" + columnNamesSplit[i] + "\":\"" + value +"\",";
	}
	StringValue = StringValue.substring(0,StringValue.length-1);
	StringValue += "}";
	JSONarrayObject.push(JSON.parse(StringValue));
	addDataToGrid(tableName,JSONarrayObject);
}

function RepaymentSwapUpdationOnButtonClick(){
	console.log('Inside ContactUpdationOnButtonClick');
	var tablecolumnNames = "Transaction ID,Applicant Type,Bank Name,Branch Name,IFS Code,MICR Code,Account Number,Type of Cheque,Cheque Number,Cheque Date,Comments";
	var fields = "processInstanceId,RepaymentSwapApplicantType,RepaymentSwapBankName,RepaymentSwapBranchName,RepaymentSwapIFSCode,RepaymentSwapMICRCode,RepaymentSwapAccountNumber,RepaymentSwapTypeOfCheque,RepaymentSwapChequeNumber,RepaymentSwapChequeDate,RepaymentSwapComments";
	var tableName = "RepaymentSwapTable";
	var value = "";
	var JSONarrayObject = [];
	var StringValue = "{"
	
	var columnNamesSplit = tablecolumnNames.split(',');
	var fieldNamesSplit = fields.split(',');
	
	for(var i=0;i<columnNamesSplit.length;i++){
		var value = "";
		if(fieldNamesSplit[i].startsWith('processInstanceId')||fieldNamesSplit[i].startsWith('UserName') || fieldNamesSplit[i].startsWith('activityName')){
			value = getWorkItemData(fieldNamesSplit[i]);
		}else if(fieldNamesSplit[i].startsWith('CurrentDate')){
			value = new Date().toLocaleString();
		}else if(fieldNamesSplit[i].startsWith('--')){
			value = "";
		}else{
			value = getValue(fieldNamesSplit[i]);
			if(value == undefined){
				value = "";
			}
		}
		StringValue += "\"" + columnNamesSplit[i] + "\":\"" + value +"\",";
	}
	StringValue = StringValue.substring(0,StringValue.length-1);
	StringValue += "}";
	JSONarrayObject.push(JSON.parse(StringValue));
	addDataToGrid(tableName,JSONarrayObject);
}


function sevenDaysLogicForWaiver(){
	console.log('Inside sevenDaysLogicForWaiver');
	//var v1 = 
}


function ChargerWaiverOnButtonClick()
{
	console.log('Inside Charger Waiver OnButtonClick');
	var tablecolumnNames="WaiverType,Amount Waived Off,Approved On Date";
	var fields="q_chargewaiver_WaiverType,q_chargewaiver_AmountWaivedOff,q_chargewaiver_ApprovedOnDate";
	var tableName = "ChargerWaiverTable";
	var value = "";
	var JSONarrayObject = [];
	var StringValue = "{"
	
	var columnNamesSplit = tablecolumnNames.split(',');
	var fieldNamesSplit = fields.split(',');
	
	for(var i=0;i<columnNamesSplit.length;i++){
		var value = "";
		if(fieldNamesSplit[i].startsWith('processInstanceId')||fieldNamesSplit[i].startsWith('UserName') || fieldNamesSplit[i].startsWith('activityName')){
			value = getWorkItemData(fieldNamesSplit[i]);
		}else if(fieldNamesSplit[i].startsWith('CurrentDate')){
			value = new Date().toLocaleString();
		}else if(fieldNamesSplit[i].startsWith('--')){
			value = "";
		}else{
			value = getValue(fieldNamesSplit[i]);
			if(value == undefined){
				value = "";
			}
		}
		StringValue += "\"" + columnNamesSplit[i] + "\":\"" + value +"\",";
	}
	StringValue = StringValue.substring(0,StringValue.length-1);
	StringValue += "}";
	JSONarrayObject.push(JSON.parse(StringValue));
	addDataToGrid(tableName,JSONarrayObject);
}


function LegalHistoryUpdation(){
	console.log('Inside LegalHistoryUpdation');
	var tablecolumnNames = "Transaction ID,Type of Action,Reason,Vehicle Status,Remarks,Status,Team Remarks,Legal User,Initiated Date,Closed By,Closed Date";
	var fields = "processInstanceId,qInitiateLegal_Type_of_Legal_Action,qInitiateLegal_Reason_for_Legal_Action,qInitiateLegal_Vehicle_Status,qInitiateLegal_Remarks,Legal_Status,qInitiateLegal_LegalTeamRemarks,UserName,qInitiateLegal_Legal_Initiation_Date,--Closed By--,--Closed On--";
	var tableName = "LegalHistoryTable";
	var value = "";
	var JSONarrayObject = [];
	var StringValue = "{"
	
	var columnNamesSplit = tablecolumnNames.split(',');
	var fieldNamesSplit = fields.split(',');
	
	for(var i=0;i<columnNamesSplit.length;i++){
		var value = "";
		if(fieldNamesSplit[i].startsWith('processInstanceId')||fieldNamesSplit[i].startsWith('UserName') || fieldNamesSplit[i].startsWith('activityName')){
			value = getWorkItemData(fieldNamesSplit[i]);
		}else if(fieldNamesSplit[i].startsWith('CurrentDate')){
			value = new Date().toLocaleString();
		}else if(fieldNamesSplit[i].startsWith('--')){
			value = "";
		}else{
			value = getValue(fieldNamesSplit[i]);
			if(value == undefined){
				value = "";
			}
		}
		StringValue += "\"" + columnNamesSplit[i] + "\":\"" + value +"\",";
	}
	StringValue = StringValue.substring(0,StringValue.length-1);
	StringValue += "}";
	JSONarrayObject.push(JSON.parse(StringValue));
	addDataToGrid(tableName,JSONarrayObject);
}

function RepoHistoryUpdation(){
	console.log('Inside RepoHistoryUpdation');
	var tablecolumnNames = "Transaction ID,Vehicle Status,Remarks,Repo Stage,User,Date & Time";
	var fields = "processInstanceId,combo319,textbox1750,activityName,UserName,CurrentDate";
	var tableName = "RepoHistoryGrid";
	var value = "";
	var JSONarrayObject = [];
	var StringValue = "{"
	
	var columnNamesSplit = tablecolumnNames.split(',');
	var fieldNamesSplit = fields.split(',');
	
	for(var i=0;i<columnNamesSplit.length;i++){
		var value = "";
		if(fieldNamesSplit[i].startsWith('processInstanceId')||fieldNamesSplit[i].startsWith('UserName') || fieldNamesSplit[i].startsWith('activityName')){
			value = getWorkItemData(fieldNamesSplit[i]);
		}else if(fieldNamesSplit[i].startsWith('CurrentDate')){
			value = new Date().toLocaleString();
		}else if(fieldNamesSplit[i].startsWith('--')){
			value = "";
		}else{
			value = getValue(fieldNamesSplit[i]);
			if(value == undefined){
				value = "";
			}
		}
		StringValue += "\"" + columnNamesSplit[i] + "\":\"" + value +"\",";
	}
	StringValue = StringValue.substring(0,StringValue.length-1);
	StringValue += "}";
	JSONarrayObject.push(JSON.parse(StringValue));
	addDataToGrid(tableName,JSONarrayObject);
}	
	
function PopulatingHistoryTables(){
	console.log('Inside PopulatingHistoryTables');
	var JSONarrayObject = [];
	var StringValue = "{";
	var sActivityName = getWorkItemData("activityname");
	var JSONTableName = {Initiator:"ActionHistoryTable",Collection_Escalation:"DecisionHistoryTable",Payment_Posting:"DecisionHistoryTable",Collection_PickUp:"ActionHistoryTable",PTP:"ActionHistoryTable",Legal:"DecisionHistoryTable",Repo_and_Sale:"DecisionHistoryTable",Address_Update_Branch:"DecisionHistoryTable",Repayment_Swap_Branch:"DecisionHistoryTable",Pre_Part_Closure_Request:"DecisionHistoryTable",Charge_Waiver:"DecisionHistoryTable",Manager_Action:"DecisionHistoryTable",Payment_Correction:"DecisionHistoryTable",Action_From_Manager:"DecisionHistoryTable",Document_Generation:"DecisionHistoryTable",Skip_Cases:"ActionHistoryTable",Address_Update_Central:"DecisionHistoryTable",Repayment_Swap_Central:"DecisionHistoryTable",Skip_Cases_Escalation:"DecisionHistoryTable",Closed_Accounts:"DecisionHistoryTable",Initiate_Legal_Action:"DecisionHistoryTable",Leagl_Action_Approval:"DecisionHistoryTable",Legal_Update:"DecisionHistoryTable",Expense_Approval:"DecisionHistoryTable",Repo_Marking:"ActionHistoryTable",Repo_Marked:"ActionHistoryTable",Repo_Release_Approval:"DecisionHistoryTable",Initiate_Sale_Approval:"DecisionHistoryTable",Sale_and_Valuation:"DecisionHistoryTable",Auction:"DecisionHistoryTable",Quote_Approval:"DecisionHistoryTable",Ready_For_Release:"DecisionHistoryTable"};
	var JSONfields = {ActionHistoryTable:"processInstanceId,qContactRecording_Comments,UserName,CurrentDate,qBucketDetails_Current_Bucket,DPD,--GeoTagging--,qContactRecording_reason,activityName,qContactRecording_Action_Code,qContactRecording_Paid_Amount,Loan_Type,qContactRecording_FollowUpdateandtime,qContactRecording_promisetopaydate,qContactRecording_PTP_Mode,qContactRecording_PTP_Amount,qContactRecording_Paid_Receipt_No,qCR_Pickup_Pick_up_Required_Collection_Executive,qContactRecording_Number_of_Follow_Up,qContactRecording_Name,qContactRecording_Relationship,qContactRecording_Phone_No,--Latitude--,--Longitude--,qContactRecording_Payment_Date,branch_details,qContactRecording_reason",DecisionHistoryTable:"processInstanceId,DecisionActionComments,UserName,CurrentDate,activityName,DecisionAction,qContactRecording_Action_Code,--Geotagging--"};
	var JSONcolumns = {ActionHistoryTable:"Transaction ID,Comments,User Name,Action Date,Current Bucket,DPD,Geo Tagging,Issue Description,Queue Name,Disposition Code,Paid Amount,Loan Type,Meeting Date,PTP Date,PTP Mode,PTP Amount,System Receipt Number,Paid Collection Executive Name,No of Follow-Up,Name,Relationship,Phone Number,Latitude,Longitude,Payment Date,Branch,RTP Reason",DecisionHistoryTable:"Transaction ID,Comments,User Name,Date & Time,Workstep Name,User Action,Disposition Code,Geotagging"};
	
	var tableName = JSONTableName[sActivityName];
	var columnNames = JSONcolumns[tableName];
	var columnNamesSplit = columnNames.split(',');
	var fieldNames = JSONfields[tableName];
	var fieldNamesSplit = fieldNames.split(',');
	
	for(var i=0;i<columnNamesSplit.length;i++){
		var value = "";
		if(fieldNamesSplit[i].startsWith('processInstanceId')||fieldNamesSplit[i].startsWith('UserName') || fieldNamesSplit[i].startsWith('activityName')){
			value = getWorkItemData(fieldNamesSplit[i]);
		}else if(fieldNamesSplit[i].startsWith('CurrentDate')){
			value = new Date().toLocaleString();
		}else if(fieldNamesSplit[i].startsWith('--')){
			value = "";
		}else{
			value = getValue(fieldNamesSplit[i]);
			if(value == undefined){
				value = "";
			}
		}
		StringValue += "\"" + columnNamesSplit[i] + "\":\"" + value +"\",";
	}
	StringValue = StringValue.substring(0,StringValue.length-1);
	StringValue += "}";
	JSONarrayObject.push(JSON.parse(StringValue));
	addDataToGrid(tableName,JSONarrayObject);
}
//conditional mandatory
function onChangePaymentMethod(){
	console.log('Inside onChangePaymentMethod');
	var value = getValue('qCollectionEntry_Mode_Of_Payment');
	removeMandatory('qCollectionEntry_Cheque_No,qCollectionEntry_micrcode,qCollectionEntry_instrumentdate,qCollectionEntry_RoutingNo,qCollectionEntry_DrawerAccountNo,qCollectionEntry_ifscode,qCollectionEntry_bankname,qCollectionEntry_bankbranch,qCollectionEntry_initiatingbank,qCollectionEntry_Initiatingbranch,qCollectionEntry_paymentdate,qCollectionEntry_bank,qCollectionEntry_operator,qCollectionEntry_branch,');
	disableFields('qCollectionEntry_Cheque_No,qCollectionEntry_micrcode,qCollectionEntry_instrumentdate,qCollectionEntry_RoutingNo,qCollectionEntry_DrawerAccountNo,qCollectionEntry_ifscode,qCollectionEntry_bankname,qCollectionEntry_bankbranch,qCollectionEntry_initiatingbank,qCollectionEntry_Initiatingbranch,qCollectionEntry_paymentdate,qCollectionEntry_bank,qCollectionEntry_operator,qCollectionEntry_branch,qCollectionEntry_depositorbankaccount,qCollectionEntry_caglaccountno');
     hideFields('qCollectionEntry_Cheque_No,qCollectionEntry_micrcode,qCollectionEntry_instrumentdate,qCollectionEntry_RoutingNo,qCollectionEntry_DrawerAccountNo,qCollectionEntry_ifscode,qCollectionEntry_bankname,qCollectionEntry_bankbranch,qCollectionEntry_initiatingbank,qCollectionEntry_Initiatingbranch,qCollectionEntry_paymentdate,qCollectionEntry_bank,qCollectionEntry_operator,qCollectionEntry_branch,qCollectionEntry_depositorbankaccount,qCollectionEntry_caglaccountno');
	//commenting the below code as on load the saved data is getting cleared when triggering the mode of payment onchange.
	//clearFields('qCollectionEntry_Cheque_No,qCollectionEntry_micrcode,qCollectionEntry_instrumentdate,qCollectionEntry_RoutingNo,qCollectionEntry_DrawerAccountNo,qCollectionEntry_ifscode,qCollectionEntry_bankname,qCollectionEntry_bankbranch,qCollectionEntry_initiatingbank,qCollectionEntry_Initiatingbranch,qCollectionEntry_paymentdate,qCollectionEntry_bank,qCollectionEntry_operator,qCollectionEntry_branch,qCollectionEntry_depositorbankaccount,qCollectionEntry_caglaccountno');

	switch(value){
		case 'Cheque': 
		showFields('qCollectionEntry_Cheque_No,qCollectionEntry_micrcode,qCollectionEntry_instrumentdate,qCollectionEntry_RoutingNo,qCollectionEntry_DrawerAccountNo,qCollectionEntry_ifscode,qCollectionEntry_bankname,qCollectionEntry_bankbranch');
        setMandatory('qCollectionEntry_Cheque_No,qCollectionEntry_micrcode,qCollectionEntry_instrumentdate,qCollectionEntry_RoutingNo,qCollectionEntry_DrawerAccountNo,qCollectionEntry_ifscode,qCollectionEntry_bankname,qCollectionEntry_bankbranch');
		enableFields('qCollectionEntry_Cheque_No,qCollectionEntry_micrcode,qCollectionEntry_instrumentdate,qCollectionEntry_RoutingNo,qCollectionEntry_DrawerAccountNo,qCollectionEntry_ifscode,qCollectionEntry_bankname,qCollectionEntry_bankbranch');
		break;
		
		case 'DD': 
		showFields('qCollectionEntry_Cheque_No,qCollectionEntry_micrcode,qCollectionEntry_instrumentdate,qCollectionEntry_RoutingNo,qCollectionEntry_DrawerAccountNo,qCollectionEntry_ifscode,qCollectionEntry_bankname,qCollectionEntry_bankbranch');
        setMandatory('qCollectionEntry_Cheque_No,qCollectionEntry_micrcode,qCollectionEntry_instrumentdate,qCollectionEntry_RoutingNo,qCollectionEntry_DrawerAccountNo,qCollectionEntry_ifscode,qCollectionEntry_bankname,qCollectionEntry_bankbranch');
		enableFields('qCollectionEntry_Cheque_No,qCollectionEntry_micrcode,qCollectionEntry_instrumentdate,qCollectionEntry_RoutingNo,qCollectionEntry_DrawerAccountNo,qCollectionEntry_ifscode,qCollectionEntry_bankname,qCollectionEntry_bankbranch');
		break;
		
		case 'Fund Transfer':
		showFields('qCollectionEntry_RoutingNo,qCollectionEntry_bankname,qCollectionEntry_bankbranch,qCollectionEntry_paymentdate,qCollectionEntry_ifscode');
		setMandatory('qCollectionEntry_RoutingNo,qCollectionEntry_bankname,qCollectionEntry_bankbranch,qCollectionEntry_paymentdate,qCollectionEntry_ifscode');
		enableFields('qCollectionEntry_RoutingNo,qCollectionEntry_bankname,qCollectionEntry_bankbranch,qCollectionEntry_paymentdate,qCollectionEntry_ifscode');
		break;
		
		case 'Mobile Pay':
		showFields('qCollectionEntry_operator,qCollectionEntry_paymentdate,qCollectionEntry_RoutingNo,qCollectionEntry_operator');
		setMandatory('qCollectionEntry_operator,qCollectionEntry_paymentdate,qCollectionEntry_RoutingNo,qCollectionEntry_operator');
		enableFields('qCollectionEntry_operator,qCollectionEntry_paymentdate,qCollectionEntry_RoutingNo,qCollectionEntry_operator');
		break;
		
		case 'Other Bank Payment':
		showFields('qCollectionEntry_paymentdate,qCollectionEntry_RoutingNo,qCollectionEntry_bankname,qCollectionEntry_bankbranch,qCollectionEntry_depositorbankaccount,qCollectionEntry_caglaccountno,qCollectionEntry_ifscode');
		setMandatory('qCollectionEntry_paymentdate,qCollectionEntry_RoutingNo,qCollectionEntry_bankname,qCollectionEntry_bankbranch,qCollectionEntry_depositorbankaccount,qCollectionEntry_caglaccountno,qCollectionEntry_ifscode');
		enableFields('qCollectionEntry_paymentdate,qCollectionEntry_RoutingNo,qCollectionEntry_bankname,qCollectionEntry_bankbranch,qCollectionEntry_depositorbankaccount,qCollectionEntry_caglaccountno,qCollectionEntry_ifscode');
		break;
		
	   default:
		break;
		
	}
}
//conditional mandatory
 function onChangeType(){
	 console.log('Inside onChangeType');
	var value = getValue('qContactnumberupdationdetails_type');
	removeMandatory('qContactnumberupdationdetails_primarymobileno,qContactnumberupdationdetails_secondarymobileno,qContactnumberupdationdetails_otpnumber,qContactnumberupdationdetails_email');
	disableFields('qContactnumberupdationdetails_primarymobileno,qContactnumberupdationdetails_secondarymobileno,qContactnumberupdationdetails_otpnumber,qContactnumberupdationdetails_email');
	hideFields('qContactnumberupdationdetails_primarymobileno,qContactnumberupdationdetails_secondarymobileno,qContactnumberupdationdetails_otpnumber,qContactnumberupdationdetails_email,generateOTPBtn,VerifyOTPBtn,UpdateContactNumberGridButton');
	clearFields('qContactnumberupdationdetails_primarymobileno,qContactnumberupdationdetails_secondarymobileno,qContactnumberupdationdetails_otpnumber,qContactnumberupdationdetails_email');
	switch(value)
	{
		case 'Phone Number':
		showFields('qContactnumberupdationdetails_primarymobileno,qContactnumberupdationdetails_secondarymobileno,qContactnumberupdationdetails_otpnumber,generateOTPBtn');
		setMandatory('qContactnumberupdationdetails_primarymobileno,qContactnumberupdationdetails_secondarymobileno,qContactnumberupdationdetails_otpnumber');
		enableFields('qContactnumberupdationdetails_primarymobileno,qContactnumberupdationdetails_secondarymobileno,qContactnumberupdationdetails_otpnumber');
		break;
		
		case 'Email ID':
		showFields('qContactnumberupdationdetails_email,UpdateContactNumberGridButton');
		setMandatory('qContactnumberupdationdetails_email');
		enableFields('qContactnumberupdationdetails_email');
		break;
		
		default:
		break;
	}
 }
//conditional mandatory
 function OnChangeOwnership()
 { console.log('Inside OnChangeOwnership');
	 var value=getValue('qAssetVerificationDetails_ownership');
	 removeMandatory('qAssetVerificationDetails_name,qAssetVerificationDetails_phoneno,qAssetVerificationDetails_relationship');
	 disableFields('qAssetVerificationDetails_name,qAssetVerificationDetails_phoneno,qAssetVerificationDetails_relationship');
	 hideFields('qAssetVerificationDetails_name,qAssetVerificationDetails_phoneno,qAssetVerificationDetails_relationship');
	 clearFields('qAssetVerificationDetails_name,qAssetVerificationDetails_phoneno,qAssetVerificationDetails_relationship');
	 switch(value)
	 {
		 case 'Third party':
		 showFields('qAssetVerificationDetails_name,qAssetVerificationDetails_phoneno,qAssetVerificationDetails_relationship');
		 setMandatory('qAssetVerificationDetails_name,qAssetVerificationDetails_phoneno,qAssetVerificationDetails_relationship');
		 enableFields('qAssetVerificationDetails_name,qAssetVerificationDetails_phoneno,qAssetVerificationDetails_relationship');
		 break;
		 
		 default:
		 break;
	 }
 }
 
 
//conditional mandatory

function OnChangePayReceivedFrom()

 {
	 console.log('Inside OnChangePayReceivedFrom');
	 var value=getValue('qCollectionEntry_paymentreceivedfrom');
	 removeMandatory('qCollectionEntry_Name,qCollectionEntry_Relationship,qCollectionEntry_Phone_Number');
	 disableFields('qCollectionEntry_Name,qCollectionEntry_Relationship,qCollectionEntry_Phone_Number');
	 hideFields('qCollectionEntry_Name,qCollectionEntry_Relationship,qCollectionEntry_Phone_Number');
	 //clearFields('qCollectionEntry_Name,qCollectionEntry_Relationship,qCollectionEntry_Phone_Number');
	 switch(value)
	 {
		 case 'Others':
		showFields('qCollectionEntry_Name,qCollectionEntry_Relationship,qCollectionEntry_Phone_Number');
		setMandatory('qCollectionEntry_Name,qCollectionEntry_Relationship,qCollectionEntry_Phone_Number');
		 enableFields('qCollectionEntry_Name,qCollectionEntry_Relationship,qCollectionEntry_Phone_Number');
		 break;
		 
		default:
		break;
	 }
 }	 

 function OnChangePaidBy()

 {console.log('Inside OnChangePaidBy');
	 var value=getValue('qContactRecording_paidby');
	 removeMandatory('qContactRecording_Name,qContactRecording_Phone_No,qContactRecording_Relationship');
	 disableFields('qContactRecording_Name,qContactRecording_Phone_No,qContactRecording_Relationship');
	 hideFields('qContactRecording_Name,qContactRecording_Phone_No,qContactRecording_Relationship');
	//clearFields('qContactRecording_Name,qContactRecording_Phone_No,qContactRecording_Relationship');
	 switch(value)
	 {
		 case 'Others':
		 		 showFields('qContactRecording_Name,qContactRecording_Phone_No,qContactRecording_Relationship');

		 setMandatory('qContactRecording_Name,qContactRecording_Phone_No,qContactRecording_Relationship');
		 enableFields('qContactRecording_Name,qContactRecording_Phone_No,qContactRecording_Relationship');
		 break;
		 
		default:
		break;
	 }
 }	 

 function  OnChangePaymentReceived()
{console.log('Inside OnChangePaymentReceived');
	var value=getValue("qContactRecording_paymentreceived");
	disableFields('qContactRecording_Name,qContactRecording_Phone_No,qContactRecording_Relationship');
	removeMandatory('qContactRecording_Name,qContactRecording_Phone_No,qContactRecording_Relationship');
		hideFields('qContactRecording_Name,qContactRecording_Phone_No,qContactRecording_Relationship');
   //clearFields('qContactRecording_Name,qContactRecording_Phone_No,qContactRecording_Relationship');
	switch(value)
	{
		case 'Others':
				 showFields('qContactRecording_Name,qContactRecording_Phone_No,qContactRecording_Relationship');

		setMandatory('qContactRecording_Name,qContactRecording_Phone_No,qContactRecording_Relationship');
		 enableFields('qContactRecording_Name,qContactRecording_Phone_No,qContactRecording_Relationship');
		 break;
		 
		default:
		break;
	 }
 }	 

 //conditional mandatory
function OnChangeApplicantType()
{console.log('Inside OnChangeApplicantType');
	var value=getValue('qContactRecording_applicanttype');
	removeMandatory('qContactRecording_Name,qContactRecording_Phone_No,qContactRecording_Relationship');
		disableFields('qContactRecording_Name,qContactRecording_Phone_No,qContactRecording_Relationship');
hideFields('qContactRecording_Name,qContactRecording_Phone_No,qContactRecording_Relationship');
	//clearFields('qContactRecording_Name,qContactRecording_Phone_No,qContactRecording_Relationship');
     switch(value)
  {
case 'Others':
showFields('qContactRecording_Name,qContactRecording_Phone_No,qContactRecording_Relationship');
setMandatory('qContactRecording_Name,qContactRecording_Phone_No,qContactRecording_Relationship');
enableFields('qContactRecording_Name,qContactRecording_Phone_No,qContactRecording_Relationship');
break;
	
 default:
	break;
}
}
//conditional mandatory
function OnChangeTypeofCheque()
{console.log('Inside OnChangeTypeofCheque');
	var value=getValue('RepaymentSwapTypeOfCheque');
	removeMandatory('RepaymentSwapChequeDate');
	disableFields('RepaymentSwapChequeDate');
	hideFields('RepaymentSwapChequeDate');
	clearFields('RepaymentSwapChequeDate');
	switch(value)
	{
		case 'PEMI':
		 showFields('RepaymentSwapChequeDate');
		 setMandatory('RepaymentSwapChequeDate');
		 enableFields('RepaymentSwapChequeDate');
		 break;
		 
		case 'EMI':
		showFields('RepaymentSwapChequeDate');
		setMandatory('RepaymentSwapChequeDate');
		enableFields('RepaymentSwapChequeDate');
		break;
		
		default:
		break;
}
}
//conditional mandatory
function OnChangeAddressType()
{ console.log('Inside OnChangeAddressType');
	var value=getValue('AddressUpdateAddressType');
	removeMandatory('AddressUpdateNameOftheOrganisation');
	disableFields('AddressUpdateNameOftheOrganisation');
	hideFields('AddressUpdateNameOftheOrganisation');
	clearFields('AddressUpdateNameOftheOrganisation');
	switch(value)
	{
		case  'Business': 
		 showFields('AddressUpdateNameOftheOrganisation');
		 setMandatory('AddressUpdateNameOftheOrganisation');
		 enableFields('AddressUpdateNameOftheOrganisation');
		 break;
		 
		case 'Employment':
		showFields('AddressUpdateNameOftheOrganisation');
		setMandatory('AddressUpdateNameOftheOrganisation');
		enableFields('AddressUpdateNameOftheOrganisation');
		break;
		
		case 'Wage':
		showFields('AddressUpdateNameOftheOrganisation');
		setMandatory('AddressUpdateNameOftheOrganisation');
		enableFields('AddressUpdateNameOftheOrganisation');
		break;
		
		default:
		break;
}
}

//conditional mandatory
		
function setMandatory(fields){
	console.log('Inside setMandatory');
	if(fields.length>0){
		splitFields = fields.split(',');
		for(var i=0;i<splitFields.length;i++){
			setStyle(splitFields[i].trim(),'mandatory','true');
		}
	}
}

function removeMandatory(fields){
	console.log('Inside removeMandatory');
	if(fields.length>0){
		splitFields = fields.split(',');
		for(var i=0;i<splitFields.length;i++){
			setStyle(splitFields[i].trim(),'mandatory','false');
		}
	}
}

function showFields(fields){
	console.log('Inside showFields');
	if(fields.length>0){
		splitFields = fields.split(',');
		for(var i=0;i<splitFields.length;i++){
			setStyle(splitFields[i].trim(),'visible','true');
		}
	}
}

function hideFields(fields){
	console.log('Inside hideFields');
	if(fields.length>0){
		splitFields = fields.split(',');
		for(var i=0;i<splitFields.length;i++){
			setStyle(splitFields[i].trim(),'visible','false');
		}
	}
}

function enableFields(fields){
	console.log('Inside enableFields');
	if(fields.length>0){
		splitFields = fields.split(',');
		for(var i=0;i<splitFields.length;i++){
			setStyle(splitFields[i].trim(),'disable','false');
		}
	}
}

function disableFields(fields){
	console.log('Inside disableFields');
	if(fields.length>0){
		splitFields = fields.split(',');
		for(var i=0;i<splitFields.length;i++){
			setStyle(splitFields[i].trim(),'disable','true');
		}
	}
}

function clearFields(fields){
	console.log('Inside clearFields');
	if(fields.length>0){
		splitFields = fields.split(',');
		for(var i=0;i<splitFields.length;i++){
			clearValue(splitFields[i].trim());
		}
	}
}

/*function fetchTopSection(){
	console.log("Inside fetchTopSection");
	//var ControlID = arguments[0].getAttribute('id');
	//console.log(ControlID);
	loan_no = getValue("Loan_Account_No");
	if(loan_no==""){
		window.alert("Please Enter a Loan Number");
		return;
	}else{
		//clearValue("label610",true);		
		//executeServerEvent(ControlID, 'click', '', true);
		//setValues({"label610":loan_no}, true);
		setValues({"q_demoloan":loan_no}, true);
		
	}
}*/

//called when save button in the contact recording is clicked.
function contactRecordingSaveButton(){
	console.log("Inside contactRecordingSaveButton");
	var ACValue = getValue("qContactRecording_Action_Code");
	var tabID=executeServerEvent("openTabOnClick","",ACValue,true);
	if(tabID!=null && tabID!=''){
		if(tabID==13 && getWorkItemData("activityname")=='Initiator'){
			//Legal Case
			console.log('Legal Case at Initiator Submit WorkItem');
		}else{
			setTabStyle("tab2",tabID, "visible", "true");
			selectSheet("tab2",tabID);
		}
		
	}else{
		setTabStyle("tab2", 5, "visible", "true");
		selectSheet("tab2",5);
	}
	
	//Setting Collection Entry Type as Normal By default for Apportionament logic
	if(tabID.trim() == '5' || tabID == 5){
		setValues({'qCollectionEntry_CollectionEntryType':'Normal'},true);

	}
	
	if(ACValue==null || ACValue == '' || ACValue == undefined){
		
	}else{
		
		if (ACValue == 'Collection Entry') {

	var collEntryType=getValue("qCollectionEntry_CollectionEntryType");
	var payMode=getValue("qCollectionEntry_Mode_Of_Payment");
	var depBranch=getValue("qCollectionEntry_DepositBranch");
    if (collEntryType == '' || collEntryType== undefined || collEntryType.toLocaleLowerCase()=='select') {
        setValues({
            'qCollectionEntry_CollectionEntryType': 'Normal'
        }, true);

    }
	if (payMode == '' || payMode== undefined || payMode.toLocaleLowerCase()=='select') { 
		setValues({
            'qCollectionEntry_Mode_Of_Payment': 'Cash'
        }, true);
		
	}
    if (depBranch == '' || depBranch == undefined || depBranch.toLocaleLowerCase()=='select') {
        
		setHomeBranch("qCollectionEntry_DepositBranch");
		
    }
	
	    $("#qCollectionEntry_CollectionEntryType").trigger("change");
		onChangeCollectionEntryType();
		$("#qCollectionEntry_Mode_Of_Payment").trigger("change");
}

	if(ACValue=='Regular Pick Up' || ACValue=='Online Pick Up')
	{
		var pickBranch=getValue("qCR_Pickup_Pick_up_Required_Branch");
		if(pickBranch==''|| pickBranch==undefined || pickBranch.toLocaleLowerCase()=='select')
		{
			setHomeBranch("qCR_Pickup_Pick_up_Required_Branch");
			
		}	
	}
	
		if(ACValue.startsWith('Pick Up')){
			setStyle("frame190","sectionstate","expanded");
			setFocus("frame190");
		}else{
			setStyle("frame190","sectionstate","collapsed”");
		}
	}
}
////fetch and populate the questionaires

function PARVisitPopulateQuestions()
{console.log('Inside PARVisitPopulateQuestions');
var ACValue = getValue("qContactRecording_Action_Code");
if(ACValue == '' || ACValue == undefined){
		
	}else
	{
	if(ACValue.startsWith('PAR Check'))
		{
			executeServerEvent("PARVisitFetchBtn","click","",true);
			setStyle("frame244","sectionstate","expanded");
			setFocus("frame244");
		}
else{
			setStyle("frame244","sectionstate","collapsed");
	}
	}

}
//fetch and populate the questionaires

function SkipNoTracePopulateQuestions()
{console.log('Inside SkipNoTracePopulateQuestions');
var ACValue = getValue("qContactRecording_Action_Code");
if(ACValue == '' || ACValue == undefined){
		
	}else
	{
	if(ACValue.startsWith('Skip No Trace'))
		{
			executeServerEvent("SkipTraceFetchBtn","click","",true);
			setStyle("frame243","sectionstate","expanded");
			setFocus("frame243");
		}
else{
			setStyle("frame243","sectionstate","collapsed");
	}
	}

}
$(document).on('click',"#fetchBtnTopSection",function(){
    
	var ids='fetchBtnTopSection,fetchBtnActionHistory';
	executeServerEvent('fetchOnDemandData','click',ids,true);
	
	
/*	if(this.id.startsWith('fetchBtn')){
		console.log(this.id +' clicked');
		console.log('Executing server event');
		executeServerEvent('fetchOnDemandData','click',this.id,true);
		var dpd =getValue("DPD");
		var loan_type=getValue("Loan_Type");
		var Customer_Name=getValue("Customer_Name");
		console.log("DPD value "+dpd+" loan_type "+loan_type+" Customer_Name "+Customer_Name);
		setValues({"q_demoDPD":dpd}, true);
		setValues({"q_demoLoanType":loan_type}, true);
		setValues({"q_demoCustomerName":Customer_Name}, true);
		console.log("Values set in Hidden fields");
		console.log(getValue("q_demoDPD")+" "+getValue("q_demoLoanType")+" "+getValue("q_demoCustomerName"));
	}
	if(this.id.startsWith('fetchBtnTopSection')){
		 $("#fetchBtnActionHistory").trigger("click");
	}*/
});

function onChangeTypeOfSettlement(){
	console.log('Inside onChangeTypeOfSettlement');
	var typeOfSettlement = getValue('q_pre_part_closure_TypeOfSettlement');
	clearFields('qForeclosureSettlement_Settlement_Validity,q_pre_part_closure_PreclosureAmount,q_pre_part_closure_PartPaymentAmount,q_pre_part_closure_PartPaymentType');
	hideFields('qForeclosureSettlement_Settlement_Validity,button251,q_pre_part_closure_PreclosureAmount,q_pre_part_closure_PartPaymentAmount,q_pre_part_closure_PartPaymentType,button255,button252');
	if(typeOfSettlement == '' || typeOfSettlement == undefined){
		console.log('Select Type Of settlement');
	}else{
		if(typeOfSettlement == 'Part Payment'){
			showFields('q_pre_part_closure_PartPaymentAmount,q_pre_part_closure_PartPaymentType,button255,button252');
		}else{
			showFields('qForeclosureSettlement_Settlement_Validity,button251,q_pre_part_closure_PreclosureAmount,button252');
		}
	}
}

function onChangeCollectionEntryType(){
	console.log('Inside onChangeCollectionEntryType');
	var Type = getValue('qCollectionEntry_CollectionEntryType');
	hideFields('frame262');
	hideFields('label806');
	if(Type == 'Part Payment' || Type == 'Pre Closure'){
		showFields('frame262');
		showFields('label806');
	}
	apportionmentSectionShowHideLogic(Type,false);
}

function onChangeWaiveoffCombo(){
	console.log('Inside onChangeWaiveoffCombo');
	var waiveoff = getValue('q_pre_part_closure_WaiveOff');
	if (waiveoff == 'Yes'){
		apportionmentSectionShowHideLogic(Type,true);
	}else{
		apportionmentSectionShowHideLogic(Type,false);
	}
	
}

function apportionmentSectionShowHideLogic(entryType,waiveOff){
	console.log('Inside apportionmentSectionShowHideLogic');
	clearFields('q_Apportionment_I_EMI_DueOverdue,q_Apportionment_EMI_Due_Overdue,q_Apportionment_I_Principal_OS,q_Apportionment_Principal_OS,q_Apportionment_I_Interest_Accrued_till_date,q_Apportionment_Interest_Accrued_till_date,q_Apportionment_I_EMI_due_if_any,q_Apportionment_EMI_due_if_any,q_Apportionment_I_Bounce_Charges,q_Apportionment_Bounce_Charges,q_Apportionment_I_LP_Charges,q_Apportionment_LP_Charges,q_Apportionment_I_If_Advance_To_be_Collected,q_Apportionment_Advance_Amount,q_Apportionment_I_Part_Payment_Charges,q_Apportionment_Part_Payment_Charges,q_Apportionment_I_Pre_closure_Charges,q_Apportionment_Pre_closure_Charges,q_Apportionment_I_Other_Charges,q_Apportionment_Other_Charges,q_Apportionment_I_Credit_Balance_Advance_EMI,q_Apportionment_Credit_Balance_Advance_EMI,q_Apportionment_I_Part_closure_amount,q_Apportionment_Part_closure_amount,q_Apportionment_I_Pre_closure_amount,q_Apportionment_Pre_closure_amount,q_Apportionment_I_Sale_Settlement_Amount,q_Apportionment_Sale_Settlement_Amount,q_Apportionment_Incidental_Charges');
	disableFields('q_Apportionment_I_EMI_DueOverdue,q_Apportionment_EMI_Due_Overdue,q_Apportionment_I_Principal_OS,q_Apportionment_Principal_OS,q_Apportionment_I_Interest_Accrued_till_date,q_Apportionment_Interest_Accrued_till_date,q_Apportionment_I_EMI_due_if_any,q_Apportionment_EMI_due_if_any,q_Apportionment_I_Bounce_Charges,q_Apportionment_Bounce_Charges,q_Apportionment_I_LP_Charges,q_Apportionment_LP_Charges,q_Apportionment_I_If_Advance_To_be_Collected,q_Apportionment_Advance_Amount,q_Apportionment_I_Part_Payment_Charges,q_Apportionment_Part_Payment_Charges,q_Apportionment_I_Pre_closure_Charges,q_Apportionment_Pre_closure_Charges,q_Apportionment_I_Other_Charges,q_Apportionment_Other_Charges,q_Apportionment_I_Credit_Balance_Advance_EMI,q_Apportionment_Credit_Balance_Advance_EMI,q_Apportionment_I_Part_closure_amount,q_Apportionment_Part_closure_amount,q_Apportionment_I_Pre_closure_amount,q_Apportionment_Pre_closure_amount,q_Apportionment_I_Sale_Settlement_Amount,q_Apportionment_Sale_Settlement_Amount,q_Apportionment_Incidental_Charges');
	//Hiding fields
	hideFields('q_Apportionment_I_EMI_DueOverdue,q_Apportionment_EMI_Due_Overdue,q_Apportionment_I_Principal_OS,q_Apportionment_Principal_OS,q_Apportionment_I_Interest_Accrued_till_date,q_Apportionment_Interest_Accrued_till_date,q_Apportionment_I_EMI_due_if_any,q_Apportionment_EMI_due_if_any,q_Apportionment_I_Bounce_Charges,q_Apportionment_Bounce_Charges,q_Apportionment_I_LP_Charges,q_Apportionment_LP_Charges,q_Apportionment_I_If_Advance_To_be_Collected,q_Apportionment_Advance_Amount,q_Apportionment_I_Part_Payment_Charges,q_Apportionment_Part_Payment_Charges,q_Apportionment_I_Pre_closure_Charges,q_Apportionment_Pre_closure_Charges,q_Apportionment_I_Other_Charges,q_Apportionment_Other_Charges,q_Apportionment_I_Credit_Balance_Advance_EMI,q_Apportionment_Credit_Balance_Advance_EMI,q_Apportionment_I_Part_closure_amount,q_Apportionment_Part_closure_amount,q_Apportionment_I_Pre_closure_amount,q_Apportionment_Pre_closure_amount,q_Apportionment_I_Sale_Settlement_Amount,q_Apportionment_Sale_Settlement_Amount,q_Apportionment_Incidental_Charges');
	//Hiding Labels
	hideFields('label_App_EMI_Due_Overdue,label_App_PrincipalOS,label_App_Interest_Accured_till_date,label_App_EMI_Due_if_any,label_App_Bounce_Charges,label_App_LP_Charges,label_App_if_advance_to_be_collected,label_App_advance_amount,label_App_Part_Payment_Charges,label_App_Pre_Closure_Charges,label_App_Other_Charges,label_App_Credit_Balance_Advance_EMI,label_App_Part_Closure_Amount,label_App_Pre_Closure_Amount,label_App_Sale_Settlement_Amount,label_App_Sale_Incidental_Charges');
	console.log('Case --> ' + entryType);
	switch(entryType){
		case 'Normal':
			showFields('q_Apportionment_I_EMI_DueOverdue,q_Apportionment_EMI_Due_Overdue,q_Apportionment_I_Bounce_Charges,q_Apportionment_Bounce_Charges,q_Apportionment_I_LP_Charges,q_Apportionment_LP_Charges,q_Apportionment_I_If_Advance_To_be_Collected,q_Apportionment_Advance_Amount,q_Apportionment_I_Credit_Balance_Advance_EMI,q_Apportionment_Credit_Balance_Advance_EMI');
			//Showing labels
			showFields('label_App_EMI_Due_Overdue,label_App_Bounce_Charges,label_App_LP_Charges,label_App_Credit_Balance_Advance_EMI,label_App_if_advance_to_be_collected,label_App_advance_amount');
			enableFields('q_Apportionment_EMI_Due_Overdue,q_Apportionment_Bounce_Charges,q_Apportionment_LP_Charges,q_Apportionment_Credit_Balance_Advance_EMI');
			if(getValue('q_Apportionment_I_If_Advance_To_be_Collected')=='Yes'){
				enableFields('q_Apportionment_Advance_Amount');
			}
			break;
		case 'Part Payment':
			showFields('q_Apportionment_I_Principal_OS,q_Apportionment_Principal_OS,q_Apportionment_I_Interest_Accrued_till_date,q_Apportionment_Interest_Accrued_till_date,q_Apportionment_I_EMI_due_if_any,q_Apportionment_EMI_due_if_any,q_Apportionment_I_Bounce_Charges,q_Apportionment_Bounce_Charges,q_Apportionment_I_LP_Charges,q_Apportionment_LP_Charges,q_Apportionment_I_Part_Payment_Charges,q_Apportionment_Part_Payment_Charges,q_Apportionment_I_Credit_Balance_Advance_EMI,q_Apportionment_Credit_Balance_Advance_EMI,q_Apportionment_I_Part_closure_amount,q_Apportionment_Part_closure_amount');
			//Showing labels
			showFields('label_App_PrincipalOS,label_App_Interest_Accured_till_date,label_App_EMI_Due_if_any,label_App_Bounce_Charges,label_App_LP_Charges,label_App_Part_Payment_Charges,label_App_Credit_Balance_Advance_EMI,label_App_Part_Closure_Amount');
			if(waiveOff){
				enableFields('q_Apportionment_Bounce_Charges,q_Apportionment_LP_Charges,q_Apportionment_Part_Payment_Charges');
			}else{
				enableFields('q_Apportionment_Part_closure_amount');
			}
			break;
		case 'Pre Closure':
			showFields('q_Apportionment_I_Principal_OS,q_Apportionment_Principal_OS,q_Apportionment_I_Interest_Accrued_till_date,q_Apportionment_Interest_Accrued_till_date,q_Apportionment_I_EMI_due_if_any,q_Apportionment_EMI_due_if_any,q_Apportionment_I_Bounce_Charges,q_Apportionment_Bounce_Charges,q_Apportionment_I_LP_Charges,q_Apportionment_LP_Charges,q_Apportionment_I_Pre_closure_Charges,q_Apportionment_Pre_closure_Charges,q_Apportionment_I_Credit_Balance_Advance_EMI,q_Apportionment_Credit_Balance_Advance_EMI,q_Apportionment_I_Pre_closure_amount,q_Apportionment_Pre_closure_amount');
			//Showing labels
			showFields('label_App_PrincipalOS,label_App_Interest_Accured_till_date,label_App_EMI_Due_if_any,label_App_Bounce_Charges,label_App_LP_Charges,label_App_Pre_Closure_Charges,label_App_Credit_Balance_Advance_EMI,label_App_Pre_Closure_Amount');
			if(waiveOff){
				enableFields('q_Apportionment_Bounce_Charges,q_Apportionment_LP_Charges,q_Apportionment_Pre_closure_Charges');
			}else{
				enableFields('q_Apportionment_Pre_closure_amount');
			}
			break;
		case 'Sale':
		case 'Settlement':
		case 'Shortfall':
			showFields('q_Apportionment_I_Principal_OS,q_Apportionment_Principal_OS,q_Apportionment_I_Interest_Accrued_till_date,q_Apportionment_Interest_Accrued_till_date,q_Apportionment_I_Bounce_Charges,q_Apportionment_Bounce_Charges,q_Apportionment_I_LP_Charges,q_Apportionment_LP_Charges,q_Apportionment_I_Other_Charges,q_Apportionment_Other_Charges,q_Apportionment_I_Credit_Balance_Advance_EMI,q_Apportionment_Credit_Balance_Advance_EMI,q_Apportionment_I_Sale_Settlement_Amount,q_Apportionment_Sale_Settlement_Amount,q_Apportionment_Incidental_Charges');
			//Showing labels
			showFields('label_App_PrincipalOS,label_App_Interest_Accured_till_date,label_App_Bounce_Charges,label_App_LP_Charges,label_App_Other_Charges,label_App_Credit_Balance_Advance_EMI,label_App_Sale_Settlement_Amount,label_App_Sale_Incidental_Charges');
			enableFields('q_Apportionment_Sale_Settlement_Amount,q_Apportionment_Incidental_Charges')
			break;
	}
}


$("[id^='" + "q_Apportionment" + "']" ).change(function(){
    console.log('Change event triggered for id starting with q_Apportionment');
	var id1 = '';
	var id2 = '';
	if(this.id == 'q_Apportionment_EMI_Due_Overdue'){
		 id1 = this.id;
		 id2 = 'q_Apportionment_I_EMI_DueOverdue';
	}else{
		 id1 = this.id;
		 id2 = 'q_Apportionment_I_'+this.id.split('q_Apportionment_')[1];
	}
	if(!Number.isNaN(getValue(id1)) && getValue(id1) != '' && getValue(id1)!=undefined && !Number.isNaN(getValue(id2)) && getValue(id2) != '' && getValue(id2)!=undefined){
			if(parseFloat(getValue(id1))>parseFloat(getValue(id2))){
				clearFields(id1);
				alert('Cannot Fill value greater than autopopulated');
			}
		}
});

function sevenDaysChargesWaiverLogic(){
	console.log('Inside sevenDaysChargesWaiverLogic');
	if(getGridRowCount('ChargerWaiverTable')>0){
		var abc = '';
		$('#'+'ChargerWaiverTable'+' tbody').find('tr').each(function(x){
				abc = ($(this).find('td:nth-child(4)').find("label").text())
			});
		var currentDate = new Date();
		var approvalDate = Date.parse(abc);
		var v3 = (currentDate - approvalDate)/ (1000 * 3600 * 24);
		if(v3>=7){
			console.log('7 Days approval limit of Waiver expired');
			alert('7 Days approval limit of Waiver expired');
			clearTable('ChargerWaiverTable',true);
			window.parent.WFSave();
		}
	}
}



function customApproveRejectLogicOnFormSubmit(activityName){
	console.log('Inside customApproveRejectLogicOnFormSubmit');
	var value = executeServerEvent('customApproveRejectLogicOnFormSubmit','submit','',true);
	var decision = getValue('DecisionAction');
	if(value == ''){
		switch(activityName){
			case 'Pre_Part_Closure_Request':
				var waiver = getValue('q_pre_part_closure_WaiveOff');
				if(decision == 'Submit' && waiver == 'Waive off'){
					setValues({'Target_Workstep':'Charge_Waiver'},true);
				}else{
					setValues({'Target_Workstep':'Payment_Posting'},true);
				}
				break;
			case 'Collection_Escalation':
				var actionCode = getValue('qContactRecording_Action_Code');
				if(decision == 'Approve' || decision == 'Forward'){
					if(actionCode == 'Skip Customer' || actionCode == 'Skip Vehicle' || actionCode == 'Skip No Trace'){
						setValues({'Target_Workstep':'Skip_Cases'},true);
					}else if(actionCode == 'Initiate Demand Letter' || actionCode == 'Initiate  Intimation Letter' || actionCode == 'Death Intimation' || actionCode == 'Initiate Recall Notice'){
						setValues({'Target_Workstep':'Document_Generation'},true);
					}else{
						setValues({'Target_Workstep':'DMS_Archival'},true);
					}
				}else if(decision == 'Action Required'){
					setValues({'Target_Workstep':'Action_From_Manager'},true);
				}
				break;
			case 'Manager_Action':
				var previousWorkstep = getValue('PreviousWS');
				if(decision == 'Submit'){
					if(previousWorkstep == 'AUB'){
						setValues({'Target_Workstep':'Address_Update_Branch'},true);
					}else{
						setValues({'Target_Workstep':'Repayment_Swap_Branch'},true);
					}
				}
				break;
			case 'Expense_Approval':
				var previousWorkstep = getValue('PreviousWS');
				if(decision == 'Approve'){
					if(previousWorkstep == 'Legal_Update'){
						setValues({'Target_Workstep':'Legal_Update'},true);
					}else{
						setValues({'Target_Workstep':'Repo_Marked'},true);
					}
				}else{
					if(previousWorkstep == 'Legal_Update'){
						setValues({'Target_Workstep':'Legal_Update'},true);
					}else{
						setValues({'Target_Workstep':'Repo_Marking'},true);
					}
				}
				break;		
		}
	}else{
		setValues({'Target_Workstep':value},true);
	}
	if(decision!='Approve' && decision!=''){
		clearFields('QRole');
	}
}

function autopopulatesystemgeneratedreceipt(){
	console.log('Inside autopopulatesystemgeneratedreceipt');	
	var today = new Date();
	var date = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate()+''+today.getHours()+''+today.getMinutes()+''+ today.getSeconds();
	var customerId=getValue("CustomerID");
	clearValue("qCollectionEntry_systemreceiptno",true);		
	var systemgeneratedreceipt=customerId+''+date;
   setValues({"qCollectionEntry_systemreceiptno":systemgeneratedreceipt},true);
	console.log(systemgeneratedreceipt);
}

function Increase_Callback_noofattempts(){
	console.log('Inside Increase_Callback_noofattempts');
	var attemptno=getValue("qContactRecording_NoofAttempts");
	if(attemptno == undefined || attemptno =='0'|| attemptno==''){
		var x=1;
		setValues({"qContactRecording_NoofAttempts":x},true);
	}else {
		var no=parseInt(attemptno);
		var y=no+1;
		setValues({"qContactRecording_NoofAttempts":y},true);
	}
}

//to load the data inside the tab on click of the tab.
function customOnClickTab(tabId, sheetindex) {

    //console.log("Inside customOnClickTab-->" + tabId + "," + sheetindex);
	var parentFlg= getValue("isParent");
    var loan_no = getValue("Loan_Account_No");
	//var sActivityName = getWorkItemData("activityname");
    
	if((parentFlg!=null && parentFlg.toLocaleLowerCase()=='yes')){ 
	
	if (loan_no != null && loan_no != '' && tabId == 'tab2') {

        switch (sheetindex) {

            case 0:
                break;

            case 1:
                var ids = 'fetchBtnCustomerInformation,fetchBtnAddressDetails,fetchBtnReferenceDetails,fetchBtnKYCDetails,fetchBtnLinkedLoanDetails';
                executeServerEvent('fetchOnDemandData', 'click', ids, true);
                break;

            case 2:
                var ids = 'fetchBtnAssetDetails,fetchBtnLoanInsurance,fetchBtnPaymentDetails,fetchBtnRepayment,fetchBtnSPDC,fetchBtnBucketDetails,fetchBtnGeneralDetails,fetchBtnDPDMatrix';
                executeServerEvent('fetchOnDemandData', 'click', ids, true);
                break;

            case 3:
                var ids = 'fetchBtnOverdueDetails,fetchBtnBreakupOfExpenses,fetchBtnBounceDetails';
                executeServerEvent('fetchOnDemandData', 'click', ids, true);
                break;
				
			case 7:
				populateAddress("qCR_Pickup_Address_For_Pick_Up");
			    break;
        }


    }
	
}

//fetching the history grids (not based on the parent/child WI)
        switch (sheetindex) {
			case 8:
                var ids = 'fetchBtnActionHistory';
                executeServerEvent('fetchOnDemandData', 'click', ids, true);
                break;

        }
		
		

}


function populateAddress(id){ 
var loan=getValue("Loan_Account_No");
var val=getValue(id);
if(val!=null && val.trim()==''){ 
	var addr=executeServerEvent('getAddressforPickupMeeting','click',loan,true);
	var jSon={};
	jSon[id]=addr;
	setValues(jSon,true);
}

}

//this will be called on form load after the data populate to trigger the events to enable & disable the fields.
function triggerEventsOnLoad(){ 
console.log('Inside triggerEventsOnLoad')
var acVal= getValue("qContactRecording_Action_Code");

		
		if (acVal!=null && acVal!='' && acVal == 'Collection Entry') {
			$("#qCollectionEntry_CollectionEntryType").trigger("change");
			$("#qCollectionEntry_Mode_Of_Payment").trigger("change");
			onChangeCollectionEntryType();
			OnChangePayReceivedFrom();
		}
		
		if (acVal!=null && acVal!='' && acVal == 'Reported Paid') {
			$("#qContactRecording_paidby").trigger("change");
			
			
		}

}

//setting the homebranch in the field.
function setHomeBranch(id){ 
	console.log('Inside setHomeBranch');
	var homebranch = getValue("Branch_Details");
	if(homebranch!=null && homebranch.replace(/\s+/g,'')!="" && homebranch.replace(/\s+/g,'')!=":"){ 
		var josnBrnch={};
		josnBrnch[id]=homebranch;
		setValues(josnBrnch, true);
	}

}

function populateApplicantTypeManually(){
	console.log('Inside populateApplicantTypeManually');
	var opt = executeServerEvent("populateApplicantTypeAndName","OnLoad" ,"",true);
	var break1 = opt.split('--break--');
	var items = [];
	for(i=0;i<break1.length;i++){
		if(break1[i] != undefined && break1[i] != ''){
			items.push(break1[i]);
		}
	}
	
	//Populating All Dropdowns
	var dropdowns=['qContactnumberupdationdetails_Applicanttype','AddressUpdateApplicantType','RepaymentSwapApplicantType','qContactRecording_applicanttype','qInitiateLegal_LegalAccepted','qCollectionEntry_paymentreceivedfrom','qContactRecording_paidby','qEPDetails_EPClaimAmount','qEPDetails_Which_Party','qContactRecording_paymentreceived'];
	for(var j=0;j<dropdowns.length;j++){
		var currentDropdown = document.getElementById(dropdowns[j]);
		for(var i=0;i<items.length;i++){
			var option = document.createElement("option");
			option.text = items[i];
			if($("#"+dropdowns[j]).find('option[value="'+items[i]+'"]').length === 0){ 
				currentDropdown.add(option,i+1);
			}
			
		}
		if(dropdowns[j] == 'qInitiateLegal_LegalAccepted' || dropdowns[j] == 'qEPDetails_Which_Party'){
			var option = document.createElement("option");
			option.text = 'All';
			currentDropdown.add(option);
		}
	}
	
}

function hideShowHearingVisitReport(){
	console.log('Inside hideShowHearingVisitReport');
	var activityName = getWorkItemData("activityname");
	if(activityName == 'Legal_Update' || activityName == 'Expense_Approval'){
		showFields('VisitReportLabel,VisitReportCollapsible,HearingLabel,HearingCollapsible');
	}else{
		hideFields('VisitReportLabel,VisitReportCollapsible,HearingLabel,HearingCollapsible');
	}
}


function onChangeLegalActionCode(){
	console.log('Inside onChangeLegalActionCode');
	clearFields('qArbitrationDetails_Bucket,qArbitrationDetails_Total_Outstanding_Amount,qArbitrationDetails_Arbitration_Initiation_Date,qArbitrationDetails_LRN,qArbitrationDetails_Case_Number,qArbitrationDetails_Arbitrator_Name,qArbitrationDetails_DateofArbitrationreq,qArbitrationDetails_Arbitration_Notice_Status,qArbitrationDetails_Arbitrator_Notice_Date,qArbitrationDetails_Arbitrator_Notice_Status,qArbitrationDetails_Stage_of_Appeal,qArbitrationDetails_Claim_Amount,qArbitrationDetails_Claim_Interest_From,qArbitrationDetails_Claim_Interest_Rate,qArbitrationDetails_Whether_awarded,qArbitrationDetails_Date_of_award,qArbitrationDetails_Amount_Awarded,qArbitrationDetails_Interest_Awarded_From,qArbitrationDetails_Interest_Awarded_Rate,qArbitrationDetails_Whether_exparte_or_contested,qArbitrationDetails_Specify_who,qArbitrationDetails_Executable_After,qArbitrationDetails_Amount_Recovered,qArbitrationDetails_Whether_Challenged_under_Sec_34,qArbitrationDetails_Name_of_the_court,qArbitrationDetails_Name_of_the_advocate,qArbitrationDetails_Mobile_No_of_the_advocate,qArbitrationDetails_Advocate_ID,qArbitrationDetails_Whether_counter_filed,qArbitrationDetails_Sec_34_Date_of_Filing,qArbitrationDetails_Whether_Sec_34_Stay_Granted,qArbitrationDetails_Appeal_notice_to_CAGL,qArbitrationDetails_Date_of_dismissal,qArbitrationDetails_If_against_whether_appeal_preferred_under_Sec37,qArbitrationDetails_Disclosure_Notice_Date,qArbitrationDetails_Whether_Sec_37_Stay_Granted,qArbitrationDetails_Appeal_notice_to_CAGL2,qArbitrationDetails_Date_of_Disposal,qArbitrationDetails_Adovocate_Fee,qArbitrationDetails_Other_Arbitration_Related_Expenses,qArbitrationDetails_Stage_In_Arbitration,qArbitrationDetails_Stage_In_Arbitration,qArbitrationDetails_Type_of_Hold,qArbitrationDetails_Settled,qArbitrationDetails_Remarks,qArbitrationDetails_TotalPOS,qSec9Details_Sec_9_CaseNo,qSec9Details_Name_of_the_court,qSec9Details_Advocate_Name,qSec9Details_Advocate_Number,qSec9Details_Professional_Fees,qSec9Details_Other_Expenses,qSec9Details_Date_of_Order,qSec9Details_Status,qSec9Details_Type_of_Hold,qSec9Details_Remarks,qChequeBounceSec138_Whether_cheque_towards_EMI_or_settlement_figure,qChequeBounceSec138_ChequeNo,qChequeBounceSec138_Cheque_amount,qChequeBounceSec138_Date_of_Dishonour,qChequeBounceSec138_Reason_for_Dishonour,qChequeBounceSec138_Drawer_Bank_Memo_Date,qChequeBounceSec138_Drawee_Bank_Memo_Date,qChequeBounceSec138_Date_of_Notice,qChequeBounceSec138_Status_of_Notice,qChequeBounceSec138_Date_of_filing_of_the_complaint,qChequeBounceSec138_Court,qChequeBounceSec138_Case_Number,qChequeBounceSec138_Bail_taken_by_the_Customer,qChequeBounceSec138_Appeal_notice_sent_to_CAGL,qChequeBounceSec138_Name,qChequeBounceSec138_Mobile_Number,qChequeBounceSec138_Stage,qChequeBounceSec138_Fee_Paid_Details,qChequeBounceSec138_Expenses_Incurred,qChequeBounceSec138_Last_Hearing_Date,qChequeBounceSec138_Judgement_Status,qChequeBounceSec138_Remarks,qComplaintAgainstCustomer_Type_of_Complaint,qComplaintAgainstCustomer_Offences_alleged,qComplaintAgainstCustomer_Date_of_filing_of_complaint,qComplaintAgainstCustomer_Name_of_the_accused,qComplaintAgainstCustomer_Court,qComplaintAgainstCustomer_Court_refer_to_concerned_police_station,qComplaintAgainstCustomer_Charge_sheet_filed_at_court,qComplaintAgainstCustomer_Name_of_the_station,qComplaintAgainstCustomer_Whether_FIR_filed,qComplaintAgainstCustomer_FIRNo,qComplaintAgainstCustomer_CriminalComplaintNo,qComplaintAgainstCustomer_B_Report_Filed,qComplaintAgainstCustomer_Notice_Sent_to_CAGL_on_B_Report_Filing,qComplaintAgainstCustomer_Vehicle_Released,qComplaintAgainstCustomer_Whether_statement_recorded,qComplaintAgainstCustomer_Advocate,qComplaintAgainstCustomer_Mobile_No,qComplaintAgainstCustomer_Stage,qComplaintAgainstCustomer_Steps_taken_by_the_accused,qComplaintAgainstCustomer_Fee,qComplaintAgainstCustomer_Expenses,qComplaintAgainstCustomer_Final_Report_Date,qComplaintAgainstCompany_Stage2,qComplaintAgainstCustomer_NextDate,qComplaintAgainstCustomer_Final_Report_Status,qComplaintAgainstCustomer_Remarks,qComplaintAgainstCompany_Type_of_Complaint,qComplaintAgainstCompany_Type_of_Criminial_Complaint,qComplaintAgainstCompany_Complaint,qComplaintAgainstCompany_Opposite_parties,qComplaintAgainstCompany_Forum,qComplaintAgainstCompany_Complaint_No,qComplaintAgainstCompany_Nature_of_relief,qComplaintAgainstCompany_Compensation,qComplaintAgainstCompany_Whether_entered_appearance,qComplaintAgainstCompany_Whether_version_filed,qComplaintAgainstCompany_Stage,qComplaintAgainstCompany_Name_of_the_court,qComplaintAgainstCompany_Police_Station,qComplaintAgainstCompany_Complaint_No2,qComplaintAgainstCompany_Name_of_the_accused,qComplaintAgainstCompany_Offences_alleged,qComplaintAgainstCompany_Date_of_the_Cognisance_Order,qComplaintAgainstCompany_Date_fixed_for_the_appearance_of_the_accused,qComplaintAgainstCompany_Whether_Anticipatory_Bail_obtained_Sec_438,qComplaintAgainstCompany_If_so_for_whom,qComplaintAgainstCompany_From_which_court,qComplaintAgainstCompany_AB_Stage,qComplaintAgainstCompany_Whether_Quash_482_filed,qComplaintAgainstCompany_Which_High_Court,qComplaintAgainstCompany_If_so_for_whom_hc,qComplaintAgainstCompany_S_482_Status,qComplaintAgainstCompany_Date_of_Disposal,qComplaintAgainstCompany_Nature_of_order,qComplaintAgainstCompany_Advocate_Name,qComplaintAgainstCompany_Advocate_Number,qComplaintAgainstCompany_Fee_Paid,qComplaintAgainstCompany_Other_Expense_Details,qComplaintAgainstCompany_Overall_Status,qComplaintAgainstCompany_Final_Order_Date,qComplaintAgainstCompany_Final_Order_Status,qComplaintAgainstCompany_Remarks,qEPDetails_Ep_To_Be_Filed_Date,qEPDetails_EP_filed,qEPDetails_EP_Filed_Date,qEPDetails_EP_Filing_Location,qEPDetails_Ep_Court,qEPDetails_Ep_CaseNo,qEPDetails_Notice_to_Judgement_Debtor,qEPDetails_EP_TC_Name,qEPDetails_EP_TC_No,qEPDetails_EP_Re_Filing_Date,qEPDetails_EP_Claim_Amendment_Date,qEPDetails_EP_Claim_Amendment_Amount,qEPDetails_Whether_being_executed_after_Challenge,qEPDetails_Date_of_filing_of_the_setting_aside_petition,qEPDetails_Date_of_dismissal_of_the_petition,qEPDetails_Whether_any_appeal_filed,qEPDetails_Amount_recovered,qEPDetails_EPClaimAmount,qEPDetails_Whether_opposite_Party_Appeared_or_not,qEPDetails_Which_Party,qEPDetails_Nature_of_Relief,qEPDetails_Against_whom,qEPDetails_Whether_opposite_Party_Appeared_or_not,qEPDetails_Which_Party,qEPDetails_Nature_of_Relief,qEPDetails_Against_whom,qEPDetails_Whose_property,qEPDetails_Details_of_property,qEPDetails_Value_of_property,qEPDetails_Whose_salary,qEPDetails_Details_of_the_employer,qEPDetails_Whose_receivables,qEPDetails_Name_of_the_garnishee,qEPDetails_Status_of_the_arrest_application,qEPDetails_Whether_JDs_entered_appearance,qEPDetails_If_yes_who,qEPDetails_Whether_being_contested,qEPDetails_If_yes_whether_counter_filed,qEPDetails_Details_required_to_proceed_further,qEPDetails_Name_Of_Advocate,qEPDetails_Advocate_Contact_No,qEPDetails_Total_Fee,qEPDetails_Other_EP_Expenses,qEPDetails_Case_Status,qEPDetails_Settled,qEPDetails_Settlement_Amount,qEPDetails_POS_loss_amount,qEPDetails_TOS_loss_amount,qEPDetails_POS_loss,qEPDetails_TOS_loss,qEPDetails_Remarks');
	//Clearing visit report fields
	clearFields('qVisitReport_Case_Type,qVisitReport_Profile_Remarks,qVisitReport_Other_Remarks');
	hideFields('ArbitrationLabel,ArbitrationCollapsible,Sec9Label,Sec9Collapsible,ChequeBounceLabel,ChequeBounceCollapsible,CACustomerLable,CACustomerCollapsible,CACompanyCollapsible,CACompanyLabel,EPDetailsLabel,EPDetailsCollapsible');
	var activityName = getWorkItemData("activityname");
	var LegalAction = getValue('qInitiateLegal_Type_of_Legal_Action');
	if(LegalAction != '' && LegalAction != undefined){
		if(activityName != 'Initiate_Legal_Action' && activityName != 'Leagl_Action_Approval' && activityName != 'Legal'){
			var result = executeServerEvent('onChangeLegalActionCode','onChange',LegalAction,true);
			showFields(result);
			if(result.search('ArbitrationLabel') != -1){
				ArbitrationEnableDisable();
			}else if(result.search('CACompanyLabel') != -1){
				complaintAgainstCompanyEnableDisable();
			}
		}
	}
	if(LegalAction == 'EP' || LegalAction == 'Complaint Against Company'){
		enableFields('qInitiateLegal_LegalAccepted');
	}else{
		disableFields('qInitiateLegal_LegalAccepted');
		clearFields('qInitiateLegal_LegalAccepted');
	}
	disableLegalFields();

}

function disableLegalFields(){
	console.log('Inside disableLegalFields');
	disableFields('qArbitrationDetails_Bucket,qArbitrationDetails_Total_Outstanding_Amount');
}

function ArbitrationEnableDisable(){
	console.log('Inside ArbitrationEnableDisable');
	
	//Whether awarded
	var value = getValue('qArbitrationDetails_Whether_awarded');
	if(value=='Yes'){
		enableFields('qArbitrationDetails_Date_of_award,qArbitrationDetails_Amount_Awarded,qArbitrationDetails_Interest_Awarded_From,qArbitrationDetails_Interest_Awarded_Rate,qArbitrationDetails_Executable_After,qArbitrationDetails_Whether_Challenged_under_Sec_34');
	}else{
		disableFields('qArbitrationDetails_Date_of_award,qArbitrationDetails_Amount_Awarded,qArbitrationDetails_Interest_Awarded_From,qArbitrationDetails_Interest_Awarded_Rate,qArbitrationDetails_Executable_After,qArbitrationDetails_Whether_Challenged_under_Sec_34');
		clearFields('qArbitrationDetails_Date_of_award,qArbitrationDetails_Amount_Awarded,qArbitrationDetails_Interest_Awarded_From,qArbitrationDetails_Interest_Awarded_Rate,qArbitrationDetails_Executable_After,qArbitrationDetails_Whether_Challenged_under_Sec_34');
	}
	
	//Whether contested
	var whetherContested = getValue('qArbitrationDetails_Whether_exparte_or_contested');
	if(whetherContested == 'Contested'){
		enableFields('qArbitrationDetails_Specify_who');
	}else{
		disableFields('qArbitrationDetails_Specify_who');
		clearFields('qArbitrationDetails_Specify_who');
	}
	
	//Whether Challenged under Sec-34
	var whetherChallenged = getValue('qArbitrationDetails_Whether_Challenged_under_Sec_34');
	if(whetherChallenged == 'Yes'){
		enableFields('qArbitrationDetails_Name_of_the_court,qArbitrationDetails_Name_of_the_advocate,qArbitrationDetails_Mobile_No_of_the_advocate,qArbitrationDetails_Advocate_ID,qArbitrationDetails_Whether_counter_filed,qArbitrationDetails_Sec_34_Date_of_Filing,qArbitrationDetails_Whether_Sec_34_Stay_Granted,qArbitrationDetails_Appeal_notice_to_CAGL,qArbitrationDetails_Date_of_dismissal');
	}else{
		disableFields('qArbitrationDetails_Name_of_the_court,qArbitrationDetails_Name_of_the_advocate,qArbitrationDetails_Mobile_No_of_the_advocate,qArbitrationDetails_Advocate_ID,qArbitrationDetails_Whether_counter_filed,qArbitrationDetails_Sec_34_Date_of_Filing,qArbitrationDetails_Whether_Sec_34_Stay_Granted,qArbitrationDetails_Appeal_notice_to_CAGL,qArbitrationDetails_Date_of_dismissal');
		clearFields('qArbitrationDetails_Name_of_the_court,qArbitrationDetails_Name_of_the_advocate,qArbitrationDetails_Mobile_No_of_the_advocate,qArbitrationDetails_Advocate_ID,qArbitrationDetails_Whether_counter_filed,qArbitrationDetails_Sec_34_Date_of_Filing,qArbitrationDetails_Whether_Sec_34_Stay_Granted,qArbitrationDetails_Appeal_notice_to_CAGL,qArbitrationDetails_Date_of_dismissal');
	}
	
	//whether appeal preferred under Sec.37
	var whetherSection37 = getValue('qArbitrationDetails_If_against_whether_appeal_preferred_under_Sec37');
	if(whetherSection37 == 'Yes'){
		enableFields('qArbitrationDetails_Disclosure_Notice_Date,qArbitrationDetails_Whether_Sec_37_Stay_Granted,qArbitrationDetails_Appeal_notice_to_CAGL2');
	}else{
		clearFields('qArbitrationDetails_Disclosure_Notice_Date,qArbitrationDetails_Whether_Sec_37_Stay_Granted,qArbitrationDetails_Appeal_notice_to_CAGL2');
		disableFields('qArbitrationDetails_Disclosure_Notice_Date,qArbitrationDetails_Whether_Sec_37_Stay_Granted,qArbitrationDetails_Appeal_notice_to_CAGL2');
	}
	
	//Handling EP Details according to whether awarded section
	EPDetailsEnableDisable();
}

function complaintAgainstCompanyEnableDisable(){
	console.log('Inside complaintAgainstCompanyEnableDisable');
	
	//ComplaintType
	var complaintType = getValue('qComplaintAgainstCompany_Type_of_Complaint');
	disableFields('qComplaintAgainstCompany_Type_of_Criminial_Complaint,qComplaintAgainstCompany_Forum,qComplaintAgainstCompany_Nature_of_relief,qComplaintAgainstCompany_Compensation,qComplaintAgainstCompany_Whether_entered_appearance,qComplaintAgainstCompany_Whether_version_filed,qComplaintAgainstCompany_Whether_Anticipatory_Bail_obtained_Sec_438,qComplaintAgainstCompany_Whether_Quash_482_filed');
	if(complaintType == 'Criminal'){
		enableFields('qComplaintAgainstCompany_Type_of_Criminial_Complaint,qComplaintAgainstCompany_Whether_Anticipatory_Bail_obtained_Sec_438,qComplaintAgainstCompany_Whether_Quash_482_filed');
		clearFields('qComplaintAgainstCompany_Forum,qComplaintAgainstCompany_Nature_of_relief,qComplaintAgainstCompany_Compensation,qComplaintAgainstCompany_Whether_entered_appearance,qComplaintAgainstCompany_Whether_version_filed');
	}else if(complaintType == 'Consumer' || complaintType == 'Civil' || complaintType == 'Others'){
		enableFields('qComplaintAgainstCompany_Forum,qComplaintAgainstCompany_Nature_of_relief,qComplaintAgainstCompany_Compensation,qComplaintAgainstCompany_Whether_entered_appearance,qComplaintAgainstCompany_Whether_version_filed');
		clearFields('qComplaintAgainstCompany_Type_of_Criminial_Complaint,qComplaintAgainstCompany_Whether_Anticipatory_Bail_obtained_Sec_438,qComplaintAgainstCompany_Whether_Quash_482_filed');
	}else{
		clearFields('qComplaintAgainstCompany_Type_of_Criminial_Complaint,qComplaintAgainstCompany_Forum,qComplaintAgainstCompany_Nature_of_relief,qComplaintAgainstCompany_Compensation,qComplaintAgainstCompany_Whether_entered_appearance,qComplaintAgainstCompany_Whether_version_filed,qComplaintAgainstCompany_Whether_Anticipatory_Bail_obtained_Sec_438,qComplaintAgainstCompany_Whether_Quash_482_filed');
	}
	
	//Type of Criminal ComplaintType
	var typeOfCriminalComplaint = getValue('qComplaintAgainstCompany_Type_of_Criminial_Complaint');
	disableFields('qComplaintAgainstCompany_Name_of_the_court,qComplaintAgainstCompany_Police_Station,qComplaintAgainstCompany_Complaint_No2,qComplaintAgainstCompany_Name_of_the_accused,qComplaintAgainstCompany_Offences_alleged,qComplaintAgainstCompany_Date_of_the_Cognisance_Order,qComplaintAgainstCompany_Date_fixed_for_the_appearance_of_the_accused');
	if(typeOfCriminalComplaint == 'Court'){
		enableFields('qComplaintAgainstCompany_Name_of_the_court,qComplaintAgainstCompany_Name_of_the_accused,qComplaintAgainstCompany_Offences_alleged,qComplaintAgainstCompany_Date_of_the_Cognisance_Order,qComplaintAgainstCompany_Date_fixed_for_the_appearance_of_the_accused');
		clearFields('qComplaintAgainstCompany_Police_Station,qComplaintAgainstCompany_Complaint_No2,qComplaintAgainstCompany_Name_of_the_accused,qComplaintAgainstCompany_Offences_alleged');
	}else if(typeOfCriminalComplaint == 'Police'){
		enableFields('qComplaintAgainstCompany_Police_Station,qComplaintAgainstCompany_Complaint_No2,qComplaintAgainstCompany_Name_of_the_accused,qComplaintAgainstCompany_Offences_alleged');
		clearFields('qComplaintAgainstCompany_Name_of_the_court,qComplaintAgainstCompany_Name_of_the_accused,qComplaintAgainstCompany_Offences_alleged,qComplaintAgainstCompany_Date_of_the_Cognisance_Order,qComplaintAgainstCompany_Date_fixed_for_the_appearance_of_the_accused');
	}else{
		clearFields('qComplaintAgainstCompany_Name_of_the_court,qComplaintAgainstCompany_Police_Station,qComplaintAgainstCompany_Complaint_No2,qComplaintAgainstCompany_Name_of_the_accused,qComplaintAgainstCompany_Offences_alleged,qComplaintAgainstCompany_Date_of_the_Cognisance_Order,qComplaintAgainstCompany_Date_fixed_for_the_appearance_of_the_accused');
	}
	
	//Whether AB obtained 
	var whetherAB = getValue('qComplaintAgainstCompany_Whether_Anticipatory_Bail_obtained_Sec_438');
	if(whetherAB == 'Yes'){
		enableFields('qComplaintAgainstCompany_If_so_for_whom,qComplaintAgainstCompany_From_which_court,qComplaintAgainstCompany_AB_Stage');
	}else{
		disableFields('qComplaintAgainstCompany_If_so_for_whom,qComplaintAgainstCompany_From_which_court,qComplaintAgainstCompany_AB_Stage');
		clearFields('qComplaintAgainstCompany_If_so_for_whom,qComplaintAgainstCompany_From_which_court,qComplaintAgainstCompany_AB_Stage');
	}
	
	//Whether Quash(482) filed ?
	var whetherQuashFiled = getValue('qComplaintAgainstCompany_Whether_Quash_482_filed');
	if(whetherAB == 'Yes'){
		enableFields('qComplaintAgainstCompany_Which_High_Court,qComplaintAgainstCompany_If_so_for_whom_hc,qComplaintAgainstCompany_S_482_Status,qComplaintAgainstCompany_Date_of_Disposal,qComplaintAgainstCompany_Nature_of_order,qComplaintAgainstCompany_Advocate_Name,qComplaintAgainstCompany_Advocate_Number,qComplaintAgainstCompany_Fee_Paid,qComplaintAgainstCompany_Other_Expense_Details');
	}else{
		disableFields('qComplaintAgainstCompany_Which_High_Court,qComplaintAgainstCompany_If_so_for_whom_hc,qComplaintAgainstCompany_S_482_Status,qComplaintAgainstCompany_Date_of_Disposal,qComplaintAgainstCompany_Nature_of_order,qComplaintAgainstCompany_Advocate_Name,qComplaintAgainstCompany_Advocate_Number,qComplaintAgainstCompany_Fee_Paid,qComplaintAgainstCompany_Other_Expense_Details');
		clearFields('qComplaintAgainstCompany_Which_High_Court,qComplaintAgainstCompany_If_so_for_whom_hc,qComplaintAgainstCompany_S_482_Status,qComplaintAgainstCompany_Date_of_Disposal,qComplaintAgainstCompany_Nature_of_order,qComplaintAgainstCompany_Advocate_Name,qComplaintAgainstCompany_Advocate_Number,qComplaintAgainstCompany_Fee_Paid,qComplaintAgainstCompany_Other_Expense_Details');
	}
}

function EPDetailsEnableDisable(){
	console.log('Inside EPDetailsEnableDisable');
	var legalAction = getValue('qInitiateLegal_Type_of_Legal_Action');
	if(legalAction == 'Arbitration' && getValue('qArbitrationDetails_Whether_awarded') == 'Yes'){
		disableFields('qEPDetails_Ep_To_Be_Filed_Date');
		clearFields('qEPDetails_Ep_To_Be_Filed_Date');
		enableFields('qEPDetails_EP_filed,qEPDetails_Case_Status');
	}else{
		enableFields('qEPDetails_Ep_To_Be_Filed_Date');
		disableFields('qEPDetails_EP_filed,qEPDetails_Case_Status');
		clearFields('qEPDetails_EP_filed,qEPDetails_Case_Status');
	}
	
	//Onchange if Ep Filed
	var whetherEPFiled = getValue('qEPDetails_EP_filed');
	if(whetherEPFiled == 'Yes'){
		enableFields('qEPDetails_EP_Filed_Date,qEPDetails_EP_Filing_Location,qEPDetails_Ep_Court,qEPDetails_Ep_CaseNo,qEPDetails_Notice_to_Judgement_Debtor,qEPDetails_EP_TC_Name,qEPDetails_EP_TC_No,qEPDetails_EP_Re_Filing_Date,qEPDetails_EP_Claim_Amendment_Date,qEPDetails_EP_Claim_Amendment_Amount,qEPDetails_Whether_being_executed_after_Challenge,qEPDetails_Amount_recovered,qEPDetails_EPClaimAmount,qEPDetails_Whether_opposite_Party_Appeared_or_not,qEPDetails_Which_Party,qEPDetails_Nature_of_Relief,qEPDetails_Whether_JDs_entered_appearance,qEPDetails_Whether_being_contested,qEPDetails_Name_Of_Advocate,qEPDetails_Advocate_Contact_No,qEPDetails_Total_Fee,qEPDetails_Other_EP_Expenses');
	}else{
		disableFields('qEPDetails_EP_Filed_Date,qEPDetails_EP_Filing_Location,qEPDetails_Ep_Court,qEPDetails_Ep_CaseNo,qEPDetails_Notice_to_Judgement_Debtor,qEPDetails_EP_TC_Name,qEPDetails_EP_TC_No,qEPDetails_EP_Re_Filing_Date,qEPDetails_EP_Claim_Amendment_Date,qEPDetails_EP_Claim_Amendment_Amount,qEPDetails_Whether_being_executed_after_Challenge,qEPDetails_Amount_recovered,qEPDetails_EPClaimAmount,qEPDetails_Whether_opposite_Party_Appeared_or_not,qEPDetails_Which_Party,qEPDetails_Nature_of_Relief,qEPDetails_Whether_JDs_entered_appearance,qEPDetails_Whether_being_contested,qEPDetails_Name_Of_Advocate,qEPDetails_Advocate_Contact_No,qEPDetails_Total_Fee,qEPDetails_Other_EP_Expenses');
		clearFields('qEPDetails_EP_Filed_Date,qEPDetails_EP_Filing_Location,qEPDetails_Ep_Court,qEPDetails_Ep_CaseNo,qEPDetails_Notice_to_Judgement_Debtor,qEPDetails_EP_TC_Name,qEPDetails_EP_TC_No,qEPDetails_EP_Re_Filing_Date,qEPDetails_EP_Claim_Amendment_Date,qEPDetails_EP_Claim_Amendment_Amount,qEPDetails_Whether_being_executed_after_Challenge,qEPDetails_Amount_recovered,qEPDetails_EPClaimAmount,qEPDetails_Whether_opposite_Party_Appeared_or_not,qEPDetails_Which_Party,qEPDetails_Nature_of_Relief,qEPDetails_Whether_JDs_entered_appearance,qEPDetails_Whether_being_contested,qEPDetails_Name_Of_Advocate,qEPDetails_Advocate_Contact_No,qEPDetails_Total_Fee,qEPDetails_Other_EP_Expenses');
	}
	
	//onChange Whether beiung executed after challenge
	var whetherBeingExecutedAfterChallenge = getValue('qEPDetails_Whether_being_executed_after_Challenge');
	if(whetherBeingExecutedAfterChallenge == 'Yes'){
		enableFields('qEPDetails_Date_of_filing_of_the_setting_aside_petition,qEPDetails_Date_of_dismissal_of_the_petition,qEPDetails_Whether_any_appeal_filed');
	}else{
		disableFields('qEPDetails_Date_of_filing_of_the_setting_aside_petition,qEPDetails_Date_of_dismissal_of_the_petition,qEPDetails_Whether_any_appeal_filed');
		clearFields('qEPDetails_Date_of_filing_of_the_setting_aside_petition,qEPDetails_Date_of_dismissal_of_the_petition,qEPDetails_Whether_any_appeal_filed');
	}
	
	//onChange Nature Of Relief
	var natureOfRelief = getValue('qEPDetails_Nature_of_Relief');
	
	if(natureOfRelief == 'Attachment of movable properties' || natureOfRelief == 'Attachment of immovable property'){
		enableFields('qEPDetails_Whose_property,qEPDetails_Details_of_property,qEPDetails_Value_of_property');
		disableFields('qEPDetails_Whose_salary,qEPDetails_Details_of_the_employer,qEPDetails_Whose_receivables,qEPDetails_Name_of_the_garnishee,qEPDetails_Status_of_the_arrest_application');
		clearFields('qEPDetails_Whose_salary,qEPDetails_Details_of_the_employer,qEPDetails_Whose_receivables,qEPDetails_Name_of_the_garnishee,qEPDetails_Status_of_the_arrest_application');
	}else if(natureOfRelief == 'Attachment of salary'){
		enableFields('qEPDetails_Whose_salary,qEPDetails_Details_of_the_employer');
		disableFields('qEPDetails_Whose_property,qEPDetails_Details_of_property,qEPDetails_Value_of_property,qEPDetails_Whose_receivables,qEPDetails_Name_of_the_garnishee,qEPDetails_Status_of_the_arrest_application');
		clearFields('qEPDetails_Whose_property,qEPDetails_Details_of_property,qEPDetails_Value_of_property,qEPDetails_Whose_receivables,qEPDetails_Name_of_the_garnishee,qEPDetails_Status_of_the_arrest_application');
	}else if(natureOfRelief.startsWith('Garnishee')){
		enableFields('qEPDetails_Whose_receivables,qEPDetails_Name_of_the_garnishee');
		disableFields('qEPDetails_Whose_property,qEPDetails_Details_of_property,qEPDetails_Value_of_property,qEPDetails_Whose_salary,qEPDetails_Details_of_the_employer,qEPDetails_Status_of_the_arrest_application');
		clearFields('qEPDetails_Whose_property,qEPDetails_Details_of_property,qEPDetails_Value_of_property,qEPDetails_Whose_salary,qEPDetails_Details_of_the_employer,qEPDetails_Status_of_the_arrest_application');
	}else if(natureOfRelief == 'Arrest of the Parties'){
		enableFields('qEPDetails_Status_of_the_arrest_application');
		disableFields('qEPDetails_Whose_property,qEPDetails_Details_of_property,qEPDetails_Value_of_property,qEPDetails_Whose_salary,qEPDetails_Details_of_the_employer,qEPDetails_Whose_receivables,qEPDetails_Name_of_the_garnishee');
		clearFields('qEPDetails_Whose_property,qEPDetails_Details_of_property,qEPDetails_Value_of_property,qEPDetails_Whose_salary,qEPDetails_Details_of_the_employer,qEPDetails_Whose_receivables,qEPDetails_Name_of_the_garnishee');
	}else{
		disableFields('qEPDetails_Whose_property,qEPDetails_Details_of_property,qEPDetails_Value_of_property,qEPDetails_Whose_salary,qEPDetails_Details_of_the_employer,qEPDetails_Whose_receivables,qEPDetails_Name_of_the_garnishee,qEPDetails_Status_of_the_arrest_application');
		clearFields('qEPDetails_Whose_property,qEPDetails_Details_of_property,qEPDetails_Value_of_property,qEPDetails_Whose_salary,qEPDetails_Details_of_the_employer,qEPDetails_Whose_receivables,qEPDetails_Name_of_the_garnishee,qEPDetails_Status_of_the_arrest_application');
	}
	
	//onChange JD Entered Appearance
	var whetherJDEntered = getValue('qEPDetails_Whether_JDs_entered_appearance');
	if(whetherJDEntered == 'Yes'){
		enableFields('qEPDetails_If_yes_who');
	}else{
		disableFields('qEPDetails_If_yes_who');
		clearFields('qEPDetails_If_yes_who');
	}
	
	//onChange Whether being contested
	var whetherBeingContested = getValue('qEPDetails_Whether_being_contested');
	if(whetherJDEntered == 'Yes'){
		enableFields('qEPDetails_If_yes_whether_counter_filed');
	}else{
		disableFields('qEPDetails_If_yes_whether_counter_filed');
		clearFields('qEPDetails_If_yes_whether_counter_filed');
	}
	
	//SettlementDetails EnableDisbale
	if(legalAction == 'Arbitration' && whetherEPFiled == 'Yes'){
		enableFields('qEPDetails_Settled,qEPDetails_Settlement_Amount,qEPDetails_POS_loss_amount,qEPDetails_TOS_loss_amount,qEPDetails_POS_loss,qEPDetails_TOS_loss,qEPDetails_Remarks');
	}else{
		disableFields('qEPDetails_Settled,qEPDetails_Settlement_Amount,qEPDetails_POS_loss_amount,qEPDetails_TOS_loss_amount,qEPDetails_POS_loss,qEPDetails_TOS_loss,qEPDetails_Remarks');
		clearFields('qEPDetails_Settled,qEPDetails_Settlement_Amount,qEPDetails_POS_loss_amount,qEPDetails_TOS_loss_amount,qEPDetails_POS_loss,qEPDetails_TOS_loss,qEPDetails_Remarks');
	}
}

function visitReportGridPopulate(){
	console.log('Inside visitReportGridPopulate');
	var count = getGridRowCount('VisitReportGrid');
	if(count == 0){
		executeServerEvent("visitReportGridPopulate","onLoad","",true);
	}
}

function disableRepoFields(){
	console.log('Inside disableRepoFields');
	disableFields('qRepoDetails_Vehicle_Registration_No,qRepoDetails_Last_Payment_Received_Date,qRepoAdvanceDetails_Entry_Date,qRepoAdvanceDetails_Stock_Yard_Location,qRepoAdvanceDetails_To_be_Sale,qRepoMarking_Mode_of_Repo,qRepoRelease_Vehicle_Release_to_Customer_Approved_by,q_Repo_QD_Quotation_Details_Final_Resale_Amount,q_Repo_QD_Quotation_Details_Total_Outstanding,q_Repo_QD_Quotation_Details_Shortfall_Amount,q_Repo_QD_Quotation_Details_POS_loss_amount_and,q_Repo_QD_Quotation_Details_Authorized_By_Buyer,q_Repo_QD_Quotation_Details_Authorised_Buyer_Mobile_Number,q_Repo_QD_Quotation_Details_Authorized_Buyer_address');
}

function validationsRepoDetails(){
	console.log('Inside validationsRepoDetails');
	
	//onChange VehicleLoaded
	var isVehicleLoaded = getValue('qRepoAdvanceDetails_Vehicle_Loaded_or_not');
	if(isVehicleLoaded == 'Yes'){
		setMandatory('qRepoAdvanceDetails_Bilty_No,qRepoAdvanceDetails_Yard_Shifting_ApprovedBy');
	}else{
		removeMandatory('qRepoAdvanceDetails_Bilty_No,qRepoAdvanceDetails_Yard_Shifting_ApprovedBy')
	}
	
	//onChange RepoMode
	var repoMode = getValue('qRepoAdvanceDetails_Mode_of_Repossesion');
	setValues({'qRepoMarkingChecklist_Mode_of_Repo':repoMode},true);
	if(repoMode == 'Agent'){
		enableFields('qRepoAdvanceDetails_Repo_Agency_Name,qRepoAdvanceDetails_Repo_Agency_Code,qRepoAdvanceDetails_Repo_Agent_Location');
	}else{
		disableFields('qRepoAdvanceDetails_Repo_Agency_Name,qRepoAdvanceDetails_Repo_Agency_Code,qRepoAdvanceDetails_Repo_Agent_Location');
		clearFields('qRepoAdvanceDetails_Repo_Agency_Name,qRepoAdvanceDetails_Repo_Agency_Code,qRepoAdvanceDetails_Repo_Agent_Location');
	}
	
	//onChange asset conditional
	var assetCondition = getValue('qRepoAdvanceDetails_Asset_condition');
	if(getValue('qSaleDetails_Asset_condition') == '' || getValue('qSaleDetails_Asset_condition') == undefined){
		setValues({'qSaleDetails_Asset_condition':assetCondition},true);
	}
}

function validationsRepoRelease(){
	console.log('Inside validationsRepoRelease');
	
	//onChange Release To
	var releaseTo = getValue('qRepoRelease_Release_to');
	if(releaseTo == 'Authority'){
		setMandatory('qreporelea');
	}else{
		removeMandatory('qreporelea');
	}
	
	//onChange Authority
	var releaseTo = getValue('qreporelea');
	if(releaseTo == 'Others'){
		setMandatory('qRepoRelease_Others');
	}else{
		removeMandatory('qRepoRelease_Others');
	}
	
	//Setting default value for
	if(getValue('qRepoRelease_Release_On') == '' || getValue('qRepoRelease_Release_On') == undefined){
		setValues({'qRepoRelease_Release_On':'Settlement'},true);
	}
	
}

function repoFlowHideShow(activityName){
	console.log('Inside repoFlowHideShow');
	hideFields('InitiateRepoLabel,InitiateRepoFrame,RepoLabel,RepoFrame,ExpenseLabel,ExpenseFrame,RepoMarkingLabel,RepoMarkingFrame,ReleaseLabel,ReleaseFrame,RepoSaleLabel,RepoSaleFrame,QuotationLabel,QuotationFrame');
	if(activityName == 'Initiator'){
		showFields('InitiateRepoLabel,InitiateRepoFrame');
	}else if(activityName == 'Repo_and_Sale'){
		showFields('InitiateRepoLabel,InitiateRepoFrame');
	}else if(activityName == 'Repo_Marking'){
		showFields('InitiateRepoLabel,InitiateRepoFrame,RepoLabel,RepoFrame,ExpenseLabel,ExpenseFrame,RepoMarkingLabel,RepoMarkingFrame');
		repoMarkingChecklistPopulate();
	}else if(activityName == 'Expense_Approval'){
		showFields('InitiateRepoLabel,InitiateRepoFrame,RepoLabel,RepoFrame,ExpenseLabel,ExpenseFrame,RepoMarkingLabel,RepoMarkingFrame');
		disableRepoFieldsAfterMarking(activityName);
	}else if(activityName == 'Repo_Marked'){
		showFields('InitiateRepoLabel,InitiateRepoFrame,RepoLabel,RepoFrame,ExpenseLabel,ExpenseFrame,RepoMarkingLabel,RepoMarkingFrame');
		disableRepoFieldsAfterMarking(activityName);
		if(getValue('qContactRecording_Action_Code') == 'Initiate Sale'){
			showFields('RepoSaleLabel,RepoSaleFrame');
		}else if(getValue('qContactRecording_Action_Code') == 'Release'){
			showFields('ReleaseLabel,ReleaseFrame');
			validationsRepoRelease();
		}
	}else if(activityName == 'Repo_Release_Approval'){
		showFields('InitiateRepoLabel,InitiateRepoFrame,RepoLabel,RepoFrame,ExpenseLabel,ExpenseFrame,RepoMarkingLabel,RepoMarkingFrame,ReleaseLabel,ReleaseFrame');
		disableRepoFieldsAfterMarking(activityName);
	}else if(activityName == 'Initiate_Sale_Approval'){
		showFields('InitiateRepoLabel,InitiateRepoFrame,RepoLabel,RepoFrame,ExpenseLabel,ExpenseFrame,RepoSaleLabel,RepoSaleFrame');
		disableRepoFieldsAfterMarking(activityName);
	}else if(activityName == 'Sale_and_Valuation'){
		showFields('InitiateRepoLabel,InitiateRepoFrame,RepoLabel,RepoFrame,ExpenseLabel,ExpenseFrame,RepoSaleLabel,RepoSaleFrame,QuotationLabel,QuotationFrame');
		disableRepoFieldsAfterMarking(activityName);
	}else if(activityName == 'Quote_Approval'){
		showFields('InitiateRepoLabel,InitiateRepoFrame,RepoLabel,RepoFrame,ExpenseLabel,ExpenseFrame,RepoSaleLabel,RepoSaleFrame,QuotationLabel,QuotationFrame');
		disableRepoFieldsAfterMarking(activityName);
	}else if(activityName == 'Auction'){
		showFields('InitiateRepoLabel,InitiateRepoFrame,RepoLabel,RepoFrame,ExpenseLabel,ExpenseFrame,RepoSaleLabel,RepoSaleFrame,QuotationLabel,QuotationFrame');
		disableRepoFieldsAfterMarking(activityName);
	}else if(activityName == 'Ready_For_Release'){
		showFields('InitiateRepoLabel,InitiateRepoFrame,RepoLabel,RepoFrame,ExpenseLabel,ExpenseFrame,ReleaseLabel,ReleaseFrame');
		disableRepoFieldsAfterMarking(activityName);
	}
	
}

function disableRepoFieldsAfterMarking(activityName){
	console.log('Inside disableRepoFieldsAfterMarking');
	disableFields('qRepoDetails_BM_BRM_met_Customer,qRepoDetails_BM_BRM_met_Customer_on,qRepoDetails_Justification_for_Repo,qRepoDetails_Vehicle_Availability,qRepoDetails_Vehicle_Status,qRepoDetails_Original_RC_Available,qRepoDetails_Vehicle_Registration_No,qRepoDetails_Last_Payment_Received_Date,qRepoDetails_Repo_Mode,qRepoAdvanceDetails_Actual_Repo_Date,qRepoAdvanceDetails_Entry_Date,qRepoAdvanceDetails_Repokit_No,qRepoAdvanceDetails_Location_of_Repo,qRepoAdvanceDetails_Concerned_Police_Station,qRepoAdvanceDetails_Driver_Name,qRepoAdvanceDetails_Relationship,qRepoAdvanceDetails_Vehicle_Loaded_or_not,qRepoAdvanceDetails_Yard_Shifting_ApprovedBy,qRepoAdvanceDetails_Bilty_No,qRepoAdvanceDetails_Tentative_Valuation_Amount,qRepoAdvanceDetails_Mode_of_Repossesion,qRepoAdvanceDetails_Repo_Agency_Name,qRepoAdvanceDetails_Repo_Agency_Code,qRepoAdvanceDetails_Repo_Agent_Location,qRepoAdvanceDetails_Stock_Yard_Name,qRepoAdvanceDetails_Stock_Yard_Code,qRepoAdvanceDetails_Stock_Yard_Location,qRepoAdvanceDetails_Repo_Agent_Location,qRepoAdvanceDetails_Temporary_Stock_Yard_Name,qRepoAdvanceDetails_Yard_Shifting_Date,qRepoAdvanceDetails_Asset_condition,qRepoAdvanceDetails_To_be_Sale,qRepoAdvanceDetails_Remarks,qRepoExpenses_Repo_Agency_Charges,qRepoExpenses_StockYardCharges,qRepoExpenses_Other_Repo_Expenses,qRepoExpenses_Comments');
	
	if(activityName == 'Repo_Release_Approval' || activityName == 'Ready_For_Release'){
		disableFields('qRepoRelease_Release_to,qreporelea,qRepoRelease_Others,qRepoRelease_Release_Date,qRepoRelease_Release_On,qRepoRelease_Reason_for_Release,qRepoRelease_Vehicle_Release_to_Customer_Approved_by,qRepoRelease_Comments,qRepoRelease_Payment_Details');
	}
	
	if(activityName == 'Initiate_Sale_Approval' || activityName == 'Sale_and_Valuation' || activityName == 'Quote_Approval' || activityName == 'Auction' || activityName == 'Ready_For_Release'){
		disableFields('qSaleDetails_Asset_condition,qSaleDetails_Tax_Date,qSaleDetails_Insurance_Status,qSaleDetails_Valuation_Amount,qSaleDetails_Valuation_Date');
	}
	if(activityName == 'Quote_Approval' || activityName == 'Auction' || activityName == 'Ready_For_Release'){
		disableFields('q_Repo_QD_Quotation_Details_Final_Resale_Amount,q_Repo_QD_Quotation_Details_Total_Outstanding,q_Repo_QD_Quotation_Details_Deviation,q_Repo_QD_Quotation_Details_Shortfall_Amount,q_Repo_QD_Quotation_Details_POS_loss_amount_and,q_Repo_QD_Quotation_Details_Shortfall_will_be_recovered_through,q_Repo_QD_Quotation_Details_Sale_Approved_By,q_Repo_QD_Quotation_Details_Sale_Date,q_Repo_QD_Quotation_Details_Authorized_By_Buyer,q_Repo_QD_Quotation_Details_Authorised_Buyer_Mobile_Number,q_Repo_QD_Quotation_Details_Authorized_Buyer_address,q_Repo_QD_Quotation_Details_Form_29_Issued,q_Repo_QD_Quotation_Details_Form_30_Issued,q_Repo_QD_Quotation_Details_Form_30_Issued_on,q_Repo_QD_Quotation_Details_Form_35_Issued,q_Repo_QD_Quotation_Details_Form_35_Issued_on,q_Repo_QD_Quotation_Details_RC_Received,q_Repo_QD_Quotation_Details_RC_Received_on');
	}
}

function onChangeQuotationGridAmount(){
	console.log('Inside onChangeQuotationGridAmount');
	var count = quotationGridrecommendedCount();
	if(count == 1){
		executeServerEvent('repoQuotationDetailsAutoPopulate','onChange','',true); 
	}else{
		alert('There can be exactly one Recommended records in Quotation Details');
	}
}

function quotationGridrecommendedCount(){
	console.log('Inside quotationGridrecommendedCount');
	var count = getGridRowCount('RepoQuotationDetailsGrid');
	var counter = 0;
	if(count!=0){
		for(var i=0;i<count;i++){
			var value = getValue('label_RepoQuotationDetailsGrid_'+ i +'_7');
			if(value == 'Yes'){
				counter++;
			}
		}
	}
	return counter;
}

function repoMarkingChecklistPopulate(){
	console.log('Inside repoMarkingChecklistPopulate');
	var count = getGridRowCount('MarkingCheckListGrid');
	if(count == 0){
		executeServerEvent("populaterepoMarkingOnFormLoad","onLoad","",true);
	}
}

function markRepoInCBS(){ 

var repoStatus=executeServerEvent("markRepo","","1",true);
showMessage("MarkRepo",repoStatus,"error");

}

function markRepoReleaseInCBS(){ 

var repoStatus=executeServerEvent("markRepoRelease","","2",true);
showMessage("MarkRepo",repoStatus,"error");

}