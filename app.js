//importing json file
import data from './MOCK_DATA.json' assert { type: 'json' };

//selecting all the required file from document
const tableContainer = document.querySelector('.table-container')
const search = document.querySelector('.search>#search-btn');
const input = document.querySelector('.search>#search-input');
const aTOz = document.querySelector('#atoz');
const zTOa = document.querySelector('#ztoa');
const byMark = document.querySelector('#mark');
const byPassing = document.querySelector('#passing');
const byClass = document.querySelector('#class');
const byGender = document.querySelector('#gender');

//data format to be created
/* <tr>
    <td>1</td>
    <td>
        <div class="name">
            <img src="./img" alt="">
            <span>Full Name</span>
        </div>
    </td>
    <td></td>*5
</tr> */


//Generating table data
function GenerateTable(obj, tBody){
    const tr = document.createElement('tr');

    const id = document.createElement('td');
    id.innerText = `${obj.id}`;
    tr.appendChild(id);

    const name = document.createElement('td');
    const div = document.createElement('div');
    div.className = 'name';
    const img = document.createElement('img')
    img.src = `${obj.img_src}`;
    const span = document.createElement('span');
    span.innerText = `${obj.first_name} ${obj.last_name}`;
    div.appendChild(img);
    div.appendChild(span);
    name.appendChild(div);
    tr.appendChild(name);

    const gender = document.createElement('td');
    gender.innerText = `${obj.gender}`;
    tr.appendChild(gender);
    
    const clas = document.createElement('td');
    clas.innerText = `${obj.class}`;
    tr.appendChild(clas);
    
    const mark = document.createElement('td');
    mark.innerText = `${obj.marks}`;
    tr.appendChild(mark);
    
    const pass = document.createElement('td');
    pass.innerText = `${(obj.passing)?'Passed':'Failed'}`;
    tr.appendChild(pass);
    
    const mail = document.createElement('td');
    mail.innerText = `${obj.email}`;
    tr.appendChild(mail);
    
    tBody.appendChild(tr);
}


//generating new table with table headers
function createAnotherTab(obj){
    const tab = document.createElement('table')
    const thead = document.createElement('thead');
    const tr1 = document.createElement('tr');

    const th1 = document.createElement('th');
    th1.innerText = 'ID'
    const th2 = document.createElement('th');
    th2.innerText = 'Name'
    const th3 = document.createElement('th');
    th3.innerText = 'Gender'
    const th4 = document.createElement('th');
    th4.innerText = 'Class'
    const th5 = document.createElement('th');
    th5.innerText = 'Marks'
    const th6 = document.createElement('th');
    th6.innerText = 'Passing'
    const th7 = document.createElement('th');
    th7.innerText = 'Mail'
    
    tr1.appendChild(th1);
    tr1.appendChild(th2);
    tr1.appendChild(th3);
    tr1.appendChild(th4);
    tr1.appendChild(th5);
    tr1.appendChild(th6);
    tr1.appendChild(th7);
    
    thead.appendChild(tr1);
    tab.appendChild(thead);

    const tbd = document.createElement('tbody');
    tab.appendChild(tbd);

    tableContainer.appendChild(tab);
    return tbd;
}

//function to sort the object
const compareFunc = (a, b) => {
    if (a < b) {
      return -1;
    }
  
    if (a > b) {
      return 1;
    }
  
    return 0;
  };

document.body.onload = ()=>{
    //try-catch to handle error
    try{
        //showing json data by default
        tableContainer.innerHTML = '';
        let tBody = createAnotherTab();
        data.forEach((object)=>{
            GenerateTable(object, tBody);
        });

        //handling search event on button click and update the result on table
        search.addEventListener('click', ()=>{
            //to handle no case-sensitive
            let searchText = input.value.toLowerCase();
            tBody.innerHTML = '';
            data.forEach((object)=>{
                let fn = object.first_name.toLowerCase();
                let ln = object.last_name.toLowerCase();
                let mail = object.email.toLowerCase();
                //check if the searched text is in the property
                if(fn.includes(searchText)){
                    GenerateTable(object, tBody);
                }
                else if(ln.includes(searchText)){
                    GenerateTable(object, tBody);
                }
                else if(mail.includes(searchText)){
                    GenerateTable(object, tBody);
                }
            });
        });

        //sort data according to marks property of json object
        byMark.addEventListener('click', ()=>{
            tableContainer.innerHTML = '';
            let tBody = createAnotherTab();
            data.sort((a,b)=>compareFunc(a.marks, b.marks));
            data.forEach((object)=>{
                GenerateTable(object, tBody);
            });
        });

        //sort data according to class property of json object
        byClass.addEventListener('click', ()=>{
            tableContainer.innerHTML = '';
            let tBody = createAnotherTab();
            data.sort((a,b)=>compareFunc(a.class, b.class));
            data.forEach((object)=>{
                GenerateTable(object, tBody);
            });
        });

        //filtering json data according to passed or failed student into two separate tables
        byPassing.addEventListener('click', ()=>{
            tableContainer.innerHTML = '';
            
            let passed = data.filter((obj)=>{
                return (obj.passing==true);
            })
            // console.log(passed);
            let tBody1 = createAnotherTab();
            passed.forEach((object)=>{
                GenerateTable(object, tBody1);
            });
            let failed = data.filter((obj)=>{
                return (obj.passing==false);
            });

            let tBody2 = createAnotherTab()
            failed.forEach((object)=>{
                GenerateTable(object, tBody2);
            });
        });

        //filtering json data according gender of student into three separate table of male/female/other 
        byGender.addEventListener('click', ()=>{
            tableContainer.innerHTML = '';
            
            let tBody1 = createAnotherTab();
            let male = data.filter((obj)=>{
                return (obj.gender=="Male");
            });
            male.forEach((object)=>{
                GenerateTable(object, tBody1);
            });
            let female = data.filter((obj)=>{
                return (obj.gender=="Female");
            });

            let tBody2 = createAnotherTab()
            female.forEach((object)=>{
                GenerateTable(object, tBody2);
            });


            let tBody3 = createAnotherTab()
            let other = data.filter((obj)=>{
                return (obj.gender!=="Female" && obj.gender!=="Male");
            });
            other.forEach((object)=>{
                GenerateTable(object, tBody3);
            });
        });

        //sorting json data according to fullname alphabetically 
        aTOz.addEventListener('click', ()=>{
            data.sort((a, b)=> {
                if (a.first_name === b.first_name){
                  return a.last_name < b.last_name ? -1 : 1
                } else {
                  return a.first_name < b.first_name ? -1 : 1
                }
            })
            tableContainer.innerHTML = '';
            let tBody = createAnotherTab();
            data.forEach((object)=>{
                GenerateTable(object, tBody);
            });
        });

        //sorting json data according to fullname alphabetically in reverse order
        zTOa.addEventListener('click', ()=>{
            data.sort((a, b)=> {
                if (a.first_name === b.first_name){
                  return a.last_name < b.last_name ? -1 : 1
                } else {
                  return a.first_name < b.first_name ? -1 : 1
                }
            })

            data.reverse()
            tableContainer.innerHTML = '';
            let tBody = createAnotherTab();
            data.forEach((object)=>{
                GenerateTable(object, tBody);
            });
        })

    }
    catch(error){
        alert('Something went wrong !! \n'+error);
    }
}
