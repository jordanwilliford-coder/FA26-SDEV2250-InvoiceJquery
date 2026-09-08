function processRow(e) {
  let currentTable = $(e).closest('table');
  let invoiceSubtotal = 0;

  $(e).closest('tbody').find('tr').each(function(index) {
    let qty = parseFloat($(this).find('input.calc[name="quantity"]').val()); //get qty
    let cost = parseFloat($(this).find('input.calc[name="cost"]').val()); // get cost
    
    let subtotal = (qty * cost).toFixed(2); // row total
    
    $(this).find('input[name="itemTotal"]').val(subtotal); //display row total 
     invoiceSubtotal = invoiceSubtotal + parseFloat(subtotal); // add row total to subtotal

  });
  
  //display subttotal
  
  $(currentTable).find('[name="subTotal"]').val(invoiceSubtotal);


  let tax = parseFloat($(currentTable).find('[name="tax"]').val()); //get tax
  let taxAmount = invoiceSubtotal * (tax / 100); //get tax ammount

  $(currentTable).find('[name="taxTotal"]').val(taxAmount); //display tax ammount


  let total = invoiceSubtotal + taxAmount; //calcualte total 
  $(currentTable).find('[name="total"]').val(total); // display the total 
};

function addRow(e) {
  let clone = $(e).closest('table').find('tbody tr:last-child').clone(true);
  clone.removeAttr('id'); // avoid duplicate ids in same document.
  $(e).closest('table').find('tbody').append(clone);
};

function main() {
  // make selector find sheet class
  $('.sheet button.addRow').on('click', function(e) {
    addRow(this);
  });
  // find all input elements that will trigger a recalculation of the 
  // sheet.
  $('.sheet input.calc').on('change', function(e) {
    processRow(this);
  });
}

// make sure entire document is loaded
// before interacting with DOM.
$(document).ready(function() {
  main();
});
