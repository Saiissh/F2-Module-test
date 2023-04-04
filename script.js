let studentname=document.getElementById('student-name');
let studentmail=document.getElementById('student-email');
let studentcgpa=document.getElementById('student-cgpa');
let studentage=document.getElementById('student-age');
let studentdegree=document.getElementById('student-degree');

let addstudent=document.getElementById('addstudent');
addstudent.addEventListener('click',()=>{saveToLocal()});
let data=[];


function saveToLocal(){
  let  studentnameval = studentname.value;
  let  studentmailval = studentmail.value;
  let  studentcgpaval = studentcgpa.value;
  let  studentageval = studentage.value;
  let  studentdegreeval = studentdegree.value;



  if(studentnameval=='' || studentmailval=='' || studentcgpaval=='' || studentageval =='' || studentdegreeval==""){
    alert("All fields are required!")
    return;
}



  data.push({
    name: studentnameval,
    age: studentageval,
    grade: studentcgpaval,
    degree: studentdegreeval,
    email: studentmailval
  });

  data = data.map((item, index) => ({ id: index + 1, ...item }));

  localStorage.setItem("data", JSON.stringify(data));

  addtotable();
}

function addtotable(){

  
  let tableBody = document.getElementById('student-table');

  // Clear the existing rows of body only ,not heading
  tableBody.innerHTML = '';
  let row = document.createElement('tr');

  // looping into data and adding to table
  for (let i = 0; i < data.length; i++) {

    //  new row
    row = document.createElement('tr');

    // Add a cell in table
    let idCell = document.createElement('td');
    idCell.innerText = data[i].id;
    row.appendChild(idCell);

    let nameCell = document.createElement('td');
    nameCell.innerText = data[i].name;
    row.appendChild(nameCell);

    let emailCell = document.createElement('td');
    emailCell.innerText = data[i].email;
    row.appendChild(emailCell);

    let cgpaCell = document.createElement('td');
    cgpaCell.innerText = data[i].grade;
    row.appendChild(cgpaCell);

    let ageCell = document.createElement('td');
    ageCell.innerText = data[i].age;
    row.appendChild(ageCell);

    let degreeCell = document.createElement('td');
    degreeCell.innerText = data[i].degree;
    row.appendChild(degreeCell);

    let btnCell = document.createElement('td');
    btnCell.innerHTML='<button class="deletebtn">Delete</button>';
    btnCell.innerHTML+='<button class="editbtn">Edit</button>'
    row.appendChild(btnCell);

    // Add the new row to the table
    tableBody.appendChild(row);

    document.getElementById('student-name').value="";
      document.getElementById('student-email').value="";
      document.getElementById('student-cgpa').value="";
      document.getElementById('student-age').value="";
      document.getElementById('student-degree').value="";
  }

  //delete specific row
  let deleteButtons = document.getElementsByClassName('deletebtn');
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', (event) => {
      let row = event.target.parentNode.parentNode;
      let id = row.firstElementChild.textContent;

      data = data.filter((item) => item.id !== parseInt(id));
      localStorage.setItem('data', JSON.stringify(data));
      addtotable();
    });
  }

console.log(data.length);
  let editvalues = document.getElementsByClassName('editbtn');
   for (let i = 0; i < editvalues.length; i++) {
    editvalues[i].addEventListener('click', ()=>{editfunction(i)})}

     
  }

  function editfunction(i){
    
      // addstudent.style.display='none';
      // let updatebtn=document.getElementById('updatestudent');
      // updatebtn.style.display='block';

      studentname.value=data[i].name;
      studentmail.value=data[i].email;
      studentcgpa.value=data[i].grade;
      studentage.value=data[i].age;
      studentdegree.value=data[i].degree;

    let temp=data[i].id;
      data.splice(i,1);
    
      updatebtn.addEventListener('click',()=>{
        

        data.push({
          
          name: document.getElementById('student-name').value,
          age: document.getElementById('student-email').value,
          grade: document.getElementById('student-cgpa').value,
          degree: document.getElementById('student-age').value,
          email: document.getElementById('student-degree').value,
        });

        // localStorage.setItem('data', JSON.stringify(data));

          // console.log(data);
          // addstudent.style.display='none';

          // updatebtn.style.display='block';
    
          addtotable();
        
        
      })

    }


    function searchStudents() {
      let input = document.getElementById("search-students");
      let filter = input.value.toUpperCase();
      let table = document.getElementById("student-table");
      let rows = table.getElementsByTagName("tr");
    
      for (let i = 0; i < rows.length; i++) {
            let name = rows[i].getElementsByTagName("td")[1];
        let email = rows[i].getElementsByTagName("td")[2];
         let degree = rows[i].getElementsByTagName("td")[5];
    
        if (name || email || degree) {
          let nameVal = name.textContent || name.innerText;
          let emailVal = email.textContent || email.innerText;
             let degreeVal = degree.textContent || degree.innerText;
    
              if (
                nameVal.toUpperCase().indexOf(filter) > -1 ||
                emailVal.toUpperCase().indexOf(filter) > -1 ||
                degreeVal.toUpperCase().indexOf(filter) > -1
              ) {
                rows[i].style.display = "";
              } else {
                rows[i].style.display = "none";
              }
        }
      }
    }
    
            let searchstd = document.getElementById("search-students");
            searchstd.addEventListener("keyup", searchStudents);
            

  