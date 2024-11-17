// JavaScript Document
var total_bill = 0;
var pricePerTicked = 30;//单价
//右侧区域取消选座单击事件
document.querySelector('.ticket-container').onclick = function (e) {
	if (document.querySelectorAll(".ticket").length <= 0) {
		return;
	}
	var selected = document.querySelectorAll(".selected");
	var ticket = e.target.getAttribute('data-index');
	for (var i = 0; i < selected.length; i++) {
		if (selected[i].getAttribute('data-row-id') + '-' + selected[i].getAttribute('data-column-id') == ticket) {
			selected[i].classList.remove('selected');
			selected[i].classList.add('selectable');
			break;
		}
	}
	e.target.parentNode.removeChild(e.target);
	showTotalbill();
	setTicketsinfoState();
}
//左侧选座区域单击事件
document.querySelector('.seats-wrapper').onclick = function (e) {

	if (e.target.nodeName!="SPAN"||e.target.getAttribute('data-st') == 'E' || e.target.getAttribute('data-st') == 'LK') {
		return;
	}
	else if (e.target.classList.contains('selected')) {// 座位已被选中
		e.target.classList.remove('selected');
		e.target.classList.add('selectable');
		var tickets = document.querySelectorAll(".ticket");
		var selectd = e.target.getAttribute('data-row-id') + '-' + e.target.getAttribute('data-column-id');
		for (var i = 0; i < tickets.length; i++) {
			if (tickets[i].getAttribute('data-index') == selectd) {
				document.querySelector(".ticket-container").removeChild(tickets[i]);
				break;
			}
		}
		showTotalbill();
	} else if (document.querySelectorAll(".ticket").length >= 5) {
		alert('一次最多买5张');
	}
	else {
		e.target.classList.remove('selectable');
		e.target.classList.add('selected');
		// 定义变量select通过获取当前点击div的id
		var newUL = document.querySelector(".ticket-container");
		var s = document.createElement('span');
		s.setAttribute('data-row-id', e.target.getAttribute('data-row-id'));
		s.setAttribute('data-column-id', e.target.getAttribute('data-column-id'));
		s.setAttribute('data-index', e.target.getAttribute('data-row-id') + '-' + e.target.getAttribute('data-column-id'));
		s.className = 'ticket';
		s.innerText = e.target.getAttribute('data-row-id') + '排' + e.target.getAttribute('data-column-id') + '座';
		newUL.appendChild(s);
		showTotalbill();
	}
	setTicketsinfoState();
}

function setTicketsinfoState() {
	if (document.querySelectorAll(".ticket").length > 0) {
		document.querySelector('.confirm-btn').classList.remove('disable');
		document.querySelector('.no-ticket').style.display = 'none';
		document.querySelector('.has-ticket').style.display = 'block';
	}
	else {
		document.querySelector('.confirm-btn').classList.add('disable');
		document.querySelector('.no-ticket').style.display = 'block';
		document.querySelector('.has-ticket').style.display = 'none';
	}

}
function showTotalbill() {
	//计算总价
	total_bill = document.querySelectorAll(".ticket").length * pricePerTicked;
	document.querySelector('.price').innerHTML = total_bill;
}