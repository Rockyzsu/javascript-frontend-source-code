window.onload = function () {
	var cartTable = document.getElementById('cartTable');
	var tr =  cartTable.children[1].rows; 
	var checkInputs = document.querySelectorAll('.check');
	var checkAllInput = document.querySelector('.check-all');
	var selectedTotal = document.getElementById('selectedTotal'); 
	var priceTotal = document.getElementById('priceTotal'); 
	var selectedViewList = document.getElementById('selectedViewList'); 
	var selected = document.getElementById('selected'); 
	var foot = document.getElementById('foot');	
	function getTotal() {	
		var seleted = 0;
		var price = 0;		
		for (var i = 0, len = tr.length; i < len; i++) {
			if (tr[i].getElementsByTagName('input')[0].checked) { 				
				seleted += parseInt(tr[i].getElementsByTagName('input')[1].value);
				price += parseFloat(tr[i].cells[4].innerHTML); 	
			}			
		}
		selectedTotal.innerHTML = seleted;
		priceTotal.innerHTML = price.toFixed(2); 
	
	}
	for(var i = 0; i < checkInputs.length; i++ ){
		checkInputs[i].onclick = function () { 
			if (this.className.indexOf('check-all') >= 0) { 
				for (var j = 0; j < checkInputs.length; j++) {
					checkInputs[j].checked = this.checked;
				}
			}
			if (!this.checked) { 
				
					checkAllInput.checked = false;
			
			}
			getTotal();
		}
	}
	
	for (var i = 0; i < tr.length; i++) {
		tr[i].onclick = function (e) {
			var e = e || window.event;
			var el = e.target || e.srcElement; 
			var cls = el.className; 
			var countInput = this.getElementsByTagName('input')[1];
			var value = parseInt(countInput.value); 
			switch (cls) {
				case 'add': 
					countInput.value = value + 1;
					getSubtotal(this);
					break;
				case 'reduce': 
					if (value > 1) {
						countInput.value = value - 1;
						getSubtotal(this);
					}
					break;
				case 'delete':
					var conf = confirm('确定删除此商品吗？');
					if (conf) {
						this.parentNode.removeChild(this);
					}
					break;
			}
			getTotal();
		}
		
	}
	function getSubtotal(tr) {
		var cells = tr.cells;
		var price = cells[2]; 
		var countInput = tr.getElementsByTagName('input')[1]; 
		var subtotal = (parseInt(countInput.value) * parseFloat(price.innerHTML)).toFixed(2);
		cells[4].innerHTML = subtotal;
		var span = tr.getElementsByTagName('span')[1];
		if (countInput.value == 1) {
			span.innerHTML = '';
		}else{
			span.innerHTML = '-';
		}
	}	
	
	
}