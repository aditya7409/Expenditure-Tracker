var form = document.getElementById('addForm');         

var itemList = document.getElementById('items');

// localStorage.clear();

form.addEventListener('submit', addItem);

// To remove a list from the item list
itemList.addEventListener('click', removeItem);

// To reload DOM Content
document.addEventListener('DOMContentLoaded',add);

// Add Items After reloading DOM Contents
function add()
{
    lists=getList();
    if(lists.length!=0)
    {
        var cost=0;
        for(var i=0;i<lists.length;i++)
        {
            var newCost = lists[i].match(/\d/g);
            newCost = newCost.join("");
            cost+=parseInt(newCost);
            var li = document.createElement('li');
            li.className = 'list-group-item';
            li.appendChild(document.createTextNode(lists[i]));
            var deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
            deleteBtn.appendChild(document.createTextNode('X'));
            li.appendChild(deleteBtn);
            itemList.appendChild(li);
            
        }
        var li = document.createElement('li');
        li.className = 'list-group-item';
        li.appendChild(document.createTextNode('Total Expenditure=' + cost + '₹'));
        itemList.appendChild(li);
    }
}

// Add Item to the DOM
function addItem(e) {
    e.preventDefault();
    var items = itemList.getElementsByTagName('li');
    var arr = Array.from(items);
    if (arr.length == 0) 
    {
        var newItem = document.getElementById('item').value;
        if (hasNumber(newItem) == false) 
        {
            alert('Please Enter The Cost');
            return;
        }
        else 
        {
            var li = document.createElement('li');
            li.className = 'list-group-item';
            li.appendChild(document.createTextNode(newItem));
            addtoStorage(li);
            var deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
            deleteBtn.appendChild(document.createTextNode('X'));
            li.appendChild(deleteBtn);
            itemList.appendChild(li);
            document.querySelector('#item').value = '';
            var li = document.createElement('li');
            li.className = 'list-group-item';
            var newCost = newItem.match(/\d/g);
            newCost = newCost.join("");
            li.appendChild(document.createTextNode('Total Expenditure=' + newCost + '₹'));
            itemList.appendChild(li);
            // addtoStorage(li);
        }
    }
    else 
    {
        var newItem = document.getElementById('item').value;
        if (hasNumber(newItem) == false) 
        {
            alert('Please Enter The Cost');
        }
        else 
        {
            var items = itemList.getElementsByTagName('li');
            var arr = Array.from(items);
            var targetLi = arr[arr.length - 1];
            var text = targetLi.innerText;
            var numb = text.match(/\d/g);
            numb = numb.join("");
            let menu = document.getElementById('items');
            menu.removeChild(menu.lastElementChild);
            var li = document.createElement('li');
            li.className = 'list-group-item';
            li.appendChild(document.createTextNode(newItem));
            addtoStorage(li);
            var deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
            deleteBtn.appendChild(document.createTextNode('X'));
            li.appendChild(deleteBtn);
            itemList.appendChild(li);
            document.querySelector('#item').value = '';
            var li = document.createElement('li');
            li.className = 'list-group-item';
            var newCost = newItem.match(/\d/g);
            newCost = newCost.join("");
            var totalCost = parseInt(numb) + parseInt(newCost);
            li.appendChild(document.createTextNode('Total Expenditure=' + totalCost + '₹'));
            itemList.appendChild(li);
            // addtoStorage(li);
        }

    }
}
function removeItem(e) 
{
    if (e.target.classList.contains('delete')) 
    {
        if (confirm('Are You Sure You Want To Delete this item from List ?')) 
        {
            var li = e.target.parentElement;
            var newItem = li.innerText;
            var newCost = newItem.match(/\d/g);
            newCost = newCost.join("");
            var last = document.querySelector('#items');
            var content = last.lastElementChild.innerText;
            var cost = content.match(/\d/g);
            cost = cost.join("");
            last.lastElementChild.innerText = 'Total Expenditure=' + (parseInt(cost) - parseInt(newCost)) + '₹';
            var lis=document.querySelector('#items').childNodes;
            var index=0;
            for(var i=0;i<lis.length;i++)
            {
                if(lis[i]==li)
                {
                    index=i;
                    break;
                }
            }
            removefromStrorage(index-1);
            itemList.removeChild(li);
        }
    }
}
function hasNumber(myString) 
{
    return /\d/.test(myString);
}
function getList()
{
    var lists;
    if(localStorage.getItem('List')==null)
    {
        return [];
    }
    lists=JSON.parse(localStorage.getItem('List'));
    return lists;
}
function addtoStorage(list)
{
    var lists=getList();
    var text=(list.innerText);
    lists.push(text); 
    localStorage.setItem('List',JSON.stringify(lists));
}
function removefromStrorage(index){
    var lists=getList();
    lists.splice(index,1);
   localStorage.setItem('List',JSON.stringify(lists));
}